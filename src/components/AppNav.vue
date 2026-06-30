<template>
  <nav class="app-nav">
    <router-link
      v-for="item in navItems"
      :key="item.path"
      :to="item.path"
      class="nav-item"
      :class="{ active: currentRoute === item.path || currentRoute.startsWith(item.path + '/') }"
    >
      <span class="nav-icon">{{ item.icon }}</span>
      <span class="nav-label">{{ item.label }}</span>
    </router-link>
  </nav>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const currentRoute = computed(() => route.path)

const navItems = [
  { path: '/', label: '首页', icon: '🏠' },
  { path: '/trade', label: '二手交易', icon: '🛒' },
  { path: '/lost-found', label: '失物招领', icon: '🔍' },
  { path: '/group-buy', label: '拼单搭子', icon: '👥' },
  { path: '/errand', label: '跑腿委托', icon: '🏃' },
  { path: '/publish', label: '发布', icon: '📝' },
  { path: '/message', label: '消息', icon: '💬' },
  { path: '/user', label: '个人中心', icon: '👤' },
]
</script>

<style scoped>
.app-nav {
  display: flex;
  align-items: center;
  gap: 4px;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 8px 14px;
  border-radius: 10px;
  font-size: 13px;
  font-weight: 500;
  color: #666;
  text-decoration: none;
  transition: all 0.2s ease;
  position: relative;
  white-space: nowrap;
}

.nav-item:hover {
  color: #409eff;
  background: rgba(64, 158, 255, 0.06);
}

.nav-item.active {
  color: #409eff;
  background: rgba(64, 158, 255, 0.1);
  font-weight: 600;
}

.nav-icon {
  font-size: 16px;
  transition: transform 0.2s;
}

.nav-item:hover .nav-icon {
  transform: translateY(-1px);
}

.nav-label {
  letter-spacing: 0.3px;
}

@media (max-width: 900px) {
  .nav-label {
    display: none;
  }

  .nav-item {
    padding: 8px 10px;
  }

  .nav-icon {
    font-size: 18px;
  }
}
</style>
