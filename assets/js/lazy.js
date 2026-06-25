/**
 * lazy.js — 交互后加载的JS（通过 IntersectionObserver 触发）
 * 功能: 预留扩展点
 */
(() => {
  'use strict';
  window.__lazyInit = () => {
    // 后续可在此注册懒加载功能（评论区、图表等）
  };
  window.__lazyInit();
})();
