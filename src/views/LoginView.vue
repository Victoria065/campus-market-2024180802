<template>
  <main class="auth-page">
    <div class="auth-card">
      <div class="auth-header">
        <router-link to="/" class="auth-logo">🏫 校园轻集市</router-link>
        <h1>登录</h1>
        <p>欢迎回来，请登录你的账号</p>
      </div>

      <form class="auth-form" @submit.prevent="handleLogin">
        <div class="field">
          <label>学号</label>
          <el-input
            v-model="form.studentId"
            placeholder="请输入学号"
            size="large"
            clearable
            :prefix-icon="User"
          />
        </div>
        <div class="field">
          <label>密码</label>
          <el-input
            v-model="form.password"
            type="password"
            placeholder="请输入密码"
            size="large"
            show-password
            :prefix-icon="Lock"
            @keyup.enter="handleLogin"
          />
        </div>

        <el-button
          type="primary"
          size="large"
          native-type="submit"
          :loading="submitting"
          class="submit-btn"
        >
          登 录
        </el-button>
      </form>

      <div class="auth-footer">
        还没有账号？
        <router-link to="/register">立即注册 →</router-link>
      </div>

      <div class="demo-hint">
        💡 演示账号：学号 <code>20241101001</code> 密码 <code>123456</code>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { ElMessage } from 'element-plus'
import { User, Lock } from '@element-plus/icons-vue'
import { useUserStore } from '../stores/user'

const router = useRouter()
const route = useRoute()
const userStore = useUserStore()

const form = reactive({ studentId: '', password: '' })
const submitting = ref(false)

async function handleLogin() {
  if (!form.studentId.trim()) {
    ElMessage.warning('请输入学号')
    return
  }
  if (!form.password) {
    ElMessage.warning('请输入密码')
    return
  }

  submitting.value = true
  try {
    await userStore.login(form.studentId.trim(), form.password)
    ElMessage.success(`欢迎回来，${userStore.displayName}！`)
    const redirect = (route.query.redirect as string) || '/'
    router.push(redirect)
  } catch (err: any) {
    ElMessage.error(err.message || '登录失败，请重试')
  } finally {
    submitting.value = false
  }
}
</script>

<style scoped>
.auth-page {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 200px);
  padding: 40px 20px;
}

.auth-card {
  width: 100%;
  max-width: 420px;
  background: #fff;
  border-radius: 20px;
  padding: 48px 40px 36px;
  box-shadow: 0 8px 40px rgba(0, 0, 0, .08);
}

.auth-header {
  text-align: center;
  margin-bottom: 36px;
}

.auth-logo {
  display: inline-block;
  font-size: 18px;
  font-weight: 700;
  color: #4f46e5;
  text-decoration: none;
  margin-bottom: 20px;
}

.auth-header h1 {
  font-size: 28px;
  font-weight: 800;
  color: #1e293b;
  margin-bottom: 6px;
}

.auth-header p {
  font-size: 14px;
  color: #94a3b8;
}

.auth-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.field label {
  display: block;
  font-size: 13px;
  font-weight: 600;
  color: #475569;
  margin-bottom: 6px;
}

.submit-btn {
  width: 100%;
  margin-top: 8px;
  height: 48px;
  font-size: 16px;
  font-weight: 700;
  letter-spacing: 2px;
  border-radius: 12px;
  background: linear-gradient(135deg, #4f46e5, #7c3aed) !important;
  border: none !important;
}

.submit-btn:hover {
  opacity: .9;
}

.auth-footer {
  text-align: center;
  margin-top: 24px;
  font-size: 14px;
  color: #94a3b8;
}

.auth-footer a {
  color: #4f46e5;
  font-weight: 600;
  text-decoration: none;
}

.demo-hint {
  text-align: center;
  margin-top: 20px;
  padding: 12px;
  background: #fefce8;
  border-radius: 10px;
  font-size: 12px;
  color: #a16207;
  line-height: 1.8;
}

.demo-hint code {
  background: #fef3c7;
  padding: 2px 6px;
  border-radius: 4px;
  font-weight: 600;
}
</style>
