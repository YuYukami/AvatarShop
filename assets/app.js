/* 共用腳本 —— 漢堡選單 + 進場動畫 */

/* 各頁 <head> 的保險機制會檢查這個旗標：若本檔載入失敗，
   3 秒後會移除 html 的 .js class，讓 .reveal 內容直接顯示，
   避免整站因為 opacity:0 而變成空白。 */
window.__rimoAppLoaded = true;

document.addEventListener('DOMContentLoaded', () => {

  /* ===== 漢堡抽屜選單 ===== */
  const toggle = document.querySelector('.nav-toggle');
  if (toggle) {
    const open  = () => { document.body.classList.add('nav-open');  toggle.setAttribute('aria-expanded', 'true'); };
    const close = () => { document.body.classList.remove('nav-open'); toggle.setAttribute('aria-expanded', 'false'); };
    toggle.addEventListener('click', () => {
      document.body.classList.contains('nav-open') ? close() : open();
    });
    const backdrop = document.querySelector('.nav-backdrop');
    if (backdrop) backdrop.addEventListener('click', close);
    document.querySelectorAll('.nav-links a').forEach(a => a.addEventListener('click', close));
    document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
  }

  /* ===== 進場動畫觀察器 ===== */
  const els = document.querySelectorAll('.reveal');
  // 不支援 IntersectionObserver 時直接顯示，避免內容永遠隱藏
  if (!('IntersectionObserver' in window)) {
    els.forEach(e => e.classList.add('done'));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach(en => {
      if (!en.isIntersecting) return;
      const el = en.target;
      // 若父層是 .stagger，依序錯落播放
      const staggered = el.parentElement && el.parentElement.classList.contains('stagger');
      const idx = staggered
        ? [...el.parentElement.children].filter(c => c.classList.contains('reveal')).indexOf(el)
        : 0;
      el.style.animationDelay = (idx * 0.08) + 's';
      el.classList.add('play');
      el.addEventListener('animationend', () => {
        el.classList.add('done');
        el.classList.remove('play');
        el.style.animationDelay = '';
      }, { once: true });
      io.unobserve(el);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
  els.forEach(e => io.observe(e));
});
