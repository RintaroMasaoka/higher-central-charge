import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { createHash } from 'node:crypto';
const sha=value=>createHash('sha256').update(value).digest('hex');
const directory='reviews/gate-repair/phase-closure';
await mkdir(directory);
const ranges=[['content/overview.md',5,5],['content/overview.md',20,34],['content/observable.md',3,3],['content/observable.md',9,15],['content/derivation.md',153,164]];
const bindings=[];
const excerpts=[];
for(const [path,start,end] of ranges) {
  const source=await readFile(path,'utf8');
  const excerpt=source.split('\n').slice(start-1,end).join('\n');
  bindings.push({path,start,end,source_sha256:sha(source),excerpt_sha256:sha(excerpt)});
  excerpts.push(`## ${path}:${start}-${end}\n\n${excerpt}`);
}
await writeFile(directory+'/context.md',excerpts.join('\n\n'));
const source=await readFile('content/derivation.md','utf8');
const lines=source.split('\n');
await writeFile(directory+'/heading.md',lines[166]+'\n');
await writeFile(directory+'/answer.md',lines[168]+'\n');
const old=JSON.parse(await readFile('reviews/gate-repair/paragraph-final-body/derivation/packets.json','utf8'));
const current=JSON.parse(await readFile('reviews/gate-repair/publication-body/derivation/packets.json','utf8'));
const delta=current.filter(packet=>packet.markdown !== old.find(item=>item.index===packet.index)?.markdown);
await writeFile(directory+'/bindings.json',JSON.stringify({source:'content/derivation.md',source_sha256:sha(source),heading_sha256:sha(lines[166]+'\n'),answer_sha256:sha(lines[168]+'\n'),context:bindings,changed_visible_packets:delta.map(packet=>packet.index),unchanged_visible_packets:current.filter(packet=>!delta.includes(packet)).map(packet=>packet.index)},null,2));
console.log('Prepared one heading/answer claim; changed visible packet: '+delta.map(packet=>packet.index));
