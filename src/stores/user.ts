import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { getUserByStudentId, createUser, type UserInfo } from '../api/auth'

const STORAGE_KEY = 'campus_market_user'

interface StoredUser {
  userId: string
  username: string
  studentId: string
  college: string
  grade: string
  avatar: string
  registerTime: string
  token: string
}

function loadFromStorage(): StoredUser | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return JSON.parse(raw) as StoredUser
  } catch { /* ignore parse errors */ }
  return null
}

function saveToStorage(data: StoredUser) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}

function clearStorage() {
  localStorage.removeItem(STORAGE_KEY)
}

export const useUserStore = defineStore('user', () => {
  // ==================== 初始化（从 localStorage 恢复） ====================
  const saved = loadFromStorage()

  const userId = ref<string>(saved?.userId ?? '')
  const username = ref<string>(saved?.username ?? '')
  const studentId = ref<string>(saved?.studentId ?? '')
  const college = ref<string>(saved?.college ?? '')
  const grade = ref<string>(saved?.grade ?? '')
  const avatar = ref<string>(saved?.avatar ?? '👨‍🎓')
  const registerTime = ref<string>(saved?.registerTime ?? '')
  const token = ref<string>(saved?.token ?? '')

  // ==================== Getters ====================
  const isLoggedIn = computed(() => !!token.value)
  const displayName = computed(() => username.value)
  const displayAvatar = computed(() => avatar.value)

  // ==================== Actions ====================
  /** 登录：通过学号和密码校验 */
  async function login(stuId: string, password: string): Promise<void> {
    const user = await getUserByStudentId(stuId)
    if (!user) {
      throw new Error('学号不存在，请检查后重试')
    }
    if (user.password !== password) {
      throw new Error('密码错误，请重试')
    }

    // 登录成功 → 设置状态
    userId.value = user.id
    username.value = user.username
    studentId.value = user.studentId
    college.value = user.college
    grade.value = user.grade
    avatar.value = user.avatar
    registerTime.value = user.registerTime
    token.value = 'mock-token-' + user.id + '-' + Date.now()

    // 持久化到 localStorage
    syncToStorage()
  }

  /** 注册新用户并自动登录 */
  async function register(data: {
    username: string
    studentId: string
    password: string
    college: string
    grade: string
    avatar: string
  }): Promise<void> {
    // 检查学号是否已存在
    const existing = await getUserByStudentId(data.studentId)
    if (existing) {
      throw new Error('该学号已被注册，请直接登录')
    }

    const newUser = await createUser({
      username: data.username,
      studentId: data.studentId,
      password: data.password,
      college: data.college,
      grade: data.grade,
      avatar: data.avatar,
      registerTime: new Date().toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' }),
    })

    // 注册成功 → 自动登录
    userId.value = newUser.id
    username.value = newUser.username
    studentId.value = newUser.studentId
    college.value = newUser.college
    grade.value = newUser.grade
    avatar.value = newUser.avatar
    registerTime.value = newUser.registerTime
    token.value = 'mock-token-' + newUser.id + '-' + Date.now()

    syncToStorage()
  }

  /** 退出登录 */
  function logout() {
    userId.value = ''
    username.value = ''
    studentId.value = ''
    college.value = ''
    grade.value = ''
    avatar.value = '👨‍🎓'
    registerTime.value = ''
    token.value = ''
    clearStorage()
  }

  /** 更新用户资料 */
  function updateProfile(partial: Partial<{
    username: string
    studentId: string
    college: string
    grade: string
    avatar: string
  }>) {
    if (partial.username !== undefined) username.value = partial.username
    if (partial.studentId !== undefined) studentId.value = partial.studentId
    if (partial.college !== undefined) college.value = partial.college
    if (partial.grade !== undefined) grade.value = partial.grade
    if (partial.avatar !== undefined) avatar.value = partial.avatar
    syncToStorage()
  }

  /** 同步状态到 localStorage */
  function syncToStorage() {
    saveToStorage({
      userId: userId.value,
      username: username.value,
      studentId: studentId.value,
      college: college.value,
      grade: grade.value,
      avatar: avatar.value,
      registerTime: registerTime.value,
      token: token.value,
    })
  }

  return {
    // state
    userId,
    username,
    studentId,
    college,
    grade,
    avatar,
    registerTime,
    token,
    // getters
    isLoggedIn,
    displayName,
    displayAvatar,
    // actions
    login,
    register,
    logout,
    updateProfile,
  }
})
