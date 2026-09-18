Bacon 的原始照片請放在　_originals/team/bacon/　（不是這裡！）

檔名固定用這幾個：
  avatar.jpg   頭像（建議正方形）
  1.jpg 2.jpg 3.jpg ...   作品照

放好之後，回到專案根目錄跑一次：
    python tools/make-webp.py
就會在這個資料夾產生對應的 .webp —— 網站載入的是這些 .webp。

為什麼原檔不放這裡？
網站只發布 WebP，原始 JPG 動輒 8~10 MB，放進版控會讓 repo 肥好幾十 MB，
所以原檔統一放在 repo 外的 _originals/（已加進 .gitignore）。

作品照數量要和 team.html 裡的 <div class="w"> 數量一致。
沒放圖時會顯示佔位圖，不會破版。
