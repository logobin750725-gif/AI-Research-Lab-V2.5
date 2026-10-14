# AI 研究室 V2.5｜跨 AI 工程師交付命令

## 目標
交付可運行的 iPhone Safari PWA（繁體中文、深色主題、響應式、加入主畫面），採 TypeScript/React/Vite/IndexedDB 或等效架構。不得交付僅有畫面的空殼。

## 核心功能
1. 研究專案：建立、儲存、搜尋、續接、刪除與復原。
2. 固定 GPT 與 Meta AI 雙角色；Gemini 可選第三方判官；輪值判官與 1–7 回合設定。
3. 無合法 API 時提供清楚的手動複製/貼入真實回覆流程；單模型三角色須明確標示。
4. 研究階段：問題、來源、雙方論點、反駁、證據、判決、未決爭議。
5. 輸入：文字、圖片、PDF、DOCX、XLSX、TXT/Markdown、網址、音訊；未支援解析須明示。
6. 輸出：PDF、DOCX、Markdown、JSON、CSV、HTML、TXT、可恢復 ZIP。
7. IndexedDB 自動儲存、資料 Schema 版本、ZIP 備份與還原。
8. PWA Manifest、Service Worker、離線已快取頁面；不得暴露任何秘密到前端。

## 無 GitHub 權限工程師
以完整 ZIP、可重建的程式碼檔案集合或按路徑輸出的完整原始碼交卷。禁止虛構 Commit、部署網址、測試截圖。中央總指揮統一入庫。

## 一小時時間盒
T+00–05 資產/需求盤點；T+05–35 實作；T+35–45 自測修正；T+45 交付；T+45–60 中央部署與驗收。時間不足應回報 PARTIAL，不能虛報 FULL PASS。

## 必交檔案
README.md、package.json、src/、public/、TEST_REPORT.md、FEATURE_MATRIX.md、AI_PROVIDER_STATUS.md、DEPLOYMENT.md、SECURITY_AND_ROLLBACK.md、CENTRAL_HANDOFF.md。

## 交接紀錄
提供檔案清單、Build/Test 指令及原始輸出、Git Commit（若有）、已知缺陷、部署設定、環境變數名稱（不可提供秘密值）、回滾方案。

## 不可通過條件
假 AI 回應、假下載檔、未測試宣稱 PASS、Build 失敗、資料無法保存、ZIP 無法還原、將密鑰入庫、擅自覆蓋現有 Production。
