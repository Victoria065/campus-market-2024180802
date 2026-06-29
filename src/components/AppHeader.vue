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
  background: #fff;
  border-bottom: 1px solid #f0f0f0;
  box-shadow: 0 1px 4px rgba(0,0,0,.04);
  position: sticky;
  top: 0;
  z-index: 100;
  backdrop-filter: blur(8px);
}
.brand {
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  color: inherit;
}
.logo-icon { font-size: 28px; }
.brand-text { display: flex; flex-direction: column; }
.logo {
  font-size: 18px;
  font-weight: 800;
  color: #1f2937;
  letter-spacing: -.3px;
}
.slogan {
  font-size: 11px;
  color: #aaa;
}
</style>
