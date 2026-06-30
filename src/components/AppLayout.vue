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
/* 全局重置与基础样式 */
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
  background: #f0f2f7;
  color: #333;
  line-height: 1.6;
}

/* 自定义滚动条 */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}
::-webkit-scrollbar-track {
  background: transparent;
}
::-webkit-scrollbar-thumb {
  background: #d0d5e0;
  border-radius: 3px;
}
::-webkit-scrollbar-thumb:hover {
  background: #b0b5c0;
}

/* 链接重置 */
a {
  color: inherit;
  text-decoration: none;
}

/* 页面切换动画 */
.page-fade-enter-active,
.page-fade-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.page-fade-enter-from {
  opacity: 0;
  transform: translateY(8px);
}
.page-fade-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>

<style scoped>
.app-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: linear-gradient(180deg, #f0f4ff 0%, #f0f2f7 30%, #f5f7fb 100%);
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
  border-top: 1px solid #e8ecf2;
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

.footer-logo {
  font-size: 20px;
}

.footer-name {
  font-size: 15px;
  font-weight: 700;
  color: #555;
}

.footer-inner p {
  font-size: 12px;
  color: #aaa;
}

@media (max-width: 768px) {
  .app-main {
    padding: 16px 14px 32px;
  }
}
</style>
