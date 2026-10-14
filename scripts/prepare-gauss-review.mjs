import { readFile, mkdir, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { createServer } from 'vite';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import assert from 'node:assert/strict';

const sourcePath = 'content/overview.md';
const output = process.argv[2];
assert(output?.startsWith('reviews/') && !output.includes('..'));
const source = await readFile(sourcePath, 'utf8');
const sha = text => createHash('sha256').update(text).digest('hex');
const server = await createServer({ configFile:false, server:{middlewareMode:true,hmr:false,watch:null,ws:false}, appType:'custom', optimizeDeps:{noDiscovery:true,include:[]} });
try {
  const { extractReviewBody } = await server.ssrLoadModule('/lib/extract-review-body.ts');
  const tree = unified().use(remarkParse).parse(source);
  const spans = new Map();
  const stack = [];
  // Preserve original offsets; the renderer reparses HTML fragments locally.
  for (const node of tree.children.filter(node=>node.type === 'html')) {
    for (const match of node.value.matchAll(/<details\b[^>]*>|<\/details\s*>/g)) {
      const offset = node.position.start.offset + match.index;
      if (match[0].startsWith('<details')) {
        const id = match[0].match(/\bid="([\w-]+)"/)?.[1];
        stack.push({id,start:offset+match[0].length});
      } else {
        const opened = stack.pop();
        assert(opened,'Unmatched disclosure');
        spans.set(opened.id,{start:opened.start,end:offset});
      }
    }
  }
  assert.equal(stack.length,0);
  const fragment = id => {
    const span = spans.get(id);
    assert(span,id);
    const start = source.indexOf('</summary>',span.start) + '</summary>'.length;
    const end = span.end;
    assert(start > span.start && start < end);
    return { start, end, text:source.slice(start,end) };
  };
  const outer = fragment('gauss-milgram');
  const proof = fragment('gauss-milgram-cft');
  const outside = extractReviewBody(outer.text).packets;
  const inside = extractReviewBody(proof.text).packets;
  const boundary = outside.findIndex(packet => packet.markdown.includes('[折りたたみ見出し]'));
  assert.equal(boundary,5);
  assert.equal(outside.length,7);
  assert.equal(inside.length,8);
  const route = [...outside.slice(0,boundary+1), ...inside, ...outside.slice(boundary+1)];
  await mkdir(output);
  const packets = [];
  for (const [index, packet] of route.entries()) {
    assert(packet.paragraphs <= 1);
    const file = `packet-${String(index+1).padStart(2,'0')}.md`;
    await writeFile(output+'/'+file,packet.markdown,{flag:'wx'});
    packets.push({file,sha256:sha(packet.markdown),paragraphs:packet.paragraphs});
  }
  await writeFile(output+'/manifest.json',JSON.stringify({source:sourcePath,source_sha256:sha(source),outer:{start:outer.start,end:outer.end},proof:{start:proof.start,end:proof.end},route:'outer explanation; freeze nested summary; open proof; return to outer source/scope paragraph',packets},null,2),{flag:'wx'});
  console.log('Prepared '+packets.length+' one-paragraph opened-route packets.');
} finally { await server.close(); }
