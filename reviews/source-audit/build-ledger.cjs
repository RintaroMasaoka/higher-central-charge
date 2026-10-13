const fs = require('fs');
const crypto = require('crypto');
const root = __dirname;
const raw = fs.readFileSync(root + '/snapshot/main.tex', 'utf8').split('\n').slice(171,234).join('\n') + '\n';
fs.writeFileSync(root + '/snapshot/main-range.tex', raw);
const hash = crypto.createHash('sha256').update(raw).digest('hex');
const claims = {}, tasks = {};
const evidence = 'evidence-and-prerequisites.md';
const gap = {M09:2,A13:4,D11:8,M14:9,M12:6};
const pass = {D02:'Definition contract, subject to nonzero denominator (evidence item 6).',D07:'Definition of common twist order.',D08:'Explicit finite sum calculation in evidence item 7.',D09:'Opposite CS signatures in evidence item 7, conditional on CS identification.',M02:'Explicit setup assumption main 186.',M04:'Definition at main 190.',M06:'Explicit positive-real convention main 195.',M07:'Three anomaly units cancel Gauss-Milgram phase at n=1; evidence item 13.',M08:'Full bosonic circumference translation is identity; evidence item 13.',M15:'Subsystem translation is a unitary permutation/translation.',A07:'Explicit assumption main 206.',A12:'Explicit dimensional definition xi=v beta.',A14:'Explicit vacuum-character and cold-edge setup.',A15:'Vacuum term q^(-c/24), conditional on standard character.',A16:'Vacuum term at Re(tau)=1/n gives exp(-2 pi i c/(24n)).',A17:'Explicit regime assumption.',A20:'Mobius substitution verified in evidence item 5.',A22:'Matrix multiplication verified in evidence item 5.',A24:'Transformed imaginary part L/(n^2 xi_r) must be large.',A26:'Definition of total quantum dimension.'};
const deps = {D10:['D06','D08','D07'],M07:['D05','M05'],M09:['M05','D02'],A10:['A03','A09','A07'],A11:['A10','A13','A12'],A16:['A15'],A19:['A18','A26'],A21:['A20','A24'],A22:['D02','A26'],A23:['A21','A22'],A27:['A16','A19','A23']};
for (const line of fs.readFileSync(root+'/enumeration.md','utf8').split('\n')) {
  const m = line.match(/^\| ([DMA]\d\d) \| (\d+)(?:-(\d+))?(?: [^|]*)? \| (.+) \|$/);
  if (!m) continue;
  const id=m[1], lo=+m[2], hi=+(m[3]||m[2]);
  const checks={warrant:id+'W',availability:id+'A',role:id+'R'};
  claims[id]={span:[lo-171,hi-171],original_span:[lo,hi],text:m[4],kind:m[4].includes('=')?'equation':'assertion',requires:deps[id]||[],checks,edges:{}};
  tasks[checks.warrant]={question:'Does '+id+' follow with its stated conditions?',status:gap[id]?'gap':pass[id]?'pass':'unknown',evidence:gap[id]?evidence+' item '+gap[id]+': bounded failed inference/counterexample.':pass[id]||'External physical/theorem hypotheses or convention evidence not independently established; see '+evidence+'; this is not a truth certification.'};
  tasks[checks.availability]={question:'Are the operations required by '+id+' available to this learner at its source occurrence?',status:'unknown',evidence:'Only CFT-character familiarity confirmed. Anyon data, Gauss sums, edge orientation, modular S/T and entanglement operations are not confirmed; source baseline is research-paper genre. See learner operations in '+evidence+'.'};
  tasks[checks.role]={question:'What advance does '+id+' supply to the research-paper extraction argument?',status:'pass',evidence:id.startsWith('D')?'Definition/property supplies anyonic target or obstruction used in main 190-198.':id.startsWith('M')?'Setup, measurement relation or consequence establishes the single-wavefunction extraction objective at main 185-198.':'Analytic input, approximation or algebra supports the character-to-Gauss-sum calculation main 201-234.'};
  for(const p of claims[id].requires) {
    const tid=id+'E'+p; claims[id].edges[p]=tid;
    tasks[tid]={question:'Is the inference from '+p+' to '+id+' justified at this occurrence?',status:(id==='M09'||id==='A11')?'gap':'unknown',evidence:id==='M09'?'Central-charge phase has not been removed; evidence item 2.':id==='A11'?'Printed momentum signs yield opposite real character shifts; evidence item 4.':'Required operation and conditions remain separately identified but not independently completed: '+p+' enters '+id+' at main '+lo+'; source transition inventory in enumeration.md and bounded witness in '+evidence+'.'};
  }
}
tasks.COVERAGE={question:'Has semantic inventory been reconciled against an independently frozen inventory?',status:'unknown',evidence:'Independent source-only enumeration frozen in enumeration.md; coordinator comparison has not yet been supplied. No independent reconciliation certification.'};
// Coordinator comparison is subsequent to the frozen independent inventory.
tasks.COVERAGE.evidence='Frozen independent inventory hash 4570967cd0adac5682fc3db0de26fd30551eaba38f8cb9783347f2932f795823; coordinator comparison requested splits D01,D02,M07,A10,A19 and conditions A20,A21,M13. These were added as task children. This is coordinator reconciliation, not fresh independent decision acceptance.';
function split(id,parts,joinEvidence) {
  const key=id+'W', children=[];
  for(let i=0;i<parts.length;i++) {
    const child=key+'_'+(i+1); children.push(child);
    tasks[child]={question:parts[i][0],status:parts[i][1],evidence:parts[i][2]};
  }
  const join=key+'_JOIN';
  tasks[key]={question:tasks[key].question,status:'split',children,join};
  tasks[join]={question:'Are the subdecisions jointly sufficient for '+id+' as printed?',status:'unknown',evidence:joinEvidence};
}
split('D01',[
 ['Does higher charge characterize a bosonic topological order?','unknown','External anyonic-description premise not independently established.'],
 ['Is n restricted to positive integers?','pass','Explicit contract main 172.']
],'Characterization is conditional on well-defined nonzero sum; positive indexing alone does not establish it.');
split('D02',[
 ['Is tau_n the weighted twist sum?','pass','Definition main 174.'],
 ['Is zeta_n its normalized phase?','pass','Definition main 174 whenever tau_n nonzero.'],
 ['Is tau_n nonzero for every stated positive n?','gap','Semion n=2 gives 1+i^2=0; evidence item 6.']
],'Domain restriction needed; phase cannot exist at zero.');
split('M07',[
 ['Does n=1 central-charge phase cancel Gauss-Milgram phase?','pass','-(2+1)c/24+c/8=0.'],
 ['Does normalized amplitude equal 1?','unknown','Needs magnitude abs(tau_1)=D and derived positive prefactor A_1=1/D; phase-only proportionality insufficient, evidence item 13.']
],'Phase and amplitude are different conclusions; exact identity operator separately fixes normalization.');
split('A10',[
 ['Does rho_A tensor factorization imply trace-product factorization?','pass','Tr[(rho_l tensor rho_r)(U_l tensor U_r)]=Tr(rho_l U_l)Tr(rho_r U_r), conditional on tensor action.'],
 ['Do normalized thermal density matrices supply the denominator?','pass','rho_i=exp(-beta_i H_i)/Z_i, so denominators Z_l Z_r follow.']
],'Physical factorization/action assumptions remain external; algebra alone does not license A03/A09.');
split('A19',[
 ['Does S_1a=d_a/D identify the vacuum coefficient?','unknown','Standard modular relation not independently sourced; source states result at main 224.'],
 ['Does transformed vacuum dominate the right-edge denominator?','unknown','Requires unique lowest conformal weight and controlled gaps; scale L/xi_r large alone gives no full error bound.']
],'Coefficient identity and dominance hypotheses must both hold.');
tasks.A20W={question:'Does ST^n S give the printed modular chart relation?',status:'pass',evidence:'S T^n S sends tau to tau/(1-n tau). At tau=-1/n+i x use inverse direction: S T^n S acting on tau_prime=1/n+i/(n^2 x) returns -1/n+i x. The character equation expresses inverse chart correctly up to charge conjugation; vacuum row is unaffected. Mobius chart verified; modular covariance remains external.'};
tasks.A21W={question:'Is transformed vacuum dominance justified at this numerator?',status:'unknown',evidence:'Requires nonzero (ST^n S)_11, a unique lowest conformal weight and n^2 xi_r<<L. Zero tau_n cancels coefficient; cannot certify unconditional dominance.'};
tasks.A13W={question:'Are printed momentum signs self-consistent with the printed trace and character convention?',status:'gap',evidence:'The signs may define a valid orientation, but simultaneously using exp(+iPL/n) and standard characters gives opposite shifts to main 212; evidence item 4.'};
for(const p of ['A10','A12']) tasks['A11E'+p].status='unknown';
tasks.D06W={question:'Does the cited necessary theorem apply?',status:'pass',evidence:'External theorem licensed by inspected arXiv2107.13091v2 higherc.tex 1210-1223: bosonic topological boundary implies normalized Gauss sum 1 for gcd(n,N_FS)=1. This is statement/hypothesis checking, not proof of Ng theorem.'};
tasks.D10ED06={question:'Does the necessity theorem carry into this example?',status:'pass',evidence:'Example N_FS=8, gcd(3,8)=1; D08 nontrivial phase obstructs boundary, conditional on inspected external necessary theorem.'};
tasks.D10ED07={question:'Does example exponent satisfy required arithmetic?',status:'pass',evidence:'Twist orders 1,4,8,2 have lcm8; gcd(3,8)=1.'};
tasks.D10ED08={question:'Does negative Gauss-sum phase violate necessity?',status:'pass',evidence:'-1 differs from +1; explicit tau_3=-2sqrt2.'};
tasks.D10W={question:'Does the example imply ungappable boundary?',status:'pass',evidence:'Nontrivial coprime higher charge violates inspected necessary theorem; evidence item 7.'};
tasks.M13W={question:'Does partial rotation plus topological entropy suffice physically as claimed?',status:'unknown',evidence:'Requires independent actual c_-=0, known Abelianity and complete finite-size-controlled measurements. Supplement phase at n=2D^2 aliases c_-. External theorem higherc.tex 335-362 and summary 640 onward explicitly distinguishes exact-zero from modulo E8 criterion.'};
tasks.D09W.evidence+=' External CS signature relation inspected higherc.tex 670-690.';
const covered = new Set(Object.values(claims).flatMap(c=>Array.from({length:c.span[1]-c.span[0]+1},(_,i)=>i+c.span[0])));
const lines=raw.trimEnd().split('\n');
const exclusions=lines.flatMap((line,i)=>!covered.has(i+1)&&line.trim()?[{span:[i+1,i+1],reason:'TeX layout delimiter, blank-layout heading or separator; no independent assertion.'}]:[]);
const notation={source_sha256:hash,checked_lines:lines.map((_,i)=>i+1),status:'partial',scope:'main.tex 172-234 only; local source-order inspection, not independent sequential-reader review',symbols:[
 ['zeta_n,n','172-175','defined here','positive integer; phase undefined at tau_n=0'],
 ['a,d_a,theta_a','174-176','defined here','anyon index, quantum dimension, twist'],
 ['c_-','177','unverified context','background chiral central charge; actual value vs mod8 needs distinction'],
 ['N_FS,gcd','179','defined here / unverified context','exponent defined; gcd capability not confirmed'],
 ['ket(Psi),1,A,B,T_A;theta','186-190','defined here','vacuum, bipartition, translation'],
 ['rho_A,rho_A;l,rho_A;r','202-204','defined here','effective edge density matrices'],
 ['beta_r,H_r','206','unverified context','thermal assumption; normalization implicit'],
 ['P_l,P_r,xi_l,xi_r,v,L','211-217','defined later / ambiguous','definitions after trace; momentum signs conflict'],
 ['chi_1,tau','212-217','licensed background / defined later','CFT characters known; sector fixed here'],
 ['S,T,D','224-234','unverified context / defined later','modular matrices not introduced here; D defined at 234 after use']
],unresolved:['Full choice review not performed: focused first-use scope only.','Earlier source context available but learner meaning outside characters unconfirmed.','No rendered TeX inspection or independent sequential-prefix notation reader.']};
fs.writeFileSync(root+'/notation-coverage.json',JSON.stringify(notation,null,2)+'\n');
fs.writeFileSync(root+'/ledger.json',JSON.stringify({source_sha256:hash,original_source:'snapshot/main.tex',original_line_offset:171,provenance:{requested_version:'v3 in original packet',measured_pdf_version:'arXiv2303.04822v4',pdf_pages:21,raw_archive:'unversioned latest endpoint; audited raw hashes unchanged',scope:'raw main.tex 172-234; not rendered-PDF audit',record:'provenance.md'},reader_contract:'CFT characters known; paper not yet read; other background unknown',notation_review:{source_sha256:hash,status:'partial',coverage_ref:'notation-coverage.json',evidence:'Local bounded source-order notation inspection; symbols and unavailable meanings recorded separately. No full notation acceptance.'},claims,exclusions,tasks,coverage_review:'COVERAGE'},null,2)+'\n');
const ledgerPath=root+'/ledger.json';
const metadataLedger=JSON.parse(fs.readFileSync(ledgerPath,'utf8'));
metadataLedger.provenance.eq83='Auxiliary pixel inspection: PDF v4 Eq83 and raw supp714 agree, both put c_-/(nu S) outside radical. Earlier discrepancy claim retracted; general formula error, Laughlin specialization unaffected. See provenance.md; no new acceptance gate.';
fs.writeFileSync(ledgerPath,JSON.stringify(metadataLedger,null,2)+'\n');
console.log(JSON.stringify({hash,claims:Object.keys(claims).length,tasks:Object.keys(tasks).length,exclusions}));
