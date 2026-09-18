# RimoStudio 網站部署與維護指南

## 檔案結構
```
AvatarShop/
├── index.html      首頁（介紹 + 服務 + 作品集 + 團隊 + FAQ + 排程日曆）
├── team.html       團隊介紹（成員、專長、作品）
├── terms.html      委託須知頁（含「捲到底 → 勾選同意」閘門）
├── glossary.html   用詞說明（各式名詞解釋）
├── estimate.html   委託試算（未同意條款會顯示同意遮罩）
├── CNAME           自訂網域（www.vrc-yune.org）
├── robots.txt      搜尋引擎爬取規則
├── sitemap.xml     網站地圖
├── llms.txt        給 AI 搜尋引擎看的網站摘要
├── LICENSE         版權聲明
├── .nojekyll       告訴 GitHub Pages 直接輸出檔案
├── assets/
│   ├── style.css   共用樣式
│   ├── app.js      共用漢堡選單 + 進場動畫
│   ├── favicon.svg 分頁圖標
│   ├── og.jpg      社群分享預覽圖（1200x630，唯一的 JPG）
│   ├── gallery/    作品集照片（.webp）
│   └── team/       團隊照片，每位成員一個小寫資料夾
│       ├── rimo/       avatar.jpg + 1~4.jpg（＋轉檔產生的 .webp）
│       ├── pisa/
│       ├── bacon/
│       ├── kuro/
│       └── alam/       （照片未放，頁面顯示「建置中」）
├── tools/
│   └── make-webp.py  圖片轉 WebP 工具（新增照片後要跑）
├── _originals/     原始照片（.gitignore 忽略，只留在本機）
└── worker/
    ├── worker.js   折扣代碼 Cloudflare Worker（含後台頁面）
    └── README.md   Worker 部署步驟
```

> 📁 `assets/team/` 的資料夾名稱**一律小寫**。GitHub Pages 區分大小寫，
> `Pisa/` 和 `pisa/` 混用在本機看不出問題，上線後會變成 404。

---

## 一、用 GitHub Desktop 上傳 / 更新

**第一次上傳：**
1. 開啟 **GitHub Desktop**，登入 GitHub 帳號。
2. **File → Add local repository** → 路徑選這個專案資料夾（目前為 `F:\RimoShop\AvatarShop`）。
3. 若提示不是 Git repository → 點 **create a repository** → 名稱 `AvatarShop` → **Create repository**。
4. 左下角填提交訊息 → **Commit to main** → 右上 **Publish repository**
   （⚠️ 取消勾選「Keep this code private」才能公開瀏覽）。

**以後每次修改：**
> 填提交訊息 → **Commit to main** → **Push origin**，約 1 分鐘後線上自動更新。

---

## 二、開啟 GitHub Pages

1. `https://github.com/你的帳號/AvatarShop` → **Settings** → 左側 **Pages**。
2. Source 選 **Deploy from a branch**，Branch 選 **main** / **(root)** → **Save**。
3. 等 1～2 分鐘出現網址：`https://你的帳號.github.io/AvatarShop/`。

---

## 三、自訂網域（目前：www.vrc-yune.org，透過 Cloudflare）

- GitHub Pages 設定頁 **Custom domain** 已指向自訂網域。
- Cloudflare DNS 以 CNAME 指向 `你的帳號.github.io`。

---

## 四、⚠️ 改完看不到更新？清快取

因為使用 Cloudflare Proxy，**CSS/JS 會被快取**，改了卻沒更新時：

1. **強制重新整理**：`Ctrl + Shift + R`（多數情況這樣就好）。
2. 還是舊的 → Cloudflare 後台 **Caching → Configuration → Purge Everything**。

**已內建防快取機制**：所有 HTML 引用樣式與腳本時都帶版本號，
目前是 `assets/style.css?v=15` 與 `assets/app.js?v=3`。
> 每次改了 `style.css` 或 `app.js`，把**所有 HTML**裡對應的 `?v=` 數字往上加 1 再 push，
> 就能確保線上一定拿到最新版（HTML 不會被 Cloudflare 快取，所以這招有效）。

一次改完 5 個 HTML 的 PowerShell 指令（把 16 換成你要的新版號）：
```powershell
Get-ChildItem *.html | ForEach-Object {
  (Get-Content $_ -Raw) -replace 'style\.css\?v=\d+','style.css?v=16' | Set-Content $_ -Encoding utf8
}
```

---

## 五、委託須知閘門（強制同意）

流程：**首頁「開始委託試算」→ terms.html（捲到底 → 勾選同意）→ estimate.html**。

未同意（或效期過期）者直接開 `estimate.html`，會看到一層**同意遮罩**，
上面有「前往閱讀委託須知」按鈕。

> ⚠️ 這裡**刻意不做轉址**。早期版本用 `location.replace('terms.html')` 直接跳走，
> 但 Google 爬蟲也會執行 JS 而被跳走，導致「委託試算」這個最該被搜到的價目頁收錄不了。
> 改成遮罩後，價目內容仍留在頁面上可被收錄，同時真人使用者一樣要先同意條款。

**同意效期：目前記住 24 小時。** 想調整，修改**兩個檔**裡同樣的這行：
- `terms.html`
- `estimate.html`

```js
var ONE_DAY = 86400000;  // 24 小時（毫秒）
```

| 想要的效果 | 改成 |
|-----------|------|
| 每次都要重新同意 | `0` |
| 記住 1 天（現值） | `86400000` |
| 記住 3 天 | `259200000` |
| 記住 1 週 | `604800000` |

> 兩個檔要改成**相同數字**。這是內嵌 JavaScript、HTML 不被快取，push 後直接生效，不必清快取。

---

## 六、更換作品集照片

**網站只發布 WebP**，原始 JPG 留在 repo 外的 `_originals/`（`.gitignore` 已忽略）。
原檔要留著 —— 日後想換尺寸或壓縮品質時才能重跑。

1. 原始照片放進 `_originals/gallery/`，命名 `1.jpg`、`2.jpg` …（直式 3:4 最好看）。
2. **轉檔（重要）**：在專案根目錄跑
   ```
   python tools/make-webp.py
   ```
   會在 `assets/gallery/` 產生同名 `.webp`（長邊縮到 1600px、品質 82）。
   > 需要先 `pip install pillow`。加 `--force` 可整包重轉。
   > 只會轉新增或有更動的檔案；`assets/` 裡有孤兒檔（原檔已刪）它也會提醒你。
3. 數量或檔名不同 → 改 `index.html` 最下方的 `GALLERY` 清單：
   ```js
   const GALLERY = [
     {src:'assets/gallery/1.webp', title:'角色名稱或說明'},
     {src:'assets/team/bacon/1.webp', title:' ', wide:true},   // 橫式照片
     ...
   ];
   ```
   輪播版位是 3:4 直式，**橫式照片一定要加 `wide:true`**，否則左右會被裁掉一大半。
4. Commit → Push。沒放圖片時會顯示佔位圖，不會破版。

> ⚠️ 只把 JPG 丟進 `assets/` 不轉檔是沒用的，網頁找的是 `.webp`。
> Bacon 的原圖單張有 8～10 MB，不轉檔首頁會直接爆掉。

### 社群分享預覽圖

`assets/og.jpg`（1200×630）是全站唯一的 JPG，給 Discord / X / LINE 的連結預覽用。
留 JPG 是因為各家爬蟲對 WebP 的支援還不一致，缺圖就完全沒有預覽。
想換圖的話自己做一張 1200×630 覆蓋掉即可，`make-webp.py` 不會動它。

---

## 六之二、委託試算的項目與價格

全部寫在 `estimate.html` 最下方的幾個陣列裡，改完 push 即可：

| 陣列 | 內容 |
|------|------|
| `PLANS` | 方案（代客上傳 / 通靈 / 友好 / 超值 / 優惠 / 安心） |
| `MAIN` | 加購區主要項目（可設 `alt` 代表非對應角色的價格） |
| `RUSH` | 加急製作（`rate:0.8` = 在其他項目小計之上加收 80%） |
| `UTIL` | 便利功能 |
| `NSFW` | SPS / SPS-D / PCS |
| `BOOTH` | Booth 代購級距 |

加急費用是**依前面所有項目的小計**計算的，所以一定排在明細最後一行；
折扣代碼則是套用在「含加急的總額」上。

---

## 六之三、新增團隊成員

1. 在 `assets/team/` 建一個**小寫**資料夾，例如 `bacon/`。
2. 放入 `avatar.jpg`（頭像）與 `1.jpg`、`2.jpg`…（作品照），建議正方形。
3. 根目錄跑 `python tools/make-webp.py` 轉檔。
4. 複製 `team.html` 裡任一個 `<article class="member">` 區塊，改掉名稱、職稱、
   介紹、專長標籤與圖片路徑。作品照的 `<div class="w">` 數量要跟實際張數一致。
5. 想一併出現在首頁的團隊預覽 → `index.html` 的 `.tp-avatars` 裡加一個 `<span class="tp-ava">`。

新成員卡片裡的「專長 / 擅長風格 / 不接」預設是註解掉的，
資料齊了再把註解符號拿掉並填寫即可。

---

## 七、Google 行事曆

首頁「改模排程」已嵌入 Google 日曆。
⚠️ 訪客要能看到內容，該日曆必須設為**公開**：
Google 日曆 → 該日曆設定 → 存取權限 → 勾選「**公開設定為可用**」（查看所有活動詳情）。
