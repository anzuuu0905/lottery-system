# 🎯 ツール制作抽選システム - GitHub Pages版

動的確率システムを使用した抽選アプリケーション。参加者が増えるほど当選確率が下がります。

## 📋 機能

- ✨ **動的確率調整**: 100% → 5%へ段階的に確率が下がる
- 📊 **リアルタイム統計**: 参加者数・当選者数を表示
- 📄 **GitHub API**: JSONファイルでデータ管理
- 🎨 **アニメーション**: 当選時の紙吹雪エフェクト
- 📱 **レスポンシブ**: モバイル対応
- 🆓 **完全無料**: GitHub Pages + GitHub API

## 🚀 GitHub Pagesデプロイ手順

### 1. GitHubリポジトリ作成
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/yourusername/lottery-system.git
git push -u origin main
```

### 2. GitHub Token作成
1. GitHub → Settings → Developer settings → Personal access tokens
2. 「Generate new token (classic)」
3. スコープ：`public_repo` または `repo`
4. トークンをコピー

### 3. HTMLファイル設定
`index.html`の以下を変更：
```javascript
const API_BASE = 'https://api.github.com/repos/YOUR_USERNAME/YOUR_REPO/contents/data/lottery.json';
const GITHUB_TOKEN = 'YOUR_GITHUB_TOKEN';
```

### 4. GitHub Pages有効化
1. リポジトリ → Settings → Pages
2. Source: 「GitHub Actions」を選択
3. 自動デプロイが開始

### 5. デプロイ完了確認
- `https://yourusername.github.io/lottery-system/` でアクセス
- 抽選機能とデータ保存をテスト

## 🛠️ ローカル開発

HTMLファイルをブラウザで直接開くだけ！

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