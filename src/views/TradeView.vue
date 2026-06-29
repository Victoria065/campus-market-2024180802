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
          <span v-if="item.status !== 'selling'" class="cover-badge">{{ statusLabel(item.status) }}</span>
        </div>
        <div class="goods-info">
          <span class="goods-category">{{ item.category }}</span>
          <h3>{{ item.title }}</h3>
          <p class="goods-condition">{{ item.condition }}</p>
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

/* ── banner ── */
.page-banner {
  border-radius: 14px;
  padding: 32px 28px;
  margin-bottom: 24px;
  color: #fff;
}
.banner-trade { background: linear-gradient(135deg, #409eff, #2d6cdf); }
.banner-text h1 { font-size: 26px; font-weight: 800; margin-bottom: 4px; }
.banner-text p  { font-size: 14px; opacity: .85; }

/* ── tabs ── */
.category-tabs {
  display: flex; gap: 10px; margin-bottom: 24px; flex-wrap: wrap;
}
.tab {
  padding: 8px 18px; border-radius: 22px; font-size: 13px; font-weight: 500;
  color: #555; background: #fff; border: 1px solid #e5e5e5;
  cursor: pointer; transition: all .2s; user-select: none;
}
.tab:hover { border-color: #409eff; color: #409eff; }
.tab.active {
  background: #409eff; color: #fff; border-color: #409eff;
  box-shadow: 0 4px 12px rgba(64,158,255,.35);
}

/* ── loading ── */
.loading-box {
  text-align: center; padding: 80px 0; color: #999;
}
.spinner {
  display: inline-block; width: 32px; height: 32px;
  border: 3px solid #e5e5e5; border-top-color: #409eff;
  border-radius: 50%; animation: spin .7s linear infinite; margin-bottom: 12px;
}
@keyframes spin { to { transform: rotate(360deg); } }

/* ── grid ── */
.goods-grid {
  display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px;
}
.goods-card {
  background: #fff; border-radius: 12px; overflow: hidden;
  text-decoration: none; color: inherit;
  border: 1px solid #f0f0f0;
  transition: all .25s;
}
.goods-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 28px rgba(0,0,0,.1);
  border-color: #d0d7ff;
}
.goods-card.is-closed { opacity: .55; }

.goods-cover {
  height: 110px; background: linear-gradient(135deg, #f0f4ff, #e8edfc);
  display: flex; align-items: center; justify-content: center; position: relative;
}
.goods-emoji { font-size: 42px; }
.cover-badge {
  position: absolute; top: 8px; right: 8px;
  font-size: 11px; background: rgba(0,0,0,.5); color: #fff;
  padding: 3px 8px; border-radius: 4px;
}

.goods-info { padding: 14px; }
.goods-category {
  font-size: 11px; background: #ecf5ff; color: #409eff;
  padding: 3px 8px; border-radius: 4px; display: inline-block; margin-bottom: 8px;
}
.goods-info h3 {
  font-size: 14px; font-weight: 600; color: #222;
  margin-bottom: 4px;
  overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
}
.goods-condition { font-size: 12px; color: #999; margin-bottom: 10px; }
.goods-bottom { display: flex; justify-content: space-between; align-items: center; }
.goods-price { font-size: 20px; font-weight: 800; color: #f56c6c; }
.goods-location { font-size: 12px; color: #aaa; }
</style>
