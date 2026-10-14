import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { createHash } from 'node:crypto';
const sha = value => createHash('sha256').update(value).digest('hex');
const config = JSON.parse(await readFile('note.config.json', 'utf8'));
const previous = JSON.parse(await readFile('reviews/gate-repair/sequential/state.json', 'utf8'));
const units = [];
const bindings = [];
for (const chapter of config.chapters) {
  const body = await readFile(`reviews/gate-repair/final-body/${chapter.id}/body.md`, 'utf8');
  const source = await readFile(chapter.file, 'utf8');
  let index = 0;
  for (const section of body.split(/(?=^## )/m)) {
    if (section.trim()) units.push({ id:`${chapter.id}-${++index}`,text:section,text_sha256:sha(section) });
  }
  bindings.push({source:chapter.file,source_sha256:sha(source),projection_sha256:sha(body)});
}
const changed = units.filter(unit => unit.text_sha256 !== previous.units.find(old => old.id === unit.id)?.text_sha256);
const directory = 'reviews/gate-repair/delta-packets';
await mkdir(directory);
for (const unit of changed) {
  const index = units.indexOf(unit);
  await writeFile(`${directory}/${unit.id}-prefix.md`, units.slice(0,index).map(item=>item.text).join('\n'));
  await writeFile(`${directory}/${unit.id}-unit.md`, unit.text);
}
await writeFile(`${directory}/bindings.json`, JSON.stringify({bindings,changed:changed.map(({text,...binding})=>binding),unchanged_units:units.filter(unit=>!changed.includes(unit)).map(unit=>unit.id)},null,2));
console.log(changed.map(unit=>unit.id));
