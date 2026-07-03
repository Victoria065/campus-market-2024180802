<template>
  <main class="page">
    <div class="page-banner banner-group">
      <div class="banner-text">
        <h1>👥 拼单搭子</h1>
        <p>拼外卖、找搭子、组队伍，校园生活不孤单</p>
      </div>
    </div>

    <!-- 搜索 + 分类筛选 -->
    <div class="toolbar">
      <div class="search-wrap">
        <SearchBar v-model="keyword" placeholder="搜索标题、类型、地点或描述..." />
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
    </div>

    <!-- 加载状态 -->
    <LoadingState v-if="loading" text="正在加载..." />

    <!-- 错误状态 -->
    <ErrorState
      v-else-if="error"
      :message="error"
      @retry="loadData"
    />

    <!-- 列表 -->
    <div v-else-if="filteredList.length" class="group-list">
      <div
        v-for="item in filteredList"
        :key="item.id"
        class="group-card"
        :class="{ 'is-closed': item.status !== 'recruiting' }"
      >
        <button
          class="fav-btn"
          :class="{ 'is-fav': favStore.isFavorited('groupBuy', item.id) }"
          :title="favStore.isFavorited('groupBuy', item.id) ? '取消收藏' : '收藏'"
          @click.prevent.stop="favStore.toggleFavorite('groupBuy', item.id, item.title)"
        >
          {{ favStore.isFavorited('groupBuy', item.id) ? '⭐' : '☆' }}
        </button>
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
          <button
            v-if="item.status === 'recruiting' && item.organizer !== userStore.displayName"
            class="join-btn"
            @click.prevent.stop="joinGroup(item)"
          >
            + 加入
          </button>
        </div>

        <div class="group-footer">
          <div class="footer-avatar">🧑</div>
          <span>{{ item.organizer }}</span>
          <span class="footer-divider">·</span>
          <span>📍 {{ item.location }}</span>
        </div>
      </div>
    </div>

    <!-- 空状态 -->
    <EmptyState
      v-else
      :message="keyword ? '未找到匹配的拼单' : '暂无拼单信息'"
      :hint="keyword ? '试试其他关键词' : '还没有人发起拼单或搭子组队'"
    />
  </main>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { getGroupBuys, updateGroupBuy, type GroupBuyItem } from '../api/groupBuy'
import { ElMessage } from 'element-plus'
import { useUserStore } from '../stores/user'
import EmptyState from '../components/EmptyState.vue'
import LoadingState from '../components/LoadingState.vue'
import ErrorState from '../components/ErrorState.vue'
import SearchBar from '../components/SearchBar.vue'
import { useFavoriteStore } from '../stores/favorite'
import { addParticipation } from '../stores/participation'

const userStore = useUserStore()
const favStore = useFavoriteStore()

const items = ref<GroupBuyItem[]>([])
const loading = ref(true)
const error = ref('')
const keyword = ref('')
const activeFilter = ref('all')

const filters = [
  { label: '全部', value: 'all' },
  { label: '外卖拼单', value: '外卖拼单' },
  { label: '学习搭子', value: '学习搭子' },
  { label: '运动组队', value: '运动组队' },
  { label: '兴趣小组', value: '兴趣小组' }
]

const filteredList = computed(() => {
  let list = items.value

  // 类型筛选
  if (activeFilter.value !== 'all') {
    list = list.filter((i) => i.type === activeFilter.value)
  }

  // 关键词搜索（标题/类型/地点/描述）
  if (keyword.value.trim()) {
    const kw = keyword.value.trim().toLowerCase()
    list = list.filter((i) =>
      i.title.toLowerCase().includes(kw) ||
      i.type.toLowerCase().includes(kw) ||
      i.location.toLowerCase().includes(kw) ||
      i.description.toLowerCase().includes(kw)
    )
  }

  return list
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

async function loadData() {
  loading.value = true
  error.value = ''
  try {
    items.value = await getGroupBuys()
  } catch (err: any) {
    console.error('加载拼单信息失败:', err)
    if (err?.code === 'ERR_NETWORK' || err?.message?.includes('Network')) {
      error.value = '无法连接到 Mock 服务，请确认已执行 pnpm mock'
    } else {
      error.value = '加载失败，请检查网络连接后重试'
    }
  } finally {
    loading.value = false
  }
}

async function joinGroup(item: GroupBuyItem) {
  if (!userStore.isLoggedIn) { ElMessage.warning('请先登录'); return }
  const newCount = item.currentCount + 1
  const newStatus = newCount >= item.targetCount ? 'full' : 'recruiting'
  try {
    await updateGroupBuy(item.id, { currentCount: newCount, status: newStatus })
    addParticipation('groupBuy', item.id, item.title)
    ElMessage.success('加入成功！')
    loadData()
  } catch { ElMessage.error('操作失败，请重试') }
}

onMounted(() => {
  loadData()
})
</script>

<style scoped>
.page { padding: 0; }

.page-banner {
  border-radius: 16px; padding: 36px 32px; margin-bottom: 24px; color: #fff;
  position: relative; overflow: hidden;
}
.banner-group {
  background: linear-gradient(135deg, #6a5acd, #7c3aed);
  box-shadow: 0 4px 20px rgba(106, 90, 205, 0.2);
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

.filter-bar { display: flex; gap: 10px; flex-wrap: wrap; }
.filter-btn {
  padding: 8px 20px; border-radius: 24px; font-size: 13px; font-weight: 500;
  color: #555; background: #fff; border: 1.5px solid #e8e8e8;
  cursor: pointer; transition: all .25s; user-select: none;
}
.filter-btn:hover { border-color: #6a5acd; color: #6a5acd; background: #f8f7ff; }
.filter-btn.active {
  background: linear-gradient(135deg, #6a5acd, #8b7aee);
  color: #fff; border-color: transparent;
  box-shadow: 0 4px 14px rgba(106, 90, 205, .35);
}

.group-list { display: grid; grid-template-columns: repeat(2, 1fr); gap: 18px; }
.group-card {
  background: #fff; border: 1px solid #f0f0f0; border-radius: 14px;
  padding: 24px; transition: all .3s ease;
  display: flex; flex-direction: column;
  position: relative;
}
.group-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 32px rgba(0, 0, 0, .09);
  border-color: #d8d4f0;
}
.group-card.is-closed { opacity: .45; }
.group-card.is-closed:hover { opacity: .65; }

.card-top {
  display: flex; justify-content: space-between; align-items: center;
  margin-bottom: 14px;
}
.group-type {
  font-size: 12px; font-weight: 600; padding: 5px 14px; border-radius: 14px;
}
.t-food  { background: #fff0f0; color: #e63946; }
.t-study { background: #ecf5ff; color: #409eff; }
.t-sport { background: #f0f9eb; color: #409e3f; }
.t-hobby { background: #fef7ed; color: #e6a23c; }
.group-deadline { font-size: 12px; color: #aaa; }

.group-card h3 { font-size: 18px; font-weight: 700; color: #222; margin-bottom: 8px; }
.group-desc {
  font-size: 13px; color: #888; margin-bottom: 18px; line-height: 1.6;
  display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;
  flex: 1;
}

.progress-wrap {
  display: flex; align-items: center; gap: 10px;
  padding: 14px 16px; background: #f9fafb; border-radius: 12px;
  margin-bottom: 16px;
}
.progress-bar { flex: 1; height: 8px; background: #e8ecf0; border-radius: 4px; overflow: hidden; }
.progress-fill { height: 100%; border-radius: 4px; transition: width .6s ease; }
.fill-low  { background: linear-gradient(90deg, #409eff, #6aaaff); }
.fill-high { background: linear-gradient(90deg, #e6a23c, #f0b954); }
.fill-full { background: linear-gradient(90deg, #67c23a, #85d452); }
.progress-text { font-size: 13px; font-weight: 600; color: #555; white-space: nowrap; }
.end-tag { font-size: 11px; padding: 3px 10px; border-radius: 12px; white-space: nowrap; font-weight: 600; }
.end-tag.full { background: #f0f9eb; color: #409e3f; }
.end-tag.over { background: #f5f5f5; color: #999; }

.group-footer {
  display: flex; align-items: center; gap: 6px;
  font-size: 12px; color: #aaa; border-top: 1px solid #f5f5f5; padding-top: 14px;
}
.footer-avatar {
  width: 26px; height: 26px; background: linear-gradient(135deg, #f0e6ff, #e0d5f7);
  border-radius: 50%; display: flex; align-items: center; justify-content: center;
  font-size: 14px;
}
.footer-divider { color: #ddd; }

/* ── Join Button ── */
.join-btn {
  padding: 6px 16px;
  background: linear-gradient(135deg, #4f46e5, #7c3aed);
  color: #fff; border: none; border-radius: 16px;
  font-size: 12px; font-weight: 600; cursor: pointer; transition: all .25s;
  white-space: nowrap;
}
.join-btn:hover { transform: translateY(-1px); box-shadow: 0 4px 12px rgba(79,70,229,.35); }

/* ── Favorite Button ── */
.fav-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  background: rgba(255, 255, 255, 0.95);
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

@media (max-width: 768px) {
  .group-list { grid-template-columns: 1fr; }
}
</style>
