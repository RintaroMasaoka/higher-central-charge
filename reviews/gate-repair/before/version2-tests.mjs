import assert from 'node:assert/strict';
import { test } from 'node:test';
import { mkdtemp, mkdir, writeFile, readFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { resolve, join } from 'node:path';
import { createHash } from 'node:crypto';
import { spawnSync } from 'node:child_process';

const runner = resolve('scripts/prefix-reader.mjs');
const text = 'We evaluate the integral on x > 0. The logarithm is real on this domain.\n';
const sha = value => createHash('sha256').update(value).digest('hex');
const valid = () => ({
  verdict:'PASS', subject_reasoning:{verdict:'PASS',witness:'The real logarithm requires positive input.',quote:'The logarithm is real on this domain.',premise_quote:'We evaluate the integral on x > 0.'},
  explanation_acts:{verdict:'PASS',active_question:'Which domain supports the stated real integral?',cumulative_effect:'One domain declaration fixes the calculation input.',moves:[{
    quote:'The logarithm is real on this domain.',proposition_status:'Supported real-domain condition.',
    act_and_presupposition:'Specifies the real-valued calculation; no mistaken reader belief is presumed.',
    first_pass_signal:'The domain is an operative premise at this calculation.',
    context_license:{quote:'We evaluate the integral on x > 0.',why_here:'It fixes the domain of the immediately stated operation.'},
    comparison:{alternative:'Put the real domain in the integral statement.',signal_change:'Combines the scope with its operation without adding a warning.',content_preserved:'The same real logarithm domain is retained.'},verdict:'PASS'
  }]}, notation:'x is the integration variable.',evidence:'The domain precedes its interpretation.'
});
async function attempt(record, {change=false,historical=false,changePrefix=false,changeConfig=false}={}) {
  const root = await mkdtemp(join(tmpdir(),'reader-gate-'));
  try {
    const directory = join(root,'reviews/run');
    await mkdir(directory,{recursive:true});
    await writeFile(join(root,'unit.md'),change ? text + 'Changed.' : text);
    await writeFile(join(root,'note.config.json'),changeConfig ? '{"changed":true}' : '{}');
    const units=[{id:'unit-1',path:'unit.md',text,source_sha256:sha(text),text_sha256:sha(text)}];
    if(changePrefix) {await writeFile(join(root,'prefix.md'),'Changed prefix.'); units.unshift({id:'prefix-1',path:'prefix.md',text:'Original prefix.',source_sha256:sha('Original prefix.'),text_sha256:sha('Original prefix.')});}
    await writeFile(join(directory,'state.json'),JSON.stringify({gate_version:historical ? 1 : 2,config_sha256:sha('{}'),index:changePrefix ? 1 : 0,revealed:true,units,records:[],events:[]}));
    const result = spawnSync(process.execPath,[runner,'record',JSON.stringify(record)],{cwd:root,env:{...process.env,REVIEW_RUN_DIRECTORY:'reviews/run'},encoding:'utf8'});
    const state = JSON.parse(await readFile(join(directory,'state.json'),'utf8'));
    return {status:result.status,error:result.stderr,records:state.records};
  } finally { await rm(root,{recursive:true,force:true}); }
}
test('accepts a located supported domain condition',async()=>assert.equal((await attempt(valid())).status,0));
test('rejects historical free-form summaries',async()=>{
  const record=valid(); record.explanation_acts='The condition is relevant.';
  const result=await attempt(record); assert.notEqual(result.status,0); assert.equal(result.records.length,0);
});
test('requires first-pass signal and realization comparison',async()=>{
  for(const key of ['first_pass_signal','comparison']) { const record=valid(); delete record.explanation_acts.moves[0][key]; assert.notEqual((await attempt(record)).status,0); }
});
test('rejects context from unrevealed text',async()=>{
  const record=valid(); record.explanation_acts.moves[0].context_license.quote='A later section supplies the needed reason.';
  assert.notEqual((await attempt(record)).status,0);
});
test('requires a located scientific demand and premise',async()=>{
  for(const key of ['quote','premise_quote']) {const record=valid(); delete record.subject_reasoning[key]; assert.notEqual((await attempt(record)).status,0);}
  const record=valid(); record.subject_reasoning.premise_quote='An unstated principle.'; assert.notEqual((await attempt(record)).status,0);
});
test('subject support cannot override an act failure',async()=>{
  const record=valid(); record.explanation_acts.verdict='FAIL'; record.explanation_acts.moves[0].verdict='FAIL';
  assert.notEqual((await attempt(record)).status,0);
  record.verdict='FAIL'; assert.equal((await attempt(record)).status,0);
  record.verdict='UNKNOWN'; assert.notEqual((await attempt(record)).status,0);
  record.explanation_acts.verdict='UNKNOWN'; assert.notEqual((await attempt(record)).status,0);
});
test('freezes configured sources with empty visible projections',async()=>{
  const root=await mkdtemp(join(tmpdir(),'reader-empty-'));
  try {
    await mkdir(join(root,'reviews/body/empty'),{recursive:true});
    await writeFile(join(root,'empty.md'),'Hidden only.');
    await writeFile(join(root,'note.config.json'),JSON.stringify({chapters:[{id:'empty',file:'empty.md'}]}));
    await writeFile(join(root,'reviews/body/empty/body.md'),'');
    await writeFile(join(root,'reviews/body/empty/manifest.json'),JSON.stringify({source:'empty.md',sha256:sha('Hidden only.'),projectionSha256:sha('')}));
    const env={...process.env,REVIEW_RUN_DIRECTORY:'reviews/run',REVIEW_BODY_DIRECTORY:'reviews/body'};
    assert.equal(spawnSync(process.execPath,[runner,'init'],{cwd:root,env,encoding:'utf8'}).status,0);
    await writeFile(join(root,'reviews/body/empty/body.md'),'\n');
    const changedProjection=spawnSync(process.execPath,[runner,'next'],{cwd:root,env,encoding:'utf8'});
    assert.notEqual(changedProjection.status,0); assert.match(changedProjection.stderr,/Frozen projection changed/);
    await writeFile(join(root,'reviews/body/empty/body.md'),'');
    await writeFile(join(root,'empty.md'),'New visible content.');
    const next=spawnSync(process.execPath,[runner,'next'],{cwd:root,env,encoding:'utf8'});
    assert.notEqual(next.status,0); assert.match(next.stderr,/Frozen manuscript changed/);
  } finally {await rm(root,{recursive:true,force:true});}
});
test('rejects source-binding overrides and changed manuscripts',async()=>{
  const record=valid(); record.source_sha256='invented'; assert.notEqual((await attempt(record)).status,0);
  assert.notEqual((await attempt(valid(),{change:true})).status,0);
  assert.notEqual((await attempt(valid(),{historical:true})).status,0);
  assert.notEqual((await attempt(valid(),{changePrefix:true})).status,0);
  assert.notEqual((await attempt(valid(),{changeConfig:true})).status,0);
});
test('rejects extraction labelled with a different source or projection',async()=>{
  const root=await mkdtemp(join(tmpdir(),'reader-projection-'));
  try {
    await mkdir(join(root,'reviews/body/test'),{recursive:true});
    await writeFile(join(root,'unit.md'),text);
    await writeFile(join(root,'note.config.json'),JSON.stringify({chapters:[{id:'test',file:'unit.md'}]}));
    await writeFile(join(root,'reviews/body/test/body.md'),'Unrelated body.');
    for(const metadata of [{source:'unit.md',sha256:sha('Another source.'),projectionSha256:sha('Unrelated body.')},{source:'unit.md',sha256:sha(text),projectionSha256:sha(text)}]) {
      await writeFile(join(root,'reviews/body/test/manifest.json'),JSON.stringify(metadata));
      const result=spawnSync(process.execPath,[runner,'init'],{cwd:root,env:{...process.env,REVIEW_RUN_DIRECTORY:'reviews/run',REVIEW_BODY_DIRECTORY:'reviews/body'},encoding:'utf8'});
      assert.notEqual(result.status,0);
      assert.match(result.stderr,/Extraction provenance mismatch/);
    }
  } finally {await rm(root,{recursive:true,force:true});}
});
test('historical next is read-only and absolute extraction paths are accepted',async()=>{
  const root=await mkdtemp(join(tmpdir(),'reader-path-'));
  try {
    await mkdir(join(root,'reviews/run'),{recursive:true});
    const state=JSON.stringify({gate_version:1,index:0,revealed:false,units:[],records:[],events:[]});
    await writeFile(join(root,'reviews/run/state.json'),state);
    const env={...process.env,REVIEW_RUN_DIRECTORY:'reviews/run',REVIEW_BODY_DIRECTORY:'reviews/body'};
    const old=spawnSync(process.execPath,[runner,'next'],{cwd:root,env,encoding:'utf8'});
    assert.notEqual(old.status,0);
    assert.equal(await readFile(join(root,'reviews/run/state.json'),'utf8'),state);
    await mkdir(join(root,'reviews/body/test'),{recursive:true});
    await writeFile(join(root,'unit.md'),text);
    await writeFile(join(root,'note.config.json'),JSON.stringify({chapters:[{id:'test',file:'unit.md'}]}));
    await writeFile(join(root,'reviews/body/test/body.md'),text);
    await writeFile(join(root,'reviews/body/test/manifest.json'),JSON.stringify({source:join(root,'unit.md'),sha256:sha(text),projectionSha256:sha(text)}));
    env.REVIEW_RUN_DIRECTORY='reviews/new';
    const fresh=spawnSync(process.execPath,[runner,'init'],{cwd:root,env,encoding:'utf8'});
    assert.equal(fresh.status,0,fresh.stderr);
  } finally {await rm(root,{recursive:true,force:true});}
});
