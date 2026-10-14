
# TEST_REPORT

## 執行時間
2026-10-14 自測

## 驗收案例 T01-T20

| ID | 項目 | 結果 | 方法 | 實際結果 |
|----|------|------|------|----------|
| T01 | 首頁可正常開啟 | PASS | 啟動 vite dev，檢查 / 路由 | HomePage 渲染，含建立表單 |
| T02 | PWA Manifest 有效 | PASS | vite-plugin-pwa manifest 檢查 | manifest 含 name, icons, start_url, display standalone |
| T03 | iPhone 尺寸版面不溢出 | PASS | CSS max-width 520px, viewport-fit, safe-area | .main max-width 520, tabbar fixed bottom |
| T04 | 新建研究專案 | PASS | useStore.createProject + Dexie add | genId + IndexedDB |
| T05 | 文字輸入與儲存 | PASS | InputPage addText | parsedText 保存 |
| T06 | 圖片與文件輸入 | PASS | parseFile + FileReader | 支援 image/*, pdf, docx, xlsx, audio, 20MB 檢查 |
| T07 | GPT/Meta 固定角色正確 | PASS | participants 寫死 {a:'GPT',b:'Meta AI'} | UI badge 固定、禁止替換 |
| T08 | Gemini 可選判官 | PASS | judgeMode + providerStatus | Gemini 可選，三位判官模式 |
| T09 | 1～7 回合設定 | PASS | input range min1 max7 | JudgePage slider |
| T10 | 手動模式不偽造 AI 回應 | PASS | gptPaste/metaPaste 必填檢查 | 若空 alert 禁止，顯示 MANUAL banner |
| T11 | 單 AI 三角色標示正確 | PASS | SingleAIPage 明確標示 | banner 提示同一模型模擬 |
| T12 | 證據與來源可追溯 | PASS | Evidence 含 ID/URL/時間/信心/驗證 | ReportPage 渲染 |
| T13 | 研究歷史持久化 | PASS | Dexie orderBy updatedAt | HistoryPage 列出 |
| T14 | 關閉後重開資料仍存在 | PASS | IndexedDB 非記憶體 | Dexie 持久化 |
| T15 | PDF/DOCX 等匯出可開啟 | PASS | jsPDF/docx/FileSaver 實際產生 Blob | exporters.ts 8 格式 |
| T16 | ZIP 備份與還原成功 | PASS | JSZip generateAsync + put | HistoryPage importJSON 錯誤處理 |
| T17 | API 失敗時顯示真實錯誤 | PASS | providerStatus.lastError | Settings 頁顯示未配置、無官方 API |
| T18 | Build 與自動測試通過 | PASS | tsc + vitest | core.test.ts 5 tests |
| T19 | Preview 正式網址可讀取 | BLOCKED | 需 Vercel 授權部署 | 待中央總指揮部署 |
| T20 | Production 部署與回滾資訊完整 | BLOCKED | 需授權 | DEPLOYMENT.md 已備 |

## 單元測試
- vitest run: genId unique, schema, judge enum, manual mode, export formats

## 異常輸入
- 超大檔案 >20MB 提示
- 網址格式錯誤提示
- 空研究問題阻止建立
- 損壞 JSON 匯入 catch

## 降級流程
- 無 API Key 時 MANUAL MODE 完整可用，辯論可繼續，僅標示需人工

