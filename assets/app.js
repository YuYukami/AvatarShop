/* 進場動畫觀察器 —— index / estimate 兩頁共用 */
document.addEventListener('DOMContentLoaded', () => {
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
