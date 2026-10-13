import { createServer } from 'vite';
import { readFile, mkdir, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import assert from 'node:assert/strict';
const config = JSON.parse(await readFile('note.config.json', 'utf8'));
assert.equal(new Set(config.chapters.map(chapter => chapter.id)).size, config.chapters.length);
assert.equal(new Set(config.chapters.map(chapter => chapter.file)).size, config.chapters.length);
const server = await createServer({ server: { middlewareMode: true, hmr:false, watch:null, ws:false }, appType:'custom', optimizeDeps:{ noDiscovery:true, include:[] } });
try {
  await server.ssrLoadModule('/tests/math-rendering.tsx');
  await server.ssrLoadModule('/tests/review-extraction.ts');
  const { extractReviewBody } = await server.ssrLoadModule('/lib/extract-review-body.ts');
  const directory = process.argv[2] || 'reviews/html-body-current';
  await mkdir(directory);
  for (const chapter of config.chapters) {
    const source = await readFile(chapter.file, 'utf8');
    const result = extractReviewBody(source);
    const output = directory + '/' + chapter.id;
    await mkdir(output);
    await writeFile(output + '/body.md', result.markdown);
    await writeFile(output + '/units.json', JSON.stringify(result.units, null, 2));
    await writeFile(output + '/manifest.json', JSON.stringify({ source:chapter.file, sha256:createHash('sha256').update(source).digest('hex'), removed:result.removed, units:result.units.length }, null, 2));
    console.log(chapter.id + ': visible body extracted; hidden blocks: ' + JSON.stringify(result.removed));
  }
} finally { await server.close(); }
