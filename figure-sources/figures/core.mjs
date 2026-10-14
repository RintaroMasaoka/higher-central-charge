// Geometry has no lettering; the shared renderer typesets the label inventory.
const ink = '#334155', faint = '#a8b4bf', raw = '#176eaa', twist = '#a13770', phase = '#21836e';
const line = (x1,y1,x2,y2,color=ink,width=2,dash='') => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${color}" stroke-width="${width}" ${dash ? `stroke-dasharray="${dash}"` : ''}/>`;
const circle = (x,y,r,color=faint,fill='none',width=2) => `<circle cx="${x}" cy="${y}" r="${r}" stroke="${color}" fill="${fill}" stroke-width="${width}"/>`;
const arrow = (x1,y1,x2,y2,color=ink,width=3,dash='') => {
  const a=Math.atan2(y2-y1,x2-x1), size=8;
  return line(x1,y1,x2,y2,color,width,dash)+`<path d="M${x2-size*Math.cos(a-.45)},${y2-size*Math.sin(a-.45)} L${x2},${y2} L${x2-size*Math.cos(a+.45)},${y2-size*Math.sin(a+.45)}" fill="none" stroke="${color}" stroke-width="${width}"/>`;
};
const label = (tex,x,y,fontSize=26,anchor='center') => ({tex,x,y,fontSize,anchor,role:tex.startsWith('\\text{')?'annotation':'expression'});
const svg = (height,body) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 560 ${height}">${body}</svg>`;
const axes = (x,y,extent) => arrow(x-extent,y,x+extent,y,faint,1.5)+arrow(x,y+extent,x,y-extent,faint,1.5);
const arc = (x,y,r,start,end,color,width=3) => {
  const points=Array.from({length:41},(_,j)=>{
    const a=start+(end-start)*j/40; return [x+r*Math.cos(a),y-r*Math.sin(a)];
  });
  const d=points.map((p,j)=>`${j?'L':'M'}${p[0]},${p[1]}`).join(' ');
  const last=points.at(-1), prev=points.at(-2);
  return `<path d="${d}" fill="none" stroke="${color}" stroke-width="${width}"/>`+arrow(prev[0],prev[1],last[0],last[1],color,width);
};

const semionLabels=[label(String.raw`\text{Raw sum}`,145,30),label(String.raw`\text{Unit phase}`,415,30)];
let semionBody='';
for (const [j,n] of [1,2,3].entries()) {
  const y=175+j*250, s=65, imag=n===1?1:n===3?-1:0;
  semionLabels.push(label(`n=${n}`,280,y-110));
  semionBody+=axes(145,y,90)+axes(415,y,90);
  semionLabels.push(label(String.raw`\mathrm{Re}`,238,y+50,24),label(String.raw`\mathrm{Im}`,123,y-80,24),label(String.raw`\mathrm{Re}`,508,y+50,24),label(String.raw`\mathrm{Im}`,393,y-80,24));
  semionBody+=arrow(145,y,210,y,raw,n===2?7:4);
  if(n===2) {
    // Nested strokes distinguish exactly coincident opposing contributions.
    semionBody+=arrow(210,y,145,y,twist,3)+circle(145,y,5,ink,ink);
    semionBody+=circle(415,y,65,faint,'none',1.5)+circle(415,y,5,ink,ink);
    semionLabels.push(label(String.raw`1+(-1)=0`,145,y+110),label(String.raw`\text{Undefined}`,415,y+110));
  } else {
    semionBody+=arrow(210,y,210,y-s*imag,twist,4)+arrow(145,y,210,y-s*imag,ink,3);
    semionBody+=circle(415,y,s,faint,'none',1.5)+arrow(415,y,415+s/Math.sqrt(2),y-s*imag/Math.sqrt(2),phase,4);
    semionLabels.push(label(n===1?String.raw`1+i`:String.raw`1-i`,145,y+110),label(n===1?String.raw`\zeta_1=e^{i\pi/4}`:String.raw`\zeta_3=e^{-i\pi/4}`,415,y+110));
  }
}
const semion={
  id:'semion-sum-phase',width:560,height:820,svg:svg(820,semionBody),labels:semionLabels,
  placement:{file:'content/overview.md',afterExact:'$c_-=1$ を代入すると $\\zeta_1=e^{i\\pi/4}$ が再現される。$n=2$ のゼロは、二つのエニオンの寄与が逆位相で打ち消し合うためである。'},
  caption:'セミオンの三つの和。左では青の真空の寄与に赤紫のセミオンの寄与を先端から足し、黒で和を示す。右では非ゼロの和を同じ向きの単位ベクトルへ規格化する。両列・全段で軸の単位をそろえた。$n=2$ では和が原点に戻り、位相の方向は定まらない。',
  alt:'各段は n=1、2、3。左の二つの寄与の和は順に 1+i、0、1−i。右の単位円には n=1 の四十五度と n=3 の負の四十五度の位相矢印があり、n=2 には矢印がない。',
  brief:{inference:'Raw addition retains magnitude; normalization retains direction only and is undefined at zero.',source:'main.tex definition of higher central charge; content/overview.md semion data.',encodings:'Blue vacuum, magenta semion head-to-tail contribution, black raw sum, green normalized phase. Every complex plane uses 65 pixels per unit.',checks:'n1/n3 raw norm sqrt2 vs phase norm1; n2 no phase arrow. Nested strokes distinguish coincident opposing contributions while retaining straight segments and exact endpoints.'}
};

let productBody='';
const productLabels=[label(String.raw`n=3`,280,25)];
const operands=[{y:210,x:-Math.PI/4,r:Math.sqrt(2),name:String.raw`\mathrm U(1)_2`,value:String.raw`1-i=\sqrt2e^{-i\pi/4}`,color:raw},{y:550,x:-3*Math.PI/4,r:2,name:String.raw`\mathrm U(1)_{-4}`,value:String.raw`2e^{-3i\pi/4}`,color:twist},{y:890,x:-Math.PI,r:2*Math.sqrt(2),name:String.raw`\mathrm U(1)_2\times\mathrm U(1)_{-4}`,value:String.raw`-2\sqrt2=2\sqrt2e^{-i\pi}`,color:phase}];
for(const item of operands) {
  const {y,x:a,r,color}=item, s=55;
  productBody+=arrow(100,y,460,y,faint,1.5)+arrow(280,y+115,280,y-115,faint,1.5)+circle(280,y,s,faint,'none',1.2)+arrow(280,y,280+s*r*Math.cos(a),y-s*r*Math.sin(a),color,4)+arc(280,y,42,0,a,color,2.5);
  productLabels.push(label(item.name,280,y-145),label(item.value,280,y+155),label(String.raw`\mathrm{Re}`,478,y+8,24),label(String.raw`\mathrm{Im}`,310,y-100,24),label(a===-Math.PI?String.raw`-\pi`:a===-Math.PI/4?String.raw`-\pi/4`:String.raw`-3\pi/4`,373,y+87,24));
}
productLabels.push(label(String.raw`\sqrt2\times2=2\sqrt2`,280,1080),label(String.raw`-\pi/4-3\pi/4=-\pi`,280,1120),label(String.raw`\zeta_3=-1`,280,1170));
const product={
  id:'stacked-phase-product',width:560,height:1200,svg:svg(1200,productBody),labels:productLabels,
  placement:{file:'content/overview.md',afterExact:'その積は $-2\\sqrt2$ なので、積の相では $\\zeta_3=-1$ である。'},
  caption:'二つの相を積み重ねると、エニオンの和は複素数の積になる。共通の軸で描いた上二段の長さ $\\sqrt2$ と $2$ は、下段で $2\\sqrt2$ になる。時計回りの角度 $-\\pi/4$ と $-3\\pi/4$ は足され、積は負の実軸を向く。薄い円は各段とも半径 $1$ を示す。',
  alt:'上段は長さ平方根二で角度マイナス四十五度の矢印、中段は長さ二で角度マイナス百三十五度の矢印、下段は長さ二平方根二で負の実軸を向く矢印。長さの積と角度の和が下に記され、規格化した位相はマイナス一。',
  brief:{inference:'Complex multiplication multiplies raw magnitudes and adds signed arguments; it is not vector addition.',source:'main.tex definition of zeta; checked U(1) input in overview; sums from supplied topological spins.',encodings:'Common scale55 pixels per complex unit, circle radius1, same clockwise angle motif. Separate planes identify factors and product without head-to-tail translation.',checks:'sqrt2*2=2sqrt2; (-pi/4)+(-3pi/4)=-pi; raw result -2sqrt2 and unit phase -1 are distinct.'}
};

const modularLabels=[label(String.raw`n=2,\quad\xi_r/L=0.1`,280,30),label(String.raw`(ST^nS)^{-1}:\ z\mapsto\frac{z}{1+nz}`,280,95),label(String.raw`\mathrm{Im}`,300,145,24),label(String.raw`\mathrm{Re}`,490,518,24),label(String.raw`0`,263,535,24),label(String.raw`-1/2`,215,535,24),label(String.raw`1/2`,345,535,24),label(String.raw`1`,253,370,24),label(String.raw`2`,253,240,24),label(String.raw`-\frac1n+\frac{i\xi_r}{L}`,180,595),label(String.raw`\frac1n+\frac{iL}{n^2\xi_r}`,370,655),label(String.raw`-0.5+0.1i`,120,410),label(String.raw`0.5+2.5i`,425,130),label(String.raw`\text{Illustrative values}`,280,720)];
let modularBody=arrow(95,500,470,500,faint,1.5)+arrow(280,500,280,140,faint,1.5);
for(const x of [215,345]) modularBody+=line(x,495,x,505,ink,2);
for(const y of [370,240]) modularBody+=line(275,y,285,y,ink,2);
modularBody+=line(215,487,215,500,faint,1.5,'4 4')+line(280,487,215,487,faint,1.5,'4 4')+line(345,175,345,500,faint,1.5,'4 4')+line(280,175,345,175,faint,1.5,'4 4');
modularBody+=circle(215,487,6,raw,raw)+circle(345,175,6,phase,phase);
modularBody+=`<path d="M215,487 Q110,275 345,175" fill="none" stroke="${ink}" stroke-width="3" stroke-dasharray="8 5"/>`+arrow(334,180,345,175,ink,3);
const modular={
  id:'modular-inverse-map',width:560,height:750,svg:svg(750,modularBody),labels:modularLabels,
  placement:{file:'content/derivation.md',afterExact:'の変換先で、係数 $(ST^nS)_{11}$ が非ゼロなら真空を主要項として残せる。'},
  caption:'右の分子の引数に $(ST^nS)^{-1}$ を作用させ、低温で評価する指標の引数を求める。$n=2$、$\\xi_r/L=0.1$ の例では $-0.5+0.1i$ が $0.5+2.5i$ に移る。横軸・縦軸はともに線形で同じ単位を使う。破線の矢印は写像の入力と出力を結ぶ。',
  alt:'実部と虚部の共通線形軸。実部マイナス〇・五、虚部〇・一の青い点から、逆モジュラー写像を示す破線矢印が実部〇・五、虚部二・五の緑の点へ向く。軸への点線投影は虚部の増大を同じ尺度で示す。',
  brief:{inference:'The numerator evaluation uses the inverse of ST^nS, changing the rational cusp into large imaginary modulus.',source:'main.tex right-numerator modular transformation (Eq6); manuscript explicit inverse fractional-linear computation.',encodings:'One linear complex plane130 pixels per unit both coordinates; dashed map connector anchored to input and image, dotted coordinate projections. No invented variable assigned to the plotted points.',checks:'(-.5+.1i)/(1+2*(-.5+.1i))=.5+2.5i exactly. Source and target have positive imaginary parts; arrow inverse order explicit. Illustrative values are not an asymptotic certification.'}
};

const phaseLabels=[label(String.raw`\mathrm U(1)_2:\quad n=3,\ c_-=1`,280,28),label(String.raw`\text{Signed angle}`,280,72)];
let phaseBody='';
const xangle=a=>470+200*a;
const steps=[
  {start:0,end:-Math.PI/36,y:140,name:String.raw`\text{Left vacuum}`,value:String.raw`-\pi/36`,c:raw},
  {start:-Math.PI/36,end:-10*Math.PI/36,y:245,name:String.raw`T^n`,value:String.raw`-\pi/4`,c:twist},
  {start:-10*Math.PI/36,end:-11*Math.PI/36,y:350,name:String.raw`\text{Right vacuum}`,value:String.raw`-\pi/36`,c:raw},
  {start:-11*Math.PI/36,end:-20*Math.PI/36,y:485,name:String.raw`\zeta_3`,value:String.raw`-\pi/4`,c:phase},
  {start:-20*Math.PI/36,end:-9*Math.PI/36,y:650,name:String.raw`\text{Correction}`,value:String.raw`+11\pi/36`,c:ink}
];
steps.forEach((step,j)=>{
  const xa=xangle(step.start),xb=xangle(step.end);
  phaseBody+=line(90,step.y,490,step.y,faint,1)+arrow(xa,step.y,xb,step.y,step.c,4)+circle(xa,step.y,3,step.c,step.c)+circle(xb,step.y,4,step.c,step.c);
  phaseLabels.push(label(step.name,40,step.y-30,24,'left'),label(step.value,475,step.y-30,26,'right'));
  if(j<steps.length-1) phaseBody+=line(xb,step.y+6,xb,steps[j+1].y-6,faint,1.5,'4 4');
});
phaseLabels.push(label(String.raw`-11\pi/36`,xangle(-11*Math.PI/36),397),label(String.raw`\arg\mathcal T_1(2\pi/3)=-5\pi/9`,280,550),label(String.raw`\arg\zeta_3=-\pi/4`,280,710));
phaseBody+=line(90,770,490,770,ink,1.5);
for(const [angle,tex] of [[0,String.raw`0`],[-Math.PI/4,String.raw`-\pi/4`],[-5*Math.PI/9,String.raw`-5\pi/9`]]) {
  phaseBody+=line(xangle(angle),764,xangle(angle),776,ink,2);
  phaseLabels.push(label(tex,xangle(angle),805));
}
const provenance={
  id:'three-phase-correction',width:560,height:840,svg:svg(840,phaseBody),labels:phaseLabels,
  placement:{file:'content/derivation.md',afterExact:'を得る。[原論文：式 (2)、Analytic derivation](/references/#ref-derivation-source)'},
  caption:'セミオンで $n=3$、$c_-=1$ とした位相の合成。各段の矢印は、その因子による符号付き角度の変化を同じ尺度で示す。上の三段は中心電荷の位相 $-11\\pi/36$ に達し、エニオンの位相 $-\\pi/4$ を加えると観測位相は $-5\\pi/9$ になる。最後に既知の補正 $+11\\pi/36$ を加えると $\\zeta_3$ の位相へ戻る。縦の点線は前段の終点と次段の始点を結ぶ。',
  alt:'共通の角度軸を使った五段の矢印。左側の真空の寄与によるマイナスπ三十六分の一、T三乗のマイナスπ四分の一、右側の真空の寄与によるマイナスπ三十六分の一が左向きに続く。さらにエニオンのマイナスπ四分の一で観測角度マイナス五π九分の一に達する。補正の右向き矢印はプラス十一π三十六分の一だけ戻り、マイナスπ四分の一になる。',
  brief:{inference:'Three central-charge angles add to -11pi/36; anyon phase gives measured -5pi/9; inverse anomaly correction recovers zeta.',source:'main.tex Eq2, left vacuum expression and right numerator Eq6; content/derivation.md three factors and phase extraction; semion n3.',encodings:'Shared signed-angle linear axis with200 pixels per radian in every row. Horizontal arrows are multiplication of phase factors, represented as angle addition; dotted vertical connectors preserve cumulative angle, not temporal evolution.',checks:'-pi/36-pi/4-pi/36=-11pi/36; -11pi/36-pi/4=-5pi/9; -5pi/9+11pi/36=-pi/4. Leading nonzero CFT term only, no correction inferred for zero.'}
};

export default [semion,product,modular,provenance];
