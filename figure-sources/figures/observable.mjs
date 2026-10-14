const A = '#087f8c', B = '#737d86', cut = '#b63676', ink = '#263442';
const label = (tex, x, y, fontSize = 26, anchor = 'center') => ({tex, x, y, fontSize, anchor, role:'relation'});
const line = (x1,y1,x2,y2,color=ink,width=2,dash='') => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${color}" stroke-width="${width}" ${dash ? `stroke-dasharray="${dash}"` : ''}/>`;
const arrow = (x1,y1,x2,y2,color=ink) => {
  const a=Math.atan2(y2-y1,x2-x1), s=10;
  return line(x1,y1,x2,y2,color,3)+`<path d="M ${x2-s*Math.cos(a-.45)} ${y2-s*Math.sin(a-.45)} L ${x2} ${y2} L ${x2-s*Math.cos(a+.45)} ${y2-s*Math.sin(a+.45)}" fill="none" stroke="${color}" stroke-width="3"/>`;
};
const svg = (height, body) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 560 ${height}">${body}</svg>`;
const mark = (kind,x,y,color) => {
  if(kind===0) return `<circle cx="${x}" cy="${y}" r="7" fill="${color}"/>`;
  if(kind===1) return `<path d="M ${x} ${y-9} L ${x+8} ${y+7} L ${x-8} ${y+7} Z" fill="${color}"/>`;
  if(kind===2) return `<rect x="${x-7}" y="${y-7}" width="14" height="14" fill="${color}"/>`;
  return `<path d="M ${x} ${y-10} L ${x+9} ${y} L ${x} ${y+10} L ${x-9} ${y} Z" fill="${color}"/>`;
};
function surface(top, shifted) {
  let g=`<rect x="110" y="${top}" width="240" height="192" fill="${A}" fill-opacity=".12"/><rect x="350" y="${top}" width="125" height="192" fill="${B}" fill-opacity=".14"/>`;
  g+=line(110,top,110,top+192,A,5)+line(350,top,350,top+192,cut,5);
  // Equal double chevrons identify periodic edges with the same x orientation.
  for(const y of [top,top+192]) {
    g+=line(110,y,475,y,ink,2,'7 5');
    for(const x of [195,260,405]) g+=`<path d="M ${x-8} ${y-5} L ${x} ${y} L ${x-8} ${y+5} M ${x+1} ${y-5} L ${x+9} ${y} L ${x+1} ${y+5}" fill="none" stroke="${ink}" stroke-width="2"/>`;
  }
  for(let i=0;i<4;i++) {
    const dest=(i+(shifted?1:0))%4;
    const ya=top+168-dest*48, yb=top+168-i*48;
    g+=line(112,ya,348,ya,A,1.5);
    for(const x of [150,230,310]) g+=mark(i,x,ya,A);
    g+=line(354,yb,472,yb,B,1.5)+mark(i,412,yb,B);
  }
  return g;
}
const rotation = {
  id:'partial-rotation', width:560, height:760,
  svg:svg(760,surface(100,false)+surface(420,true)+arrow(285,313,285,333)+line(110,639,110,656,A,5)+line(110,685,110,702,cut,5)),
  labels:[label(String.raw`\text{Unwrapped cylinder}`,280,28),label(String.raw`\text{Before}`,280,70),label(String.raw`y=L`,90,100,25,'right'),label(String.raw`y=0`,90,292,25,'right'),label(String.raw`\mathrm A`,235,199),label(String.raw`\mathrm B`,455,199),label(String.raw`T_{\mathrm A;2\pi/4}:\quad y\mapsto y+L/4\pmod L`,280,354,24),label(String.raw`\text{After: B fixed}`,280,403),label(String.raw`y=L`,90,420,25,'right'),label(String.raw`y=0`,90,612,25,'right'),label(String.raw`\mathrm A`,235,519),label(String.raw`\mathrm B`,455,519),label(String.raw`\text{Physical left boundary}`,280,647,25),label(String.raw`\text{Entanglement cut}`,280,693,25),label(String.raw`y=0\sim y=L`,280,736,25)],
  placement:{file:'content/observable.md',afterExact:'円筒の軸方向を $x$、周方向を $y$ とし、周長を $L$ とする。円筒を軸に垂直な円で切り、左側を A、右側を B と呼ぶ。A の自由度だけを $y$ 方向に距離 $L/n$ ずらす操作を $T_{\\mathrm A;2\\pi/n}$ と書く。角度 $2\\pi/n$ は円筒の周を $n$ 等分した一つ分の移動に対応する。'},
  caption:'円筒の表面を開いて示した部分回転。例として n=4 とし、同じ形の印を追うと、A の全体が周方向に L/4 移動して一周を越えた部分が戻る。B の印は動かない。上下の破線は同一の周座標を表し、物理的な境界ではない。左の実線が試料の端、A と B の間の実線がエンタングルメント切断である。',
  alt:'展開した円筒の操作前後。青緑の A 全域の四種類の印が一段ずつ周期的に移動し、灰色の B の印は同じ位置に残る。上下の辺は同一視され、左端と中央の切断はそれぞれ青緑と赤紫の実線で区別される。',
  brief:{inference:'Track every A coordinate under +L/4 modulo L while B stays fixed; distinguish physical endpoint from cut and periodic identification.',source:'content/observable.md opening; main.tex Main result and Fig. 1 definition of partial rotation.',encodings:'Whole A extent teal; B gray; cut magenta. Shapes track coordinate strips, not particle species. Dashed paired edges are periodic identifications.',checks:'Four shapes permute by +1 cyclically; applying four shifts restores every shape; B position invariance; all labels in TeX inventory.'}
};
let schmidtGeometry='';
for(let i=0;i<3;i++) {
  const y=130+64*i;
  schmidtGeometry+=line(186,y,374,y,ink,2)+`<circle cx="165" cy="${y}" r="21" fill="${A}" fill-opacity=".15" stroke="${A}"/><circle cx="395" cy="${y}" r="21" fill="${B}" fill-opacity=".15" stroke="${B}"/>`;
}
schmidtGeometry+=arrow(280,286,280,352);
for(let r=0;r<3;r++) for(let c=0;c<3;c++) {
  const x=177+c*88,y=435+r*68;
  schmidtGeometry+=`<rect x="${x-40}" y="${y-28}" width="80" height="56" fill="${r===c?A:B}" fill-opacity="${r===c?'.16':'.045'}"/>`;
}
const schmidt = {
 id:'schmidt-trace',width:560,height:700,svg:svg(700,schmidtGeometry),
 labels:[label(String.raw`\text{Illustrative Schmidt pairs}`,280,30),label(String.raw`\mathrm A`,165,77),label(String.raw`\mathrm B`,395,77),...[0,1,2].flatMap((i)=>[label(String.raw`|${i+1}\rangle`,165,130+64*i,24),label(String.raw`|${i+1}\rangle`,395,130+64*i,24),label([String.raw`\lambda_1^2=\frac12`,String.raw`\lambda_2^2=\frac13`,String.raw`\lambda_3^2=\frac16`][i],280,115+64*i,25)]),label(String.raw`\operatorname{Tr}_{\mathrm B}`,362,317,26),label(String.raw`{}_{\mathrm B}\langle\beta|\alpha\rangle_{\mathrm B}=\delta_{\alpha\beta}`,280,382,26),...[0,1,2].flatMap(r=>[0,1,2].map(c=>label(r===c?[String.raw`\frac12`,String.raw`\frac13`,String.raw`\frac16`][r]:'0',177+c*88,435+r*68,28))),label(String.raw`\rho_{\mathrm A}\ \text{in the Schmidt basis}`,280,618,26),label(String.raw`\frac12+\frac13+\frac16=1`,280,668,26)],
 placement:{file:'content/observable.md',afterExact:'となる。したがって部分回転は、各シュミット状態での並進の期待値を確率 $\\lambda_\\alpha^2$ で加えた量である。'},
 caption:'シュミット分解の三組を使った例。線は同じ添字の A と B のシュミット状態の組を表す。B の内積を取ると異なる添字の項がゼロになり、A には対角成分の確率だけが残る。示した確率は説明用の値であり、和は 1 である。',
 alt:'A と B のシュミット状態 1、2、3 が同じ添字どうしで結ばれている。B をトレースすると、B の正規直交性により、A の密度行列の非対角成分がゼロになり、対角成分に 1/2、1/3、1/6 が残る。',
 brief:{inference:'Index pairing and orthogonality eliminate cross terms without a physical cut operation.',source:'content/observable.md Schmidt decomposition and reduced-density-matrix expressions; main.tex lines 333–337 Schmidt-weighted rotation.',encodings:'A basis circles teal; B gray; horizontal lines denote matching indices only. Matrix rows/columns are ordered Schmidt indices.',checks:'1/2+1/3+1/6=1; orthogonal B index contraction yields diagonal matrix; no physical cutting arrows.'}
};
function plane(cy) {
 return `<circle cx="280" cy="${cy}" r="130" fill="none" stroke="${B}" stroke-width="2" stroke-dasharray="6 4"/>`+arrow(120,cy,443,cy)+arrow(280,cy+155,280,cy-155);
}
const complex = {
 id:'schmidt-complex-sum',width:560,height:1010,
 svg:svg(1010,plane(248)+arrow(280,248,345,248,A)+arrow(280,248,215,248,cut)+`<circle cx="280" cy="248" r="6" fill="${ink}"/>`+plane(723)+arrow(280,723,377.5,723,A)+arrow(280,723,280,690.5,cut)+arrow(280,723,377.5,690.5,'#a66905')+line(377.5,723,377.5,690.5,B,2,'5 4')+line(280,690.5,377.5,690.5,B,2,'5 4')),
 labels:[label(String.raw`\text{Illustrative inputs}`,280,26),label(String.raw`\lambda_1^2=\lambda_2^2=\frac12,\quad (e^{ip_1L/n},e^{ip_2L/n})=(1,-1)`,280,73,23),label(String.raw`\operatorname{Im}`,280,82,25),label(String.raw`\operatorname{Re}`,484,248,25),label(String.raw`1`,416,278,24),label(String.raw`-1`,140,278,24),label(String.raw`\frac12`,330,215,26),label(String.raw`-\frac12`,222,215,26),label(String.raw`\mathcal T_1=0`,280,431,28),label(String.raw`\text{No phase at zero}`,280,475,26),label(String.raw`\lambda_1^2=\frac34,\quad\lambda_2^2=\frac14,\quad(e^{ip_1L/n},e^{ip_2L/n})=(1,i)`,280,548,23),label(String.raw`\operatorname{Im}`,280,556,25),label(String.raw`\operatorname{Re}`,484,723,25),label(String.raw`1`,416,753,24),label(String.raw`i`,304,591,24),label(String.raw`\frac34`,340,765,27),label(String.raw`\frac{i}{4}`,238,686,27),label(String.raw`\mathcal T_1=\frac34+\frac{i}{4}`,280,903,28),label(String.raw`|\mathcal T_1|=\frac{\sqrt{10}}4<1`,280,952,27)],
 placement:{file:'content/observable.md',afterExact:'となる。各状態の運動量が複素平面上の向きを決め、シュミット確率がその向きの重みを決める。異なる状態の向きが打ち消し合えば、絶対値は小さくなる。'},
 caption:'説明用の二状態の例。破線の円は単位円、矢印は確率を掛けた複素数であり、二つの色はこの図の二つの寄与を区別する。上では同じ大きさの反対向きの寄与が完全に打ち消し合う。下では実軸方向の 3/4 と正の虚軸方向の i/4 の和が斜めの矢印になる。いずれも数値測定の結果ではない。',
 alt:'上の複素平面では原点から実軸の正負の向きに長さ 1/2 の矢印が伸び、和は原点のゼロ。下では正の実軸方向の 3/4 と正の虚軸方向の i/4 の矢印、およびそれらの和 3/4+i/4 が単位円の内側に示される。',
 brief:{inference:'Phase direction and Schmidt probability length yield weighted vector sum; exact cancellation has no phase.',source:'content/observable.md momentum-weighted sum and selfcheck; main.tex 333–337, with project positive translation convention.',encodings:'Standard Euclidean Re/Im axes and equal scales. Teal/magenta here distinguish contributions only; ochre is their resultant. Dashed circle has radius 1.',checks:'All coordinates scale by 130; zero vectors ±65; nonzero vectors (97.5,0),(0,32.5); resultant norm sqrt(10)/4. Positive i points upward.'}
};
let edgeGeometry=`<rect x="105" y="94" width="270" height="150" fill="${A}" fill-opacity=".12"/><rect x="375" y="94" width="100" height="150" fill="${B}" fill-opacity=".14"/>`+line(105,94,105,244,A,6)+line(375,94,375,244,cut,6)+line(105,94,475,94,B,2,'7 5')+line(105,244,475,244,B,2,'7 5');
for(const [top,color,widths] of [[410,A,[185,17,7]],[719,cut,[120,83,52]]]) {
 for(let i=0;i<3;i++) edgeGeometry+=line(148,top-i*40,390,top-i*40,B,1.5)+`<rect x="150" y="${top-i*40-10}" width="${widths[i]}" height="20" fill="${color}" fill-opacity="${i===0?'1':'.7'}"/>`;
 edgeGeometry+=arrow(120,top+14,120,top-110);
}
const edges = {
 id:'two-edge-density',width:560,height:965,svg:svg(965,edgeGeometry),
 labels:[label(String.raw`\text{Two edges of A}`,280,28),label(String.raw`\mathrm A`,240,174),label(String.raw`\mathrm B`,427,174),label(String.raw`H_l`,105,70),label(String.raw`H_r`,375,70),label(String.raw`\text{Physical left edge}`,280,286),label(String.raw`\text{Energy}`,105,334,24,'right'),label(String.raw`\text{Ground-state dominance}`,280,460,25),label(String.raw`\frac{e^{-\beta_l H_l}}{\operatorname{Tr}e^{-\beta_l H_l}}\quad(\beta_l\ \text{large})`,280,515,27),label(String.raw`\otimes`,280,568,34),label(String.raw`\text{Entanglement cut edge}`,280,610),label(String.raw`\text{Energy}`,105,643,24,'right'),label(String.raw`\text{Finite entanglement weights}`,280,771,25),label(String.raw`\frac{e^{-\beta_r H_r}}{\operatorname{Tr}e^{-\beta_r H_r}}`,280,825,27),label(String.raw`\text{Schematic CFT weights}`,280,900,25),label(String.raw`\text{Bar length: relative weight}`,280,941,24)],
 placement:{file:'content/observable.md',afterExact:'を用いる。$H_l$ は左の物理的な境界、$H_r$ は右のエンタングルメント境界の CFT ハミルトニアンである。左は基底状態を選ぶため $\\beta_l$ が大きい。右の $\\beta_r$ は、基底状態のエンタングルメントの重みを熱密度行列の形で表すための有効な逆温度である。'},
 caption:'A の左端とエンタングルメント切断を、それぞれの CFT の密度行列に対応させる。棒の長さは重みの模式的な比較であり、準位間隔や確率の測定値を表さない。左では大きな逆温度が基底状態の重みを優勢にし、右ではエンタングルメントの複数の重みを有限の有効逆温度で表す。二つの因子の積は、端が十分離れたときの低エネルギー近似である。',
 alt:'青緑の A の左に物理的な端、右に赤紫のエンタングルメント切断があり、その外側は灰色の B。下に二つの CFT 因子を縦に並べ、左の物理的な端では最低準位の棒が優勢、右の切断では複数の準位に重みが残る様子を模式的に示す。',
 brief:{inference:'Each distinct A boundary supplies its own density factor; large beta_l ground dominance differs from finite beta_r entanglement weights.',source:'main.tex Analytic derivation lines 200–216; normalized factors are content/observable.md expression.',encodings:'Physical A edge teal; cut edge magenta, matching geometry above. Vertical energy ordering and horizontal weight bars are qualitative; no numeric spectrum scale.',checks:'Physical left endpoint distinct from internal cut; two separate factors linked by tensor product. No real heating, microscopic exact spectrum or numerical weights asserted.'}
};
// Keep long illustrative inputs readable at the native mobile-oriented width.
for(const i of [5,8,11]) schmidt.labels[i].y-=12;
complex.labels[1].tex=String.raw`\begin{array}{c}\lambda_1^2=\lambda_2^2=\frac12\\(e^{ip_1L/n},e^{ip_2L/n})=(1,-1)\end{array}`;
complex.labels[1].y=73;
complex.labels[2].x=332;
complex.labels[2].y=106;
complex.labels[10].tex=String.raw`\begin{array}{c}\lambda_1^2=\frac34,\quad\lambda_2^2=\frac14\\(e^{ip_1L/n},e^{ip_2L/n})=(1,i)\end{array}`;
complex.labels[10].y=548;
complex.labels[11].x=332;
complex.labels[11].y=581;
for(const fig of [rotation,schmidt,complex,edges]) {
  for(const l of fig.labels) {
    if(l.tex.includes('operatorname{Im}')||l.tex.includes('operatorname{Re}')||l.tex.includes('text{Energy}')) l.role='axis';
    else if(l.tex.startsWith('y=')) l.role='periodic coordinate';
    else if(l.tex.includes('boundary')||l.tex.includes('cut')||l.tex.includes('edge}')||l.tex==='H_l'||l.tex==='H_r') l.role='boundary';
    else if(l.tex==='\\mathrm A'||l.tex==='\\mathrm B') l.role='region';
    else if(l.tex.startsWith('|')) l.role='basis state';
    else if(l.tex.includes('operatorname{Tr}_{')||l.tex.startsWith('T_{')) l.role='operation';
    else if(l.tex.includes('lambda')) l.role='illustrative probability';
    else if(l.tex.includes('mathcal T')) l.role='observable value';
    else if(l.tex.includes('beta_l')||l.tex.includes('beta_r')) l.role='density factor';
    else if(l.tex.includes('frac')||l.tex==='0') l.role='weight or contribution';
    else if(l.tex.includes('text{')) l.role='panel or encoding description';
    else l.role='value or relation';
  }
}
export default [rotation,schmidt,complex,edges];
