import assert from 'node:assert/strict';
import { test } from 'node:test';
import { mkdtemp, mkdir, writeFile, readFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { resolve, join } from 'node:path';
import { createHash } from 'node:crypto';
import { spawnSync } from 'node:child_process';
const runner=resolve('scripts/paragraph-reader.mjs');
const sha=value=>createHash('sha256').update(value).digest('hex');
async function fixture(lane, action, paragraphs=1) {
  const root=await mkdtemp(join(tmpdir(),'paragraph-gate-'));
  try {
    await mkdir(join(root,'reviews/body/a'),{recursive:true});
    const source='First.\n\nSecond.\n';
    const packets=JSON.stringify([{index:1,markdown:'First.\n',paragraphs},{index:2,markdown:'Second.\n',paragraphs:1}],null,2);
    await writeFile(join(root,'a.md'),source);
    await writeFile(join(root,'note.config.json'),JSON.stringify({chapters:[{id:'a',file:'a.md'}]}));
    await writeFile(join(root,'reviews/body/a/body.md'),source);
    await writeFile(join(root,'reviews/body/a/packets.json'),packets);
    await writeFile(join(root,'reviews/body/a/manifest.json'),JSON.stringify({source:'a.md',sha256:sha(source),projectionSha256:sha(source),packetsSha256:sha(packets)}));
    const env={...process.env,REVIEW_RUN_DIRECTORY:'reviews/run',REVIEW_BODY_DIRECTORY:'reviews/body',REVIEW_LANE:lane};
    const run=(mode,record)=>spawnSync(process.execPath,[runner,mode,...(record?[JSON.stringify(record)]:[])],{cwd:root,env,encoding:'utf8'});
    const initial=run('init');
    await action({root,run,initial,state:async()=>JSON.parse(await readFile(join(root,'reviews/run/state.json'),'utf8'))});
  } finally {await rm(root,{recursive:true,force:true});}
}
const subject=()=>({verdict:'PASS',quote:'First.',premise_quote:'First.',witness:'An opening object is presented.',next_inference:'The given object is now available.'});
const act=()=>({verdict:'PASS',active_question:'Which subject begins?',cumulative_effect:'One direct opening.',moves:[{quote:'First.',proposition_status:'Opening assertion.',act_and_presupposition:'Introduces its object without correcting a prior belief.',first_pass_signal:'The object is central.',context_license:{quote:'First.',why_here:'Initial introduction.'},comparison:{alternative:'A longer warning before the object.',signal_change:'Would shift attention to a potential mistake.',content_preserved:'The same object would be named.'},verdict:'PASS'}]});
test('one lane and one frozen paragraph per release',async()=>{
  await fixture('subject',async({run,state})=>{
    assert.equal(run('next').status,0);
    assert.notEqual(run('next').status,0);
    const mixed=subject(); mixed.moves=act().moves; assert.notEqual(run('record',mixed).status,0);
    assert.equal(run('record',subject()).status,0);
    assert.equal((await state()).records[0].lane,'subject');
    const next=run('next'); assert.equal(next.status,0); assert.equal(JSON.parse(next.stdout).markdown,'Second.\n');
  });
  await fixture('combined',async({initial})=>assert.notEqual(initial.status,0));
  await fixture('act',async({initial})=>assert.notEqual(initial.status,0),2);
  await fixture('act',async({initial})=>assert.notEqual(initial.status,0),0);
});
test('act evidence binding and fail propagation',async()=>{
  await fixture('act',async({run})=>{
    assert.equal(run('next').status,0);
    const mixed=act(); mixed.witness='Science is true.'; assert.notEqual(run('record',mixed).status,0);
    const suffix=act(); suffix.moves[0].context_license.quote='Second.'; assert.notEqual(run('record',suffix).status,0);
    const failed=act(); failed.moves[0].verdict='FAIL'; failed.verdict='UNKNOWN'; assert.notEqual(run('record',failed).status,0);
    failed.verdict='FAIL'; assert.equal(run('record',failed).status,0);
  });
});
test('all frozen sources/projections/packet definitions remain checked',async()=>{
  for(const path of ['a.md','reviews/body/a/body.md','reviews/body/a/packets.json','note.config.json']) await fixture('act',async({root,run})=>{
    await writeFile(join(root,path),'Changed.'); assert.notEqual(run('next').status,0);
  });
});
test('initialization and record identities cannot overwrite history',async()=>{
  await fixture('subject',async({run,state})=>{
    assert.notEqual(run('init').status,0);
    assert.equal(run('next').status,0);
    const overridden=subject(); overridden.lane='act'; assert.notEqual(run('record',overridden).status,0);
    const signed=subject(); signed.act_verdict='PASS'; assert.notEqual(run('record',signed).status,0);
    assert.equal((await state()).records.length,0);
  });
});
test('release rejects packet text diverging from its saved hash',async()=>{
  await fixture('subject',async({root,run,state})=>{
    const altered=await state(); altered.units[0].text='Unbound replacement.\n\nSecond illicit paragraph.';
    altered.units[0].text_sha256=sha(altered.units[0].text);
    await writeFile(join(root,'reviews/run/state.json'),JSON.stringify(altered));
    const next=run('next'); assert.notEqual(next.status,0); assert.match(next.stderr,/Frozen packet text changed/);
  });
});
test('saved evidence is revalidated, not trusted during replay or combination',async()=>{
  await fixture('subject',async({root,run,state})=>{
    assert.equal(run('next').status,0); assert.equal(run('record',subject()).status,0);
    const altered=await state(); delete altered.records[0].witness;
    await writeFile(join(root,'reviews/run/state.json'),JSON.stringify(altered));
    const summary=run('summary'); assert.notEqual(summary.status,0); assert.match(summary.stderr,/Missing text: witness/);
  });
});
test('replay rederives packets and preserves freeze-event verdicts',async()=>{
  await fixture('subject',async({root,run,state})=>{
    const altered=await state();
    const packets=[{index:1,markdown:'First.\n\nIllicit second paragraph.\n',paragraphs:1},{index:2,markdown:'Second.\n',paragraphs:1}];
    const raw=JSON.stringify(packets,null,2);
    await writeFile(join(root,'reviews/body/a/packets.json'),raw);
    altered.sources[0].packets_sha256=sha(raw);
    altered.units[0].text=packets[0].markdown; altered.units[0].text_sha256=sha(packets[0].markdown);
    await writeFile(join(root,'reviews/run/state.json'),JSON.stringify(altered));
    const next=run('next'); assert.notEqual(next.status,0); assert.match(next.stderr,/Structured source projection changed/);
  });
  await fixture('subject',async({root,run,state})=>{
    assert.equal(run('next').status,0); assert.equal(run('record',subject()).status,0);
    const altered=await state(); altered.records[0].verdict='FAIL';
    await writeFile(join(root,'reviews/run/state.json'),JSON.stringify(altered));
    const summary=run('summary'); assert.notEqual(summary.status,0); assert.match(summary.stderr,/Frozen verdict differs/);
  });
});
