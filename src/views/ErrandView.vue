<template>
  <main class="page">
    <div class="page-banner banner-errand">
      <div class="banner-text">
        <h1>🏃 跑腿委托</h1>
        <p>找人代取快递、代办事务，让校园生活更省心</p>
      </div>
    </div>

    <!-- 搜索 + 分类筛选 -->
    <div class="toolbar">
      <div class="search-wrap">
        <SearchBar v-model="keyword" placeholder="搜索标题、任务类型、地点或描述..." />
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
    <div v-else-if="filteredList.length" class="errand-list">
      <div
        v-for="item in filteredList"
        :key="item.id"
        class="errand-card"
        :class="{ 'is-closed': item.status !== 'open' }"
      >
        <div class="errand-left">
          <div class="task-icon-wrap" :class="iconClass(item.taskType)">
            <span>{{ taskEmoji(item.taskType) }}</span>
          </div>
          <span class="reward-tag">¥{{ item.reward }}</span>
          <span class="status-dot" :class="'dot-' + item.status"></span>
        </div>
        <div class="errand-body">
          <div class="errand-header">
            <span class="task-type">{{ item.taskType }}</span>
            <span class="status-tag" :class="'st-' + item.status">
              {{ statusLabel(item.status) }}
            </span>
          </div>
          <h3>{{ item.title }}</h3>
          <p class="errand-desc">{{ item.description }}</p>
          <div class="route-line">
            <span class="route-node start">取</span>
            <span class="route-label">{{ item.pickupLocation }}</span>
            <span class="route-arrow">→</span>
            <span class="route-node end">达</span>
            <span class="route-label">{{ item.deliveryLocation }}</span>
          </div>
          <div class="errand-meta">
            <span>⏰ {{ item.deadline }} 截止</span>
            <span>👤 {{ item.publisher }}</span>
          </div>
          <button
            v-if="item.status === 'open' && item.publisher !== userStore.displayName"
            class="accept-btn"
            @click.prevent.stop="acceptErrand(item)"
          >
            🤝 接单
          </button>
        </div>
        <button
          class="fav-btn"
          :class="{ 'is-fav': favStore.isFavorited('errand', item.id) }"
          :title="favStore.isFavorited('errand', item.id) ? '取消收藏' : '收藏'"
          @click.prevent.stop="favStore.toggleFavorite('errand', item.id, item.title)"
        >
          {{ favStore.isFavorited('errand', item.id) ? '⭐' : '☆' }}
        </button>
      </div>
    </div>

    <!-- 空状态 -->
    <EmptyState
      v-else
      :message="keyword ? '未找到匹配的委托' : '暂无跑腿委托'"
      :hint="keyword ? '试试其他关键词' : '还没有人发布跑腿任务'"
    />
  </main>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { getErrands, updateErrand, type ErrandItem } from '../api/errand'
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

const items = ref<ErrandItem[]>([])
const loading = ref(true)
const error = ref('')
const keyword = ref('')
const activeFilter = ref('all')

const filters = [
  { label: '全部', value: 'all' },
  { label: '代取快递', value: '代取快递' },
  { label: '代买物品', value: '代买物品' },
  { label: '代办事务', value: '代办事务' },
  { label: '代送文件', value: '代送文件' }
]

const filteredList = computed(() => {
  let list = items.value

  // 任务类型筛选
  if (activeFilter.value !== 'all') {
    list = list.filter((i) => i.taskType === activeFilter.value)
  }

  // 关键词搜索（标题/任务类型/取件地点/送达地点/描述）
  if (keyword.value.trim()) {
    const kw = keyword.value.trim().toLowerCase()
    list = list.filter((i) =>
      i.title.toLowerCase().includes(kw) ||
      i.taskType.toLowerCase().includes(kw) ||
      i.pickupLocation.toLowerCase().includes(kw) ||
      i.deliveryLocation.toLowerCase().includes(kw) ||
      i.description.toLowerCase().includes(kw)
    )
  }

  return list
})

function taskEmoji(type: string): string {
  const map: Record<string, string> = {
    '代取快递': '📦', '代买物品': '🛍️', '代办事务': '📋', '代送文件': '📄'
  }
  return map[type] || '🏃'
}

function iconClass(type: string): string {
  const map: Record<string, string> = {
    '代取快递': 'ic-deliver', '代买物品': 'ic-buy',
    '代办事务': 'ic-task', '代送文件': 'ic-file'
  }
  return map[type] || ''
}

function statusLabel(status: string): string {
  const map: Record<string, string> = { open: '待接单', accepted: '已接单', done: '已完成' }
  return map[status] || status
}

async function loadData() {
  loading.value = true
  error.value = ''
  try {
    items.value = await getErrands()
  } catch (err: any) {
    console.error('加载跑腿委托失败:', err)
    if (err?.code === 'ERR_NETWORK' || err?.message?.includes('Network')) {
      error.value = '无法连接到 Mock 服务，请确认已执行 pnpm mock'
    } else {
      error.value = '加载失败，请检查网络连接后重试'
    }
  } finally {
    loading.value = false
  }
}

async function acceptErrand(item: ErrandItem) {
  if (!userStore.isLoggedIn) { ElMessage.warning('请先登录'); return }
  try {
    await updateErrand(item.id, { status: 'accepted' })
    addParticipation('errand', item.id, item.title)
    ElMessage.success('接单成功！')
    loadData()
  } catch { ElMessage.error('接单失败，请重试') }
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
.banner-errand {
  background: linear-gradient(135deg, #67c23a, #3d8b1e);
  box-shadow: 0 4px 20px rgba(103, 194, 58, 0.2);
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
.filter-btn:hover { border-color: #67c23a; color: #67c23a; background: #f8fff5; }
.filter-btn.active {
  background: linear-gradient(135deg, #67c23a, #85d452);
  color: #fff; border-color: transparent;
  box-shadow: 0 4px 14px rgba(103, 194, 58, .35);
}

.errand-list { display: flex; flex-direction: column; gap: 14px; }
.errand-card {
  display: flex; gap: 20px;
  background: #fff; border: 1px solid #f0f0f0; border-radius: 14px;
  padding: 22px; transition: all .3s ease;
  position: relative;
}
.errand-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 28px rgba(0, 0, 0, .08);
  border-color: #c8e0b8;
}
.errand-card.is-closed { opacity: .45; }
.errand-card.is-closed:hover { opacity: .65; }

.errand-left {
  display: flex; flex-direction: column; align-items: center; gap: 10px;
  flex-shrink: 0; min-width: 64px;
}
.task-icon-wrap {
  width: 56px; height: 56px; border-radius: 16px;
  display: flex; align-items: center; justify-content: center; font-size: 28px;
  transition: transform .3s;
}
.errand-card:hover .task-icon-wrap { transform: scale(1.08); }
.ic-deliver { background: linear-gradient(135deg, #ecf5ff, #d7e6ff); }
.ic-buy    { background: linear-gradient(135deg, #fef7ed, #fef0d5); }
.ic-task   { background: linear-gradient(135deg, #f0f9eb, #ddf0d0); }
.ic-file   { background: linear-gradient(135deg, #f5f0ff, #e8dcff); }

.reward-tag {
  font-size: 15px; font-weight: 800; color: #fff;
  background: linear-gradient(135deg, #f56c6c, #e63946);
  padding: 4px 14px; border-radius: 16px;
  box-shadow: 0 2px 8px rgba(245, 108, 108, .3);
}
.status-dot { width: 8px; height: 8px; border-radius: 50%; }
.dot-open     { background: #67c23a; box-shadow: 0 0 6px rgba(103, 194, 58, .4); }
.dot-accepted { background: #e6a23c; box-shadow: 0 0 6px rgba(230, 162, 60, .4); }
.dot-done     { background: #ccc; }

.errand-body { flex: 1; min-width: 0; }
.errand-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; }
.task-type {
  font-size: 12px; font-weight: 600;
  background: linear-gradient(135deg, #ecf5ff, #d7e6ff); color: #409eff;
  padding: 4px 12px; border-radius: 6px;
}
.status-tag { font-size: 11px; font-weight: 600; padding: 4px 12px; border-radius: 6px; }
.st-open     { background: #f0f9eb; color: #409e3f; }
.st-accepted { background: #fef7ed; color: #e6a23c; }
.st-done     { background: #f5f5f5; color: #999; }

.errand-body h3 { font-size: 18px; font-weight: 700; color: #222; margin-bottom: 6px; }
.errand-desc {
  font-size: 13px; color: #888; margin-bottom: 14px; line-height: 1.6;
  display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;
}

.route-line {
  display: flex; align-items: center; gap: 8px;
  padding: 12px 16px; background: #f9fafb; border-radius: 12px;
  margin-bottom: 14px; font-size: 13px;
}
.route-node {
  width: 24px; height: 24px; border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-size: 11px; font-weight: 700; color: #fff; flex-shrink: 0;
}
.route-node.start { background: linear-gradient(135deg, #409eff, #5b8def); }
.route-node.end   { background: linear-gradient(135deg, #67c23a, #85d452); }
.route-label { color: #555; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.route-arrow { color: #ccc; font-weight: 700; flex-shrink: 0; }

.errand-meta {
  display: flex; gap: 20px; font-size: 12px; color: #aaa;
  border-top: 1px solid #f5f5f5; padding-top: 14px;
}

/* ── Favorite Button ── */
.fav-btn {
  position: absolute;
  top: 12px;
  right: 12px;
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

/* ── Accept Button ── */
.accept-btn {
  margin-top: 12px; padding: 8px 20px;
  background: linear-gradient(135deg, #22c55e, #16a34a);
  color: #fff; border: none; border-radius: 20px;
  font-size: 13px; font-weight: 600; cursor: pointer; transition: all .25s;
  align-self: flex-end;
}
.accept-btn:hover { transform: translateY(-2px); box-shadow: 0 4px 14px rgba(34,197,94,.35); }
</style>
