作品集照片，這裡只放轉好的 .webp。

  _originals/gallery/1.jpg  ← 原始照片放這裡（不進版控）
            ↓  python tools/make-webp.py
  assets/gallery/1.webp     ← 產生的 .webp，網站載入這個

建議做法：
1. 原始照片放進 _originals/gallery/，命名 1.jpg、2.jpg…（直式 3:4 最好看）
2. 根目錄跑： python tools/make-webp.py
3. 到 index.html 最下方的 GALLERY 陣列增減項目（注意副檔名是 .webp）：
   const GALLERY = [
     {src:'assets/gallery/1.webp', title:'角色名稱或說明'},
     {src:'assets/team/bacon/1.webp', title:' ', wide:true},   // 橫式照片加 wide
     ...
   ];

輪播版位是 3:4 直式。橫式照片一定要加 wide:true，
否則 object-fit:cover 會把左右兩邊裁掉一大半。

沒有放圖片時，網站會自動顯示佔位圖，不會破版。
