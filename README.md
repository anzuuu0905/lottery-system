# 🎯 ツール制作抽選システム - Vercel版

動的確率システムを使用した抽選アプリケーション。参加者が増えるほど当選確率が下がります。

## 📋 機能

- ✨ **動的確率調整**: 100% → 5%へ段階的に確率が下がる
- 📊 **リアルタイム統計**: 参加者数・当選者数・現在の当選確率を表示
- 🏆 **当選者リスト**: 当選者の詳細履歴（日時・参加番号・当選確率）
- 🗄️ **Vercel KV**: 高速なKey-Valueデータベース
- 🎨 **アニメーション**: 当選時の紙吹雪エフェクト
- 📱 **レスポンシブ**: モバイル対応
- 🔒 **重複防止**: localStorage使用で1人1回限り
- 🚀 **超高速**: Vercel Edge Runtime

## 🎲 確率システム

- **1人目**: 100% (必ず当選)
- **2人目**: 50% 
- **3人目**: 25%
- **4人目**: 12.5%
- **...段階的に減少**
- **最終**: 5% で固定

計算式: `Math.max(0.05, Math.pow(0.5, participants))`

## 🚀 Vercelデプロイ手順（超簡単！）

### 1. Vercelでデプロイ
1. [Vercel](https://vercel.com) にアクセス
2. 「Import Project」をクリック
3. GitHub: `https://github.com/anzuuu0905/lottery-system`
4. 「Deploy」をクリック
5. **完了！** 🎉

### 2. Vercel KV設定（1分で完了）
1. プロジェクトダッシュボード → Storage タブ
2. 「Create Database」→「KV」
3. データベース名: `lottery-kv`
4. 「Create」をクリック
5. 環境変数が**自動設定**される

### 3. 即座に利用開始
- デプロイURL: `https://lottery-system-xxx.vercel.app`
- 設定は**一切不要**
- データベースも**自動で使える**

## 🛠️ ローカル開発

```bash
# クローン
git clone https://github.com/anzuuu0905/lottery-system.git
cd lottery-system

# 依存関係インストール
npm install

# 開発サーバー起動
npm run dev
```

ブラウザで `http://localhost:3000` を開く

## 📊 データ構造

### Vercel KV (Key-Value Store)
- `lottery:participants`: 総参加者数
- `lottery:winners`: 総当選者数  
- `lottery:winners_list`: 当選者データの配列

### 当選者データ形式
```json
[
  {
    "timestamp": "2025-06-20T12:30:15.000Z",
    "participantNumber": 1,
    "winRate": 1.0
  },
  {
    "timestamp": "2025-06-20T14:45:22.000Z", 
    "participantNumber": 4,
    "winRate": 0.125
  }
]
```

## 🔧 カスタマイズ

### 確率調整
`app/page.tsx` の `MIN_WIN_RATE` を変更:

```typescript
const MIN_WIN_RATE = 0.05 // 最終確率 (5%)

// 確率計算式 (現在: 半分ずつ減少)
const decayFactor = Math.pow(0.5, stats.participants)
```

### デザイン変更
`app/page.module.css` でスタイル編集

## 📝 使用方法

1. **参加者**: サイトにアクセス → 「抽選する」ボタンクリック
2. **結果確認**: 当選/はずれの結果とタイムスタンプが表示
3. **当選者リスト**: モーダルで詳細履歴を確認
4. **スクリーンショット**: 当選者は結果画面をスクショして送信

## 💰 料金

- **Vercel**: 無料プラン（月100GB転送まで）
- **Vercel KV**: 無料プラン（30,000リクエスト/月）
- **抽選システム程度の利用**: **完全無料**

## 🚀 技術スタック

- **フロントエンド**: Next.js 14 + React 18 + TypeScript
- **スタイリング**: CSS Modules
- **データベース**: Vercel KV (Redis互換)
- **デプロイ**: Vercel (Edge Runtime)
- **API**: Next.js API Routes

## 🔒 セキュリティ

- サーバーサイドでデータ処理
- Vercel KV は内部ネットワーク経由
- クライアントサイドでの簡易重複防止
- HTTPS強制

## 📞 サポート

- リポジトリ: https://github.com/anzuuu0905/lottery-system
- Issues: バグ報告や機能要望
- Vercel Docs: https://vercel.com/docs

## 📄 ライセンス

MIT License - 自由に使用・改変可能

## 📊 データ構造

### JSONファイル (`/data/lottery.json`)
```json
{
  "participants": 0,
  "winners": 0,
  "winnersList": [
    {
      "timestamp": "2025-06-20T12:00:00.000Z",
      "participantNumber": 1,
      "winRate": 1.0
    }
  ]
}
```

## 🎲 確率システム

- **1人目**: 100% (1.0)
- **2人目**: 50% (0.5)
- **3人目**: 25% (0.25)
- **4人目**: 12.5% (0.125)
- **最終**: 5% (0.05) で固定

計算式：`Math.max(0.05, Math.pow(0.5, participants))`

## 📝 カスタマイズ

### 確率調整
`app/page.tsx`の`MIN_WIN_RATE`と確率計算式を変更：

```typescript
const MIN_WIN_RATE = 0.05 // 最終確率を変更
const decayFactor = Math.pow(0.5, stats.participants) // 減衰率を調整
```

### デザイン変更
`app/page.module.css`でスタイルをカスタマイズ可能

## 🔧 トラブルシューティング

### KVデータベース接続エラー
- 環境変数が正しく設定されているか確認
- Vercel KVが有効化されているか確認

### ローカル開発でデータが保存されない
- `.env.local`ファイルの環境変数を確認
- Vercel KVの本番データベースを使用する場合は本番環境の変数を使用

## 📞 サポート

問題が発生した場合は、Vercelのログとブラウザの開発者ツールを確認してください。