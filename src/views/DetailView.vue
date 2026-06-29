<template>
  <main class="page">
    <div v-if="loading" class="loading-box">
      <span class="spinner"></span>
      <p>加载中...</p>
    </div>

    <div v-else-if="item" class="detail">
      <router-link to="/trade" class="back-link">← 返回列表</router-link>

      <div class="detail-card">
        <div class="detail-cover">
          <span class="cover-emoji">{{ coverEmoji }}</span>
        </div>
        <div class="detail-body">
          <div class="detail-header">
            <span class="tag">{{ item.category }}</span>
            <span class="condition-tag">{{ item.condition }}</span>
            <span v-if="item.status !== 'selling'" class="status-badge">{{ statusText }}</span>
          </div>

          <h1>{{ item.title }}</h1>

          <div class="price-row">
            <span class="price">¥{{ item.price }}</span>
            <span class="price-note">可小刀</span>
          </div>

          <p class="desc">{{ item.description }}</p>

          <div class="info-grid">
            <div class="info-item">
              <span class="info-label">👤 发布人</span>
              <span class="info-value">{{ item.seller }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">📍 交易地点</span>
              <span class="info-value">{{ item.location }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">🕐 发布时间</span>
              <span class="info-value">{{ item.publishTime }}</span>
            </div>
          </div>

          <button class="contact-btn">💬 联系卖家</button>
        </div>
      </div>
    </div>

    <div v-else class="empty">商品不存在或已被删除</div>
  </main>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { getTradeById, type TradeItem } from '../api/trade'

const route = useRoute()
const item = ref<TradeItem | null>(null)
const loading = ref(true)

const coverEmoji = computed(() => {
  if (!item.value) return '📦'
  const map: Record<string, string> = { '教材教辅': '📖', '电子产品': '💻', '生活用品': '🏠' }
  return map[item.value.category] || '📦'
})

const statusText = computed(() => {
  if (!item.value) return ''
  const map: Record<string, string> = { reserved: '已预定', sold: '已售出' }
  return map[item.value.status] || item.value.status
})

onMounted(async () => {
  try {
    const id = Number(route.params.id)
    if (id) item.value = await getTradeById(id)
  } finally { loading.value = false }
})
</script>

<style scoped>
.page { padding: 0; }

/* loading */
.loading-box { text-align: center; padding: 80px 0; color: #999; }
.spinner {
  display: inline-block; width: 32px; height: 32px;
  border: 3px solid #e5e5e5; border-top-color: #409eff;
  border-radius: 50%; animation: spin .7s linear infinite; margin-bottom: 12px;
}
@keyframes spin { to { transform: rotate(360deg); } }
.empty { text-align: center; padding: 80px 0; color: #999; font-size: 14px; }

.back-link {
  display: inline-block; font-size: 13px; color: #409eff;
  text-decoration: none; margin-bottom: 18px; font-weight: 500;
}
.back-link:hover { text-decoration: underline; }

.detail-card {
  display: flex; gap: 0;
  background: #fff; border: 1px solid #f0f0f0; border-radius: 16px;
  overflow: hidden;
}

.detail-cover {
  width: 340px; min-height: 320px;
  background: linear-gradient(135deg, #f0f4ff, #e8edfc);
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
}
.cover-emoji { font-size: 90px; }

.detail-body { flex: 1; padding: 28px 32px; }
.detail-header { display: flex; gap: 8px; align-items: center; margin-bottom: 14px; }
.tag {
  font-size: 12px; font-weight: 600; background: #ecf5ff;
  color: #409eff; padding: 4px 12px; border-radius: 4px;
}
.condition-tag {
  font-size: 12px; font-weight: 500; background: #f5f5f5;
  color: #888; padding: 4px 12px; border-radius: 4px;
}
.status-badge {
  font-size: 12px; font-weight: 600; background: #fef0f0;
  color: #f56c6c; padding: 4px 12px; border-radius: 4px;
}

.detail-body h1 { font-size: 24px; font-weight: 800; color: #111; margin-bottom: 16px; line-height: 1.4; }

.price-row { display: flex; align-items: baseline; gap: 10px; margin-bottom: 18px; }
.price { font-size: 36px; font-weight: 800; color: #f56c6c; }
.price-note { font-size: 13px; color: #aaa; }

.desc {
  font-size: 14px; color: #666; line-height: 1.8;
  padding: 16px; background: #f9fafb; border-radius: 10px;
  margin-bottom: 22px;
}

.info-grid {
  display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px;
  margin-bottom: 24px; padding: 18px 0; border-top: 1px solid #f0f0f0; border-bottom: 1px solid #f0f0f0;
}
.info-item { display: flex; flex-direction: column; gap: 4px; }
.info-label { font-size: 12px; color: #aaa; }
.info-value { font-size: 14px; color: #333; font-weight: 600; }

.contact-btn {
  width: 100%; padding: 14px; font-size: 16px; font-weight: 700;
  color: #fff; background: linear-gradient(135deg, #409eff, #2d6cdf);
  border: none; border-radius: 12px; cursor: pointer;
  transition: all .2s;
}
.contact-btn:hover { transform: translateY(-1px); box-shadow: 0 6px 20px rgba(64,158,255,.4); }
</style>
