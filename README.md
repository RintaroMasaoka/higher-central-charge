# 高次中心電荷と部分回転

arXiv:2303.04822v4 の日本語学習ノート。原稿の正本は `content/`、章設定は `note.config.json`。

```sh
npm ci
npm run dev -- --port 5177
npm run check
npm run build
```

GitHub Pages用ビルド:

```sh
VITE_SITE_BASE_PATH=/higher-central-charge npm run build
```

`main`へのpushでGitHub Actionsがビルド・公開する。原典取得物はローカルの `literature/papers/2303.04822/` にありGit対象外。書誌と対象版は `content/references.md` に記録する。監査・読者レビュー・表示検証の範囲と未確認項目は `reviews/` に分けて保存する。

表示実装はStudyのNon-invertible-SPTを再利用し、元の部品はRecknagel–Schomerus基準実装に由来する。Study HTML Specification 1.0.0を採用（リンク先1.0.1と互換）。MDの数式、details、式参照、本文参照、電球補足をサポートする。

本ノートはCFTに基づく主導出と有限検査の条件を解説する。格子模型の数値計算やiDMRGは再実行していない。
