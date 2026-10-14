# AI 研究室 V2.5｜部署接手結果

日期：2026-10-14（Asia/Taipei）。

## 結論

本機找到實際 AI-Lab-V2.5-FINAL.zip，完成安裝、修正、build、test、typecheck 及桌面瀏覽器驗證，已上傳指定 GitHub 的獨立預覽分支。Vercel 部署 BLOCKED，沒有 Preview URL；未修改必勝羅盤 V40。

## 來源核對

- 來源：Downloads/AI-Lab-V2.5-FINAL.zip，70,825 bytes。
- SHA256：f6889c1350139cae9fdd84452fe37ce06aa167dc8ba06b97a6c7bbd4efc6a9c8。
- ZIP 可解壓，含完整 src、public、設定與多份交付文件；未發現其他本機 V2.5 ZIP。無法證明外部不存在較新版。
- 先前對話可讀，但只回傳「14／17 個附件」提示，沒有附件本體或下載 URL。本次依實際本機 FINAL 命名附件檢查，不把舊版假稱新版。
- 本次聊天工作目錄原無上傳設定檔；已檢查 ZIP 內 package、tsconfig、Vite 與 8 份 MD（另有重複副本）。
- 原始 ZIP 缺 lockfile、vercel.json；dist 是占位、圖示為 1×1；App.tsx 未接 SingleAIPage，附帶 App_1.tsx 有補路由。

## 實際結果

|項目|狀態|結果|
|---|---|---|
|npm install|PASS|Exit 0，首次安裝 505 packages；最終重跑 up to date|
|npm run build|PASS|Exit 0；真實 dist、manifest、Service Worker|
|npm test|PASS|Exit 0；1 測試檔、5 項測試|
|npm run typecheck|PASS|Exit 0；TypeScript strict|
|桌面 Edge 390px|PASS|12 頁直接路由，scrollWidth=390；無頁面錯誤|
|建立研究、文字附件、重新載入保存|PASS|瀏覽器實際操作與 IndexedDB 重載|
|MANUAL、PWA 圖示|PASS|三個 provider MANUAL；192×192 與 512×512|
|GitHub|PASS|指定倉庫的獨立分支已可從遠端讀取|
|Vercel Preview|BLOCKED|建立專案回傳 403，網頁匯入也無法存取倉庫|
|Preview URL|BLOCKED|未產生，不提供推測網址|
|iPhone Safari 實機、PWA 安裝、完整離線|NOT TESTED|桌面縮小視窗不能代替實機|
|真實 Gemini／GPT／Meta API|NOT TESTED|未接後端、未設定金鑰、未呼叫 provider|
|完整 8 格式匯出／中文 PDF|NOT TESTED|基本測試不能證明輸出檔可用|
|PDF／DOCX／XLSX 內容解析|FAIL|原 parser 只有接收提示|
|ZIP 匯入還原|FAIL|原 HistoryPage 對 ZIP 直接 JSON.parse，未解壓|

## GitHub

- 倉庫：https://github.com/logobin750725-gif/AI-Research-Lab-V2.5
- 分支：preview/verified-v25-20261014
- 原始碼提交：29606786f3682b8d82bdcbcdac22dd07bb7bdfad
- main 基準：1baa788b02bfa9c5d3da508477f135dc4fdb7d24。
- main 保持原狀；透過 GitHub 連接器建立分支與提交。原本本機 git push 未完成，已停止該次嘗試。
- 已以 git ls-remote 及 fetch 確認遠端分支與提交；程式碼與受測版本一致。紀錄檔有 CRLF/LF 差異。
- GitHub 的 BUILD-TEST-RESULT.md 包含實際指令輸出與失敗後重跑紀錄。

## Vercel 阻斷證據

目標團隊：logobin750725-9847 / team_yq8ciJZ2YnZrFQWS2aT3cp75。
預定獨立專案：ai-research-lab-v25-preview。

建立獨立專案 POST /v11/projects 回傳：

> 403 forbidden. Not authorized: Trying to access resource under scope "logobin750725-9847".

現有專案可列出，但此連線無法在該 scope 建立專案。本機未安裝 Vercel CLI，常見 CLI 登入資料位置也不存在，因此沒有可用的已登入 CLI 備援。
改查已登入 Chrome 的 Vercel 匯入頁，以已驗證 GitHub 分支匯入，顯示：

> Could not access the repository. Please ensure you have access to it.

沒有建立部署、沒有部署 ID、沒有遠端 Build 結果、沒有 Preview URL。未改用其他團隊、未覆蓋任何既有專案。

解除阻斷需要具備該團隊操作權限的 Vercel 連線，以及 Vercel 能讀取指定 GitHub 倉庫。金鑰不應貼入聊天。

## 修正版與已知限制

修正版採附件內已提供的完整路由／導航，移除重複檔，補 lockfile、Vercel SPA 設定、真實圖示與 dist，移除 src 明確 any。
手動裁決改為未查證、信心 0；移除未實測 iPhone PASS 字樣；HTML 匯出轉義文字。
未重新開發 12 頁，亦未把已知缺漏宣稱成已修復。

原始 MD 放在 docs/original-delivery 作為稽核來源，不能將其中 PASS、可部署性或 API 說明當成本次驗證結果。
原 5 項測試偏向基本資料與常數檢查，未涵蓋備份還原、完整匯出、判官各模式及真實 AI。
目前設定顯示 Gemini 只是 MANUAL 角色／標籤，不代表已接上任何 Gemini 模型。

## 部署設定

- 獨立專案：ai-research-lab-v25-preview
- Framework：Vite
- Root：專案根目錄
- Install：npm ci
- Build：npm run build
- Output：dist
- 來源：上述已驗證分支與提交
- 目標：Preview；不得以 production 或覆蓋 V40 代替。
- 無須私人 API Key，維持 MANUAL。

## 交付物

- AI-Lab-V2.5-FINAL-original.zip：原始附件原封保留。
- AI-Lab-V2.5-VERIFIED-SOURCE.zip：明確命名的部署修正版，含完整原始碼、lockfile、實際 dist 與驗證紀錄；不含 node_modules、.git、.vercel、秘密。
- BUILD-TEST-RESULT.md：完整指令輸出。
- DEPLOYMENT-RESULT.md：本文件。
- ai-lab-v25-preview-390.png：本機受測版截圖，非線上 Preview 或 iPhone 證據。
