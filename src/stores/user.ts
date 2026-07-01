import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useUserStore = defineStore('user', () => {
  // ==================== 模拟用户数据 ====================
  const username = ref('张同学')
  const studentId = ref('20241101001')
  const college = ref('计算机学院')
  const grade = ref('2024级')
  const avatar = ref('👨‍🎓')
  const isLoggedIn = ref(true)
  const registerTime = ref('2024年9月1日')

  // ==================== Getters ====================
  const displayName = computed(() => username.value)
  const displayAvatar = computed(() => avatar.value)

  // ==================== Actions ====================
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
  }

  return {
    // state
    username,
    studentId,
    college,
    grade,
    avatar,
    isLoggedIn,
    registerTime,
    // getters
    displayName,
    displayAvatar,
    // actions
    updateProfile,
  }
})
