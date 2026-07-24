# RimoStudio 網站部署與維護指南

## 檔案結構
```
AvatarShop/
├── index.html      首頁（介紹 + 服務 + 作品集 + 須知入口 + 排程日曆）
├── terms.html      委託須知頁（含「捲到底 → 勾選同意」閘門）
├── glossary.html   用詞說明（各式名詞解釋）
├── estimate.html   委託試算（未同意條款會被導回 terms.html）
├── .nojekyll       告訴 GitHub Pages 直接輸出檔案
└── assets/
    ├── style.css   共用樣式
    ├── app.js      共用進場動畫
    ├── favicon.svg 分頁圖標
    └── gallery/    作品集照片（1.jpg、2.jpg …）
```

---

## 一、用 GitHub Desktop 上傳 / 更新

**第一次上傳：**
1. 開啟 **GitHub Desktop**，登入 GitHub 帳號。
2. **File → Add local repository** → 路徑選 `C:\Users\MIS\Desktop\Rimo\AvatarShop`。
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

## 三、自訂網域（目前：rimo.vrc-yune.org，透過 Cloudflare）

- GitHub Pages 設定頁 **Custom domain** 已指向自訂網域。
- Cloudflare DNS 以 CNAME 指向 `你的帳號.github.io`。

---

## 四、⚠️ 改完看不到更新？清快取

因為使用 Cloudflare Proxy，**CSS/JS 會被快取**，改了卻沒更新時：

1. **強制重新整理**：`Ctrl + Shift + R`（多數情況這樣就好）。
2. 還是舊的 → Cloudflare 後台 **Caching → Configuration → Purge Everything**。

**已內建防快取機制**：`index.html` 等檔案引用樣式時帶版本號，例如
`href="assets/style.css?v=5"`。
> 每次改了 `style.css`，把所有 HTML 裡的 `?v=5` 往上加成 `?v=6`、`?v=7`… 再 push，
> 就能確保線上一定拿到最新樣式（HTML 不會被 Cloudflare 快取，所以這招有效）。

---

## 五、委託須知閘門（強制同意）

流程：**首頁「開始委託試算」→ terms.html（捲到底 → 勾選同意）→ estimate.html**。
未同意（或效期過期）者直接開 `estimate.html` 會被**自動導回** `terms.html`。

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

1. 照片放進 `assets/gallery/`，命名 `1.jpg`、`2.jpg` …（直式 3:4 最好看）。
2. 數量或檔名不同 → 改 `index.html` 最下方的 `GALLERY` 清單：
   ```js
   const GALLERY = [
     {src:'assets/gallery/1.jpg', title:'角色名稱或說明'},
     ...
   ];
   ```
3. Commit → Push。沒放圖片時會顯示佔位圖，不會破版。

---

## 七、Google 行事曆

首頁「改模排程」已嵌入 Google 日曆。
⚠️ 訪客要能看到內容，該日曆必須設為**公開**：
Google 日曆 → 該日曆設定 → 存取權限 → 勾選「**公開設定為可用**」（查看所有活動詳情）。
