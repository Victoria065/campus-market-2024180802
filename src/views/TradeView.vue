<template>
  <main class="page">
    <div class="page-banner banner-trade">
      <div class="banner-text">
        <h1>🛒 二手交易</h1>
        <p>让闲置物品在校园里流转起来</p>
      </div>
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

    <div v-if="loading" class="loading-box">
      <span class="spinner"></span>
      <p>正在加载商品...</p>
    </div>

    <div v-else-if="filteredList.length" class="goods-grid">
      <router-link
        v-for="item in filteredList"
        :key="item.id"
        :to="`/trade/${item.id}`"
        class="goods-card"
        :class="{ 'is-closed': item.status !== 'selling' }"
      >
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
    </div>

    <EmptyState v-else message="暂无商品" hint="还没有人发布二手商品，快去发布第一个吧" />
  </main>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { getTrades, type TradeItem } from '../api/trade'
import EmptyState from '../components/EmptyState.vue'

const trades = ref<TradeItem[]>([])
const loading = ref(true)
const activeCategory = ref('全部')
const categories = ['全部', '教材教辅', '电子产品', '生活用品']

const filteredList = computed(() => {
  if (activeCategory.value === '全部') return trades.value
  return trades.value.filter((t) => t.category === activeCategory.value)
})

function categoryEmoji(cat: string): string {
  const map: Record<string, string> = { '教材教辅': '📖', '电子产品': '💻', '生活用品': '🏠' }
  return map[cat] || '📦'
}

function statusLabel(status: string): string {
  const map: Record<string, string> = { reserved: '已预定', sold: '已售出' }
  return map[status] || status
}

onMounted(async () => {
  try { trades.value = await getTrades() } finally { loading.value = false }
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

/* ── Tabs ── */
.category-tabs {
  display: flex; gap: 10px; margin-bottom: 24px; flex-wrap: wrap;
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

/* ── Loading ── */
.loading-box { text-align: center; padding: 80px 0; color: #999; }
.spinner {
  display: inline-block; width: 36px; height: 36px;
  border: 3px solid #e8e8e8; border-top-color: #409eff;
  border-radius: 50%; animation: spin .7s linear infinite; margin-bottom: 14px;
}
@keyframes spin { to { transform: rotate(360deg); } }

/* ── Grid ── */
.goods-grid {
  display: grid; grid-template-columns: repeat(4, 1fr); gap: 18px;
}

.goods-card {
  background: #fff; border-radius: 14px; overflow: hidden;
  text-decoration: none; color: inherit;
  border: 1px solid #f0f0f0;
  transition: all .3s ease;
  display: flex; flex-direction: column;
}
.goods-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 16px 36px rgba(0, 0, 0, .1);
  border-color: #d0d7ff;
}
.goods-card.is-closed { opacity: .5; }
.goods-card.is-closed:hover { opacity: .7; }

.goods-cover {
  height: 130px;
  background: linear-gradient(135deg, #f0f4ff, #e4eafc);
  display: flex; align-items: center; justify-content: center;
  position: relative;
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

@media (max-width: 1024px) {
  .goods-grid { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 640px) {
  .goods-grid { grid-template-columns: 1fr; }
}
</style>
