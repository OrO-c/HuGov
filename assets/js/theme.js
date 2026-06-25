/**
 * Hugov 主题 — 客户端交互脚本
 * 从 AstGov Astro 主题的内联 <script> 标签提取合并
 * 包含: 字号切换 / 轮播图 / 倒计时 / 快速通道展开
 */

(function () {
  'use strict';

  /* ========================================================== */
  /* 1. 字号切换（Header 组件）                                 */
  /* ========================================================== */
  function initFontSize() {
    var btns = document.querySelectorAll('.font-btn');
    if (!btns.length) return;
    var html = document.documentElement;

    btns.forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        btns.forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');
        html.setAttribute('data-font-size', btn.getAttribute('data-size') || 'medium');
      });
    });
  }

  /* ========================================================== */
  /* 2. 轮播图（Banner 组件）                                  */
  /* ========================================================== */
  function initBanner() {
    var banner = document.getElementById('banner');
    if (!banner) return;

    var slides = document.getElementById('bannerSlides');
    if (!slides) return;
    var slideEls = slides.querySelectorAll('.banner-slide');
    if (slideEls.length < 2) return;

    var dots = document.querySelectorAll('.banner-dot');
    var prevBtn = document.getElementById('bannerPrev');
    var nextBtn = document.getElementById('bannerNext');

    var current = 0;
    var interval = null;
    var autoplayInterval = parseInt(banner.getAttribute('data-autoplay') || '4000', 10);

    function go(index) {
      slideEls.forEach(function (el, i) {
        el.style.display = i === index ? 'block' : 'none';
      });
      dots.forEach(function (dot, i) {
        dot.className = i === index ? 'banner-dot active' : 'banner-dot';
      });
      current = index;
    }

    function next() { go((current + 1) % slideEls.length); }
    function prev() { go((current - 1 + slideEls.length) % slideEls.length); }

    function startTimer() {
      stopTimer();
      interval = window.setInterval(next, autoplayInterval);
    }

    function stopTimer() {
      if (interval) { clearInterval(interval); interval = null; }
    }

    // 初始化
    go(0);
    startTimer();

    if (prevBtn) {
      prevBtn.addEventListener('click', function (e) {
        e.preventDefault();
        prev();
        startTimer();
      });
    }
    if (nextBtn) {
      nextBtn.addEventListener('click', function (e) {
        e.preventDefault();
        next();
        startTimer();
      });
    }
    dots.forEach(function (dot) {
      dot.addEventListener('click', function () {
        var idx = parseInt(this.getAttribute('data-index') || '0', 10);
        go(idx);
        startTimer();
      });
    });

    banner.addEventListener('mouseenter', stopTimer);
    banner.addEventListener('mouseleave', startTimer);
  }

  /* ========================================================== */
  /* 3. 倒计时（Countdown 组件）                                */
  /* ========================================================== */
  function initCountdown() {
    var el = document.getElementById('countdownDisplay');
    if (!el) return;

    var targetStr = el.getAttribute('data-target');
    if (!targetStr) return;

    var daysEl = document.getElementById('cdDays');
    var hoursEl = document.getElementById('cdHours');
    var minutesEl = document.getElementById('cdMinutes');
    var secondsEl = document.getElementById('cdSeconds');

    function pad(n) { return String(n).padStart(2, '0'); }

    function update() {
      var now = new Date();
      var diff = new Date(targetStr).getTime() - now.getTime();

      if (diff <= 0) {
        if (daysEl) daysEl.textContent = '00';
        if (hoursEl) hoursEl.textContent = '00';
        if (minutesEl) minutesEl.textContent = '00';
        if (secondsEl) secondsEl.textContent = '00';
        return;
      }

      var totalSec = Math.floor(diff / 1000);
      var d = Math.floor(totalSec / 86400);
      var h = Math.floor((totalSec % 86400) / 3600);
      var m = Math.floor((totalSec % 3600) / 60);
      var s = totalSec % 60;

      if (daysEl) daysEl.textContent = pad(d);
      if (hoursEl) hoursEl.textContent = pad(h);
      if (minutesEl) minutesEl.textContent = pad(m);
      if (secondsEl) secondsEl.textContent = pad(s);
    }

    update();
    setInterval(update, 1000);
  }

  /* ========================================================== */
  /* 4. 快速通道展开/收起（QuickLinks 组件）                   */
  /* ========================================================== */
  function initQuickLinks() {
    var toggle = document.getElementById('qlToggle');
    var list = document.getElementById('qlList');
    if (!toggle || !list) return;

    toggle.addEventListener('click', function () {
      list.classList.toggle('expanded');
      var expanded = list.classList.contains('expanded');
      toggle.textContent = expanded
        ? toggle.getAttribute('data-collapse') || '收起'
        : toggle.getAttribute('data-expand') || '展开更多';
    });
  }

  /* ========================================================== */
  /* 5. 移动端导航汉堡菜单                                   */
  /* ========================================================== */
  function initNav() {
    var toggle = document.getElementById('navToggle');
    var menu = document.getElementById('navMenu');
    if (!toggle || !menu) return;

    function closeMenu() {
      menu.classList.remove('open');
      toggle.classList.remove('active');
    }

    toggle.addEventListener('click', function (e) {
      e.stopPropagation();
      menu.classList.toggle('open');
      toggle.classList.toggle('active');
    });

    // 点击菜单项收起
    menu.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        closeMenu();
      });
    });

    // 点击页面空白处收起
    document.addEventListener('click', function (e) {
      if (!menu.contains(e.target) && !toggle.contains(e.target)) {
        closeMenu();
      }
    });

    // 移动端二级菜单：点击父项展开
    menu.querySelectorAll('.has-dropdown > .nav-link').forEach(function (link) {
      link.addEventListener('click', function (e) {
        if (window.innerWidth < 992) {
          e.preventDefault();
          this.parentNode.classList.toggle('open');
        }
      });
    });
  }

  /* ========================================================== */
  /* 初始化所有模块                                            */
  /* ========================================================== */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      initFontSize();
      initBanner();
      initCountdown();
      initQuickLinks();
      initNav();
    });
  } else {
    initFontSize();
    initBanner();
    initCountdown();
    initQuickLinks();
    initNav();
  }

})();
