import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export interface FavoriteItem {
  type: string   // 'trade' | 'lostFound' | 'groupBuy' | 'errand'
  id: number
  title: string
  addedAt: string
}

export const useFavoriteStore = defineStore('favorite', () => {
  // ==================== State ====================
  const items = ref<FavoriteItem[]>([])

  // ==================== Getters ====================
  const count = computed(() => items.value.length)

  function isFavorited(type: string, id: number): boolean {
    return items.value.some((item) => item.type === type && item.id === id)
  }

  function favoritedByType(type: string): FavoriteItem[] {
    return items.value.filter((item) => item.type === type)
  }

  // ==================== Actions ====================
  function toggleFavorite(type: string, id: number, title: string) {
    if (isFavorited(type, id)) {
      removeFavorite(type, id)
    } else {
      addFavorite(type, id, title)
    }
  }

  function addFavorite(type: string, id: number, title: string) {
    if (!isFavorited(type, id)) {
      items.value.push({
        type,
        id,
        title,
        addedAt: new Date().toLocaleString('zh-CN', { hour12: false }),
      })
    }
  }

  function removeFavorite(type: string, id: number) {
    const index = items.value.findIndex(
      (item) => item.type === type && item.id === id
    )
    if (index !== -1) {
      items.value.splice(index, 1)
    }
  }

  return {
    // state
    items,
    // getters
    count,
    isFavorited,
    favoritedByType,
    // actions
    toggleFavorite,
    addFavorite,
    removeFavorite,
  }
})
