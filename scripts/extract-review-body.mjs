import { createServer } from 'vite';
import { readFile, mkdir, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { createHash } from 'node:crypto';
const [sourcePath, outputPath] = process.argv.slice(2);
if (!sourcePath || !outputPath) throw new Error('Usage: node scripts/extract-review-body.mjs CONTENT_FILE NEW_OUTPUT_DIRECTORY');
const server = await createServer({ configFile: false, server: { middlewareMode: true, hmr: false, watch: null, ws: false }, appType: 'custom', optimizeDeps: { noDiscovery: true, include: [] } });
try {
  const { extractReviewBody } = await server.ssrLoadModule('/lib/extract-review-body.ts');
  const source = await readFile(resolve(sourcePath), 'utf8');
  const result = extractReviewBody(source);
  const output = resolve(outputPath);
  await mkdir(output); // Do not overwrite an earlier review revision.
  await writeFile(resolve(output, 'body.md'), result.markdown);
  await writeFile(resolve(output, 'units.json'), JSON.stringify(result.units, null, 2));
  await writeFile(resolve(output, 'manifest.json'), JSON.stringify({ source: resolve(sourcePath),
    sha256: createHash('sha256').update(source).digest('hex'),
    projectionSha256: createHash('sha256').update(result.markdown).digest('hex'),
    removed: result.removed, units: result.units.length,
  }, null, 2));
  console.log(`Extracted ${result.units.length} units to ${output}`);
} finally { await server.close(); }
