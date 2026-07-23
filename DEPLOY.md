# RimoStudio 網站部署指南（GitHub Desktop）

## 檔案結構
```
AvatarShop/
├── index.html      首頁（介紹 + 委託須知 + 排程日曆）
├── estimate.html   委託試算
├── .nojekyll       告訴 GitHub Pages 直接輸出檔案
└── assets/
    └── style.css   共用樣式
```

---

## 一、用 GitHub Desktop 上傳

1. 開啟 **GitHub Desktop**，登入你的 GitHub 帳號。
2. 上方選單 **File → Add local repository**。
3. 路徑選 `C:\Users\MIS\Desktop\Rimo\AvatarShop`。
4. 若跳出「this directory does not appear to be a Git repository」，
   點 **create a repository** → 名稱填 `AvatarShop`（或 `vrc-yune`）→ **Create repository**。
5. 左下角填提交訊息（例如 `first site`）→ 點 **Commit to main**。
6. 右上角點 **Publish repository**。
   - ⚠️ 取消勾選「Keep this code private」→ 讓網站可公開瀏覽。
   - 點 **Publish repository**。

---

## 二、開啟 GitHub Pages

1. 到 `https://github.com/你的帳號/AvatarShop`。
2. 點 **Settings**（設定）→ 左側 **Pages**。
3. Source 選 **Deploy from a branch**。
4. Branch 選 **main**、資料夾選 **/ (root)** → **Save**。
5. 等 1～2 分鐘，重新整理頁面，最上方會出現網址：
   `https://你的帳號.github.io/AvatarShop/`
   → 點進去就能瀏覽了！

---

## 三、綁定自訂網域 vrc-yune.org（可選）

1. GitHub Pages 設定頁 → **Custom domain** 填 `www.vrc-yune.org` → Save。
2. 到你的網域 DNS 供應商，新增一筆 **CNAME** 紀錄：
   - 名稱／主機：`www`
   - 指向：`你的帳號.github.io`
3. 回 GitHub 勾選 **Enforce HTTPS**（等憑證簽發完成後才能勾）。

---

## 四、以後要修改內容

改完檔案後，在 GitHub Desktop：
**填提交訊息 → Commit to main → Push origin**，
約 1 分鐘後線上網站就會自動更新。
