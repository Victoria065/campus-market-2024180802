<template>
  <main class="page">
    <div class="page-banner banner-trade">
      <div class="banner-text">
        <h1>🛒 二手交易</h1>
        <p>让闲置物品在校园里流转起来</p>
      </div>
    </div>

    <!-- 搜索 + 分类筛选 -->
    <div class="toolbar">
      <div class="search-wrap">
        <SearchBar v-model="keyword" placeholder="搜索标题、分类、地点或描述..." />
      </div>
      <div class="category-tabs">
        <span
          v-for="cat in categories"
          :key="cat"
          class="tab"
          :class="{ active: activeCategory === cat }"
          @click="activeCategory = cat"
        >{{ cat }}</span>
      </div>
    </div>

    <!-- 加载状态 -->
    <LoadingState v-if="loading" text="正在加载商品..." />

    <!-- 错误状态 -->
    <ErrorState
      v-else-if="error"
      :message="error"
      @retry="loadData"
    />

    <!-- 列表 -->
    <div v-else-if="filteredList.length" class="goods-grid">
      <div
        v-for="item in filteredList"
        :key="item.id"
        class="goods-card"
        :class="{ 'is-closed': item.status !== 'selling' }"
      >
        <router-link :to="`/trade/${item.id}`" class="goods-link">
          <div class="goods-cover">
            <span class="goods-emoji">{{ categoryEmoji(item.category) }}</span>
            <span class="goods-condition-tag">{{ item.condition }}</span>
            <span v-if="item.status !== 'selling'" class="cover-badge">{{ statusLabel(item.status) }}</span>
          </div>
          <div class="goods-info">
            <span class="goods-category">{{ item.category }}</span>
            <h3>{{ item.title }}</h3>
            <div class="goods-bottom">
              <span class="goods-price">¥{{ item.price }}</span>
              <span class="goods-location">📍 {{ item.location }}</span>
            </div>
          </div>
        </router-link>
        <button
          class="fav-btn"
          :class="{ 'is-fav': favStore.isFavorited('trade', item.id) }"
          :title="favStore.isFavorited('trade', item.id) ? '取消收藏' : '收藏'"
          @click.prevent.stop="favStore.toggleFavorite('trade', item.id, item.title)"
        >
          {{ favStore.isFavorited('trade', item.id) ? '⭐' : '☆' }}
        </button>
      </div>
    </div>

    <!-- 空状态 -->
    <EmptyState
      v-else
      :message="keyword ? '未找到匹配的商品' : '暂无商品'"
      :hint="keyword ? '试试其他关键词' : '还没有人发布二手商品，快去发布第一个吧'"
    />
  </main>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { getTrades, type TradeItem } from '../api/trade'
import EmptyState from '../components/EmptyState.vue'
import LoadingState from '../components/LoadingState.vue'
import ErrorState from '../components/ErrorState.vue'
import SearchBar from '../components/SearchBar.vue'
import { useFavoriteStore } from '../stores/favorite'

const favStore = useFavoriteStore()

const trades = ref<TradeItem[]>([])
const loading = ref(true)
const error = ref('')
const keyword = ref('')
const activeCategory = ref('全部')
const categories = ['全部', '教材教辅', '电子产品', '生活用品']

const filteredList = computed(() => {
  let list = trades.value

  // 分类筛选
  if (activeCategory.value !== '全部') {
    list = list.filter((t) => t.category === activeCategory.value)
  }

  // 关键词搜索（标题/分类/地点/描述）
  if (keyword.value.trim()) {
    const kw = keyword.value.trim().toLowerCase()
    list = list.filter((t) =>
      t.title.toLowerCase().includes(kw) ||
      t.category.toLowerCase().includes(kw) ||
      t.location.toLowerCase().includes(kw) ||
      t.description.toLowerCase().includes(kw)
    )
  }

  return list
})

function categoryEmoji(cat: string): string {
  const map: Record<string, string> = { '教材教辅': '📖', '电子产品': '💻', '生活用品': '🏠' }
  return map[cat] || '📦'
}

function statusLabel(status: string): string {
  const map: Record<string, string> = { reserved: '已预定', sold: '已售出' }
  return map[status] || status
}

async function loadData() {
  loading.value = true
  error.value = ''
  try {
    trades.value = await getTrades()
  } catch (err: any) {
    console.error('加载商品失败:', err)
    if (err?.code === 'ERR_NETWORK' || err?.message?.includes('Network')) {
      error.value = '无法连接到 Mock 服务，请确认已执行 pnpm mock'
    } else {
      error.value = '加载失败，请检查网络连接后重试'
    }
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  loadData()
})
</script>

<style scoped>
.page { padding: 0; }

/* ── Banner ── */
.page-banner {
  border-radius: 16px; padding: 36px 32px; margin-bottom: 24px; color: #fff;
  position: relative; overflow: hidden;
}
.banner-trade {
  background: linear-gradient(135deg, #409eff, #2d6cdf);
  box-shadow: 0 4px 20px rgba(64, 158, 255, 0.2);
}
.banner-text h1 { font-size: 28px; font-weight: 800; margin-bottom: 6px; }
.banner-text p  { font-size: 14px; opacity: .85; }

/* ── Toolbar ── */
.toolbar {
  margin-bottom: 20px;
}
.search-wrap {
  margin-bottom: 16px;
  max-width: 480px;
}

/* ── Tabs ── */
.category-tabs {
  display: flex; gap: 10px; flex-wrap: wrap;
}
.tab {
  padding: 8px 20px; border-radius: 24px; font-size: 13px; font-weight: 500;
  color: #555; background: #fff; border: 1.5px solid #e8e8e8;
  cursor: pointer; transition: all .25s; user-select: none;
}
.tab:hover { border-color: #409eff; color: #409eff; background: #f5f9ff; }
.tab.active {
  background: linear-gradient(135deg, #409eff, #5b8def);
  color: #fff; border-color: transparent;
  box-shadow: 0 4px 14px rgba(64, 158, 255, .35);
}

/* ── Grid ── */
.goods-grid {
  display: grid; grid-template-columns: repeat(4, 1fr); gap: 18px;
}

.goods-card {
  background: #fff; border-radius: 14px; overflow: hidden;
  border: 1px solid #f0f0f0;
  transition: all .3s ease;
  display: flex; flex-direction: column;
  position: relative;
}
.goods-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 16px 36px rgba(0, 0, 0, .1);
  border-color: #d0d7ff;
}
.goods-card.is-closed { opacity: .5; }
.goods-card.is-closed:hover { opacity: .7; }

.goods-link {
  text-decoration: none; color: inherit;
  display: flex; flex-direction: column; flex: 1;
}

.goods-cover {
  height: 130px;
  background: linear-gradient(135deg, #f1f5f9, #e2e8f0);
  display: flex; align-items: center; justify-content: center;
  position: relative; overflow: hidden;
}
.goods-emoji { font-size: 48px; transition: transform .3s; }
.goods-card:hover .goods-emoji { transform: scale(1.12); }

.goods-condition-tag {
  position: absolute; bottom: 8px; left: 8px;
  font-size: 11px; background: rgba(0,0,0,.45); color: #fff;
  padding: 3px 10px; border-radius: 10px;
  backdrop-filter: blur(4px);
}

.cover-badge {
  position: absolute; top: 10px; right: 10px;
  font-size: 11px; font-weight: 600;
  background: rgba(245, 108, 108, .85); color: #fff;
  padding: 4px 10px; border-radius: 6px;
  backdrop-filter: blur(4px);
}

.goods-info { padding: 16px; display: flex; flex-direction: column; gap: 8px; flex: 1; }
.goods-category {
  font-size: 11px; font-weight: 600;
  background: linear-gradient(135deg, #ecf5ff, #d7e6ff);
  color: #409eff; padding: 4px 10px; border-radius: 6px;
  display: inline-block; align-self: flex-start;
}
.goods-info h3 {
  font-size: 15px; font-weight: 600; color: #222; line-height: 1.4;
  overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
}
.goods-bottom { display: flex; justify-content: space-between; align-items: center; margin-top: auto; }
.goods-price { font-size: 22px; font-weight: 800; color: #f56c6c; letter-spacing: -.5px; }
.goods-location { font-size: 12px; color: #aaa; }

/* ── Favorite Button ── */
.fav-btn {
  position: absolute;
  top: 8px;
  right: 8px;
  background: rgba(255, 255, 255, 0.9);
  border: 1.5px solid #e8e8e8;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  font-size: 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all .25s;
  z-index: 2;
  padding: 0;
  line-height: 1;
  backdrop-filter: blur(4px);
}
.fav-btn:hover {
  transform: scale(1.15);
  border-color: #f0c040;
  background: rgba(255, 248, 220, 0.95);
}
.fav-btn.is-fav {
  border-color: #f0c040;
  background: rgba(255, 248, 220, 0.95);
  animation: fav-pop .3s ease;
}
@keyframes fav-pop {
  0% { transform: scale(1); }
  50% { transform: scale(1.3); }
  100% { transform: scale(1); }
}

@media (max-width: 1024px) {
  .goods-grid { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 640px) {
  .goods-grid { grid-template-columns: 1fr; }
}
</style>
