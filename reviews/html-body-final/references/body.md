# 文献と式の対応

## 原論文

<a id="ref-primary"></a>

Ryohei Kobayashi, Taige Wang, Tomohiro Soejima, Roger S. K. Mong, Shinsei Ryu, *Extracting higher central charge from a single wave function*, [arXiv:2303.04822v4](https://arxiv.org/abs/2303.04822v4)、[Phys. Rev. Lett. 132, 016602 (2024)](https://doi.org/10.1103/PhysRevLett.132.016602)。本ノートは保存したv4のPDF（本文と補足資料、全21ページ）を式番号・表示の基準とし、取得した `main.tex` と `supp_mat.tex` も照合している。

導入の境界問題は Introduction、$\zeta_n$ の定義は本文式 (1)、部分回転の主結果は式 (2)、幾何は Fig. 1 を参照する。本ノート中の式には原論文の式番号を付けていない。

## 指標計算

<a id="ref-derivation-source"></a>

原論文の Analytic derivation、式 (3) の指標の比、式 (4) の左境界の真空近似、式 (5)、(6) の右境界のモジュラー変換が本ノートの導出に対応する。原論文式 (3) の後に記された運動量の符号と、同式の指標の実部には、標準的な $e^{2\pi i\tau(L_0-c/24)}$ の定義で符号の不一致がある。本ノートは指標の引数を採用し、$e^{+iP\delta y}$ に対する $P_l=+H_l/v$、$P_r=-H_r/v$ を明示して計算を揃えた。

## エンタングルメント境界

<a id="ref-edge"></a>

本文 Analytic derivation の cut-and-glue の仮定と、補足資料 *Relationship between Entanglement spectrum and edge theory in non-chiral topological phases*。補足の Ishibashi 境界状態は、A/B の対応する基底を同じ係数で対にした形式的な状態であり、B のトレースは A の単位演算子、すなわち無限温度の状態に対応する。そのままでは規格化できない。本文の有限の有効逆温度では、対の係数を $e^{-\beta_r E_j/2}$ で正則化し、トレースから $e^{-\beta_r H_r}/Z$ を得る。微視的な結合をこのエッジの熱密度行列で近似することは物理的な仮定である。エンタングルメントハミルトニアンの摂動を無視する近似は本文でも明示されている。

## セクターの一般化

<a id="ref-sectors"></a>

本文式 (7)、(8)、および補足 *Partial rotation of a cylinder in a twisted sector*。本文の $\zeta_{n,a}$ は和そのものの名称であり、規格化された位相 $\zeta_n$ とは定義が異なる。

## MPS と実空間切断

<a id="ref-mps"></a>

本文 Numerical results の Laughlin 状態の説明、および補足 *Evaluating the action of partial rotation of an MPS wave function*。特に *Partially rotate an MPS*、*Matching iMPS momentum labels to CFT momentums*、*Orbital cut v.s. real-space cut* を参照する。本ノートのシュミット分解では係数を $\lambda_\alpha$、確率を $\lambda_\alpha^2$ とする。補足にある一部のシュミット分解の $\lambda_\alpha^2$ 表記は、規格化した分解の係数としては採用していない。

## 数値結果

<a id="ref-numerics"></a>

原論文 Fig. 2（Kitaev model）、Fig. 3（ボソン Laughlin 状態）、Table I（位相の予測）。補足 *Extracting higher central charge of the Kitaev honeycomb model* と *Extracting higher central charge of the $\nu=1/2$ bosonic Laughlin state*、特に *Numerical performance of partial rotation* を参照する。数値の再現は本ノートの対象に含めていない。

## Momentum Polarization

<a id="ref-momentum"></a>

本文式 (9)、補足 *Interpolating between higher central charge and momentum polarization*、および *Extracting higher central charge from scratch* の量子 Hall 系の Hall 粘性を含む式 (81) を参照する。微小角の近似と固定 $n$ の近似は、異なる長さの条件を用いる。

## 境界の判定条件

<a id="ref-criteria"></a>

本文 *Definition and properties of higher central charge* と補足 *Complete determination of edge gappability for bosonic Abelian phases* が、整数の条件と有限の測定手順の直接の出典である。論文は高次中心電荷の必要条件について Ng らの結果、Abelian の十分条件について Kaidi らの結果を用いる。本ノートはこれらの分類定理を再証明せず、ボソンのエニオン理論に適用する条件を述べた上で使う。

補足の $n=2\mathcal D^2$ での中心電荷抽出について、本ノートは指数関数の位相の周期を明示し、実際の $c_-=0$ の確認を独立の入力としている。エニオンの和が与える $c_-\pmod8$ と、物理的な相の実際の $c_-$ は区別する。
