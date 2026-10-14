
# 安全與回滾

## 安全
- 不硬編碼 API Key、Token、私人附件
- 環境變數透過 import.meta.env 讀取，僅在需要時
- IndexedDB 本地，無上傳
- 檔案大小限制 20MB
- 匯入 JSON 驗證 Project ID
- 前端無密鑰，後端 Functions 獨立

## 回滾
- Vercel：保留前 3 版 deployment，可即時回滾
- Cloudflare Pages：保留歷史部署，可 Rollback
- Git：main 分支 tag v2.5.0，Commit SHA 記錄於 CENTRAL_HANDOFF
- 若 Build 失敗或測試 FAIL，中央總指揮決定退件，工程師自行修正

## 私人使用
- 無追蹤、無第三方上傳
- 離線可開啟已快取介面與歷史

