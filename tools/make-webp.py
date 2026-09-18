# -*- coding: utf-8 -*-
"""
把 _originals/ 裡的原始照片轉成網站要用的 .webp，輸出到 assets/。

網站只發布 WebP，不放 .jpg 備援（2020 年後的瀏覽器全都支援 WebP）。
原始檔留在 _originals/（已加進 .gitignore，不會上傳），
這樣日後想換尺寸或壓縮品質時還能重跑一次。

資料夾對應關係：
    _originals/gallery/1.jpg        ->  assets/gallery/1.webp
    _originals/team/rimo/avatar.jpg ->  assets/team/rimo/avatar.webp
    _originals/team/kuro/2.png      ->  assets/team/kuro/2.webp

需求： pip install pillow
用法： python tools/make-webp.py            只轉新增或有更動的
       python tools/make-webp.py --force    全部重轉
"""
import pathlib
import sys

from PIL import Image, ImageOps

MAX_EDGE = 1600   # 長邊上限。燈箱全螢幕也夠清晰，輪播只顯示 290x440 更是綽綽有餘
QUALITY = 82      # 82 左右肉眼看不出差別，再高檔案會明顯變大
EXTS = (".jpg", ".jpeg", ".png")

FORCE = "--force" in sys.argv
ROOT = pathlib.Path(__file__).resolve().parent.parent
SRC_ROOT = ROOT / "_originals"
OUT_ROOT = ROOT / "assets"

if not SRC_ROOT.is_dir():
    print("找不到 %s" % SRC_ROOT)
    print("請把原始照片依照 _originals/gallery/、_originals/team/<成員>/ 的結構放好再跑。")
    sys.exit(1)

total_old = total_new = 0
converted = skipped = 0

for src in sorted(SRC_ROOT.rglob("*")):
    if src.suffix.lower() not in EXTS:
        continue

    out = (OUT_ROOT / src.relative_to(SRC_ROOT)).with_suffix(".webp")
    # 原檔比產出的新才需要重轉，省得每次都整包跑一遍
    if out.exists() and not FORCE and out.stat().st_mtime >= src.stat().st_mtime:
        skipped += 1
        continue

    out.parent.mkdir(parents=True, exist_ok=True)
    im = ImageOps.exif_transpose(Image.open(src))   # 套用 EXIF 旋轉，避免方向跑掉
    im = im.convert("RGB")
    w, h = im.size
    if max(w, h) > MAX_EDGE:
        scale = MAX_EDGE / max(w, h)
        im = im.resize((round(w * scale), round(h * scale)), Image.LANCZOS)
    im.save(out, "WEBP", quality=QUALITY, method=6)

    old, new = src.stat().st_size, out.stat().st_size
    total_old += old
    total_new += new
    converted += 1
    print("  %-30s %8.0f KB -> %6.0f KB  (-%.0f%%)"
          % (out.relative_to(ROOT).as_posix(), old / 1024, new / 1024,
             (1 - new / old) * 100))

print()
if converted:
    print("轉換 %d 張：%.1f MB -> %.1f MB（減少 %.0f%%）"
          % (converted, total_old / 1048576, total_new / 1048576,
             (1 - total_new / total_old) * 100))
else:
    print("沒有需要轉換的檔案，全部都是最新的。")
if skipped:
    print("略過 %d 張未更動的（要整包重轉請加 --force）。" % skipped)

# 產出多餘的檔案時提醒一下：原檔刪了但 assets 裡還留著
orphans = []
for out in sorted(OUT_ROOT.rglob("*.webp")):
    rel = out.relative_to(OUT_ROOT).with_suffix("")
    if not any((SRC_ROOT / rel).with_suffix(e).exists() for e in EXTS):
        orphans.append(out.relative_to(ROOT).as_posix())
if orphans:
    print("\n⚠ 下列檔案在 _originals/ 裡找不到對應的原檔，確認是否該刪除：")
    for o in orphans:
        print("   " + o)
