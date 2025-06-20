# 🎯 ツール制作抽選システム

動的確率システムを使用した抽選アプリケーション。参加者が増えるほど当選確率が下がります。

## 📋 機能

- ✨ **動的確率調整**: 100% → 5%へ段階的に確率が下がる
- 📊 **リアルタイム統計**: 参加者数・当選者数・現在の当選確率を表示
- 🏆 **当選者リスト**: 当選者の詳細履歴（日時・参加番号・当選確率）
- 📄 **GitHub API**: JSONファイルでデータ永続化
- 🎨 **アニメーション**: 当選時の紙吹雪エフェクト
- 📱 **レスポンシブ**: モバイル対応
- 🔒 **重複防止**: localStorage使用で1人1回限り
- 🆓 **完全無料**: GitHub Pages + GitHub API

## 🎲 確率システム

- **1人目**: 100% (必ず当選)
- **2人目**: 50% 
- **3人目**: 25%
- **4人目**: 12.5%
- **...段階的に減少**
- **最終**: 5% で固定

計算式: `Math.max(0.05, Math.pow(0.5, participants))`

## 🚀 セットアップ手順

### 1. GitHub Token作成
1. [GitHub Personal Access Tokens](https://github.com/settings/tokens) にアクセス
2. 「Generate new token (classic)」をクリック
3. Note: `Lottery System Token`
4. Expiration: お好みで設定
5. スコープ: `public_repo` にチェック
6. 「Generate token」をクリック
7. **トークンをコピー**（画面を閉じると二度と見れません）

### 2. 設定ファイル更新
`index.html` の以下の部分を変更：

```javascript
// 変更前
const API_BASE = 'https://api.github.com/repos/YOUR_USERNAME/YOUR_REPO/contents/data/lottery.json';
const GITHUB_TOKEN = 'YOUR_GITHUB_TOKEN';

// 変更後
const API_BASE = 'https://api.github.com/repos/anzuuu0905/lottery-system/contents/data/lottery.json';
const GITHUB_TOKEN = 'ghp_xxxxxxxxxxxxxxxxxx'; // 作成したトークン
```

### 3. GitHub Pages有効化
1. [リポジトリ](https://github.com/anzuuu0905/lottery-system) → Settings → Pages
2. Source: 「GitHub Actions」を選択
3. 自動でワークフローが実行される

### 4. デプロイ完了確認
- URL: https://anzuuu0905.github.io/lottery-system/
- 抽選機能とデータ保存をテスト

## 🛠️ ローカル開発

1. リポジトリをクローン:
```bash
git clone https://github.com/anzuuu0905/lottery-system.git
cd lottery-system
```

2. `index.html` をブラウザで開く

## 📊 データ構造

### 保存場所
`/data/lottery.json` - GitHubリポジトリ内

### データ形式
```json
{
  "participants": 5,
  "winners": 2,
  "winnersList": [
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
}
```

## 🔧 カスタマイズ

### 確率調整
`index.html` の `MIN_WIN_RATE` と計算式を変更:

```javascript
const MIN_WIN_RATE = 0.05; // 最終確率 (5%)

// 確率計算式 (現在: 半分ずつ減少)
const decayFactor = Math.pow(0.5, currentStats.participants);
```

### デザイン変更
`index.html` 内のCSSセクションを編集

## 📝 使用方法

1. **参加者**: サイトにアクセス → 「抽選する」ボタンクリック
2. **結果確認**: 当選/はずれの結果とタイムスタンプが表示
3. **当選者リスト**: 統計エリアの「当選者リスト表示」ボタンで履歴確認
4. **スクリーンショット**: 当選者は結果画面をスクショして送信

## 🔒 セキュリティ

- GitHubトークンは最小権限 (`public_repo`) で作成
- クライアントサイドでの簡易的な重複防止
- データはGitHubの公開リポジトリに保存

## 📞 サポート

- リポジトリ: https://github.com/anzuuu0905/lottery-system
- Issues: バグ報告や機能要望はIssuesにて

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