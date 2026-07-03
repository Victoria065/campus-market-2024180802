<template>
  <main class="home-page">
    <!-- Hero -->
    <section class="hero">
      <div class="hero-bg"></div>
      <div class="hero-particles">
        <span v-for="i in 15" :key="i" class="particle" :style="particleStyle(i)"></span>
      </div>
      <div class="hero-content">
        <div class="hero-badge">🌟 校园生活服务平台</div>
        <h1>校园轻集市</h1>
        <p>轻量、可信、面向校园生活 — 让闲置流转，让互助发生</p>
        <div class="hero-tags">
          <router-link to="/trade" class="hero-tag">📖 二手教材</router-link>
          <router-link to="/lost-found" class="hero-tag">🔍 失物招领</router-link>
          <router-link to="/group-buy" class="hero-tag">👥 拼单搭子</router-link>
          <router-link to="/errand" class="hero-tag">🏃 跑腿代办</router-link>
        </div>
      </div>
    </section>

    <!-- Stats -->
    <section class="quick-stats">
      <div class="quick-stat" v-for="s in stats" :key="s.label">
        <span class="qs-icon">{{ s.icon }}</span>
        <span class="qs-num">{{ s.num }}</span>
        <span class="qs-label">{{ s.label }}</span>
      </div>
    </section>

    <!-- Categories -->
    <section class="categories">
      <div class="section-header">
        <h2><span class="title-bar"></span>四大业务</h2>
        <p class="section-sub">选择你需要的服务，开启校园互助之旅</p>
      </div>
      <div class="category-grid">
        <router-link to="/trade" class="cat-card" v-for="c in categories" :key="c.route">
          <div class="cat-icon-wrap">
            <span class="cat-icon">{{ c.icon }}</span>
          </div>
          <div class="cat-content">
            <h3>{{ c.title }}</h3>
            <p>{{ c.desc }}</p>
          </div>
          <div class="cat-footer">
            <span class="cat-count">{{ c.count }}</span>
            <span class="cat-arrow">→</span>
          </div>
        </router-link>
      </div>
    </section>

    <!-- Quick actions -->
    <section class="quick-actions">
      <router-link to="/publish" class="action-card action-publish">
        <span class="action-icon">📝</span>
        <div>
          <span class="action-title">发布信息</span>
          <span class="action-desc">快速发布你的需求</span>
        </div>
        <span class="action-arrow">→</span>
      </router-link>
      <router-link to="/user" class="action-card action-user">
        <span class="action-icon">👤</span>
        <div>
          <span class="action-title">个人中心</span>
          <span class="action-desc">查看我的发布与收藏</span>
        </div>
        <span class="action-arrow">→</span>
      </router-link>
    </section>
  </main>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getTrades } from '../api/trade'
import { getLostFounds } from '../api/lostFound'
import { getGroupBuys } from '../api/groupBuy'
import { getErrands } from '../api/errand'

const tradeCount = ref(7)
const lostFoundCount = ref(6)
const groupBuyCount = ref(6)
const errandCount = ref(6)

const stats = [
  { icon: '📦', num: tradeCount, label: '在售商品' },
  { icon: '👥', num: groupBuyCount, label: '拼单组队' },
  { icon: '🏃', num: errandCount, label: '跑腿任务' },
  { icon: '🔍', num: lostFoundCount, label: '失物招领' },
]

const categories = [
  { route: '/trade', icon: '🛒', title: '二手交易', desc: '教材、电子产品、生活用品，让闲置在校园里流转起来', count: '多款在售' },
  { route: '/lost-found', icon: '🔍', title: '失物招领', desc: '遗失物品发布、捡拾物品登记，帮助失物早日物归原主', count: '实时更新' },
  { route: '/group-buy', icon: '👥', title: '拼单搭子', desc: '外卖拼单、学习搭子、运动组队，找到志同道合的伙伴', count: '火热组队' },
  { route: '/errand', icon: '🏃', title: '跑腿委托', desc: '代取快递、代办事务，找人帮忙让校园生活更省心', count: '任务可接' },
]

function particleStyle(i: number) {
  const size = 4 + (i % 4) * 2
  const left = 5 + (i * 7) % 90
  const top = 10 + (i * 13) % 80
  const delay = (i * 0.7) % 5
  const dur = 6 + (i % 4) * 2
  return {
    width: size + 'px', height: size + 'px',
    left: left + '%', top: top + '%',
    animationDelay: delay + 's',
    animationDuration: dur + 's',
  }
}

onMounted(async () => {
  try {
    const [trades, lostFounds, groupBuys, errands] = await Promise.all([
      getTrades(), getLostFounds(), getGroupBuys(), getErrands(),
    ])
    tradeCount.value = trades.length
    lostFoundCount.value = lostFounds.length
    groupBuyCount.value = groupBuys.length
    errandCount.value = errands.length
  } catch { /* keep defaults */ }
})
</script>

<style scoped>
.home-page { padding: 0; }

/* ── Hero ── */
.hero {
  position: relative; overflow: hidden; border-radius: var(--radius-xl);
  margin-bottom: 24px;
  background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 40%, #a855f7 100%);
  min-height: 340px; display: flex; align-items: center;
}
.hero-bg {
  position: absolute; inset: 0;
  background:
    radial-gradient(circle at 15% 85%, rgba(255,255,255,0.12) 0%, transparent 50%),
    radial-gradient(circle at 85% 15%, rgba(255,255,255,0.1) 0%, transparent 50%),
    radial-gradient(circle at 50% 50%, rgba(255,255,255,0.05) 0%, transparent 70%);
}
.hero-particles { position: absolute; inset: 0; overflow: hidden; }
.particle {
  position: absolute; background: rgba(255,255,255,0.3); border-radius: 50%;
  animation: float-up linear infinite;
}
@keyframes float-up {
  0% { transform: translateY(0) scale(1); opacity: 0; }
  20% { opacity: 1; }
  80% { opacity: 0.5; }
  100% { transform: translateY(-340px) scale(0.3); opacity: 0; }
}
.hero-content { position: relative; text-align: center; padding: 56px 32px 48px; color: #fff; width: 100%; }
.hero-badge {
  display: inline-block; padding: 6px 20px;
  background: rgba(255,255,255,0.18); backdrop-filter: blur(8px);
  border: 1px solid rgba(255,255,255,0.25); border-radius: 20px;
  font-size: 13px; font-weight: 500; margin-bottom: 20px; letter-spacing: 1px;
}
.hero-content h1 { font-size: 48px; font-weight: 900; margin-bottom: 10px; text-shadow: 0 2px 12px rgba(0,0,0,0.15); letter-spacing: 3px; }
.hero-content > p { font-size: 16px; opacity: .9; margin-bottom: 28px; }
.hero-tags { display: flex; justify-content: center; gap: 12px; flex-wrap: wrap; }
.hero-tag {
  background: rgba(255,255,255,0.18); backdrop-filter: blur(4px);
  padding: 10px 24px; border-radius: 24px; font-size: 14px; font-weight: 500;
  border: 1px solid rgba(255,255,255,0.25); text-decoration: none; color: #fff;
  transition: all .25s;
}
.hero-tag:hover { background: rgba(255,255,255,0.3); transform: translateY(-2px); box-shadow: 0 4px 16px rgba(0,0,0,0.15); }

/* ── Quick Stats ── */
.quick-stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-bottom: 36px; }
.quick-stat {
  background: var(--color-surface); border-radius: var(--radius-lg); padding: 24px 16px;
  text-align: center; border: 1px solid var(--color-border); transition: all .25s; cursor: default;
}
.quick-stat:hover { transform: translateY(-3px); box-shadow: var(--shadow-md); }
.qs-icon { font-size: 28px; display: block; margin-bottom: 6px; }
.qs-num { font-size: 28px; font-weight: 800; color: var(--color-primary); display: block; }
.qs-label { font-size: 12px; color: var(--color-text-muted); margin-top: 2px; }

/* ── Categories ── */
.categories { padding: 0 0 24px; }
.section-header { margin-bottom: 24px; }
.section-header h2 { font-size: 22px; font-weight: 800; color: var(--color-text); margin-bottom: 4px; display: flex; align-items: center; gap: 10px; }
.title-bar { display: inline-block; width: 4px; height: 22px; background: linear-gradient(180deg, #4f46e5, #a855f7); border-radius: 2px; }
.section-sub { font-size: 13px; color: var(--color-text-muted); margin-left: 14px; }

.category-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 18px; }
.cat-card {
  background: var(--color-surface); border-radius: var(--radius-lg); overflow: hidden;
  text-decoration: none; color: inherit; transition: all .3s ease;
  border: 1px solid var(--color-border); display: flex; flex-direction: column;
}
.cat-card:hover { transform: translateY(-6px); box-shadow: var(--shadow-lg); }

.cat-icon-wrap {
  height: 120px; display: flex; align-items: center; justify-content: center;
  background: linear-gradient(135deg, #f1f5f9, #e2e8f0);
  transition: background .3s;
}
.cat-card:hover .cat-icon-wrap { background: linear-gradient(135deg, #eef2ff, #e0e7ff); }
.cat-icon { font-size: 52px; transition: transform .3s; }
.cat-card:hover .cat-icon { transform: scale(1.15); }

.cat-content { padding: 18px 18px 10px; flex: 1; }
.cat-content h3 { font-size: 17px; font-weight: 700; color: var(--color-text); margin-bottom: 8px; }
.cat-content p { font-size: 13px; color: var(--color-text-secondary); line-height: 1.7; }

.cat-footer { display: flex; justify-content: space-between; align-items: center; padding: 12px 18px 16px; }
.cat-count { font-size: 11px; color: var(--color-text-muted); font-weight: 500; }
.cat-arrow { font-size: 16px; color: #ccc; transition: all .25s; }
.cat-card:hover .cat-arrow { color: var(--color-primary); transform: translateX(6px); }

/* ── Quick Actions ── */
.quick-actions { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; margin-top: 8px; }
.action-card {
  display: flex; align-items: center; gap: 16px; padding: 20px 24px;
  background: var(--color-surface); border: 1px solid var(--color-border);
  border-radius: var(--radius-lg); text-decoration: none; color: inherit; transition: all .25s;
}
.action-card:hover { transform: translateY(-3px); box-shadow: var(--shadow-md); }
.action-icon { font-size: 32px; flex-shrink: 0; }
.action-title { display: block; font-size: 15px; font-weight: 700; color: var(--color-text); margin-bottom: 2px; }
.action-desc { font-size: 12px; color: var(--color-text-muted); }
.action-arrow { font-size: 18px; color: #ccc; margin-left: auto; transition: all .25s; }
.action-card:hover .action-arrow { color: var(--color-primary); transform: translateX(4px); }

@media (max-width: 768px) {
  .hero-content h1 { font-size: 30px; }
  .quick-stats { grid-template-columns: repeat(2, 1fr); }
  .category-grid { grid-template-columns: repeat(2, 1fr); }
  .quick-actions { grid-template-columns: 1fr; }
}
</style>
