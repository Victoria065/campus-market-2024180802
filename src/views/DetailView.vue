<template>
  <main class="page">
    <div v-if="loading" class="loading-box">
      <span class="spinner"></span>
      <p>加载中...</p>
    </div>

    <div v-else-if="loadError" class="error-box">
      <div class="error-icon">😞</div>
      <p class="error-text">{{ loadError }}</p>
      <router-link to="/trade" class="back-btn">← 返回列表</router-link>
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
const loadError = ref('')

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
    const rawId = route.params.id
    // 尝试数字 ID 和字符串 ID 两种方式，兼容 JSON Server v1 的 ID 生成策略
    const numId = Number(rawId)
    if (!numId && rawId) {
      // 非数字 ID（如 UUID），直接用字符串请求
      item.value = await getTradeById(rawId as unknown as number)
    } else if (numId) {
      item.value = await getTradeById(numId)
    }
  } catch (err: any) {
    console.error('获取商品详情失败:', err)
    if (err?.response?.status === 404) {
      loadError.value = '该商品不存在或已被删除'
    } else if (err?.code === 'ERR_NETWORK' || err?.message?.includes('Network')) {
      loadError.value = '无法连接到 Mock 服务，请确认已执行 pnpm mock'
    } else {
      loadError.value = '加载失败，请检查网络连接后重试'
    }
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.page { padding: 0; }

/* loading */
.loading-box { text-align: center; padding: 80px 0; color: #999; }
.spinner {
  display: inline-block; width: 36px; height: 36px;
  border: 3px solid #e5e5e5; border-top-color: #409eff;
  border-radius: 50%; animation: spin .7s linear infinite; margin-bottom: 12px;
}
@keyframes spin { to { transform: rotate(360deg); } }

/* error */
.error-box {
  text-align: center; padding: 80px 0;
  display: flex; flex-direction: column; align-items: center; gap: 16px;
}
.error-icon { font-size: 48px; }
.error-text { font-size: 16px; color: #f56c6c; font-weight: 500; }
.back-btn {
  display: inline-block; font-size: 14px; color: #409eff;
  text-decoration: none; font-weight: 500; margin-top: 8px;
  padding: 8px 20px; border: 1px solid #409eff; border-radius: 20px;
  transition: all .2s;
}
.back-btn:hover { background: #ecf5ff; }

.empty { text-align: center; padding: 80px 0; color: #999; font-size: 14px; }

.back-link {
  display: inline-flex; align-items: center; gap: 4px;
  font-size: 13px; color: #409eff;
  text-decoration: none; margin-bottom: 18px; font-weight: 500;
  transition: all .2s;
}
.back-link:hover { gap: 8px; }

.detail-card {
  display: flex; gap: 0;
  background: #fff; border: 1px solid #f0f0f0; border-radius: 16px;
  overflow: hidden; box-shadow: 0 2px 12px rgba(0,0,0,.04);
}

.detail-cover {
  width: 340px; min-height: 340px;
  background: linear-gradient(135deg, #f0f4ff 0%, #e8edfc 50%, #f5f0ff 100%);
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
}
.cover-emoji { font-size: 96px; filter: drop-shadow(0 4px 8px rgba(0,0,0,.1)); }

.detail-body { flex: 1; padding: 32px 36px; display: flex; flex-direction: column; }
.detail-header { display: flex; gap: 8px; align-items: center; margin-bottom: 16px; flex-wrap: wrap; }
.tag {
  font-size: 12px; font-weight: 600; background: linear-gradient(135deg, #ecf5ff, #dbe8ff);
  color: #409eff; padding: 5px 14px; border-radius: 6px;
}
.condition-tag {
  font-size: 12px; font-weight: 500; background: #f5f5f5;
  color: #888; padding: 5px 14px; border-radius: 6px;
}
.status-badge {
  font-size: 12px; font-weight: 600; background: #fef0f0;
  color: #f56c6c; padding: 5px 14px; border-radius: 6px;
}

.detail-body h1 { font-size: 26px; font-weight: 800; color: #111; margin-bottom: 18px; line-height: 1.4; }

.price-row { display: flex; align-items: baseline; gap: 12px; margin-bottom: 20px; }
.price { font-size: 38px; font-weight: 800; color: #f56c6c; letter-spacing: -1px; }
.price-note { font-size: 13px; color: #bbb; }

.desc {
  font-size: 14px; color: #555; line-height: 1.9;
  padding: 18px; background: #f9fafb; border-radius: 12px;
  margin-bottom: 24px; border: 1px solid #f0f0f0;
}

.info-grid {
  display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px;
  margin-bottom: 28px; padding: 20px 0; border-top: 1px solid #f0f0f0; border-bottom: 1px solid #f0f0f0;
}
.info-item { display: flex; flex-direction: column; gap: 6px; }
.info-label { font-size: 12px; color: #aaa; }
.info-value { font-size: 14px; color: #333; font-weight: 600; }

.contact-btn {
  width: 100%; padding: 14px; font-size: 16px; font-weight: 700;
  color: #fff; background: linear-gradient(135deg, #409eff, #2d6cdf);
  border: none; border-radius: 12px; cursor: pointer;
  transition: all .2s; letter-spacing: 1px;
}
.contact-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(64,158,255,.4); }
.contact-btn:active { transform: translateY(0); }

@media (max-width: 768px) {
  .detail-card { flex-direction: column; }
  .detail-cover { width: 100%; min-height: 200px; }
  .detail-body { padding: 20px 24px; }
  .info-grid { grid-template-columns: repeat(2, 1fr); }
}
</style>
