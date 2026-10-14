# 波動関数の部分回転

円筒の軸方向を $x$、周方向を $y$ とし、周長を $L$ とする。円筒を軸に垂直な円で切り、左側を A、右側を B と呼ぶ。A の自由度だけを $y$ 方向に距離 $L/n$ ずらす操作を $T_{\mathrm A;2\pi/n}$ と書く。角度 $2\pi/n$ は円筒の周を $n$ 等分した一つ分の移動に対応する。

![A を周方向に L/n だけ移動し B は固定する円筒。A の左端は物理的な境界、A と B の間はエンタングルメント切断。](/diagrams/partial-rotation.svg)

図の A/B の分割は、同じ試料の状態を二つの部分の自由度で表すために行う。A の左端にある試料の物理的な境界と、A の右端で B とのエンタングルメントを記述する境界が、この分割によって区別される。この二つが次章の二つの指標に対応する。

円筒上の基底状態には、円筒の穴を通るトポロジカルな種類を区別した状態 $|\Psi_a\rangle$ がある。ここでは真空の種類 $a=1$ を選ぶ。その状態の部分回転の期待値を

$$
\mathcal T_1(2\pi/n)=\langle\Psi_1|T_{\mathrm A;2\pi/n}|\Psi_1\rangle
$$

と定義する。ユニタリな操作の期待値なので絶対値は $1$ 以下だが、一般には複素数である。格子の円筒では、$L/n$ が許された格子並進になる周長と $n$ を選ぶ必要がある。[原論文：Main result、Fig. 1](/references/#ref-primary)

## 部分トレースとの関係

密度行列を $\rho=|\Psi_1\rangle\langle\Psi_1|$ とし、B の自由度をトレースしたものを $\rho_{\mathrm A}=\operatorname{Tr}_{\mathrm B}\rho$ とする。$T_{\mathrm A;2\pi/n}$ は A にしか作用しないので

$$
\mathcal T_1(2\pi/n)
=\operatorname{Tr}_{\mathrm A}\bigl(\rho_{\mathrm A}T_{\mathrm A;2\pi/n}\bigr)
$$

が成立する。この等式は、A と B の基底を使った全トレースで、B に作用する単位行列を先にトレースすれば得られる。

規格化した状態のシュミット分解（Schmidt decomposition）を

$$
|\Psi_1\rangle=\sum_\alpha\lambda_\alpha
|\alpha\rangle_{\mathrm A}|\alpha\rangle_{\mathrm B},
\qquad \lambda_\alpha\ge0,
\qquad \sum_\alpha\lambda_\alpha^2=1
$$

と書く。両側の状態はそれぞれ正規直交するため、B をトレースすると

$$
\rho_{\mathrm A}=\sum_\alpha\lambda_\alpha^2
|\alpha\rangle_{\mathrm A}\langle\alpha|_{\mathrm A}
$$

となる。したがって部分回転は、各シュミット状態での並進の期待値を確率 $\lambda_\alpha^2$ で加えた量である。

## 周方向の運動量を使う

周方向の並進対称性があり、シュミット状態を運動量固有状態に選べるとする。$\hbar=1$ とし、A の並進生成子の固有値を $p_\alpha$ と書く。ここでは並進演算子を $e^{iP_{\mathrm A}\delta y}$ と定義するので、距離 $\delta y=L/n$ の部分回転は

$$
\mathcal T_1(2\pi/n)
=\sum_\alpha\lambda_\alpha^2e^{ip_\alpha L/n}
$$

となる。各状態の運動量が複素平面上の向きを決め、シュミット確率がその向きの重みを決める。異なる状態の向きが打ち消し合えば、絶対値は小さくなる。

角度 $\varphi$ で表すと移動距離は $L\varphi/(2\pi)$ なので、同じ式は $\sum_\alpha\lambda_\alpha^2 e^{ip_\alpha L\varphi/(2\pi)}$ となる。無次元の運動量 $K_\alpha=p_\alpha L/(2\pi)$ を使えば $\sum_\alpha\lambda_\alpha^2e^{iK_\alpha\varphi}$ である。物理的な運動量、角度、無次元の運動量をこのように対応させることで、回転の単位を固定できる。

> \[折りたたみ見出し] 確認：二つのシュミット確率が $1/2$ で、並進固有値が $1,-1$ ならどうなるか

## エンタングルメント境界を CFT で表す

この厳密なトレースを評価するために、論文は長波長のエッジ CFT を使う。切断面を挟む左右のエッジ自由度を結合して、ギャップのある内部を作る cut-and-glue の描像を用い、片側をトレースしたエッジの密度行列を、有効な温度での熱密度行列として近似する。

A の二つの端が十分離れているとき、低エネルギーの記述として

$$
\rho_{\mathrm A}\simeq
\frac{e^{-\beta_lH_l}}{\operatorname{Tr}e^{-\beta_lH_l}}
\otimes
\frac{e^{-\beta_rH_r}}{\operatorname{Tr}e^{-\beta_rH_r}}
$$

を用いる。$H_l$ は左の物理的な境界、$H_r$ は右のエンタングルメント境界の CFT ハミルトニアンである。左は基底状態を選ぶため $\beta_l$ が大きい。右の $\beta_r$ は、基底状態のエンタングルメントの重みを熱密度行列の形で表すための有効な逆温度である。

エンタングルメントハミルトニアンには一般に CFT からの摂動が含まれる。以下の計算は、その摂動を無視し、上の熱密度行列を摂動のない CFT で近似するという物理的な仮定の下で行う。論文はこの近似による予測を数値結果と比較している。[原論文：Analytic derivation；補足：Relationship between Entanglement spectrum and edge theory in non-chiral topological phases](/references/#ref-edge)

エッジの速度を $v$ とし、$\xi_l=v\beta_l$、$\xi_r=v\beta_r$ とおく。これらはこの CFT の有効温度を長さに換算した量である。左を低温、右を高温として評価し、さらに回転後のモジュラー変換先でも低温にするため、次章では

$$
n^2\xi_r\ll L\ll\xi_l
$$

を使う。ここでの $\xi_r=v\beta_r$ は、エンタングルメント境界の指標の虚部を決める長さである。
