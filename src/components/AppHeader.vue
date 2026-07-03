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
    <div class="header-right">
      <!-- 未登录 -->
      <template v-if="!userStore.isLoggedIn">
        <router-link to="/login" class="login-btn">登录</router-link>
        <router-link to="/register" class="register-btn">注册</router-link>
      </template>
      <!-- 已登录 -->
      <el-dropdown v-else trigger="click" @command="handleCommand">
        <div class="user-badge">
          <span class="user-avatar">{{ userStore.displayAvatar }}</span>
          <span class="user-name">{{ userStore.displayName }}</span>
          <span class="arrow-down">▾</span>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="profile">
              <router-link to="/user" class="dropdown-link">👤 个人中心</router-link>
            </el-dropdown-item>
            <el-dropdown-item command="publish">
              <router-link to="/publish" class="dropdown-link">📝 发布信息</router-link>
            </el-dropdown-item>
            <el-dropdown-item command="messages">
              <router-link to="/message" class="dropdown-link">💬 消息中心</router-link>
            </el-dropdown-item>
            <el-dropdown-item divided command="logout">
              <span class="logout-text">🚪 退出登录</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ElMessageBox } from 'element-plus'
import AppNav from './AppNav.vue'
import { useUserStore } from '@/stores/user'

const router = useRouter()
const userStore = useUserStore()

async function handleCommand(cmd: string) {
  if (cmd === 'logout') {
    try {
      await ElMessageBox.confirm('确定要退出登录吗？', '退出登录', {
        confirmButtonText: '确定退出',
        cancelButtonText: '取消',
        type: 'warning',
      })
      userStore.logout()
      router.push('/')
    } catch {
      // 用户取消
    }
  }
}
</script>

<style scoped>
.app-header {
  height: 64px;
  padding: 0 32px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: rgba(255, 255, 255, 0.88);
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
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
.brand:hover { opacity: 0.8; }

.logo-icon {
  font-size: 30px;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
  transition: transform 0.3s;
}
.brand:hover .logo-icon { transform: scale(1.1) rotate(-5deg); }

.brand-text { display: flex; flex-direction: column; }

.logo {
  font-size: 18px;
  font-weight: 800;
  color: #1f2937;
  letter-spacing: -0.3px;
  background: linear-gradient(135deg, #4f46e5, #7c3aed);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.slogan { font-size: 11px; color: #aaa; letter-spacing: 1px; }

/* ── Header Right ── */
.header-right { display: flex; align-items: center; gap: 10px; }

.login-btn, .register-btn {
  padding: 7px 20px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 600;
  text-decoration: none;
  transition: all .2s;
}

.login-btn {
  color: #4f46e5;
  border: 1.5px solid #4f46e5;
}
.login-btn:hover {
  background: #eef2ff;
}

.register-btn {
  color: #fff;
  background: linear-gradient(135deg, #4f46e5, #7c3aed);
}
.register-btn:hover {
  opacity: .9;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(79, 70, 229, .3);
}

/* ── User Badge ── */
.user-badge {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 14px;
  border-radius: 24px;
  background: linear-gradient(135deg, #f5f3ff, #ede9fe);
  cursor: pointer;
  transition: all 0.2s ease;
  border: 1px solid transparent;
  user-select: none;
}
.user-badge:hover {
  background: linear-gradient(135deg, #ede9fe, #ddd6fe);
  border-color: #c4b5e0;
}

.user-avatar { font-size: 20px; }
.user-name { font-size: 13px; font-weight: 600; color: #5b3cc4; }
.arrow-down { font-size: 10px; color: #a78bfa; margin-left: 2px; }

.dropdown-link {
  text-decoration: none;
  color: inherit;
  display: block;
  width: 100%;
}

.logout-text { color: #ef4444; }

@media (max-width: 768px) {
  .app-header { padding: 0 16px; }
  .slogan { display: none; }
  .user-name { display: none; }
  .register-btn { display: none; }
}
</style>
