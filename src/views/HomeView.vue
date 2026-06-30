<template>
  <main class="home-page">
    <!-- Hero -->
    <section class="hero">
      <div class="hero-bg"></div>
      <div class="hero-particles">
        <span v-for="i in 12" :key="i" class="particle" :style="particleStyle(i)"></span>
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
      <div class="quick-stat">
        <span class="qs-icon">📦</span>
        <span class="qs-num">7+</span>
        <span class="qs-label">在售商品</span>
      </div>
      <div class="quick-stat">
        <span class="qs-icon">👥</span>
        <span class="qs-num">6+</span>
        <span class="qs-label">拼单组队</span>
      </div>
      <div class="quick-stat">
        <span class="qs-icon">🏃</span>
        <span class="qs-num">6+</span>
        <span class="qs-label">跑腿任务</span>
      </div>
      <div class="quick-stat">
        <span class="qs-icon">🔍</span>
        <span class="qs-num">6+</span>
        <span class="qs-label">失物招领</span>
      </div>
    </section>

    <!-- Categories -->
    <section class="categories">
      <div class="section-header">
        <h2><span class="title-bar"></span>四大业务</h2>
        <p class="section-sub">选择你需要的服务，开启校园互助之旅</p>
      </div>
      <div class="category-grid">
        <router-link to="/trade" class="category-card card-trade">
          <div class="card-icon-wrap">
            <span class="card-icon">🛒</span>
          </div>
          <div class="card-content">
            <h3>二手交易</h3>
            <p>教材、电子产品、生活用品，让闲置在校园里流转起来</p>
          </div>
          <div class="card-footer">
            <span class="card-count">多款在售</span>
            <span class="card-arrow">→</span>
          </div>
        </router-link>
        <router-link to="/lost-found" class="category-card card-lost">
          <div class="card-icon-wrap">
            <span class="card-icon">🔍</span>
          </div>
          <div class="card-content">
            <h3>失物招领</h3>
            <p>遗失物品发布、捡拾物品登记，帮助失物早日物归原主</p>
          </div>
          <div class="card-footer">
            <span class="card-count">实时更新</span>
            <span class="card-arrow">→</span>
          </div>
        </router-link>
        <router-link to="/group-buy" class="category-card card-group">
          <div class="card-icon-wrap">
            <span class="card-icon">👥</span>
          </div>
          <div class="card-content">
            <h3>拼单搭子</h3>
            <p>外卖拼单、学习搭子、运动组队，找到志同道合的伙伴</p>
          </div>
          <div class="card-footer">
            <span class="card-count">火热组队</span>
            <span class="card-arrow">→</span>
          </div>
        </router-link>
        <router-link to="/errand" class="category-card card-errand">
          <div class="card-icon-wrap">
            <span class="card-icon">🏃</span>
          </div>
          <div class="card-content">
            <h3>跑腿委托</h3>
            <p>代取快递、代办事务，找人帮忙让校园生活更省心</p>
          </div>
          <div class="card-footer">
            <span class="card-count">任务可接</span>
            <span class="card-arrow">→</span>
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
function particleStyle(i: number) {
  const size = 4 + (i % 4) * 2
  const left = 5 + (i * 8) % 90
  const top = 10 + (i * 14) % 80
  const delay = (i * 0.7) % 5
  const dur = 6 + (i % 4) * 2
  return {
    width: size + 'px',
    height: size + 'px',
    left: left + '%',
    top: top + '%',
    animationDelay: delay + 's',
    animationDuration: dur + 's',
  }
}
</script>

<style scoped>
.home-page { padding: 0; }

/* ── Hero ── */
.hero {
  position: relative;
  overflow: hidden;
  border-radius: 20px;
  margin-bottom: 24px;
  background: linear-gradient(135deg, #409eff 0%, #6a5acd 40%, #e040fb 100%);
  min-height: 320px;
  display: flex;
  align-items: center;
}

.hero-bg {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(circle at 15% 85%, rgba(255, 255, 255, 0.12) 0%, transparent 50%),
    radial-gradient(circle at 85% 15%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.05) 0%, transparent 70%);
}

.hero-particles {
  position: absolute;
  inset: 0;
  overflow: hidden;
}

.particle {
  position: absolute;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  animation: float-up linear infinite;
}

@keyframes float-up {
  0% {
    transform: translateY(0) scale(1);
    opacity: 0;
  }
  20% {
    opacity: 1;
  }
  80% {
    opacity: 0.5;
  }
  100% {
    transform: translateY(-320px) scale(0.3);
    opacity: 0;
  }
}

.hero-content {
  position: relative;
  text-align: center;
  padding: 56px 32px 48px;
  color: #fff;
  width: 100%;
}

.hero-badge {
  display: inline-block;
  padding: 6px 20px;
  background: rgba(255, 255, 255, 0.18);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.25);
  border-radius: 20px;
  font-size: 13px;
  font-weight: 500;
  margin-bottom: 20px;
  letter-spacing: 1px;
}

.hero-content h1 {
  font-size: 44px;
  font-weight: 900;
  margin-bottom: 10px;
  text-shadow: 0 2px 12px rgba(0, 0, 0, 0.15);
  letter-spacing: 2px;
}

.hero-content > p {
  font-size: 16px;
  opacity: 0.9;
  margin-bottom: 28px;
}

.hero-tags {
  display: flex;
  justify-content: center;
  gap: 12px;
  flex-wrap: wrap;
}

.hero-tag {
  background: rgba(255, 255, 255, 0.18);
  backdrop-filter: blur(4px);
  padding: 8px 20px;
  border-radius: 24px;
  font-size: 13px;
  font-weight: 500;
  border: 1px solid rgba(255, 255, 255, 0.25);
  text-decoration: none;
  color: #fff;
  transition: all 0.25s;
}

.hero-tag:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
}

/* ── Quick Stats ── */
.quick-stats {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-bottom: 36px;
}

.quick-stat {
  background: #fff;
  border-radius: 14px;
  padding: 20px;
  text-align: center;
  border: 1px solid #f0f0f0;
  transition: all 0.25s;
  cursor: default;
}

.quick-stat:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06);
}

.qs-icon {
  font-size: 28px;
  display: block;
  margin-bottom: 6px;
}

.qs-num {
  font-size: 24px;
  font-weight: 800;
  color: #333;
  display: block;
}

.qs-label {
  font-size: 12px;
  color: #aaa;
  margin-top: 2px;
}

/* ── Categories ── */
.categories {
  padding: 0 0 24px;
}

.section-header {
  margin-bottom: 24px;
}

.section-header h2 {
  font-size: 22px;
  font-weight: 800;
  color: #1f2937;
  margin-bottom: 4px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.title-bar {
  display: inline-block;
  width: 4px;
  height: 22px;
  background: linear-gradient(180deg, #409eff, #6a5acd);
  border-radius: 2px;
}

.section-sub {
  font-size: 13px;
  color: #999;
  margin-left: 14px;
}

.category-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 18px;
}

.category-card {
  background: #fff;
  border-radius: 16px;
  padding: 28px 22px 20px;
  text-decoration: none;
  color: inherit;
  transition: all 0.3s ease;
  border: 1px solid #f0f0f0;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
}

.category-card::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  transition: height 0.3s;
}

.card-trade::after {
  background: linear-gradient(90deg, #409eff, #6aaaff);
}

.card-lost::after {
  background: linear-gradient(90deg, #e6a23c, #f0b954);
}

.card-group::after {
  background: linear-gradient(90deg, #6a5acd, #9b8aee);
}

.card-errand::after {
  background: linear-gradient(90deg, #67c23a, #85d452);
}

.category-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 16px 36px rgba(0, 0, 0, 0.1);
}

.category-card:hover::after {
  height: 6px;
}

.card-icon-wrap {
  width: 56px;
  height: 56px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 18px;
  transition: transform 0.3s;
}

.card-trade .card-icon-wrap {
  background: linear-gradient(135deg, #ecf5ff, #dbe8ff);
}

.card-lost .card-icon-wrap {
  background: linear-gradient(135deg, #fef7ed, #fef0d5);
}

.card-group .card-icon-wrap {
  background: linear-gradient(135deg, #f5f0ff, #e8dcff);
}

.card-errand .card-icon-wrap {
  background: linear-gradient(135deg, #f0f9eb, #dff0d5);
}

.category-card:hover .card-icon-wrap {
  transform: scale(1.08);
}

.card-icon {
  font-size: 28px;
}

.card-content {
  flex: 1;
}

.card-content h3 {
  font-size: 17px;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 8px;
}

.card-content p {
  font-size: 13px;
  color: #6b7280;
  line-height: 1.7;
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 18px;
  padding-top: 14px;
  border-top: 1px solid #f5f5f5;
}

.card-count {
  font-size: 11px;
  color: #bbb;
  font-weight: 500;
}

.card-arrow {
  font-size: 16px;
  color: #ccc;
  transition: all 0.25s;
}

.category-card:hover .card-arrow {
  color: #409eff;
  transform: translateX(6px);
}

/* ── Quick Actions ── */
.quick-actions {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  margin-top: 8px;
}

.action-card {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 20px 24px;
  background: #fff;
  border: 1px solid #f0f0f0;
  border-radius: 14px;
  text-decoration: none;
  color: inherit;
  transition: all 0.25s;
}

.action-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 28px rgba(0, 0, 0, 0.08);
}

.action-icon {
  font-size: 32px;
  flex-shrink: 0;
}

.action-title {
  display: block;
  font-size: 15px;
  font-weight: 700;
  color: #333;
  margin-bottom: 2px;
}

.action-desc {
  font-size: 12px;
  color: #999;
}

.action-arrow {
  font-size: 18px;
  color: #ccc;
  margin-left: auto;
  transition: all 0.25s;
}

.action-card:hover .action-arrow {
  color: #409eff;
  transform: translateX(4px);
}

/* ── Responsive ── */
@media (max-width: 768px) {
  .hero-content h1 {
    font-size: 30px;
  }

  .quick-stats {
    grid-template-columns: repeat(2, 1fr);
  }

  .category-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .quick-actions {
    grid-template-columns: 1fr;
  }

  .hero-content {
    padding: 40px 20px 36px;
  }
}
</style>
