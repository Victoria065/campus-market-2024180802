<template>
  <div class="app-layout">
    <AppHeader />
    <main class="app-main">
      <router-view />
    </main>
    <footer class="app-footer">
      <p>校园轻集市 · 让校园生活更简单</p>
    </footer>
  </div>
</template>
<script setup lang="ts">
import AppHeader from './AppHeader.vue'
</script>
<style>
/* 全局重置 */
* { margin: 0; padding: 0; box-sizing: border-box; }
body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "PingFang SC", "Microsoft YaHei", sans-serif; }
</style>
<style scoped>
.app-layout {
  min-height: 100vh;
  background: #f5f7fb;
}
.app-main {
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px;
}
.app-footer {
  text-align: center;
  padding: 24px;
  font-size: 13px;
  color: #bbb;
  border-top: 1px solid #f0f0f0;
  margin-top: 40px;
}
</style>
