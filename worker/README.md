# 折扣代碼後台 —— Cloudflare Worker 部署步驟

全程在 Cloudflare 後台網頁操作，不用裝任何東西。

## 一、建立 Worker
1. 登入 **Cloudflare** → 左側 **Workers 和 Pages（Workers & Pages）** → **建立（Create）** → **Worker**。
2. 名稱填 `rimo-discount`（會決定網址）→ **部署（Deploy）**。
3. 部署完成後點 **編輯程式碼（Edit code）**，把整個編輯器內容刪掉，貼上 `worker.js` 的全部內容 → 右上 **部署（Deploy）**。

## 二、建立 KV 資料庫（存代碼用）
4. 左側 **Workers 和 Pages → KV** → **建立命名空間（Create a namespace）** → 名稱 `rimo-codes` → 新增。

## 三、綁定 KV 與設定密碼
5. 回到你的 Worker（rimo-discount）→ **設定（Settings）** → **變數與機密（Variables and Secrets）/ 繫結（Bindings）**：
   - **KV 命名空間繫結（KV Namespace Bindings）** → 新增：
     - 變數名稱（Variable name）：`CODES` ← 一定要是這個名字
     - KV 命名空間：選 `rimo-codes`
   - **環境變數 / 機密（Environment Variables / Secrets）** → 新增：
     - 名稱：`ADMIN_PASSWORD` ← 一定要是這個名字
     - 值：你要的後台密碼（建議選「加密 Encrypt」）
6. 存檔後再按一次 **部署（Deploy）** 讓設定生效。

## 四、取得網址
7. Worker 頁面上會有網址，例如：
   `https://rimo-discount.你的帳號.workers.dev`
   - **後台管理**：直接開這個網址 → 輸入密碼登入 → 產生 / 管理代碼。
   - **給網站用的 API**：同一個網址（試算頁會自動接 `/api/validate`）。

## 五、把網址填進網站
8. 打開 `estimate.html`，找到最上面這一行：
   ```js
   const DISCOUNT_API = '';
   ```
   把你的 Worker 網址填進去（**結尾不要加斜線**）：
   ```js
   const DISCOUNT_API = 'https://rimo-discount.你的帳號.workers.dev';
   ```
9. 存檔 → GitHub Desktop **Commit → Push**。

完成！試算頁就會出現「折扣代碼」輸入框；沒填 `DISCOUNT_API` 時該框會自動隱藏。

---

## 使用方式
- 後台開 Worker 網址 → 登入 → 「產生新代碼」（可隨機或自訂、百分比或折抵金額）。
- 客人在試算頁輸入代碼 → 按「套用」→ 即時折扣、明細顯示折扣。
- 要停用某代碼：後台按「停用」；要刪除按「刪除」。改動即時生效，不用 push。

## 費用
Cloudflare Workers + KV 免費額度：每天 10 萬次請求、KV 讀取充足 —— 一般委託流量完全免費。
