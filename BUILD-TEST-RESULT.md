# AI 研究室 V2.5｜實際建置與測試

日期：2026-10-14（Asia/Taipei）。Node v24.19.0；npm 11.6.2。

## 來源與版本

- 實際來源：Downloads/AI-Lab-V2.5-FINAL.zip，70,825 bytes。
- SHA256：f6889c1350139cae9fdd84452fe37ce06aa167dc8ba06b97a6c7bbd4efc6a9c8。
- 已確認有效 ZIP 並解壓。這是本機找到的 FINAL 命名附件，無法證明不存在其他較新外部版本。
- 先前對話只回傳附件數量，未回傳附件本體；本次檢查使用上述實際本機 ZIP。
- ZIP 根目錄即專案，交付腳本中的 cd ai-lab-v25 不符合 ZIP 結構。
- 原始檔案有 _1/_2 混檔，缺 lockfile、vercel.json，dist 為占位，icons 實為 1×1。
- GitHub 基準：1baa788b02bfa9c5d3da508477f135dc4fdb7d24，只有 README 與兩份交接文件。

## 修正

- 採附件內 App_1 / Layout_1 的路由與導航，移除重複檔；原始 ZIP 保留。
- 補 lockfile、Vercel Vite/SPA 設定、.gitignore；產生真實 dist 與 192/512 圖示。
- 使用 Project / InputAttachment / Verdict 型別，移除 src 明確 any。
- 移除未測試的 iPhone PASS 標籤；手動裁決維持未查證，不自動捏造信心。
- HTML 匯出轉義文字，避免研究內容變成可執行標記。
- 原交付 MD 保存在 docs/original-delivery，屬原始宣稱，不能作為 PASS 證據。

## 最終結果

|項目|結果|證據|
|---|---|---|
|npm install|PASS|Exit 0；首次新增 505 packages；最終 up to date|
|npm run build|PASS|Exit 0；Vite 5.4.21；生成 dist、manifest、sw|
|npm test|PASS|Exit 0；1 file / 5 tests|
|npm run typecheck|PASS|Exit 0；tsc --noEmit|
|12 頁路由、390px|PASS|Edge headless，受測頁面 scrollWidth=390|
|建立研究、文字附件、重載保存|PASS|瀏覽器實際操作 IndexedDB|
|MANUAL 狀態、manifest、圖示|PASS|三個 provider MANUAL；圖示 192×192、512×512|
|iPhone Safari 實機、安裝、完整離線|NOT TESTED|本次只有桌面 Edge 的 390px 檢查|
|完整八格式匯出及中文 PDF|NOT TESTED|5 項基本測試不涵蓋匯出可用性|
|PDF/DOCX/XLSX 輸入解析|FAIL|parser.ts 只回傳已接收提示|
|ZIP 匯入還原|FAIL|HistoryPage 直接 JSON.parse，未解壓 ZIP|
|真實 AI API|NOT TESTED|保持 MANUAL，無金鑰、無 provider 呼叫|

## 指令與原始輸出

主機 PATH 原無 npm，以官方 npm 11.6.2 套件的 npm-cli.js 執行；與 npm 指令相同 CLI。首次 build/test/typecheck 在依賴仍安裝中執行，因工具尚未就緒失敗，已完整保留並於安裝後重跑。

### npm-install-original

Exit Code: 0

```text
npm warn deprecated glob@11.1.0: Old versions of glob are not supported, and contain widely publicized security vulnerabilities, which have been fixed in the current version. Please update. Support for old versions may be purchased (at exorbitant rates) by contacting i@izs.me
npm warn deprecated recharts@2.15.4: 1.x and 2.x branches are no longer active. Bump to Recharts v3 to receive latest features and bugfixes. See https://github.com/recharts/recharts/wiki/3.0-migration-guide

added 505 packages in 3m
npm notice
npm notice New major version of npm available! 11.6.2 -> 12.2.0
npm notice Changelog: https://github.com/npm/cli/releases/tag/v12.2.0
npm notice To update run: npm install -g npm@12.2.0
npm notice
```

### original-build

Exit Code: 1

```text
> ai-lab-v2.5@2.5.0 build
> tsc && vite build

'tsc' is not recognized as an internal or external command,
operable program or batch file.
```

### original-test

Exit Code: 1

```text
> ai-lab-v2.5@2.5.0 test
> vitest run --reporter=verbose

'vitest' is not recognized as an internal or external command,
operable program or batch file.
```

### original-typecheck

Exit Code: 1

```text
> ai-lab-v2.5@2.5.0 typecheck
> tsc --noEmit

'tsc' is not recognized as an internal or external command,
operable program or batch file.
```

### final-install

Exit Code: 0

```text
up to date in 13s
```

### final-build

Exit Code: 0

```text
> ai-lab-v2.5@2.5.0 build
> tsc && vite build

vite v5.4.21 building for production...
transforming...
✓ 435 modules transformed.
rendering chunks...
[plugin:vite:reporter] [plugin vite:reporter] 
(!) C:/Users/Administrator/Documents/Codex/2026-10-14/referenced-chatgpt-conversation-this-is-an-2/work/ai-lab-v25-source/node_modules/file-saver/dist/FileSaver.min.js is dynamically imported by C:/Users/Administrator/Documents/Codex/2026-10-14/referenced-chatgpt-conversation-this-is-an-2/work/ai-lab-v25-source/src/pages/FilePage.tsx but also statically imported by C:/Users/Administrator/Documents/Codex/2026-10-14/referenced-chatgpt-conversation-this-is-an-2/work/ai-lab-v25-source/src/lib/exporters.ts, dynamic import will not move module into another chunk.

[plugin:vite:reporter] [plugin vite:reporter] 
(!) C:/Users/Administrator/Documents/Codex/2026-10-14/referenced-chatgpt-conversation-this-is-an-2/work/ai-lab-v25-source/node_modules/jszip/dist/jszip.min.js is dynamically imported by C:/Users/Administrator/Documents/Codex/2026-10-14/referenced-chatgpt-conversation-this-is-an-2/work/ai-lab-v25-source/src/pages/FilePage.tsx but also statically imported by C:/Users/Administrator/Documents/Codex/2026-10-14/referenced-chatgpt-conversation-this-is-an-2/work/ai-lab-v25-source/src/lib/exporters.ts, dynamic import will not move module into another chunk.

computing gzip size...
dist/registerSW.js                         0.13 kB
dist/manifest.webmanifest                  0.40 kB
dist/index.html                            0.73 kB │ gzip:   0.45 kB
dist/assets/index-BFRM9zGY.css             2.46 kB │ gzip:   0.99 kB
dist/assets/purify.es-BwoZCkIS.js         22.03 kB │ gzip:   8.77 kB
dist/assets/index.es-aw6jvEez.js         150.87 kB │ gzip:  51.62 kB
dist/assets/html2canvas.esm-CBrSDip1.js  201.42 kB │ gzip:  48.03 kB
dist/assets/index-LuzHQyVL.js            318.41 kB │ gzip:  90.98 kB
dist/assets/jspdf.es.min-CjJOT1Xp.js     357.67 kB │ gzip: 117.99 kB
dist/assets/index-_XKptD2O.js            402.32 kB │ gzip: 131.36 kB
✓ built in 6.87s

PWA v0.19.8
mode      generateSW
precache  16 entries (1432.58 KiB)
files generated
  dist/sw.js
  dist/workbox-ee9d8b34.js
```

### final-test

Exit Code: 0

```text
> ai-lab-v2.5@2.5.0 test
> vitest run --reporter=verbose


 RUN  v1.6.1 C:/Users/Administrator/Documents/Codex/2026-10-14/referenced-chatgpt-conversation-this-is-an-2/work/ai-lab-v25-source

 ✓ src/lib/__tests__/core.test.ts > AI Lab V2.5 Core > genId unique
 ✓ src/lib/__tests__/core.test.ts > AI Lab V2.5 Core > project schema required fields
 ✓ src/lib/__tests__/core.test.ts > AI Lab V2.5 Core > judge result enum
 ✓ src/lib/__tests__/core.test.ts > AI Lab V2.5 Core > MANUAL MODE banner logic
 ✓ src/lib/__tests__/core.test.ts > AI Lab V2.5 Core > export formats list

 Test Files  1 passed (1)
      Tests  5 passed (5)
   Start at  22:54:45
   Duration  562ms (transform 55ms, setup 0ms, collect 78ms, tests 6ms, environment 0ms, prepare 197ms)
```

### final-typecheck

Exit Code: 0

```text
> ai-lab-v2.5@2.5.0 typecheck
> tsc --noEmit
```
