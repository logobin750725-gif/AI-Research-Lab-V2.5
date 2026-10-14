
# 部署說明

## 獨立專案
- 名稱：ai-lab-v2.5
- 禁止覆蓋：必勝羅盤 V40 正式環境
- 部署目標：Vercel 或 Cloudflare Pages

## Vercel
```bash
vercel --prod --cwd /path/to/ai-lab-v2.5
# Build: npm run build (tsc && vite build)
# Output: dist
```

## Cloudflare Pages
```bash
# 框架：Vite
# Build command: npm run build
# Output: dist
```

## 環境變數（名稱，不含值）
- VITE_OPENAI_API_KEY (可選)
- VITE_GEMINI_API_KEY (可選)
- VITE_APP_VERSION=2.5.0

## 健康檢查
- GET / → 200
- GET /manifest.webmanifest → 200
- PWA 安裝：iPhone Safari 分享 → 加入主畫面

## 獨立網址識別
- 建議：ai-lab-v25.vercel.app 或 ai-lab-v2-5.pages.dev
- 與 V40 不同專案

## Serverless Functions
- 若需後端 API，置於 /api，密鑰僅伺服器端使用，不得暴露前端

