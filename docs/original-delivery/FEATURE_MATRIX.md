
# 功能矩陣

| 模組 | 需求 | 實作狀態 | 備註 |
|------|------|----------|------|
| 首頁 | 建立研究、最近專案、狀態 | ✅ | IndexedDB 持久化 |
| 多模態輸入 | 文字、圖片、檔案、網址、音訊 | ✅ | 支援 20MB 限制、格式錯誤提示、圖片預覽、錄音 capture |
| 研究執行 | 進度、階段、參與模型、錯誤提示 | ✅ | MANUAL MODE 複製提示詞/貼上回應 |
| 雙 AI 辯論 | GPT 與 Meta AI 並排 | ✅ | 固定角色、禁止偽裝 |
| 輪值判官 | 5 種模式、1-7 回合 | ✅ | rotate_per_round / rotate_per_topic / three_judges / none / single_ai_three_roles |
| 單 AI 三角色 | 研究者、反方、判官 | ✅ | 明確標示同一模型模擬 |
| 最終報告 | 結論、證據、反對意見、限制 | ✅ | Evidence ID、來源、時間、信心、驗證狀態 |
| 圖表比較 | 多方案、權重、爭議 | ✅ | 證據權重條 |
| 匯出中心 | 8 格式 | ✅ | PDF/DOCX/MD/JSON/CSV/HTML/TXT/ZIP 皆真產生 |
| 研究歷史 | 搜尋、續接、刪除、復原 | ✅ | 刪除確認、復原區、損壞檔案處理 |
| 檔案管理 | 附件、備份、匯入還原 | ✅ | 一鍵備份全部 |
| 系統設定 | 模型、隱私、資料、連線 | ✅ | ProviderStatus 真實顯示 |
| PWA | Manifest、SW、離線 | ✅ | vite-plugin-pwa, standalone, safe-area |
| 儲存 | IndexedDB、自動儲存、Migration | ✅ | Dexie v2 |
| 安全 | 不硬編碼密鑰 | ✅ | 環境變數、無密鑰入庫 |
| 部署獨立 | 不覆蓋 V40 | ✅ | 獨立專案 ai-lab-v2.5 |

