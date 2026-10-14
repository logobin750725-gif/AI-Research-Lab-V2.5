
# AI 研究室 V2.5 - iPhone PWA

## 定位
- 繁體中文、深色主題、iPhone 優先、PWA、離線可開啟歷史
- 私人使用、無需 App Store / 越獄
- 雙 AI 固定角色：GPT (AI-A) / Meta AI (AI-B)，禁止偽裝
- 第三方判官：Gemini 可選

## 12 頁面
1. 研究室首頁 2. 多模態輸入 3. 研究執行頁 4. 雙 AI 辯論頁 5. 輪值判官設定 6. 單 AI 三角色 7. 最終報告 8. 圖表比較 9. 匯出中心 10. 研究歷史 11. 檔案管理 12. 系統設定

## 技術
TypeScript, React 18, Vite, vite-plugin-pwa, Dexie IndexedDB, Zustand, jsPDF, docx, jszip, file-saver, recharts

## 安裝
```bash
npm install
npm run dev
npm run build
npm run preview
npm test
```

## 核心硬規則
- 已驗證連線模式：需合法 API、授權、通過測試才標記 CONNECTED，記錄 provider/model/時間/錯誤
- 手動協作模式：顯示 MANUAL MODE，允許複製提示詞、貼上真實回應、保留來源標記，禁止假裝自動呼叫 Meta AI
- Meta AI 消費者聊天服務無官方自動化 API，預設 MANUAL MODE
- 單 AI 三角色必須標示為同一模型模擬

## 儲存
IndexedDB：projects, providerStatus，自動儲存、Schema Migration v2、刪除確認、匯入復原、損壞檔案錯誤處理

## 匯出
PDF, DOCX, Markdown, JSON, CSV, HTML, TXT, ZIP（可還原結構）皆實際產生檔案

## 部署
Vercel 或 Cloudflare Pages，獨立專案，禁止覆蓋 必勝羅盤 V40
環境變數：VITE_OPENAI_API_KEY（可選）, VITE_GEMINI_API_KEY（可選），不得硬編碼到前端

## PWA
Manifest 有效、Service Worker autoUpdate、離線快取、iPhone safe-area、standalone

