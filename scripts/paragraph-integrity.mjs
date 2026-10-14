import { readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { createServer } from 'vite';
import { fileURLToPath } from 'node:url';
export const digest=value=>createHash('sha256').update(value).digest('hex');
const text=(value,label)=>{if(typeof value !== 'string' || !value.trim()) throw new Error('Missing text: '+label);};
const verdict=value=>['PASS','FAIL','UNKNOWN'].includes(value);
const keys=(value,allowed)=>{for(const key of Object.keys(value)) if(!allowed.includes(key)) throw new Error('Field outside assigned lane: '+key);};
export function validateRecord(record,unit,prefix,lane) {
  if(!verdict(record.verdict)) throw new Error('Invalid verdict.');
  const quote=(value,where,label)=>{text(value,label);if(!where.includes(value)) throw new Error('Unbound quote: '+label);};
  if(lane === 'subject') {
    keys(record,['verdict','quote','premise_quote','witness','next_inference']);
    quote(record.quote,unit.text,'demand'); quote(record.premise_quote,prefix,'premise');
    text(record.witness,'witness'); text(record.next_inference,'next_inference');
  } else if(lane === 'act') {
    keys(record,['verdict','active_question','cumulative_effect','moves']);
    text(record.active_question,'active_question'); text(record.cumulative_effect,'cumulative_effect');
    if(!Array.isArray(record.moves) || !record.moves.length) throw new Error('Located acts required.');
    for(const move of record.moves) {
      keys(move,['quote','proposition_status','act_and_presupposition','first_pass_signal','context_license','comparison','verdict']);
      quote(move.quote,unit.text,'move');
      for(const key of ['proposition_status','act_and_presupposition','first_pass_signal']) text(move[key],key);
      quote(move.context_license?.quote,prefix,'context'); text(move.context_license?.why_here,'why_here');
      for(const key of ['alternative','signal_change','content_preserved']) text(move.comparison?.[key],key);
      if(!verdict(move.verdict)) throw new Error('Invalid move verdict.');
    }
    if(record.verdict === 'PASS' && record.moves.some(move=>move.verdict !== 'PASS')) throw new Error('Act PASS conflicts with moves.');
    if(record.verdict !== 'FAIL' && record.moves.some(move=>move.verdict === 'FAIL')) throw new Error('Move FAIL must propagate.');
  } else throw new Error('Invalid lane.');
}
export async function validateState(state,complete=false) {
  if(state.gate_version !== 3 || !['subject','act'].includes(state.lane)) throw new Error('Not a paragraph-lane run.');
  const configText=await readFile('note.config.json','utf8');
  if(digest(configText) !== state.config_sha256) throw new Error('Frozen configuration changed.');
  const chapters=JSON.parse(configText).chapters;
  if(state.sources.length !== chapters.length) throw new Error('Incomplete source binding.');
  const expected=[];
  const server=await createServer({configFile:false,server:{middlewareMode:true,hmr:false,watch:null,ws:false},appType:'custom',optimizeDeps:{noDiscovery:true,include:[]}});
  try {
  const {extractReviewBody}=await server.ssrLoadModule(fileURLToPath(new URL('../lib/extract-review-body.ts',import.meta.url)));
  for(let i=0;i<chapters.length;i++) {
    const source=state.sources[i], chapter=chapters[i];
    if(source.path !== chapter.file) throw new Error('Configured source identity changed.');
    const inputs=[];
    for(const [path,hash] of [[source.path,source.source_sha256],[source.projection_path,source.projection_sha256],[source.packets_path,source.packets_sha256]]) {
      const input=await readFile(path,'utf8');
      if(digest(input) !== hash) throw new Error('Frozen input changed: '+path);
      inputs.push(input);
    }
    const derived=extractReviewBody(inputs[0]);
    if(derived.markdown !== inputs[1] || JSON.stringify(derived.packets,null,2) !== inputs[2]) throw new Error('Structured source projection changed.');
    const packets=JSON.parse(inputs[2]);
    packets.forEach((packet,index)=>{
      if(packet.index !== index+1 || ![0,1].includes(packet.paragraphs)) throw new Error('Invalid paragraph packet.');
      expected.push({id:chapter.id+'-p'+packet.index,path:source.path,source_sha256:source.source_sha256,text:packet.markdown,text_sha256:digest(packet.markdown),paragraphs:packet.paragraphs});
    });
  }
  } finally {await server.close();}
  if(JSON.stringify(state.units) !== JSON.stringify(expected)) throw new Error('Frozen packet text changed or release units differ from projection.');
  if(state.index !== state.records.length || state.index > expected.length || typeof state.revealed !== 'boolean') throw new Error('Invalid review position.');
  if(state.events.length !== state.records.length*2+(state.revealed?1:0)) throw new Error('Invalid freeze event count.');
  for(let i=0;i<state.records.length;i++) {
    const unit=expected[i], saved=state.records[i];
    const {id,lane,source_sha256,text_sha256,...record}=saved;
    if(id !== unit.id || lane !== state.lane || source_sha256 !== unit.source_sha256 || text_sha256 !== unit.text_sha256) throw new Error('Record binding mismatch.');
    validateRecord(record,unit,expected.slice(0,i+1).map(item=>item.text).join('\n'),state.lane);
    for(const [offset,kind] of [[0,'reveal'],[1,'record']]) if(state.events[2*i+offset].kind !== kind || state.events[2*i+offset].id !== unit.id) throw new Error('Invalid release/freeze order.');
    if(state.events[2*i+1].verdict !== record.verdict) throw new Error('Frozen verdict differs from its record event.');
  }
  if(state.revealed && (state.events.at(-1).kind !== 'reveal' || state.events.at(-1).id !== expected[state.index]?.id)) throw new Error('Invalid active reveal.');
  if(complete && (state.revealed || state.records.length !== expected.length)) throw new Error('Incomplete lane.');
}
