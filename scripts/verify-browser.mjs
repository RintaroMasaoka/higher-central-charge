import assert from 'node:assert/strict';
import { readFile, mkdir, writeFile } from 'node:fs/promises';
const { chromium } = await import(process.env.HCC_PLAYWRIGHT_PATH || 'playwright');
const config = JSON.parse(await readFile('note.config.json', 'utf8'));
const origin = process.env.HCC_ORIGIN || 'http://127.0.0.1:5177';
const prefix = process.env.VITE_SITE_BASE_PATH || '';
await mkdir('reviews/screenshots', { recursive:true });
const browser = await chromium.launch({ headless:true, ...(process.env.HCC_BROWSER_CHANNEL ? {channel:process.env.HCC_BROWSER_CHANNEL} : {}) });
const results = [];
const errors = [];
try {
  for (const viewport of [{width:1440,height:1000},{width:390,height:844}]) {
    for (const theme of ['light','dark']) {
      const page = await browser.newPage({ viewport, colorScheme:theme });
      page.on('pageerror', error => errors.push(error.message));
      page.on('response', response => { if (response.status() >= 400) errors.push(response.status() + ' ' + response.url()); });
      for (const chapter of config.chapters) {
        await page.goto(origin + prefix + '/' + chapter.id + '/', {waitUntil:'networkidle'});
        await page.locator('article h1').waitFor();
        await page.evaluate(() => document.fonts.ready);
        const state = await page.evaluate(() => ({
          heading:document.querySelector('article h1').textContent,
          mathErrors:document.querySelectorAll('.katex-error').length,
          math:document.querySelectorAll('article .katex').length,
          overflow:document.documentElement.scrollWidth > innerWidth + 1,
          images:[...document.querySelectorAll('article img')].map(img => ({src:img.src,loaded:img.complete && img.naturalWidth > 0})),
          fonts:[...document.fonts].filter(font => font.family.startsWith('KaTeX') && font.status === 'loaded').map(font=>font.family)
        }));
        assert.equal(state.mathErrors,0,chapter.id + ' math');
        assert.equal(state.overflow,false,chapter.id + ' page overflow');
        if (state.math) assert(state.fonts.length > 0,chapter.id + ' fonts');
        for (const img of state.images) assert(img.loaded,img.src);
        results.push({chapter:chapter.id,viewport,theme,...state});
        if (['overview','observable','derivation'].includes(chapter.id))
          await page.screenshot({path:`reviews/screenshots/${chapter.id}-${viewport.width}-${theme}.png`,fullPage:true});
      }
      await page.goto(origin + prefix + '/overview/', {waitUntil:'networkidle'});
      const gaussMilgram = page.locator('#gauss-milgram');
      assert.equal(await gaussMilgram.evaluate(el=>el.open),false,'background starts folded');
      await page.locator('article a[href="#gauss-milgram"]').click();
      assert(await gaussMilgram.evaluate(el=>el.open),'first-use link opens background');
      assert.equal(await gaussMilgram.locator('.katex-display:visible').count(),1,'background relation renders');
      const gaussProof = page.locator('#gauss-milgram-cft');
      assert.equal(await gaussProof.evaluate(el=>el.open),false,'CFT derivation starts folded');
      await gaussProof.locator('summary').click();
      assert(await gaussProof.evaluate(el=>el.open),'CFT derivation opens');
      assert.equal(await gaussProof.locator('.katex-display:visible').count(),7,'CFT derivation equations render');
      assert(await gaussProof.locator('.katex-display').evaluateAll(nodes=>nodes.every(el=>el.scrollWidth <= el.clientWidth + 1)),'CFT derivation equations fit');
      assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth > innerWidth + 1),false,'opened derivation overflow');
      await gaussProof.screenshot({path:`reviews/screenshots/gauss-proof-${viewport.width}-${theme}.png`});
      await gaussProof.locator('summary').click();
      assert(await gaussMilgram.getByRole('link',{name:/Kitaev/}).getAttribute('href'),'background source entry');
      await gaussMilgram.locator(':scope > summary').click();
      assert.equal(await gaussMilgram.evaluate(el=>el.open),false,'background closes');
      const disclosure = page.locator('details').first();
      await disclosure.locator(':scope > summary').click();
      assert(await disclosure.evaluate(el=>el.open));
      const before = await page.evaluate(()=>document.documentElement.dataset.theme);
      await page.locator('.theme-toggle').click();
      assert.notEqual(await page.evaluate(()=>document.documentElement.dataset.theme),before);
      await page.reload({waitUntil:'networkidle'});
      assert.notEqual(await page.evaluate(()=>document.documentElement.dataset.theme),before);
      const reference = page.locator('.reference-trigger').first();
      await reference.click();
      await page.locator('.reading-reference').waitFor({state:'visible'});
      await page.locator('.wordmark').hover();
      assert(await page.locator('.reading-reference').isVisible(),'pinned reference');
      await page.keyboard.press('Escape');
      await page.locator('.reading-reference').waitFor({state:'hidden'});
      await reference.click();
      await page.locator('.note-source-link').click();
      await page.waitForURL(/\/references\/?#ref-primary$/);
      assert.equal(await page.locator('#ref-primary').count(),1,'reference destination');
      await page.goto(origin + prefix + '/overview/#overview-selfcheck',{waitUntil:'networkidle'});
      assert(await page.locator('#overview-selfcheck').evaluate(el=>el.open),'deep disclosure link');
      await page.goto(origin + prefix + '/overview/#gauss-milgram-cft',{waitUntil:'networkidle'});
      assert(await page.locator('#gauss-milgram').evaluate(el=>el.open),'nested deep link opens outer');
      assert(await page.locator('#gauss-milgram-cft').evaluate(el=>el.open),'nested deep link opens proof');
      if (viewport.width < 600) await page.getByRole('button',{name:'章一覧を開く'}).click();
      await page.locator('.chapter-list button').nth(2).click();
      await page.waitForURL(/\/derivation\/?$/);
      assert((await page.locator('article h1').textContent()).includes('指標'));
      await page.close();
    }
  }
  assert.deepEqual(errors,[]);
  await writeFile('reviews/browser-results.json', JSON.stringify({origin,prefix,results,errors},null,2));
  console.log('Verified ' + results.length + ' route/viewport/theme combinations, fonts, images, details, navigation and theme persistence.');
} finally { await browser.close(); }
