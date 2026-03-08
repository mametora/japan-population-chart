# Japan Population Chart

都道府県別の人口推移をグラフで表示する Web アプリケーションです。

都道府県を選択すると、総人口・年少人口・生産年齢人口・老年人口の推移を折れ線グラフで確認できます。

**デモ:** https://japan-population-chart-tau.vercel.app/

## 技術スタック

| カテゴリ | 技術 |
| --- | --- |
| フレームワーク | [Next.js](https://nextjs.org/) (App Router) |
| 言語 | TypeScript |
| スタイリング | [Tailwind CSS](https://tailwindcss.com/) |
| UI コンポーネント | [Radix UI](https://www.radix-ui.com/) |
| グラフ描画 | [Highcharts](https://www.highcharts.com/) |
| テスト | [Jest](https://jestjs.io/) / [Testing Library](https://testing-library.com/) |
| リンター / フォーマッター | ESLint / Prettier |
| パッケージマネージャー | pnpm |

## セットアップ

### 前提条件

- Node.js
- pnpm

### 手順

1. 依存パッケージをインストールします。

```bash
pnpm install
```

2. 環境変数を設定します。`.env.local` を作成し、以下の変数を定義してください。

```
PREFECTURE_POPULATION_API_BASE_URL=<APIのベースURL>
PREFECTURE_POPULATION_API_KEY=<APIキー>
```

3. 開発サーバーを起動します。

```bash
pnpm dev
```

http://localhost:3000 でアプリケーションにアクセスできます。

### その他のコマンド

```bash
pnpm build    # プロダクションビルド
pnpm lint     # リント実行
pnpm format   # コードフォーマット
pnpm test     # テスト実行
```

## ディレクトリ構成

```
app/
├── _components/    # ページ固有のコンポーネント
├── api/            # Route Handlers (BFF)
├── page.tsx        # トップページ
└── layout.tsx      # ルートレイアウト
components/
└── ui/             # 汎用 UI コンポーネント
lib/
├── env/            # 環境変数の管理
├── external/       # 外部 API クライアント
└── http/           # HTTP ユーティリティ
```
