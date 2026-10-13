import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { createHash } from 'node:crypto';
const directory = 'reviews/prefix-reader';
const digest = value => createHash('sha256').update(value).digest('hex');
const mode = process.argv[2];
const statePath = directory + '/state.json';
if (mode === 'init') {
  const config = JSON.parse(await readFile('note.config.json','utf8'));
  const units = [];
  for (const chapter of config.chapters) {
    const source = await readFile(chapter.file,'utf8');
    const body = await readFile('reviews/html-body-final/' + chapter.id + '/body.md','utf8');
    const sections = body.split(/(?=^## )/m);
    for (const section of sections) if (section.trim()) units.push({
      id:chapter.id + '-' + (units.filter(u=>u.chapter===chapter.id).length + 1),
      chapter:chapter.id, path:chapter.file, source_sha256:digest(source), text:section,
      text_sha256:digest(section)
    });
  }
  await mkdir(directory,{recursive:true});
  await writeFile(statePath,JSON.stringify({index:0,revealed:false,units,records:[],events:[]},null,2),{flag:'wx'});
  console.log('Initialized ' + units.length + ' sequential visible sections.');
} else {
  const state = JSON.parse(await readFile(statePath,'utf8'));
  if (mode === 'next') {
    if (state.revealed) throw new Error('Record current unit before next reveal.');
    if (state.index >= state.units.length) { console.log('DONE'); process.exit(0); }
    const unit = state.units[state.index];
    const live = await readFile(unit.path,'utf8');
    if (digest(live) !== unit.source_sha256) throw new Error('Manuscript changed; fresh run required.');
    state.revealed = true;
    state.events.push({kind:'reveal',id:unit.id,time:new Date().toISOString()});
    await writeFile(statePath,JSON.stringify(state,null,2));
    console.log(JSON.stringify({index:state.index + 1,id:unit.id,source_sha256:unit.source_sha256,markdown:unit.text}));
  } else if (mode === 'record') {
    if (!state.revealed) throw new Error('Nothing revealed.');
    const result = JSON.parse(process.argv[3]);
    for (const key of ['verdict','subject_reasoning','explanation_acts','notation','evidence'])
      if (!result[key]) throw new Error('Missing ' + key);
    if (!['PASS','FAIL','UNKNOWN'].includes(result.verdict)) throw new Error('Invalid verdict');
    const unit = state.units[state.index];
    state.records.push({id:unit.id,source_sha256:unit.source_sha256,text_sha256:unit.text_sha256,...result});
    state.events.push({kind:'record',id:unit.id,time:new Date().toISOString(),verdict:result.verdict});
    state.index += 1;
    state.revealed = false;
    await writeFile(statePath,JSON.stringify(state,null,2));
    console.log('Frozen ' + unit.id + ': ' + result.verdict);
  } else if (mode === 'summary') {
    console.log(JSON.stringify({total:state.units.length,completed:state.records.length,findings:state.records.filter(r=>r.verdict!=='PASS')},null,2));
  } else throw new Error('Use init, next, record, summary.');
}
