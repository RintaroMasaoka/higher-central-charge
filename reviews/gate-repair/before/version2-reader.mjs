import { readFile, writeFile, mkdir, realpath } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { resolve } from 'node:path';
const directory = process.env.REVIEW_RUN_DIRECTORY || 'reviews/prefix-reader';
if (!directory.startsWith('reviews/') || directory.includes('..')) throw new Error('Use a project review directory.');
const digest = value => createHash('sha256').update(value).digest('hex');
const mode = process.argv[2];
const statePath = directory + '/state.json';
if (mode === 'init') {
  const config = JSON.parse(await readFile('note.config.json','utf8'));
  const units = [];
  const sources = [];
  for (const chapter of config.chapters) {
    const source = await readFile(chapter.file,'utf8');
    const bodyDirectory = (process.env.REVIEW_BODY_DIRECTORY || 'reviews/html-body-final') + '/' + chapter.id;
    const body = await readFile(bodyDirectory + '/body.md','utf8');
    const manifest = JSON.parse(await readFile(bodyDirectory + '/manifest.json','utf8'));
    if (await realpath(resolve(manifest.source)) !== await realpath(resolve(chapter.file)) || manifest.sha256 !== digest(source) || manifest.projectionSha256 !== digest(body)) throw new Error('Extraction provenance mismatch: ' + chapter.id);
    sources.push({path:chapter.file,source_sha256:digest(source),projection_path:bodyDirectory + '/body.md',projection_sha256:digest(body)});
    const sections = body.split(/(?=^## )/m);
    for (const section of sections) if (section.trim()) units.push({
      id:chapter.id + '-' + (units.filter(u=>u.chapter===chapter.id).length + 1),
      chapter:chapter.id, path:chapter.file, source_sha256:digest(source), text:section,
      text_sha256:digest(section)
    });
  }
  await mkdir(directory,{recursive:true});
  await writeFile(statePath,JSON.stringify({gate_version:2,config_sha256:digest(await readFile('note.config.json','utf8')),sources,index:0,revealed:false,units,records:[],events:[]},null,2),{flag:'wx'});
  console.log('Initialized ' + units.length + ' sequential visible sections.');
} else {
  const state = JSON.parse(await readFile(statePath,'utf8'));
  if (state.gate_version !== 2 && mode !== 'summary') throw new Error('Historical run; initialize a new version-2 run.');
  if (state.gate_version === 2) {
    if (digest(await readFile('note.config.json','utf8')) !== state.config_sha256) throw new Error('Chapter configuration changed during review.');
    for (const [path, hash] of new Map((state.sources || state.units).map(unit => [unit.path,unit.source_sha256]))) {
      if (digest(await readFile(path,'utf8')) !== hash) throw new Error('Frozen manuscript changed: ' + path);
    }
    for (const source of state.sources || []) {
      if (source.projection_path && digest(await readFile(source.projection_path,'utf8')) !== source.projection_sha256) throw new Error('Frozen projection changed: ' + source.projection_path);
    }
  }
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
    if (state.gate_version !== 2) throw new Error('Historical run; initialize a new version-2 run.');
    const result = JSON.parse(process.argv[3]);
    const unit = state.units[state.index];
    if (digest(await readFile(unit.path,'utf8')) !== unit.source_sha256) throw new Error('Manuscript changed during review.');
    for (const key of ['id','source_sha256','text_sha256']) if (key in result) throw new Error('Source binding is runner-owned: ' + key);
    const validVerdict = value => ['PASS','FAIL','UNKNOWN'].includes(value);
    const requireText = (value, name) => {
      if (typeof value !== 'string' || !value.trim()) throw new Error('Missing text: ' + name);
    };
    if (!validVerdict(result.verdict)) throw new Error('Invalid verdict');
    const subject = result.subject_reasoning;
    const acts = result.explanation_acts;
    if (!subject || !validVerdict(subject.verdict)) throw new Error('Subject verdict required.');
    requireText(subject.witness, 'subject_reasoning.witness');
    requireText(subject.quote, 'subject_reasoning.quote');
    if (!unit.text.includes(subject.quote)) throw new Error('Subject demand quote absent from current unit.');
    requireText(subject.premise_quote, 'subject_reasoning.premise_quote');
    const acquired = state.units.slice(0, state.index + 1).map(item => item.text).join('\n');
    if (!acquired.includes(subject.premise_quote)) throw new Error('Subject premise quote absent from acquired prefix.');
    if (!acts || !validVerdict(acts.verdict)) throw new Error('Explanation-act verdict required.');
    requireText(acts.active_question, 'active_question');
    requireText(acts.cumulative_effect, 'cumulative_effect');
    if (!Array.isArray(acts.moves) || !acts.moves.length) throw new Error('Located signal records required.');
    const prefix = state.units.slice(0, state.index + 1).map(item => item.text).join('\n');
    for (const move of acts.moves) {
      for (const key of ['quote','proposition_status','act_and_presupposition','first_pass_signal']) requireText(move[key], key);
      if (!unit.text.includes(move.quote)) throw new Error('Move quote absent from current unit.');
      const license = move.context_license;
      if (!license) throw new Error('Context license required.');
      requireText(license.quote, 'context_license.quote');
      requireText(license.why_here, 'context_license.why_here');
      if (!prefix.includes(license.quote)) throw new Error('Context quote absent from visible prefix.');
      const comparison = move.comparison;
      if (!comparison) throw new Error('Realization comparison required.');
      for (const key of ['alternative','signal_change','content_preserved']) requireText(comparison[key], 'comparison.' + key);
      if (!validVerdict(move.verdict)) throw new Error('Move verdict required.');
    }
    if (acts.verdict === 'PASS' && acts.moves.some(move => move.verdict !== 'PASS')) throw new Error('Act PASS conflicts with a move verdict.');
    if (acts.verdict !== 'FAIL' && acts.moves.some(move => move.verdict === 'FAIL')) throw new Error('A move FAIL requires explanation-act FAIL.');
    if (result.verdict === 'PASS' && (subject.verdict !== 'PASS' || acts.verdict !== 'PASS')) throw new Error('Overall PASS requires both dimensions.');
    if (result.verdict !== 'FAIL' && (subject.verdict === 'FAIL' || acts.verdict === 'FAIL')) throw new Error('A dimension FAIL requires overall FAIL.');
    requireText(result.notation, 'notation');
    requireText(result.evidence, 'evidence');
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
