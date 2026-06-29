<template>
  <main class="page">
    <div class="page-banner banner-group">
      <div class="banner-text">
        <h1>👥 拼单搭子</h1>
        <p>拼外卖、找搭子、组队伍，校园生活不孤单</p>
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

    <div v-else-if="filteredList.length" class="group-list">
      <div
        v-for="item in filteredList"
        :key="item.id"
        class="group-card"
        :class="{ 'is-closed': item.status !== 'recruiting' }"
      >
        <div class="card-top">
          <span class="group-type" :class="typeClass(item.type)">{{ item.type }}</span>
          <span class="group-deadline">⏰ {{ item.deadline }} 截止</span>
        </div>
        <h3>{{ item.title }}</h3>
        <p class="group-desc">{{ item.description }}</p>

        <div class="progress-wrap">
          <div class="progress-bar">
            <div
              class="progress-fill"
              :style="{ width: progressPercent(item) + '%' }"
              :class="progressColor(item)"
            ></div>
          </div>
          <span class="progress-text">{{ item.currentCount }}/{{ item.targetCount }}人</span>
          <span v-if="item.status === 'full'" class="end-tag full">已满员</span>
          <span v-else-if="item.status !== 'recruiting'" class="end-tag over">已结束</span>
        </div>

        <div class="group-footer">
          <div class="footer-avatar">🧑</div>
          <span>{{ item.organizer }}</span>
          <span class="footer-divider">·</span>
          <span>📍 {{ item.location }}</span>
        </div>
      </div>
    </div>

    <EmptyState v-else message="暂无拼单信息" hint="还没有人发起拼单或搭子组队" />
  </main>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { getGroupBuys, type GroupBuyItem } from '../api/groupBuy'
import EmptyState from '../components/EmptyState.vue'

const items = ref<GroupBuyItem[]>([])
const loading = ref(true)
const activeFilter = ref('all')

const filters = [
  { label: '全部', value: 'all' },
  { label: '外卖拼单', value: '外卖拼单' },
  { label: '学习搭子', value: '学习搭子' },
  { label: '运动组队', value: '运动组队' },
  { label: '兴趣小组', value: '兴趣小组' }
]

const filteredList = computed(() => {
  if (activeFilter.value === 'all') return items.value
  return items.value.filter((i) => i.type === activeFilter.value)
})

function typeClass(type: string): string {
  const map: Record<string, string> = {
    '外卖拼单': 't-food', '学习搭子': 't-study',
    '运动组队': 't-sport', '兴趣小组': 't-hobby'
  }
  return map[type] || ''
}

function progressPercent(item: GroupBuyItem): number {
  return Math.min(Math.round((item.currentCount / item.targetCount) * 100), 100)
}

function progressColor(item: GroupBuyItem): string {
  const pct = progressPercent(item)
  if (pct >= 100) return 'fill-full'
  if (pct >= 60) return 'fill-high'
  return 'fill-low'
}

onMounted(async () => {
  try { items.value = await getGroupBuys() } finally { loading.value = false }
})
</script>

<style scoped>
.page { padding: 0; }

.page-banner {
  border-radius: 14px; padding: 32px 28px; margin-bottom: 24px; color: #fff;
}
.banner-group { background: linear-gradient(135deg, #6a5acd, #7c3aed); }
.banner-text h1 { font-size: 26px; font-weight: 800; margin-bottom: 4px; }
.banner-text p  { font-size: 14px; opacity: .85; }

.filter-bar { display: flex; gap: 10px; margin-bottom: 24px; flex-wrap: wrap; }
.filter-btn {
  padding: 8px 18px; border-radius: 22px; font-size: 13px; font-weight: 500;
  color: #555; background: #fff; border: 1px solid #e5e5e5;
  cursor: pointer; transition: all .2s; user-select: none;
}
.filter-btn:hover { border-color: #6a5acd; color: #6a5acd; }
.filter-btn.active {
  background: #6a5acd; color: #fff; border-color: #6a5acd;
  box-shadow: 0 4px 12px rgba(106,90,205,.35);
}

.loading-box { text-align: center; padding: 80px 0; color: #999; }
.spinner {
  display: inline-block; width: 32px; height: 32px;
  border: 3px solid #e5e5e5; border-top-color: #6a5acd;
  border-radius: 50%; animation: spin .7s linear infinite; margin-bottom: 12px;
}
@keyframes spin { to { transform: rotate(360deg); } }

.group-list { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; }
.group-card {
  background: #fff; border: 1px solid #f0f0f0; border-radius: 12px;
  padding: 22px; transition: all .25s;
}
.group-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 28px rgba(0,0,0,.09);
}
.group-card.is-closed { opacity: .5; }

.card-top {
  display: flex; justify-content: space-between; align-items: center;
  margin-bottom: 12px;
}
.group-type {
  font-size: 12px; font-weight: 600; padding: 4px 12px; border-radius: 12px;
}
.t-food  { background: #fff0f0; color: #e63946; }
.t-study { background: #ecf5ff; color: #409eff; }
.t-sport { background: #f0f9eb; color: #409e3f; }
.t-hobby { background: #fef7ed; color: #e6a23c; }
.group-deadline { font-size: 12px; color: #aaa; }

.group-card h3 { font-size: 17px; font-weight: 700; color: #222; margin-bottom: 6px; }
.group-desc {
  font-size: 13px; color: #888; margin-bottom: 16px; line-height: 1.5;
  display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;
}

.progress-wrap {
  display: flex; align-items: center; gap: 10px;
  padding: 12px 14px; background: #f9fafb; border-radius: 10px;
  margin-bottom: 14px;
}
.progress-bar { flex: 1; height: 8px; background: #e5e7eb; border-radius: 4px; overflow: hidden; }
.progress-fill { height: 100%; border-radius: 4px; transition: width .5s ease; }
.fill-low  { background: linear-gradient(90deg, #409eff, #6aaaff); }
.fill-high { background: linear-gradient(90deg, #e6a23c, #f0b954); }
.fill-full { background: linear-gradient(90deg, #67c23a, #85d452); }
.progress-text { font-size: 13px; font-weight: 600; color: #555; white-space: nowrap; }
.end-tag { font-size: 11px; padding: 2px 8px; border-radius: 10px; white-space: nowrap; font-weight: 600; }
.end-tag.full { background: #f0f9eb; color: #409e3f; }
.end-tag.over { background: #f5f5f5; color: #999; }

.group-footer {
  display: flex; align-items: center; gap: 6px;
  font-size: 12px; color: #aaa; border-top: 1px solid #f5f5f5; padding-top: 12px;
}
.footer-avatar {
  width: 24px; height: 24px; background: #f0f0f0; border-radius: 50%;
  display: flex; align-items: center; justify-content: center; font-size: 14px;
}
.footer-divider { color: #ddd; }
</style>
