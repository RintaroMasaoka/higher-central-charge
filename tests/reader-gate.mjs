import assert from 'node:assert/strict';
import { test } from 'node:test';
import { mkdtemp, mkdir, writeFile, readFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join,resolve } from 'node:path';
import { spawnSync } from 'node:child_process';
const runner=resolve('scripts/prefix-reader.mjs');
test('legacy summaries are read-only and ineligible; mutations use the new lane contract',async()=>{
  const root=await mkdtemp(join(tmpdir(),'legacy-reader-'));
  try {
    await mkdir(join(root,'reviews/run'),{recursive:true});
    for(const version of [1,2]) {
      const state=JSON.stringify({gate_version:version,units:[],records:[],index:0,revealed:false,events:[]});
      const path=join(root,'reviews/run/state.json'); await writeFile(path,state);
      const env={...process.env,REVIEW_RUN_DIRECTORY:'reviews/run'};
      const summary=spawnSync(process.execPath,[runner,'summary'],{cwd:root,env,encoding:'utf8'});
      assert.equal(summary.status,0,summary.stderr); assert.equal(JSON.parse(summary.stdout).acceptance_eligible,false);
      for(const mode of ['next','record','init']) {
        const result=spawnSync(process.execPath,[runner,mode,'{}'],{cwd:root,env,encoding:'utf8'});
        assert.notEqual(result.status,0); assert.equal(await readFile(path,'utf8'),state);
      }
    }
  } finally {await rm(root,{recursive:true,force:true});}
});
