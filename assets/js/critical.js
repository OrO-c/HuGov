/**
 * critical.js — 首屏必需JS（内联，<15KB）
 * ES6+ 语法，Hugo minify 压缩。兼容 Chromium 80+（原生支持 ES6）
 * 功能: 导航切换 / bfcache / 长任务调度 / 字号切换
 */
(() => {
  'use strict';

  /* ---------- 1. 移动端导航汉堡菜单 ---------- */
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  if (navToggle && navMenu) {
    const closeNav = () => {
      navMenu.classList.remove('open');
      navToggle.classList.remove('active');
    };
    navToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      navMenu.classList.toggle('open');
      navToggle.classList.toggle('active');
    });
    navMenu.querySelectorAll('a').forEach((a) => a.addEventListener('click', closeNav));
    document.addEventListener('click', (e) => {
      if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) closeNav();
    });
    // 移动端二级菜单
    navMenu.querySelectorAll('.has-dropdown > .nav-link').forEach((link) => {
      link.addEventListener('click', function (e) {
        if (window.innerWidth < 992) {
          e.preventDefault();
          this.parentNode.classList.toggle('open');
        }
      });
    });
  }

  /* ---------- 2. bfcache 修复 ---------- */
  window.addEventListener('pageshow', (event) => {
    if (event.persisted) {
      // bfcache 恢复后重新激活轮播等定时器
      if (typeof window.__resumeTimers === 'function') window.__resumeTimers();
    }
  });

  /* ---------- 3. 字号切换 ---------- */
  const fontSizeBtns = document.querySelectorAll('.font-btn');
  if (fontSizeBtns.length) {
    fontSizeBtns.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        fontSizeBtns.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        document.documentElement.setAttribute('data-font-size', btn.getAttribute('data-size') || 'medium');
      });
    });
  }

  /* ---------- 4. 长任务拆分 ---------- */
  window.__runTasksInBatches = (tasks) => {
    let index = 0;
    const runNext = () => {
      if (index >= tasks.length) return;
      const task = tasks[index++];
      if ('requestIdleCallback' in window) {
        requestIdleCallback(() => { task(); runNext(); });
      } else {
        setTimeout(() => { task(); runNext(); }, 0);
      }
    };
    runNext();
  };

  /* ---------- 5. 定时器管理（bfcache友好） ---------- */
  window.__timerIds = [];
  const origSetInterval = window.setInterval;
  window.safeSetInterval = (fn, delay) => {
    const id = origSetInterval(fn, delay);
    window.__timerIds.push(id);
    return id;
  };
  window.__resumeTimers = () => {
    // 实际定时器在 deferred.js 中通过 safeSetInterval 注册
    // 此处仅为声明备用
  };
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      window.__timerIds.forEach((id) => clearInterval(id));
      window.__timerIds = [];
    }
  });

  document.documentElement.classList.add('js-loaded');
})();
