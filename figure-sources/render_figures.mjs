import fs from 'node:fs/promises';
import path from 'node:path';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import katex from 'katex';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const { chromium } = await import(process.env.HCC_PLAYWRIGHT_PATH || 'playwright');
const definitions = [];
for (const file of (await fs.readdir(path.join(root, 'figure-sources/figures'))).sort()) {
  if (file.endsWith('.mjs')) definitions.push(...(await import(path.join(root, 'figure-sources/figures', file))).default);
}
const selected = process.argv.slice(2);
const browser = await chromium.launch({ channel: process.env.HCC_BROWSER_CHANNEL || 'chrome' });
const exportsDir = path.join(root, 'reviews/visualization/exports');
await fs.mkdir(exportsDir, { recursive: true });
try {
  for (const figure of definitions.filter(f => !selected.length || selected.includes(f.id))) {
    if (/<text\b/i.test(figure.svg)) throw new Error(`${figure.id}: SVG lettering bypasses TeX`);
    const labels = figure.labels.map((label, index) => {
      if (/[\u3000-\u9fff]/.test(label.tex)) throw new Error(`${figure.id}: non-English label`);
      const shift = label.anchor === 'left' ? '0' : label.anchor === 'right' ? '-100%' : '-50%';
      return `<span class="label" data-index="${index}" style="left:${label.x}px;top:${label.y}px;font-size:${label.fontSize || 26}px;transform:translate(${shift},-50%)">${katex.renderToString(label.tex, { throwOnError: true, output: 'html' })}</span>`;
    }).join('');
    const html = `<!doctype html><html><head><link rel="stylesheet" href="/katex.min.css"><style>body{margin:0}#figure{position:relative;width:${figure.width}px;height:${figure.height}px;background:white;color:#253342}svg{position:absolute;width:100%;height:100%}.label{position:absolute;white-space:nowrap;line-height:1.25}.katex{font-size:1em}</style></head><body><div id="figure">${figure.svg}${labels}</div></body></html>`;
    const page = await browser.newPage({ viewport: { width: figure.width, height: figure.height }, deviceScaleFactor: 2 });
    await page.route('**/*', async route => {
      const url = new URL(route.request().url());
      if (url.pathname === '/figure.html') return route.fulfill({ contentType: 'text/html; charset=utf-8', body: html });
      const relative = url.pathname === '/katex.min.css' ? 'katex.min.css' : /^\/fonts\/[\w.-]+$/.test(url.pathname) ? url.pathname.slice(1) : null;
      if (!relative) return route.fulfill({ status: 404, body: '' });
      return route.fulfill({ body: await fs.readFile(path.join(root, 'node_modules/katex/dist', relative)) });
    });
    await page.goto('https://figure.local/figure.html');
    await page.evaluate(() => document.fonts.ready);
    const evidence = await page.evaluate(() => ({
      fonts: [...document.fonts].filter(f => f.status === 'loaded').map(f => ({ family: f.family, style: f.style, weight: f.weight })),
      labels: [...document.querySelectorAll('.label')].map(el => {
        const r = el.getBoundingClientRect();
        return { index: Number(el.dataset.index), x: r.x, y: r.y, width: r.width, height: r.height, typeset: !!el.querySelector('.katex') };
      })
    }));
    if (!evidence.fonts.some(f => f.family.startsWith('KaTeX'))) throw new Error('KaTeX fonts not loaded');
    const outside = evidence.labels.filter(l => l.x < -1 || l.y < -1 || l.x + l.width > figure.width + 1 || l.y + l.height > figure.height + 1);
    if (outside.length) throw new Error(`${figure.id}: label outside canvas ${JSON.stringify(outside)}`);
    const png = await page.locator('#figure').screenshot();
    await fs.writeFile(path.join(root, 'public/diagrams', `${figure.id}.png`), png);
    if (figure.id === 'partial-rotation') await fs.writeFile(path.join(root, 'public/diagrams/partial-rotation.svg'), `<svg xmlns="http://www.w3.org/2000/svg" width="${figure.width}" height="${figure.height}" viewBox="0 0 ${figure.width} ${figure.height}"><image width="${figure.width}" height="${figure.height}" href="data:image/png;base64,${png.toString('base64')}"/></svg>`);
    await fs.writeFile(path.join(exportsDir, `${figure.id}.json`), JSON.stringify({ id: figure.id, renderer: `KaTeX ${katex.version}, Chrome screenshot at 2x`, sourceSha256: createHash('sha256').update(JSON.stringify(figure)).digest('hex'), outputSha256: createHash('sha256').update(png).digest('hex'), width: figure.width, height: figure.height, inventory: figure.labels.map((l, i) => ({ ...l, ...evidence.labels[i] })), fonts: evidence.fonts }, null, 2) + '\n');
    console.log(`${figure.id}: ${figure.labels.length} TeX labels, ${evidence.fonts.length} loaded fonts`);
    await page.close();
  }
} finally { await browser.close(); }
