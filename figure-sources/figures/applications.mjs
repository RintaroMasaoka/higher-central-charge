const teal = '#147d83';
const gray = '#697680';
const magenta = '#b33979';
const ink = '#26343b';
const label = (tex, x, y, fontSize = 26, anchor = 'center', role) => ({
  tex, x, y, fontSize, anchor,
  role: role ?? (tex.startsWith('\\text{') ? 'annotation' : tex.startsWith('\\lambda') ? 'weight' : tex.startsWith('\\mathrm') ? 'region' : /^[0-9]+$/.test(tex) ? 'value' : /^(e\^|\\prod)/.test(tex) ? 'operation' : 'expression')
});
const line = (x1,y1,x2,y2,color=ink,width=2,dash='') => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${color}" stroke-width="${width}" ${dash ? `stroke-dasharray="${dash}"` : ''}/>`;
const svg = (h,body) => `<svg xmlns="http://www.w3.org/2000/svg" width="560" height="${h}" viewBox="0 0 560 ${h}">${body}</svg>`;
const circle = (x,y,r,fill,stroke=ink) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${fill}" stroke="${stroke}" stroke-width="2"/>`;
const rect = (x,y,w,h,fill,stroke=ink) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="3" fill="${fill}" stroke="${stroke}" stroke-width="2"/>`;

const mpsLabels = [
  label(String.raw`\text{Source: right-half rotation}`,280,32),
  label(String.raw`\mathrm A`,150,85), label(String.raw`\mathrm B`,412,85),
  label(String.raw`\text{virtual bond}`,280,190),
  label(String.raw`\text{Right-half translation}`,400,244,23),
  label(String.raw`\varphi=2\pi/n`,280,280,25),
  label(String.raw`\text{Bond-state contributions}`,280,315),
  label(String.raw`\lambda_\alpha^2`,112,398), label(String.raw`\lambda_\beta^2`,112,474),
  label(String.raw`\cdots`,112,550),
  label(String.raw`e^{-i\varphi\bar K_\alpha}`,383,398),
  label(String.raw`e^{-i\varphi\bar K_\beta}`,383,474), label(String.raw`\cdots`,383,550),
  label(String.raw`\text{inverse on the virtual bond}`,280,605,25),
  label(String.raw`\sum_\alpha\lambda_\alpha^2 e^{-i\varphi\bar K_\alpha}`,280,662,28),
  label(String.raw`\text{Calibrate the source labels}`,280,730),
  label(String.raw`\bar K_\alpha\mapsto\bar K_\alpha+x_1\bar C_\alpha+x_0`,280,777,25),
  label(String.raw`\text{Physical A-generator convention}`,280,848,25),
  label(String.raw`K_\alpha=\frac{p_\alpha L}{2\pi},\quad \sum_\alpha\lambda_\alpha^2e^{2\pi iK_\alpha/n}`,280,900,25)
];
let mpsGeometry = line(45,136,515,136);
for(const x of [80,165,395,480]) {
  mpsGeometry += rect(x-24,112,48,48,x<280?'#d6efec':'#e5e9eb',x<280?teal:gray);
  mpsGeometry += line(x,112,x,97,x<280?teal:gray);
}
mpsGeometry += line(280,101,280,172,magenta,5);
// The bracket spans every represented right-half tensor; it is not a point operator.
mpsGeometry += `<path d="M355 204 V218 H516 V204" fill="none" stroke="${gray}" stroke-width="3"/>`;
for(const y of [398,474,550]) {
  mpsGeometry += line(190,y,245,y,gray,2)+line(473,y,490,y,gray,2);
  mpsGeometry += circle(190,y,7,teal,teal)+circle(490,y,7,gray,gray);
}
mpsGeometry += `<rect x="245" y="357" width="228" height="234" fill="#f7ddeb" fill-opacity="0.45" stroke="${magenta}" stroke-width="3"/>`;

// Analytic Gaussian-shaped profiles illustrate spatial support only, not sampled data.
const profile = (center,base) => {
  const points=[];
  for(let x=55;x<=515;x+=4) points.push([x,base-78*Math.exp(-(((x-center)/70)**2))]);
  return `M55 ${base} `+points.map(([x,y])=>`L${x} ${y.toFixed(3)}`).join(' ')+` L515 ${base} Z`;
};
let cutGeometry = line(55,138,515,138);
for(const [i,x] of [80,160,240,320,400,480].entries()) cutGeometry+=circle(x,138,16,i<3?'#d6efec':'#e5e9eb',i<3?teal:gray);
cutGeometry+=line(280,98,280,178,magenta,4);
cutGeometry+=`<defs><clipPath id="left-support"><rect x="55" y="300" width="225" height="490"/></clipPath><clipPath id="right-support"><rect x="280" y="300" width="235" height="490"/></clipPath></defs>`;
for(const [j,c] of [175,270,365].entries()){
  const base=440+j*135; const p=profile(c,base);
  cutGeometry+=`<path d="${p}" fill="#d6efec" stroke="${teal}" stroke-width="2" clip-path="url(#left-support)"/><path d="${p}" fill="#e5e9eb" stroke="${gray}" stroke-width="2" clip-path="url(#right-support)"/>`;
  cutGeometry+=line(55,base,515,base,gray,1);
}
cutGeometry+=line(280,320,280,764,magenta,4);
cutGeometry+=line(55,768,515,768,ink,2)+`<path d="M515 768 l-10 -5 v10 Z" fill="${ink}"/>`;
const cutLabels=[
  label(String.raw`\text{Orbital cut: divide indices}`,280,32),
  label(String.raw`\mathrm A`,145,81),label(String.raw`\mathrm B`,415,81),
  label(String.raw`\text{orbital index}`,280,215),
  label(String.raw`\text{Real-space cut: divide support}`,280,286,25),
  label(String.raw`\mathrm A`,146,328),label(String.raw`\mathrm B`,416,328),
  label(String.raw`\text{one orbital}`,500,380,23,'right'),
  label(String.raw`\text{one orbital}`,500,515,23,'right'),
  label(String.raw`\text{one orbital}`,500,610,23,'right'),
  label(String.raw`x_c`,280,795),label(String.raw`x`,522,768,26),
  label(String.raw`\text{Schematic }|\varphi(x)|^2`,280,846,25),
  label(String.raw`y\text{ runs around the cylinder}`,280,888,24)
];

const gcd=(a,b)=>b?gcd(b,a%b):a;
const integers=Array.from({length:12},(_,i)=>i+1);
const coprime=integers.filter(n=>gcd(n,12)===1);
const abelian=integers.filter(n=>gcd(n,12/gcd(n,12))===1);
if(JSON.stringify(coprime)!=='[1,5,7,11]' || JSON.stringify(abelian)!=='[1,3,4,5,7,8,9,11,12]') throw Error('Membership calculation mismatch');
let membershipGeometry = line(50,214,510,214,gray,1);
const membershipLabels=[
  label(String.raw`N_{\mathrm{FS}}=12`,280,32,28),
  label(String.raw`\gcd(n,12)=1`,280,82),
  label(String.raw`\gcd\!\left(n,\frac{12}{\gcd(n,12)}\right)=1`,280,135),
  label(String.raw`n`,100,189),label(String.raw`\text{Coprime}`,270,189),label(String.raw`\text{Abelian}`,440,189)
];
for(const n of integers){
  const y=241+(n-1)*40;
  membershipLabels.push(label(String(n),100,y,25));
  for(const [x,set] of [[270,coprime],[440,abelian]]) membershipGeometry+=circle(x,y,11,set.includes(n)?teal:'none',set.includes(n)?teal:gray);
  membershipGeometry+=line(50,y+20,510,y+20,gray,0.5);
}
membershipGeometry+=circle(155,758,10,teal,teal)+circle(355,758,10,'none',gray);
membershipLabels.push(label(String.raw`\text{included}`,175,758,24,'left'),label(String.raw`\text{excluded}`,375,758,24,'left'));
membershipLabels.push(label(String.raw`\{1,5,7,11\}\subsetneq`,280,815,26),label(String.raw`\{1,3,4,5,7,8,9,11,12\}`,280,860,25));

const X=n=>75+435*Math.log10(n)/4;
const Y=r=>615-480*Math.log10(r)/8;
let regimeGeometry=line(75,135,75,615)+line(75,615,510,615);
for(const n of [1,10,100,1000,10000]) regimeGeometry+=line(X(n),615,X(n),622);
for(const r of [1,100,10000,1000000,100000000]) regimeGeometry+=line(68,Y(r),75,Y(r));
regimeGeometry+=line(X(1),Y(1),X(10000),Y(1e8),magenta,3,'8 6');
regimeGeometry+=line(X(1),Y(1),X(10000),Y(10000),gray,3,'3 5');
regimeGeometry+=line(420,300,420,Y(10**((420-75)/435*4*2)),magenta,1.5);
regimeGeometry+=line(350,425,350,Y(10**((350-75)/435*4)),gray,1.5);
for(const n of [2,1000]) regimeGeometry+=circle(X(n),Y(100),7,teal,teal);
// Parameter-motion arrows retain fixed n or fixed circumference ratio respectively.
regimeGeometry+=`<path d="M${X(2)} ${Y(100)-24} V${Y(1e5)}" fill="none" stroke="${teal}" stroke-width="3"/><path d="M${X(2)-6} ${Y(1e5)+10} L${X(2)} ${Y(1e5)} L${X(2)+6} ${Y(1e5)+10}" fill="none" stroke="${teal}" stroke-width="3"/>`;
regimeGeometry+=`<path d="M${X(1000)+15} ${Y(100)} H501" fill="none" stroke="${teal}" stroke-width="3"/><path d="M491 ${Y(100)-6} L501 ${Y(100)} L491 ${Y(100)+6}" fill="none" stroke="${teal}" stroke-width="3"/>`;
const regimeLabels=[
  label(String.raw`\text{Two asymptotic regimes}`,280,32),
  label(String.raw`\text{Logarithmic axes}`,280,78,24),
  label(String.raw`L/\xi_r`,75,107,25), label(String.raw`n`,525,615),
  label(String.raw`\text{Fixed angle}`,255,183,25),label(String.raw`L/\xi_r\gg n^2`,255,225,25),
  label(String.raw`L/\xi_r=n^2`,420,324,25),
  label(String.raw`L/\xi_r=n`,350,408,25),
  label(String.raw`\text{Small angle}`,350,546,25),label(String.raw`1\ll L/\xi_r\ll n`,350,583,24),
  label(String.raw`(2,100)`,174,Y(100)-17,24),label(String.raw`(1000,100)`,455,Y(100)+34,24),
  label(String.raw`\text{Reference curves, not validity thresholds}`,280,713,23),
  label(String.raw`n\mapsto2n\quad\Longrightarrow\quad n^2\mapsto4n^2`,280,770,25)
];
for(const [n,t] of [[1,'1'],[10,'10'],[100,'10^2'],[1000,'10^3'],[10000,'10^4']]) regimeLabels.push(label(t,X(n),648,23,'center','tick'));
for(const [r,t] of [[1,'1'],[100,'10^2'],[10000,'10^4'],[1000000,'10^6'],[100000000,'10^8']]) regimeLabels.push(label(t,60,Y(r),23,'right','tick'));

export default [
  {id:'mps-bond-rotation',width:560,height:945,svg:svg(945,mpsGeometry),labels:mpsLabels,
    placement:{file:'content/applications.md',afterExact:'論文の Laughlin 状態では、エンタングルメントスペクトルをエッジ CFT のスペクトルと対応させて校正する。真空の最低状態に電荷と運動量のラベル $0$ を割り当て、反対符号の電荷の状態が同じ運動量ラベルをもつように選ぶ。セミオンのセクターでは二つの最低状態に電荷 $\\pm1/2$ と運動量ラベル $0$ を割り当てる。さらに物理的な境界からの位相との対応を含めて、CFT の部分回転と比較する。[補足：Matching iMPS momentum labels to CFT momentums](/references/#ref-mps)'},
  caption:'補足の右半分の部分回転は、全ての右側テンソルに作用する並進を、切断の補助ボンド上の逆変換として評価する。各ボンド状態の位相をシュミット確率で重み付けして足す。下段には、補足のラベルの校正と、本ノートで選んだ A の物理的な運動量の規約をそれぞれ示した。',
    alt:'MPS の右半分全体に付いた操作の括弧と、切断のボンドを拡大した図。複数のボンド状態がそれぞれシュミット確率と逆変換の位相を持ち、それらを足した式に対応する。原点の校正と A の物理的な運動量の式は別に表示されている。',
    brief:{inference:'Full right-half source rotation becomes inverse action on all virtual-bond states; weighted contributions yield the overlap, with calibration required.',source:'supp_mat.tex 572–643, momentum_conservation and Partially rotate an MPS; project K convention in applications.md.',encodings:'A teal, B gray; magenta cut and full-height virtual inverse block. Pair lines are Schmidt labels, not physical pipes. Right bracket spans both depicted B tensors.',checks:'No K=-barK assertion. Symbolic lanes do not assert spectrum data. Source inverse and its label-origin freedom remain paired.'}},
  {id:'orbital-realspace-cuts',width:560,height:930,svg:svg(930,cutGeometry),labels:cutLabels,
    placement:{file:'content/applications.md',afterExact:'本ノートの CFT 式で必要なのは実空間の切断である。論文は real-space entanglement spectrum（RSES）の方法を使い、各軌道が A と B にもつ重みに応じて MPS のテンソル（tensor）を分ける。その後 A 側の自由度をボンドの左、B 側を右へ並べ直し、実空間のシュミット分解を得る。このボンドから部分回転を計算する。'},
    caption:'軌道の切断は軌道の添字を左右へ分ける。実空間の切断では、幅をもつ各 Landau 軌道が $x=x_c$ の両側にもつ重みを分ける。下段は軌道の広がりの模式図であり、数値データや密度の定量的な比較ではない。$x$ は円筒の軸方向、$y$ は周方向である。',
    alt:'上段は並んだ軌道をボンドで二つの添字集合へ分ける。下段は x 方向に広がる三つの軌道を描き、同じ垂直な実空間境界が各軌道の重みを A と B に分ける。',
    brief:{inference:'Index partition and spatial support partition differ even for an orbital centered near or away from the cut.',source:'supp_mat.tex 558–564 and 645–662, Orbital cut v.s. real-space cut.',encodings:'Top circles are orbital indices, not spatial density. Bottom horizontal x coordinate and vertical schematic profile height; teal/gray fill follows spatial A/B for every profile. Magenta cut perpendicular to x.',checks:'Gaussian-shaped curves schematic; no numeric amplitude or position ticks. y circumference is stated separately, never used as profile-height axis.'}},
  {id:'boundary-integer-membership',width:560,height:900,svg:svg(900,membershipGeometry),labels:membershipLabels,
    placement:{file:'content/boundary.md',afterExact:'整数の条件の違いは、$N_{\\mathrm{FS}}=12$ で確かめられる。$n=4$ は $12$ と互いに素ではないが、$\\gcd(4,12)=4$ を取り除くと $\\gcd(4,3)=1$ なので、Abelian の条件には含まれる。したがって、単に $N_{\\mathrm{FS}}$ と互いに素な $n$ を全部調べることと、Abelian の十分条件を全部調べることは異なる。'},
    caption:'$N_{\\mathrm{FS}}=12$、$1\\le n\\le12$ における二つの整数条件の比較。塗りつぶした丸はその条件に含まれる整数、白抜きの丸は含まれない整数を表す。12 と互いに素な整数の集合は Abelian の条件の集合に真に含まれる。non-Abelian な相には前者による必要条件を用いる。Abelian な物理的な相の境界を判定するには、後者の位相条件と実際の $c_-=0$ の両方が必要である。',
    alt:'1 から 12 の整数を同じ行に置いた比較表。12 と互いに素な整数の集合は 1、5、7、11。Abelian の広い条件の集合は 1、3、4、5、7、8、9、11、12 であり、前者を全て含む。',
    brief:{inference:'Broader Abelian predicate adds n values; satisfying coprime tests does not cover the sufficient Abelian set.',source:'main.tex Definition and properties; content/boundary.md exact gcd predicates.',encodings:'Aligned rows encode equal integer n; filled circle means predicate true, open circle false in both columns. Natural integer ordering is not a ranking.',checks:'Both sets derived by Euclidean gcd in this module and asserted exactly; necessary versus sufficient and actual central charge conditions retained in caption.'}},
  {id:'asymptotic-regimes',width:560,height:810,svg:svg(810,regimeGeometry),labels:regimeLabels,
    placement:{file:'content/applications.md',afterExact:'固定した $n$ で周長を大きくすると、変換先の虚部 $L/(n^2\\xi_r)$ が大きくなり、エニオンの和を抽出できた。一方、周長を固定して $n$ を大きくすると、この条件は失われる。微小角の極限は **momentum polarization** に対応し、別の漸近式になる。'},
    caption:'対数軸上で比較した二つの漸近領域。固定角の式は $L/\\xi_r\\gg n^2$、微小角の式は $1\\ll L/\\xi_r\\ll n$ で検討する。点 $(2,100)$ と $(1000,100)$ は本文の例であり、測定値ではない。破線と点線は比較の基準となる等式であって、近似の有効性を保証する境界ではない。$n$ を二倍にすると、固定角の条件で比較する周長の尺度は四倍になる。',
    alt:'横軸 n、縦軸 L と有効エッジ長の比を対数表示する。二乗の基準線の十分上方に固定角の領域、一次の基準線の十分下方かつ比が 1 より十分大きい側に微小角の領域がある。比が 100 で n が 2 と 1000 の二点を示し、固定した n で上へ進む矢印と固定した比で右へ進む矢印を描く。',
    brief:{inference:'The parameter motions reach different asymptotic regions; fixed-angle circumference scale grows quadratically with n.',source:'supp_mat.tex 204–234 Interpolating between higher central charge and momentum polarization; 712 numerical circumference cost.',encodings:'Both axes base-10 log; magenta dashed reference y=n², gray dotted y=n. Teal illustrative points; up/right arrows change only circumference ratio/n respectively.',checks:'Coordinates analytically transformed, no simulations; inequalities strict asymptotic, reference curves not hard frontiers; point interpretations remain source-qualified.'}}
];
