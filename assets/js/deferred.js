/**
 * deferred.js — 非首屏JS（defer 加载）
 * 功能: 轮播图 / 倒计时 / 快速通道展开
 */
(() => {
  'use strict';

  /* ---------- 1. 轮播图 ---------- */
  const banner = document.getElementById('banner');
  if (banner) {
    const slides = document.getElementById('bannerSlides');
    if (slides) {
      const slideEls = slides.querySelectorAll('.banner-slide');
      if (slideEls.length >= 2) {
        const dots = document.querySelectorAll('.banner-dot');
        const prevBtn = document.getElementById('bannerPrev');
        const nextBtn = document.getElementById('bannerNext');
        let current = 0;
        let interval = null;
        const autoplayInterval = parseInt(banner.getAttribute('data-autoplay') || '4000', 10);
        const go = (index) => {
          slideEls.forEach((el, i) => { el.style.display = i === index ? 'block' : 'none'; });
          dots.forEach((dot, i) => { dot.className = i === index ? 'banner-dot active' : 'banner-dot'; });
          current = index;
        };
        const next = () => go((current + 1) % slideEls.length);
        const prev = () => go((current - 1 + slideEls.length) % slideEls.length);
        const startTimer = () => { stopTimer(); interval = window.safeSetInterval(next, autoplayInterval); };
        const stopTimer = () => { if (interval) { clearInterval(interval); interval = null; } };
        go(0); startTimer();
        prevBtn?.addEventListener('click', (e) => { e.preventDefault(); prev(); startTimer(); });
        nextBtn?.addEventListener('click', (e) => { e.preventDefault(); next(); startTimer(); });
        dots.forEach((dot) => {
          dot.addEventListener('click', () => {
            go(parseInt(dot.getAttribute('data-index') || '0', 10));
            startTimer();
          });
        });
        banner.addEventListener('mouseenter', stopTimer);
        banner.addEventListener('mouseleave', startTimer);
      }
    }
  }

  /* ---------- 2. 倒计时 ---------- */
  const cdEl = document.getElementById('countdownDisplay');
  if (cdEl) {
    const targetStr = cdEl.getAttribute('data-target');
    if (targetStr) {
      const daysEl = document.getElementById('cdDays');
      const hoursEl = document.getElementById('cdHours');
      const minutesEl = document.getElementById('cdMinutes');
      const secondsEl = document.getElementById('cdSeconds');
      const pad = (n) => String(n).padStart(2, '0');
      const update = () => {
        const diff = new Date(targetStr).getTime() - Date.now();
        if (diff <= 0) {
          ['00','00','00','00'].forEach((v, i) => [daysEl, hoursEl, minutesEl, secondsEl][i] && ([daysEl, hoursEl, minutesEl, secondsEl][i].textContent = v));
          return;
        }
        const totalSec = Math.floor(diff / 1000);
        if (daysEl) daysEl.textContent = pad(Math.floor(totalSec / 86400));
        if (hoursEl) hoursEl.textContent = pad(Math.floor((totalSec % 86400) / 3600));
        if (minutesEl) minutesEl.textContent = pad(Math.floor((totalSec % 3600) / 60));
        if (secondsEl) secondsEl.textContent = pad(totalSec % 60);
      };
      update();
      window.safeSetInterval(update, 1000);
    }
  }

  /* ---------- 3. 快速通道展开 ---------- */
  const qlToggle = document.getElementById('qlToggle');
  const qlList = document.getElementById('qlList');
  if (qlToggle && qlList) {
    qlToggle.addEventListener('click', () => {
      qlList.classList.toggle('expanded');
      qlToggle.textContent = qlList.classList.contains('expanded')
        ? qlToggle.getAttribute('data-collapse') || '收起'
        : qlToggle.getAttribute('data-expand') || '展开更多';
    });
  }
  /* ---------- 4. 内容区背景图轮播 ---------- */
  const mainEl = document.querySelector('main[data-bg-images]');
  if (mainEl) {
    try {
      const imgs = JSON.parse(mainEl.getAttribute('data-bg-images'));
      if (imgs && imgs.length) {
        const iv = parseInt(mainEl.getAttribute('data-bg-interval') || '5000', 10);
        let idx = 0;
        const apply = (i) => { mainEl.style.backgroundImage = 'url("' + imgs[i] + '")'; };
        apply(0);
        if (imgs.length > 1) {
          window.safeSetInterval(() => { idx = (idx + 1) % imgs.length; apply(idx); }, iv);
        }
      }
    } catch (_) {}
  }
})();
