import { readFile } from 'node:fs/promises';
const directory=process.env.REVIEW_RUN_DIRECTORY || 'reviews/prefix-reader';
if(!directory.startsWith('reviews/') || directory.includes('..')) throw new Error('Use a project review directory.');
if(process.argv[2] === 'summary') {
  const state=JSON.parse(await readFile(directory+'/state.json','utf8'));
  if(state.gate_version !== 3) {
    console.log(JSON.stringify({historical:true,acceptance_eligible:false,total:state.units.length,completed:state.records.length,findings:state.records.filter(record=>record.verdict !== 'PASS')},null,2));
    process.exit(0);
  }
}
process.env.REVIEW_RUN_DIRECTORY=directory;
await import('./paragraph-reader.mjs');
