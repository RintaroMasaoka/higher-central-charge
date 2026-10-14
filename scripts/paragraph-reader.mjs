import { readFile, writeFile, mkdir, realpath } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createServer } from 'vite';
import { validateRecord, validateState } from './paragraph-integrity.mjs';
const sha = value => createHash('sha256').update(value).digest('hex');
const directory = process.env.REVIEW_RUN_DIRECTORY;
if (!directory?.startsWith('reviews/') || directory.includes('..')) throw new Error('Specify a project review directory.');
const mode = process.argv[2];
const statePath = directory + '/state.json';
const text = (value, label) => { if (typeof value !== 'string' || !value.trim()) throw new Error('Missing text: ' + label); };
if (mode === 'init') {
  const lane = process.env.REVIEW_LANE;
  if (!['subject','act'].includes(lane)) throw new Error('Choose exactly one review lane.');
  const configText = await readFile('note.config.json','utf8');
  const config = JSON.parse(configText);
  const sources = [], units = [];
  const server = await createServer({configFile:false,server:{middlewareMode:true,hmr:false,watch:null,ws:false},appType:'custom',optimizeDeps:{noDiscovery:true,include:[]}});
  try {
  const {extractReviewBody} = await server.ssrLoadModule(fileURLToPath(new URL('../lib/extract-review-body.ts',import.meta.url)));
  for (const chapter of config.chapters) {
    const path = chapter.file;
    const source = await readFile(path,'utf8');
    const base = (process.env.REVIEW_BODY_DIRECTORY || 'reviews/gate-repair/paragraph-body') + '/' + chapter.id;
    const body = await readFile(base + '/body.md','utf8');
    const packetsText = await readFile(base + '/packets.json','utf8');
    const manifest = JSON.parse(await readFile(base + '/manifest.json','utf8'));
    if (await realpath(resolve(manifest.source)) !== await realpath(resolve(path)) || manifest.sha256 !== sha(source) || manifest.projectionSha256 !== sha(body) || manifest.packetsSha256 !== sha(packetsText)) throw new Error('Extraction provenance mismatch.');
    const derived = extractReviewBody(source);
    if (derived.markdown !== body || JSON.stringify(derived.packets,null,2) !== packetsText) throw new Error('Projection does not match structured source extraction.');
    sources.push({path,source_sha256:sha(source),projection_path:base + '/body.md',projection_sha256:sha(body),packets_path:base + '/packets.json',packets_sha256:sha(packetsText)});
    for (const packet of JSON.parse(packetsText)) {
      if (!Number.isInteger(packet.paragraphs) || packet.paragraphs < 0 || packet.paragraphs > 1) throw new Error('One paragraph maximum.');
      text(packet.markdown,'packet');
      units.push({id:chapter.id + '-p' + packet.index,path,source_sha256:sha(source),text:packet.markdown,text_sha256:sha(packet.markdown),paragraphs:packet.paragraphs});
    }
  }
  } finally {await server.close();}
  await mkdir(directory,{recursive:true});
  await writeFile(statePath,JSON.stringify({gate_version:3,lane,config_sha256:sha(configText),sources,units,index:0,revealed:false,records:[],events:[]},null,2),{flag:'wx'});
  console.log('Initialized ' + units.length + ' paragraph packets for ' + lane + '.');
} else {
  const state = JSON.parse(await readFile(statePath,'utf8'));
  await validateState(state);
  if (mode === 'next') {
    if (state.revealed) throw new Error('Freeze current judgment before next reveal.');
    if (state.index === state.units.length) { console.log('DONE'); process.exit(0); }
    const unit = state.units[state.index];
    state.revealed = true;
    state.events.push({kind:'reveal',id:unit.id,time:new Date().toISOString()});
    await writeFile(statePath,JSON.stringify(state,null,2));
    console.log(JSON.stringify({lane:state.lane,index:state.index + 1,id:unit.id,markdown:unit.text,source_sha256:unit.source_sha256,text_sha256:unit.text_sha256}));
  } else if (mode === 'record') {
    if (!state.revealed) throw new Error('Nothing revealed.');
    const record = JSON.parse(process.argv[3]);
    const unit = state.units[state.index];
    const prefix = state.units.slice(0,state.index + 1).map(item=>item.text).join('\n');
    validateRecord(record,unit,prefix,state.lane);
    state.records.push({id:unit.id,lane:state.lane,source_sha256:unit.source_sha256,text_sha256:unit.text_sha256,...record});
    state.events.push({kind:'record',id:unit.id,time:new Date().toISOString(),verdict:record.verdict});
    state.index++; state.revealed = false;
    await writeFile(statePath,JSON.stringify(state,null,2));
    console.log('Frozen ' + unit.id + ': ' + record.verdict);
  } else if (mode === 'summary') console.log(JSON.stringify({lane:state.lane,total:state.units.length,completed:state.records.length,findings:state.records.filter(record=>record.verdict !== 'PASS')},null,2));
  else throw new Error('Use init, next, record or summary.');
}
