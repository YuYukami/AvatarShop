團隊照片：每位成員一個資料夾，這裡只放轉好的 .webp。

  _originals/team/<成員>/   ← 原始照片放這裡（不進版控）
            ↓  python tools/make-webp.py
  assets/team/<成員>/       ← 產生的 .webp，網站載入這些

目前成員：
  rimo/    avatar + 1~4
  pisa/    avatar + 1~4
  bacon/   avatar + 1~4
  kuro/    avatar + 1~3
  alam/    （照片還沒放，team.html 顯示「建置中」卡片）

資料夾名稱一律小寫 —— GitHub Pages 區分大小寫，
Pisa/ 和 pisa/ 混著寫在本機沒事，上線會變 404。

新增一位成員：
1. 建 _originals/team/newbie/，放入 avatar.jpg 與 1.jpg、2.jpg…
2. 根目錄跑 python tools/make-webp.py
3. 複製 team.html 裡任一個 <article class="member"> 區塊，
   改掉名稱、職稱、介紹、專長標籤與圖片路徑
4. 要出現在首頁團隊預覽 → index.html 的 .tp-avatars 加一個 <span class="tp-ava">
5. 要把作品放進首頁輪播 → index.html 的 GALLERY 陣列加一行；
   橫式照片記得加 wide:true，否則會被 3:4 直式版位裁掉左右兩邊

文字內容一律直接改 team.html。作品照可點擊放大。
