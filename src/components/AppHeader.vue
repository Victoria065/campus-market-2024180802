<template>
  <header class="app-header">
    <router-link to="/" class="brand">
      <span class="logo-icon">🏫</span>
      <div class="brand-text">
        <span class="logo">校园轻集市</span>
        <span class="slogan">轻量 · 可信 · 校园生活</span>
      </div>
    </router-link>
    <AppNav />
  </header>
</template>

<script setup lang="ts">
import AppNav from './AppNav.vue'
</script>

<style scoped>
.app-header {
  height: 64px;
  padding: 0 32px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(16px) saturate(180%);
  -webkit-backdrop-filter: blur(16px) saturate(180%);
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
  box-shadow: 0 1px 8px rgba(0, 0, 0, 0.04);
  position: sticky;
  top: 0;
  z-index: 100;
}

.brand {
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  color: inherit;
  transition: opacity 0.2s;
}
.brand:hover {
  opacity: 0.8;
}

.logo-icon {
  font-size: 30px;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
  transition: transform 0.3s;
}
.brand:hover .logo-icon {
  transform: scale(1.1) rotate(-5deg);
}

.brand-text {
  display: flex;
  flex-direction: column;
}

.logo {
  font-size: 18px;
  font-weight: 800;
  color: #1f2937;
  letter-spacing: -0.3px;
  background: linear-gradient(135deg, #409eff, #6a5acd);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.slogan {
  font-size: 11px;
  color: #aaa;
  letter-spacing: 1px;
}

@media (max-width: 768px) {
  .app-header {
    padding: 0 16px;
  }
  .slogan {
    display: none;
  }
}
</style>
