import { readFile, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { validateState } from './paragraph-integrity.mjs';
const sha=value=>createHash('sha256').update(value).digest('hex');
const directory=process.argv[2] || 'reviews/gate-repair';
if(!directory.startsWith('reviews/') || directory.includes('..')) throw new Error('Use a project review directory.');
const lanes=[];
for (const lane of ['subject','act']) {
  const path=`${directory}/paragraph-${lane}/state.json`;
  const raw=await readFile(path,'utf8');
  const state=JSON.parse(raw);
  await validateState(state,true);
  if(state.lane !== lane) throw new Error('Mismatched lane: '+lane);
  lanes.push({path,state,sha256:sha(raw)});
}
const [subject,act]=lanes;
if(JSON.stringify(subject.state.units) !== JSON.stringify(act.state.units)) throw new Error('Lane projections differ.');
const combined=subject.state.records.map((record,i)=>({id:record.id,text_sha256:record.text_sha256,subject:record.verdict,act:act.state.records[i].verdict,overall:[record.verdict,act.state.records[i].verdict].includes('FAIL')?'FAIL':[record.verdict,act.state.records[i].verdict].every(v=>v==='PASS')?'PASS':'UNKNOWN'}));
const result={kind:'coordinator-combination-not-independent-verdict',lanes:lanes.map(({path,sha256,state})=>({path,sha256,perspective:state.lane,completed:state.records.length})),total:combined.length,counts:Object.fromEntries(['PASS','FAIL','UNKNOWN'].map(verdict=>[verdict,combined.filter(r=>r.overall===verdict).length])),combined};
await writeFile(directory+'/paragraph-combined.json',JSON.stringify(result,null,2));
console.log(result.counts);
