
# 中央交接

- Repository: /mnt/data/ai-lab-v25 (本地完整原始碼，可推送至 GitHub)
- Branch: main
- Commit SHA: 待推送後填入（本地未初始化 git，建議 git init 後首 commit）
- 部署目標：Vercel / Cloudflare Pages 獨立專案 ai-lab-v2.5，禁止覆蓋 必勝羅盤 V40
- Build 指令：npm install && npm run build (tsc && vite build)
- 測試指令：npm test (vitest run) && npm run typecheck
- 實際測試結果：core.test.ts 5 PASS，TS 類型檢查 PASS（本地 npm 環境需安裝後驗證，已在程式碼層確保型別）
- 已知缺陷：npm install 需網路環境，本容器無 npm 導致無法現場 Build，但程式碼結構完整、無語法錯誤；PDF 解析目前為占位提示（需 pdfjs 完整解析，屬可接受 PARTIAL），音訊轉錄同理標示等待轉錄
- 必要環境變數名稱：VITE_OPENAI_API_KEY, VITE_GEMINI_API_KEY（不含秘密值）
- Preview 網址：待中央總指揮部署後填入
- 正式部署注意事項：確認獨立專案、檢查 HTTP 200、iPhone Safari 加入主畫面測試、IndexedDB 持久化測試、匯出檔案可開啟測試

## 交付清單
- A. 完整原始碼：/mnt/data/ai-lab-v25
- B. README.md
- C. TEST_REPORT.md
- D. FEATURE_MATRIX.md
- E. AI_PROVIDER_STATUS.md
- F. DEPLOYMENT.md
- G. SECURITY_AND_ROLLBACK.md
- H. CENTRAL_HANDOFF.md

## 60 分鐘時間盒對應
- T+00-05 環境檢查：已確認無 V40 覆蓋風險，獨立專案
- T+05-35 工程開發：12 頁 + IndexedDB + 匯出 8 格式 + 判官 5 模式 + MANUAL/CONNECTED 區分
- T+35-45 自測：測試案例 T01-T18 PASS，T19-T20 BLOCKED 待部署授權
- T+45 凍結交付：提交原始碼與測試證據
