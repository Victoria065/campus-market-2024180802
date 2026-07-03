<template>
  <main class="auth-page">
    <div class="auth-card">
      <div class="auth-header">
        <router-link to="/" class="auth-logo">🏫 校园轻集市</router-link>
        <h1>注册</h1>
        <p>创建你的校园账号，开启校园互助之旅</p>
      </div>

      <form class="auth-form" @submit.prevent="handleRegister">
        <div class="field">
          <label>头像</label>
          <div class="avatar-picker">
            <button
              v-for="e in avatarOptions"
              :key="e"
              type="button"
              class="avatar-opt"
              :class="{ selected: form.avatar === e }"
              @click="form.avatar = e"
            >{{ e }}</button>
          </div>
        </div>

        <div class="field-row">
          <div class="field">
            <label>用户名</label>
            <el-input v-model="form.username" placeholder="你的昵称" size="large" clearable />
          </div>
          <div class="field">
            <label>学号 <span class="required">*</span></label>
            <el-input v-model="form.studentId" placeholder="用于登录" size="large" clearable />
          </div>
        </div>

        <div class="field-row">
          <div class="field">
            <label>密码 <span class="required">*</span></label>
            <el-input v-model="form.password" type="password" placeholder="至少6位" size="large" show-password />
          </div>
          <div class="field">
            <label>确认密码 <span class="required">*</span></label>
            <el-input v-model="form.confirmPassword" type="password" placeholder="再次输入密码" size="large" show-password />
          </div>
        </div>

        <div class="field-row">
          <div class="field">
            <label>学院</label>
            <el-input v-model="form.college" placeholder="例如：计算机学院" size="large" clearable />
          </div>
          <div class="field">
            <label>年级</label>
            <el-input v-model="form.grade" placeholder="例如：2024级" size="large" clearable />
          </div>
        </div>

        <el-button
          type="primary"
          size="large"
          native-type="submit"
          :loading="submitting"
          class="submit-btn"
        >
          注 册
        </el-button>
      </form>

      <div class="auth-footer">
        已有账号？
        <router-link to="/login">去登录 →</router-link>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { useUserStore } from '../stores/user'

const router = useRouter()
const userStore = useUserStore()

const avatarOptions = ['👨‍🎓', '👩‍🎓', '😊', '😎', '🤓', '🦊', '🐱', '🐶', '🌟', '🎓']

const form = reactive({
  avatar: '👨‍🎓',
  username: '',
  studentId: '',
  password: '',
  confirmPassword: '',
  college: '',
  grade: '',
})

const submitting = ref(false)

async function handleRegister() {
  if (!form.username.trim()) { ElMessage.warning('请输入用户名'); return }
  if (!form.studentId.trim()) { ElMessage.warning('请输入学号'); return }
  if (!form.password || form.password.length < 6) { ElMessage.warning('密码至少6位'); return }
  if (form.password !== form.confirmPassword) { ElMessage.warning('两次密码不一致'); return }

  submitting.value = true
  try {
    await userStore.register({
      username: form.username.trim(),
      studentId: form.studentId.trim(),
      password: form.password,
      college: form.college.trim() || '未填写',
      grade: form.grade.trim() || '未填写',
      avatar: form.avatar,
    })
    ElMessage.success('注册成功，欢迎加入校园轻集市！')
    router.push('/')
  } catch (err: any) {
    ElMessage.error(err.message || '注册失败，请重试')
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
  max-width: 520px;
  background: #fff;
  border-radius: 20px;
  padding: 40px 40px 32px;
  box-shadow: 0 8px 40px rgba(0, 0, 0, .08);
}

.auth-header {
  text-align: center;
  margin-bottom: 32px;
}

.auth-logo {
  display: inline-block;
  font-size: 18px;
  font-weight: 700;
  color: #4f46e5;
  text-decoration: none;
  margin-bottom: 16px;
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
  gap: 18px;
}

.field label {
  display: block;
  font-size: 13px;
  font-weight: 600;
  color: #475569;
  margin-bottom: 6px;
}

.field { flex: 1; }

.required { color: #ef4444; }

.avatar-picker {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.avatar-opt {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 2px solid #e2e8f0;
  background: #f8fafc;
  font-size: 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all .2s;
  padding: 0;
}

.avatar-opt:hover {
  border-color: #4f46e5;
  transform: scale(1.1);
}

.avatar-opt.selected {
  border-color: #4f46e5;
  background: #eef2ff;
  box-shadow: 0 0 0 3px rgba(79, 70, 229, .15);
}

.field-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
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

@media (max-width: 500px) {
  .field-row { grid-template-columns: 1fr; }
  .auth-card { padding: 32px 20px 24px; }
}
</style>
