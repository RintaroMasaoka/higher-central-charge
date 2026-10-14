# 異なるセクターと数値評価

前章では真空の円筒状態を用いた。状態のトポロジカルな種類を変えると、部分回転にはその種類の共形重みと、異なるモジュラー行列要素が現れる。この違いは、数値計算で状態を選ぶときにも重要になる。

## 真空以外の円筒状態

種類 $a$ の状態では二つの指標を $\chi_a$ に置き換える。左の物理的な境界の最低共形重みを $h_a$ とすると、左の比は $e^{2\pi i(h_a-c_-/24)/n}$ である。右の分母の真空係数は $S_{a1}=d_a/\mathcal D>0$、右の分子の真空係数は

$$
(ST^nS)_{a1}
=\frac{e^{-2\pi i n c_-/24}}{\mathcal D}
\sum_b S_{ab}d_b\theta_b^n
$$

となる。$b$ は変換途中で足し合わせるエニオンの種類である。

論文はこの最後の和を **twisted higher central charge**

$$
\zeta_{n,a}:=\sum_b S_{ab}d_b\theta_b^n
$$

と呼び、次の主要項を得る。

$$
\mathcal T_a(2\pi/n)
\propto e^{2\pi i h_a/n}
e^{-2\pi i(n+2/n)c_-/24}\zeta_{n,a}.
$$

本章の $\propto$ は主要項の正の実数倍を表す。$\zeta_{n,a}$ は和の絶対値も含む複素数であり、ゼロにもなり得る。真空なら $\zeta_{n,1}=\mathcal D^{-1}\sum_b d_b^2\theta_b^n$ なので、非ゼロのとき、その位相が第1章の $\zeta_n$ と一致する。[原論文：式 (7)、(8)；補足：Partial rotation of a cylinder in a twisted sector](/references/#ref-sectors)

## 反対向きの成分をもつ相

詳細な指標計算は、一方向に伝播するエッジについて行った。反対向きの成分もあるエッジでは、位相に現れる $c_-$ は二つの成分の中心電荷の差であり、熱的な実数因子にはその和が関係する。そのため、この場合の正の実数因子は両成分の熱的な寄与から評価する。

補足資料は、反対向きの成分を含む二つのエッジを結合した Ishibashi 境界状態から出発する。これは対応する A/B の CFT 基底を同じ係数で対にして足した形式的な状態であり、そのまま B をトレースすると A の単位演算子、すなわち無限温度の状態に対応する。CFT の状態数は無限なので、この形のままでは規格化できない。

有限の重みを与える仕組みは、A のエッジハミルトニアンのエネルギー固有状態を $|j\rangle_{\mathrm A}$、対応する B の状態を $|j\rangle_{\mathrm B}$、エネルギーを $E_j$ として表せる。有効な正の逆温度 $\beta_r$ で正則化した対の状態を

$$
|\Psi_{\beta_r}\rangle=\frac1{\sqrt Z}\sum_j e^{-\beta_r E_j/2}|j\rangle_{\mathrm A}|j\rangle_{\mathrm B},
\qquad Z=\sum_j e^{-\beta_r E_j}
$$

とすれば、B の正規直交性から

$$
\operatorname{Tr}_{\mathrm B}|\Psi_{\beta_r}\rangle\langle\Psi_{\beta_r}|
=\frac1Z\sum_j e^{-\beta_r E_j}|j\rangle_{\mathrm A}\langle j|_{\mathrm A}
=\frac{e^{-\beta_r H_r}}Z
$$

を得る。$j$ はエッジの状態を数えるラベル、$Z$ は規格化のための分配関数である。この $\beta_r$ は形式的な境界状態を正則化し、エンタングルメントの重みを表す有効量である。実際のギャップのある内部を作る結合がこのエッジの記述を与えること、さらに摂動を無視して $H_r$ を CFT のハミルトニアンとみなすことは、cut-and-glue の物理的な仮定である。補足の構成は、非カイラルな相でもこの熱密度行列による近似を検討する根拠を与え、論文はその下で部分回転の位相を評価する。[補足：Relationship between Entanglement spectrum and edge theory in non-chiral topological phases](/references/#ref-edge)

補足の $\nu=2/3$ フェルミオン FQH 状態には、このエッジの描像を調べる数値例もある。フェルミオンの部分回転は、周方向の spin structure がモジュラー変換で変わることを取り入れ、偶数 $n$ と奇数 $n$ を分けた式で評価される。境界の判定条件は、ここで扱うボソンの相について次章で述べる。

## MPS のボンドから読む

前々章でシュミット分解から得た式

$$
\mathcal T_a(2\pi/n)=\sum_\alpha\lambda_\alpha^2e^{ip_\alpha L/n}
$$

は、確率 $\lambda_\alpha^2$ と運動量が分かれば直接計算できる。matrix product state（MPS）では、切断を横切る補助ボンド（bond）にシュミット値が格納される。周方向の並進対称性を実装した MPS では、そのボンドの状態に運動量のラベルも付けられる。

無次元運動量 $K_\alpha=p_\alpha L/(2\pi)$ を用いるなら、A の並進で足す位相は $e^{2\pi iK_\alpha/n}$ である。補足の MPS では、切断の左側に積算した保存運動量のラベルを $\bar K_\alpha$ と書く。補足は右半分の部分回転を評価し、その操作を補助ボンド上の逆変換 $e^{-i\varphi\bar K_\alpha}$ の挿入として表す。このボンドラベルを使う評価では、以下の原点の校正も行う。[補足：Partially rotate an MPS；Matching iMPS momentum labels to CFT momentums](/references/#ref-mps)

infinite MPS（iMPS）のボンドのラベルには、運動量の原点と電荷の原点に由来する自由度がある。補足では運動量ラベル $\bar K_\alpha$ と電荷ラベル $\bar C_\alpha$ の間に

$$
\bar K_\alpha\longmapsto\bar K_\alpha+x_1\bar C_\alpha+x_0,
\qquad x_0,x_1\in\mathbb Z
$$

という曖昧さがあることを説明する。$x_0$ を変えるだけでも全体の部分回転の位相が変わるため、この校正は位相を抽出するための一部である。

論文の Laughlin 状態では、エンタングルメントスペクトルをエッジ CFT のスペクトルと対応させて校正する。真空の最低状態に電荷と運動量のラベル $0$ を割り当て、反対符号の電荷の状態が同じ運動量ラベルをもつように選ぶ。セミオンのセクターでは二つの最低状態に電荷 $\pm1/2$ と運動量ラベル $0$ を割り当てる。さらに物理的な境界からの位相との対応を含めて、CFT の部分回転と比較する。[補足：Matching iMPS momentum labels to CFT momentums](/references/#ref-mps)

## 軌道の切断と実空間の切断

量子 Hall 系の円筒では、Landau 準位の軌道を一列に並べて MPS を作る。軌道は $x$ 方向のある位置を中心にもつが、有限の幅で広がっている。このため、あるボンドで軌道列を二つに分けることと、実空間を $x=x_c$ で A と B に分けることは異なる。

本ノートの CFT 式で必要なのは実空間の切断である。論文は real-space entanglement spectrum（RSES）の方法を使い、各軌道が A と B にもつ重みに応じて MPS のテンソル（tensor）を分ける。その後 A 側の自由度をボンドの左、B 側を右へ並べ直し、実空間のシュミット分解を得る。このボンドから部分回転を計算する。

切断位置はセクターの選択にも関わる。$\nu=1/2$ ボソン Laughlin 状態の薄い円筒での占有パターンは $\cdots010101\cdots$ である。論文の規約では、$0$ に対応する軌道の中心を通る実空間切断が真空、$1$ の中心を通る切断がセミオンのセクターに対応する。[補足：Orbital cut v.s. real-space cut](/references/#ref-mps)

## 論文が示した数値例

原論文は、次の二つの系で部分回転を数値評価し、CFT による位相の予測と比較した。

| 系                                | 評価方法と対象                                        | 位相の比較                             |
| -------------------------------- | ---------------------------------------------- | --------------------------------- |
| Kitaev honeycomb model の Ising 相 | Majorana 表現とエンタングルメントスペクトル。真空にはフェルミオン偶奇の射影も入れる | 原論文 Fig. 2 の $n=3,4$ で CFT の予測へ収束 |
| $\nu=1/2$ ボソン Laughlin 状態        | iDMRG で得た iMPS、運動量ラベルの校正、実空間切断                 | 原論文 Fig. 3 の真空とセミオンの位相が予測へ収束      |

例えば真空セミオン相では $c_-=1$、$\zeta_3=e^{-i\pi/4}$ なので

$$
\operatorname{phase}\mathcal T_1(2\pi/3)
=e^{-2\pi i(3+2/3)/24}e^{-i\pi/4}
=e^{-5\pi i/9}=e^{13\pi i/9}.
$$

Ising 相では $d_1=d_\psi=1$、$d_\sigma=\sqrt2$、$\theta_\psi=-1$、$\theta_\sigma=e^{i\pi/8}$、$c_-=1/2$ である。$n=3$ の和は $2e^{3i\pi/8}$ となり、中心電荷の因子を掛けると真空部分回転の位相 $e^{2\pi i/9}$ を得る。これらが原論文 Table I の予測値である。

Laughlin 状態の本文は、周長 $40\ell_B$、ボンド次元 $3200$、軌道当たりのボソン数上限 $5$ での収束を報告する。$\ell_B$ は磁気長である。補足はボンド次元や上限を変えた比較も示す。これらの計算は、表に挙げた系で CFT 近似の位相予測を支持している。[原論文：Numerical results；補足：Numerical performance of partial rotation](/references/#ref-numerics)

## Momentum Polarization との接続

固定した $n$ で周長を大きくすると、変換先の虚部 $L/(n^2\xi_r)$ が大きくなり、エニオンの和を抽出できた。一方、周長を固定して $n$ を大きくすると、この条件は失われる。微小角の極限は **momentum polarization** に対応し、別の漸近式になる。

補足は、$n\xi_r\gg L$、$L\gg\xi_r$ の領域で、右の指標に $S$ 変換を使う。変換先は $-1/(i\xi_r/L-1/n)$ であり、その虚部が十分大きければ真空を残せる。その結果の位相は

$$
\mathcal T_a(2\pi/n)\propto
\exp\left[\frac{2\pi i}{n}
\left(h_a-\frac{c_-}{24}-\frac{c_-L^2}{24\xi_r^2}\right)\right]
$$

に近づく。ここでは周長と有効エッジ長が位相に残る。固定角での式と微小角での式は、真空を取り出すモジュラー変換と成立する長さの条件が異なる。[補足：Interpolating between higher central charge and momentum polarization](/references/#ref-momentum)

量子 Hall 系での実際の momentum polarization の解析では、$L^2$ の項は Hall 粘性 $\eta_H$ を使って $-\eta_H L^2/(2\pi\hbar)$ と表される。論文はその項をフィットして差し引き、残る $h_a-c_-/24$ から $c_-=1$ とセミオンの $h_s=1/4$ を得た。

> \[折りたたみ見出し] 確認：$L/\xi_r=100$ で $n=2$ と $n=1000$ は同じ近似を使えるか
