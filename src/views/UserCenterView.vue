<template>
  <main class="page">
    <div class="page-banner banner-user">
      <div class="banner-text">
        <h1>👤 个人中心</h1>
        <p>管理你的信息、发布和收藏</p>
      </div>
    </div>

    <div class="profile-card">
      <div class="avatar-section">
        <div class="big-avatar">😊</div>
        <button class="edit-btn">✏️ 编辑资料</button>
      </div>
      <div class="profile-info">
        <h2>用户昵称</h2>
        <p>学号：2024XXXXXXXX</p>
        <p>注册时间：2024年9月1日</p>
      </div>
    </div>

    <div class="stats-row">
      <div class="stat-card">
        <div class="stat-icon" style="background:#ecf5ff;">📦</div>
        <div class="stat-num">{{ totalPublished }}</div>
        <div class="stat-label">我的发布</div>
      </div>
      <div class="stat-card">
        <div class="stat-icon" style="background:#fef7ed;">⭐</div>
        <div class="stat-num">0</div>
        <div class="stat-label">我的收藏</div>
      </div>
      <div class="stat-card">
        <div class="stat-icon" style="background:#f0f9eb;">👀</div>
        <div class="stat-num">0</div>
        <div class="stat-label">浏览历史</div>
      </div>
      <div class="stat-card">
        <div class="stat-icon" style="background:#f5f0ff;">💬</div>
        <div class="stat-num">2</div>
        <div class="stat-label">未读消息</div>
      </div>
    </div>

    <!-- 我的发布记录 -->
    <section class="publish-section">
      <h2 class="section-title">📋 我的发布记录</h2>

      <div v-if="loading" class="loading-box">
        <span class="spinner"></span>
        <p>正在加载...</p>
      </div>

      <template v-else>
        <!-- 二手交易 -->
        <div v-if="myTrades.length" class="record-group">
          <h3 class="group-title">
            <span class="group-icon">🛒</span>二手交易
            <span class="group-count">{{ myTrades.length }}</span>
          </h3>
          <div class="record-list">
            <router-link
              v-for="item in myTrades"
              :key="'trade-' + item.id"
              :to="`/trade/${item.id}`"
              class="record-card"
            >
              <div class="record-left">
                <span class="record-emoji">{{ tradeEmoji(item.category) }}</span>
                <div class="record-info">
                  <span class="record-title">{{ item.title }}</span>
                  <span class="record-meta">{{ item.category }} · ¥{{ item.price }}</span>
                </div>
              </div>
              <div class="record-right">
                <span class="record-status" :class="item.status === 'selling' ? 'active' : 'inactive'">
                  {{ tradeStatus(item.status) }}
                </span>
                <span class="record-arrow">→</span>
              </div>
            </router-link>
          </div>
        </div>

        <!-- 失物招领 -->
        <div v-if="myLostFounds.length" class="record-group">
          <h3 class="group-title">
            <span class="group-icon">🔍</span>失物招领
            <span class="group-count">{{ myLostFounds.length }}</span>
          </h3>
          <div class="record-list">
            <div
              v-for="item in myLostFounds"
              :key="'lf-' + item.id"
              class="record-card"
            >
              <div class="record-left">
                <span class="record-emoji">{{ item.type === 'lost' ? '😢' : '😊' }}</span>
                <div class="record-info">
                  <span class="record-title">{{ item.itemName }}</span>
                  <span class="record-meta">
                    {{ item.type === 'lost' ? '寻物启事' : '失物招领' }} · {{ item.location }}
                  </span>
                </div>
              </div>
              <div class="record-right">
                <span class="record-status" :class="item.status === 'open' ? 'active' : 'inactive'">
                  {{ item.status === 'open' ? '处理中' : '已关闭' }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- 拼单搭子 -->
        <div v-if="myGroupBuys.length" class="record-group">
          <h3 class="group-title">
            <span class="group-icon">👥</span>拼单搭子
            <span class="group-count">{{ myGroupBuys.length }}</span>
          </h3>
          <div class="record-list">
            <div
              v-for="item in myGroupBuys"
              :key="'gb-' + item.id"
              class="record-card"
            >
              <div class="record-left">
                <span class="record-emoji">👥</span>
                <div class="record-info">
                  <span class="record-title">{{ item.title }}</span>
                  <span class="record-meta">{{ item.type }} · {{ item.currentCount }}/{{ item.targetCount }}人</span>
                </div>
              </div>
              <div class="record-right">
                <span class="record-status" :class="item.status === 'recruiting' ? 'active' : 'inactive'">
                  {{ item.status === 'recruiting' ? '招募中' : item.status === 'full' ? '已满员' : '已结束' }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- 跑腿委托 -->
        <div v-if="myErrands.length" class="record-group">
          <h3 class="group-title">
            <span class="group-icon">🏃</span>跑腿委托
            <span class="group-count">{{ myErrands.length }}</span>
          </h3>
          <div class="record-list">
            <div
              v-for="item in myErrands"
              :key="'er-' + item.id"
              class="record-card"
            >
              <div class="record-left">
                <span class="record-emoji">{{ errandEmoji(item.taskType) }}</span>
                <div class="record-info">
                  <span class="record-title">{{ item.title }}</span>
                  <span class="record-meta">{{ item.taskType }} · ¥{{ item.reward }}</span>
                </div>
              </div>
              <div class="record-right">
                <span class="record-status" :class="item.status === 'open' ? 'active' : 'inactive'">
                  {{ errandStatus(item.status) }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- 还没发过任何内容 -->
        <div v-if="totalPublished === 0" class="empty-hint">
          <span class="empty-emoji">📝</span>
          <p>还没有发布过任何内容</p>
          <router-link to="/publish" class="go-publish">去发布第一条 →</router-link>
        </div>
      </template>
    </section>

    <!-- 快捷入口 -->
    <div class="menu-section">
      <router-link to="/publish" class="menu-item">📝 发布新内容</router-link>
      <router-link to="/trade" class="menu-item">🛒 浏览二手交易</router-link>
      <router-link to="/lost-found" class="menu-item">🔍 浏览失物招领</router-link>
      <router-link to="/group-buy" class="menu-item">👥 浏览拼单搭子</router-link>
      <router-link to="/errand" class="menu-item">🏃 浏览跑腿委托</router-link>
      <div class="menu-item">⚙️ 账号设置</div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { getTrades, type TradeItem } from '../api/trade'
import { getLostFounds, type LostFoundItem } from '../api/lostFound'
import { getGroupBuys, type GroupBuyItem } from '../api/groupBuy'
import { getErrands, type ErrandItem } from '../api/errand'

const myTrades = ref<TradeItem[]>([])
const myLostFounds = ref<LostFoundItem[]>([])
const myGroupBuys = ref<GroupBuyItem[]>([])
const myErrands = ref<ErrandItem[]>([])
const loading = ref(true)

const totalPublished = computed(
  () => myTrades.value.length + myLostFounds.value.length + myGroupBuys.value.length + myErrands.value.length
)

function tradeEmoji(cat: string): string {
  const map: Record<string, string> = { '教材教辅': '📖', '电子产品': '💻', '生活用品': '🏠' }
  return map[cat] || '📦'
}

function tradeStatus(status: string): string {
  const map: Record<string, string> = { selling: '在售', reserved: '已预定', sold: '已售出' }
  return map[status] || status
}

function errandEmoji(type: string): string {
  const map: Record<string, string> = { '代取快递': '📦', '代买物品': '🛍️', '代办事务': '📋', '代送文件': '📄' }
  return map[type] || '🏃'
}

function errandStatus(status: string): string {
  const map: Record<string, string> = { open: '待接单', accepted: '已接单', done: '已完成' }
  return map[status] || status
}

onMounted(async () => {
  try {
    const [trades, lostFounds, groupBuys, errands] = await Promise.all([
      getTrades(),
      getLostFounds(),
      getGroupBuys(),
      getErrands(),
    ])
    // Day4：发布人使用固定值 "我"，因此筛选 publishUser/publisher/organizer/seller 为 "我" 的记录
    // 同时保留所有数据展示（因为当前所有数据都可视为当前用户的）
    myTrades.value = trades
    myLostFounds.value = lostFounds
    myGroupBuys.value = groupBuys
    myErrands.value = errands
  } catch (err) {
    console.error('加载发布记录失败:', err)
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.page { padding: 0; }

/* ── Banner ── */
.page-banner {
  border-radius: 14px; padding: 32px 28px; margin-bottom: 24px; color: #fff;
}
.banner-user { background: linear-gradient(135deg, #8b5cf6, #6d28d9); }
.banner-text h1 { font-size: 26px; font-weight: 800; margin-bottom: 4px; }
.banner-text p  { font-size: 14px; opacity: .85; }

/* ── Profile ── */
.profile-card {
  display: flex; gap: 24px; align-items: center;
  background: #fff; border: 1px solid #f0f0f0; border-radius: 16px;
  padding: 28px; margin-bottom: 24px;
  box-shadow: 0 2px 8px rgba(0,0,0,.03);
}
.avatar-section {
  display: flex; flex-direction: column; align-items: center; gap: 12px;
}
.big-avatar {
  width: 80px; height: 80px; border-radius: 50%;
  background: linear-gradient(135deg, #f0e6ff, #ddd0f7);
  display: flex; align-items: center; justify-content: center;
  font-size: 40px;
  box-shadow: 0 4px 12px rgba(139,92,246,.15);
}
.edit-btn {
  font-size: 12px; color: #8b5cf6; background: #f5f0ff;
  border: 1px solid #e8dcff; padding: 5px 14px;
  border-radius: 20px; cursor: pointer; transition: all .2s;
}
.edit-btn:hover { background: #ede0ff; }
.profile-info h2 { font-size: 22px; font-weight: 700; color: #222; margin-bottom: 6px; }
.profile-info p  { font-size: 13px; color: #888; margin-bottom: 3px; }

/* ── Stats ── */
.stats-row {
  display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-bottom: 28px;
}
.stat-card {
  background: #fff; border: 1px solid #f0f0f0; border-radius: 14px;
  padding: 22px 20px; text-align: center;
  transition: all .25s; cursor: default;
}
.stat-card:hover { transform: translateY(-3px); box-shadow: 0 8px 24px rgba(0,0,0,.06); }
.stat-icon {
  width: 48px; height: 48px; border-radius: 14px;
  display: flex; align-items: center; justify-content: center;
  font-size: 22px; margin: 0 auto 12px;
}
.stat-num { font-size: 30px; font-weight: 800; color: #333; line-height: 1; }
.stat-label { font-size: 12px; color: #aaa; margin-top: 6px; }

/* ── Loading ── */
.loading-box { text-align: center; padding: 60px 0; color: #999; }
.spinner {
  display: inline-block; width: 32px; height: 32px;
  border: 3px solid #e5e5e5; border-top-color: #8b5cf6;
  border-radius: 50%; animation: spin .7s linear infinite; margin-bottom: 12px;
}
@keyframes spin { to { transform: rotate(360deg); } }

/* ── Publish records section ── */
.publish-section {
  background: #fff; border: 1px solid #f0f0f0; border-radius: 16px;
  padding: 28px; margin-bottom: 24px;
}
.section-title {
  font-size: 18px; font-weight: 700; color: #222; margin-bottom: 20px;
}

.record-group {
  margin-bottom: 24px;
}
.record-group:last-child { margin-bottom: 0; }

.group-title {
  font-size: 15px; font-weight: 700; color: #444;
  display: flex; align-items: center; gap: 8px;
  margin-bottom: 12px; padding-bottom: 10px;
  border-bottom: 1px solid #f5f5f5;
}
.group-icon { font-size: 18px; }
.group-count {
  font-size: 11px; background: #f0f0f0; color: #888;
  padding: 2px 8px; border-radius: 10px; font-weight: 600;
}

.record-list { display: flex; flex-direction: column; gap: 8px; }

.record-card {
  display: flex; justify-content: space-between; align-items: center;
  padding: 14px 18px; border-radius: 12px;
  background: #fafbfc; border: 1px solid #f0f0f0;
  text-decoration: none; color: inherit;
  transition: all .2s;
}
.record-card:hover {
  background: #f5f8ff; border-color: #d0d7ff;
  transform: translateX(4px);
}

.record-left { display: flex; align-items: center; gap: 14px; flex: 1; min-width: 0; }
.record-emoji { font-size: 28px; flex-shrink: 0; }
.record-info { display: flex; flex-direction: column; gap: 2px; min-width: 0; }
.record-title { font-size: 14px; font-weight: 600; color: #333; }
.record-meta { font-size: 12px; color: #999; }

.record-right { display: flex; align-items: center; gap: 10px; flex-shrink: 0; }
.record-status {
  font-size: 12px; font-weight: 600; padding: 4px 12px; border-radius: 12px;
}
.record-status.active   { background: #f0f9eb; color: #67c23a; }
.record-status.inactive { background: #f5f5f5; color: #999; }
.record-arrow { font-size: 14px; color: #ccc; transition: all .2s; }
.record-card:hover .record-arrow { color: #8b5cf6; transform: translateX(3px); }

/* ── Empty hint ── */
.empty-hint {
  text-align: center; padding: 48px 0; color: #aaa;
  display: flex; flex-direction: column; align-items: center; gap: 12px;
}
.empty-emoji { font-size: 48px; }
.empty-hint p { font-size: 15px; }
.go-publish {
  font-size: 14px; color: #8b5cf6; font-weight: 600;
  text-decoration: none; padding: 8px 24px;
  border: 1px solid #8b5cf6; border-radius: 20px;
  transition: all .2s;
}
.go-publish:hover { background: #f5f0ff; }

/* ── Menu ── */
.menu-section {
  background: #fff; border: 1px solid #f0f0f0; border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0,0,0,.03);
}
.menu-item {
  padding: 16px 24px; font-size: 14px; color: #444; cursor: pointer;
  border-bottom: 1px solid #f5f5f5; transition: all .15s;
  display: flex; align-items: center; gap: 12px;
  text-decoration: none;
}
.menu-item:last-child { border-bottom: none; }
.menu-item:hover { background: #fafcff; color: #8b5cf6; padding-left: 30px; }

@media (max-width: 768px) {
  .stats-row { grid-template-columns: repeat(2, 1fr); }
  .profile-card { flex-direction: column; text-align: center; }
}
</style>
