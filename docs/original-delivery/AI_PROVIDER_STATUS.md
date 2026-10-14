
# AI 連線能力報告

## 驗證結果（截至交付時）

### GPT (OpenAI)
- 官方 API：存在 gpt-4o / gpt-4o-mini，需自備 OPENAI_API_KEY
- 消費者 ChatGPT Plus 訂閱 ≠ PWA 自動化 API 權限
- 未配置合法 Key 時，標記 MANUAL MODE，顯示「未配置合法 API Key，需手動模式」
- 已驗證連線模式條件：取得合法 API Key、通過 fetch 測試、記錄 model 識別、時間、錯誤

### Meta AI
- 消費者聊天服務 https://www.meta.ai  無官方公開自動化 API
- 宣稱有 API 而未驗證 → 直接退件
- 因此預設 MANUAL MODE，顯示「Meta AI 消費者服務無官方自動化 API，需手動模式」
- 手動流程：複製提示詞 → 使用者到 Meta AI 貼上 → 貼回真實回應 → 保留來源標記

### Gemini
- 官方 API：Gemini 1.5 Pro 存在，需 GEMINI_API_KEY
- 未配置時 MANUAL MODE
- 可擔任第三方判官，不強制每次參與

## 模式區分實作
- `connectionMode` 欄位：CONNECTED | MANUAL
- ProviderStatus 表：provider, modelId, connected, mode, lastChecked, lastError
- UI：MANUAL banner (橙紅漸層)、CONNECTED banner (綠紫漸層)，Settings 頁完整列出
- 研究流程若缺少真實 AI 回應，暫停該階段，不自行補造

## 結論
本次交付預設全 MANUAL MODE，符合最高優先級真實性硬規則，禁止假資料充當雙 AI 辯論
