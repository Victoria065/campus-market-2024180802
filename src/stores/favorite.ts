import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'

export interface FavoriteItem {
  type: string   // 'trade' | 'lostFound' | 'groupBuy' | 'errand'
  id: number | string
  title: string
  addedAt: string
}

/** 按当前登录用户获取 localStorage key */
function getStorageKey(): string {
  try {
    const raw = localStorage.getItem('campus_market_user')
    if (raw) {
      const user = JSON.parse(raw) as { userId?: string }
      if (user.userId) return `campus_market_favorites_${user.userId}`
    }
  } catch { /* ignore */ }
  return 'campus_market_favorites_anonymous'
}

function loadFromStorage(): FavoriteItem[] {
  try {
    const raw = localStorage.getItem(getStorageKey())
    if (raw) return JSON.parse(raw) as FavoriteItem[]
  } catch { /* ignore */ }
  return []
}

function saveToStorage(items: FavoriteItem[]) {
  localStorage.setItem(getStorageKey(), JSON.stringify(items))
}

export const useFavoriteStore = defineStore('favorite', () => {
  const items = ref<FavoriteItem[]>(loadFromStorage())

  // ==================== Getters ====================
  const count = computed(() => items.value.length)

  function isFavorited(type: string, id: number | string): boolean {
    return items.value.some((item) => item.type === type && item.id === id)
  }

  function favoritedByType(type: string): FavoriteItem[] {
    return items.value.filter((item) => item.type === type)
  }

  // ==================== Actions ====================
  function toggleFavorite(type: string, id: number | string, title: string) {
    if (isFavorited(type, id)) {
      removeFavorite(type, id)
    } else {
      addFavorite(type, id, title)
    }
  }

  function addFavorite(type: string, id: number | string, title: string) {
    if (!isFavorited(type, id)) {
      items.value.push({
        type,
        id,
        title,
        addedAt: new Date().toLocaleString('zh-CN', { hour12: false }),
      })
      saveToStorage(items.value)
    }
  }

  function removeFavorite(type: string, id: number | string) {
    const index = items.value.findIndex(
      (item) => item.type === type && item.id === id
    )
    if (index !== -1) {
      items.value.splice(index, 1)
      saveToStorage(items.value)
    }
  }

  /** 用户切换后重新加载该用户的收藏 */
  function reloadForCurrentUser() {
    items.value = loadFromStorage()
  }

  return {
    items,
    count,
    isFavorited,
    favoritedByType,
    toggleFavorite,
    addFavorite,
    removeFavorite,
    reloadForCurrentUser,
  }
})
