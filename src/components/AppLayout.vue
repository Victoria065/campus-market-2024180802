<template>
  <div class="app-layout">
    <AppHeader />
    <main class="app-main">
      <router-view v-slot="{ Component }">
        <transition name="page-fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
    <footer class="app-footer">
      <div class="footer-inner">
        <div class="footer-brand">
          <span class="footer-logo">🏫</span>
          <span class="footer-name">校园轻集市</span>
        </div>
        <p>轻量 · 可信 · 校园生活 — 让校园生活更简单</p>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import AppHeader from './AppHeader.vue'
</script>

<style>
/* ── CSS 变量主题 ── */
:root {
  --color-primary: #4f46e5;
  --color-primary-light: #818cf8;
  --color-primary-bg: #eef2ff;
  --color-bg: #f8fafc;
  --color-surface: #ffffff;
  --color-text: #1e293b;
  --color-text-secondary: #64748b;
  --color-text-muted: #94a3b8;
  --color-border: #e2e8f0;
  --color-danger: #ef4444;
  --color-success: #22c55e;
  --color-warning: #f59e0b;
  --radius-sm: 8px;
  --radius: 12px;
  --radius-lg: 16px;
  --radius-xl: 20px;
  --shadow-sm: 0 1px 3px rgba(0,0,0,.06);
  --shadow-md: 0 4px 16px rgba(0,0,0,.08);
  --shadow-lg: 0 12px 36px rgba(0,0,0,.12);
}

/* ── 全局重置 ── */
*,
*::before,
*::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "PingFang SC", "Microsoft YaHei", "Helvetica Neue", sans-serif;
  background: var(--color-bg);
  color: var(--color-text);
  line-height: 1.6;
}

::-webkit-scrollbar { width: 6px; height: 6px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: #d0d5e0; border-radius: 3px; }
::-webkit-scrollbar-thumb:hover { background: #b0b5c0; }

a { color: inherit; text-decoration: none; }

/* ── 页面切换动画 ── */
.page-fade-enter-active,
.page-fade-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.page-fade-enter-from { opacity: 0; transform: translateY(8px); }
.page-fade-leave-to { opacity: 0; transform: translateY(-8px); }
</style>

<style scoped>
.app-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: linear-gradient(180deg, #eef2ff 0%, #f8fafc 30%, #f1f5f9 100%);
}

.app-main {
  flex: 1;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding: 28px 24px 40px;
}

.app-footer {
  margin-top: auto;
  border-top: 1px solid var(--color-border);
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(10px);
  padding: 28px 24px;
}

.footer-inner {
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
}

.footer-brand {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-bottom: 6px;
}

.footer-logo { font-size: 20px; }

.footer-name {
  font-size: 15px;
  font-weight: 700;
  background: linear-gradient(135deg, #4f46e5, #7c3aed);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.footer-inner p { font-size: 12px; color: var(--color-text-muted); }

@media (max-width: 768px) {
  .app-main { padding: 16px 14px 32px; }
}
</style>
