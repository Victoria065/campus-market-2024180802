<template>
  <main class="page">
    <div class="page-banner banner-lost">
      <div class="banner-text">
        <h1>🔍 失物招领</h1>
        <p>丢了东西？捡到东西？在这里发布，让失物早日回家</p>
      </div>
    </div>

    <div class="filter-bar">
      <span
        v-for="f in filters"
        :key="f.value"
        class="filter-btn"
        :class="{ active: activeFilter === f.value }"
        @click="activeFilter = f.value"
      >{{ f.label }}</span>
    </div>

    <div v-if="loading" class="loading-box">
      <span class="spinner"></span>
      <p>正在加载...</p>
    </div>

    <div v-else-if="filteredList.length" class="lost-list">
      <div
        v-for="item in filteredList"
        :key="item.id"
        class="lost-card"
        :class="{ 'is-closed': item.status === 'closed' }"
      >
        <div class="lost-icon-wrap" :class="item.type">
          <span>{{ item.type === 'lost' ? '😢' : '😊' }}</span>
        </div>
        <div class="lost-body">
          <div class="lost-header">
            <span class="lost-type" :class="item.type">
              {{ item.type === 'lost' ? '寻物启事' : '失物招领' }}
            </span>
            <span class="lost-category">{{ item.category }}</span>
            <span v-if="item.status === 'closed'" class="closed-badge">已关闭</span>
          </div>
          <h3>{{ item.itemName }}</h3>
          <p class="lost-desc">{{ item.description }}</p>
          <div class="lost-info">
            <span>📍 {{ item.location }}</span>
            <span>🕐 {{ item.date }}</span>
            <span>👤 {{ item.contactName }}</span>
          </div>
        </div>
      </div>
    </div>

    <EmptyState v-else message="暂无信息" hint="还没有人发布失物招领信息" />
  </main>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { getLostFounds, type LostFoundItem } from '../api/lostFound'
import EmptyState from '../components/EmptyState.vue'

const items = ref<LostFoundItem[]>([])
const loading = ref(true)
const activeFilter = ref('all')

const filters = [
  { label: '全部', value: 'all' },
  { label: '寻物启事', value: 'lost' },
  { label: '失物招领', value: 'found' }
]

const filteredList = computed(() => {
  if (activeFilter.value === 'all') return items.value
  return items.value.filter((i) => i.type === activeFilter.value)
})

onMounted(async () => {
  try { items.value = await getLostFounds() } finally { loading.value = false }
})
</script>

<style scoped>
.page { padding: 0; }

.page-banner {
  border-radius: 16px; padding: 36px 32px; margin-bottom: 24px; color: #fff;
  position: relative; overflow: hidden;
}
.banner-lost {
  background: linear-gradient(135deg, #e6a23c, #d48806);
  box-shadow: 0 4px 20px rgba(230, 162, 60, 0.2);
}
.banner-text h1 { font-size: 28px; font-weight: 800; margin-bottom: 6px; }
.banner-text p  { font-size: 14px; opacity: .85; }

.filter-bar { display: flex; gap: 10px; margin-bottom: 24px; flex-wrap: wrap; }
.filter-btn {
  padding: 8px 20px; border-radius: 24px; font-size: 13px; font-weight: 500;
  color: #555; background: #fff; border: 1.5px solid #e8e8e8;
  cursor: pointer; transition: all .25s; user-select: none;
}
.filter-btn:hover { border-color: #e6a23c; color: #e6a23c; background: #fffbf5; }
.filter-btn.active {
  background: linear-gradient(135deg, #e6a23c, #f0b954);
  color: #fff; border-color: transparent;
  box-shadow: 0 4px 14px rgba(230, 162, 60, .35);
}

.loading-box { text-align: center; padding: 80px 0; color: #999; }
.spinner {
  display: inline-block; width: 36px; height: 36px;
  border: 3px solid #e8e8e8; border-top-color: #e6a23c;
  border-radius: 50%; animation: spin .7s linear infinite; margin-bottom: 14px;
}
@keyframes spin { to { transform: rotate(360deg); } }

.lost-list { display: flex; flex-direction: column; gap: 14px; }
.lost-card {
  display: flex; gap: 20px;
  background: #fff; border: 1px solid #f0f0f0; border-radius: 14px;
  padding: 22px; transition: all .3s ease;
}
.lost-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 28px rgba(0, 0, 0, .08);
  border-color: #e0d8c0;
}
.lost-card.is-closed { opacity: .45; }
.lost-card.is-closed:hover { opacity: .65; }

.lost-icon-wrap {
  width: 60px; height: 60px; border-radius: 16px;
  display: flex; align-items: center; justify-content: center;
  font-size: 30px; flex-shrink: 0;
  transition: transform .3s;
}
.lost-card:hover .lost-icon-wrap { transform: scale(1.08); }
.lost-icon-wrap.lost  { background: linear-gradient(135deg, #fef0f0, #ffe0e0); }
.lost-icon-wrap.found { background: linear-gradient(135deg, #f0f9eb, #ddf0d0); }

.lost-body { flex: 1; min-width: 0; }
.lost-header { display: flex; gap: 8px; align-items: center; margin-bottom: 10px; flex-wrap: wrap; }
.lost-type {
  font-size: 12px; font-weight: 600; padding: 4px 12px; border-radius: 6px;
}
.lost-type.lost  { background: #fef0f0; color: #e63946; }
.lost-type.found { background: #f0f9eb; color: #409e3f; }
.lost-category {
  font-size: 12px; background: #f5f5f5; color: #888;
  padding: 4px 12px; border-radius: 6px;
}
.closed-badge {
  font-size: 11px; background: #fef0f0; color: #f56c6c;
  padding: 3px 10px; border-radius: 4px; font-weight: 600;
}

.lost-body h3 { font-size: 18px; font-weight: 700; color: #222; margin-bottom: 6px; }
.lost-desc {
  font-size: 13px; color: #888; margin-bottom: 12px; line-height: 1.6;
  display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;
}
.lost-info {
  display: flex; gap: 20px; font-size: 12px; color: #aaa;
  flex-wrap: wrap; padding-top: 12px; border-top: 1px solid #f5f5f5;
}
</style>
