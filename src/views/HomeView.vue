<template>
  <main class="home-page">
    <section class="hero">
      <div class="hero-bg"></div>
      <div class="hero-content">
        <h1>🏫 校园轻集市</h1>
        <p>轻量、可信、面向校园生活</p>
        <div class="hero-tags">
          <span>📖 二手教材</span>
          <span>🔍 失物招领</span>
          <span>👥 拼单搭子</span>
          <span>🏃 跑腿代办</span>
        </div>
      </div>
    </section>

    <section class="categories">
      <h2><span class="title-bar"></span>四大业务</h2>
      <div class="category-grid">
        <router-link to="/trade" class="category-card card-trade">
          <div class="card-icon">🛒</div>
          <h3>二手交易</h3>
          <p>教材、电子产品、生活用品，让闲置流转起来</p>
          <span class="card-link">去看看 →</span>
        </router-link>
        <router-link to="/lost-found" class="category-card card-lost">
          <div class="card-icon">🔍</div>
          <h3>失物招领</h3>
          <p>遗失物品发布、捡拾物品登记，帮助失物找到主人</p>
          <span class="card-link">去看看 →</span>
        </router-link>
        <router-link to="/group-buy" class="category-card card-group">
          <div class="card-icon">👥</div>
          <h3>拼单搭子</h3>
          <p>外卖拼单、学习搭子、运动组队，找到志同道合的伙伴</p>
          <span class="card-link">去看看 →</span>
        </router-link>
        <router-link to="/errand" class="category-card card-errand">
          <div class="card-icon">🏃</div>
          <h3>跑腿委托</h3>
          <p>代取快递、代办事务，让校园生活更轻松</p>
          <span class="card-link">去看看 →</span>
        </router-link>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts"></script>

<style scoped>
.home-page { padding: 0; }

/* ── hero ── */
.hero {
  position: relative;
  overflow: hidden;
  border-radius: 16px;
  margin-bottom: 36px;
  background: linear-gradient(135deg, #409eff 0%, #6a5acd 50%, #e040fb 100%);
}
.hero-bg {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(circle at 20% 80%, rgba(255,255,255,.12) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(255,255,255,.10) 0%, transparent 50%);
}
.hero-content {
  position: relative;
  text-align: center;
  padding: 56px 24px 44px;
  color: #fff;
}
.hero-content h1 {
  font-size: 36px;
  font-weight: 800;
  margin-bottom: 8px;
  text-shadow: 0 2px 8px rgba(0,0,0,.15);
}
.hero-content > p {
  font-size: 16px;
  opacity: .9;
  margin-bottom: 24px;
}
.hero-tags {
  display: flex;
  justify-content: center;
  gap: 12px;
  flex-wrap: wrap;
}
.hero-tags span {
  background: rgba(255,255,255,.2);
  backdrop-filter: blur(4px);
  padding: 6px 16px;
  border-radius: 20px;
  font-size: 13px;
  border: 1px solid rgba(255,255,255,.25);
}

/* ── categories ── */
.categories { padding: 0 0 24px; }
.categories h2 {
  font-size: 20px;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
}
.title-bar {
  display: inline-block;
  width: 4px;
  height: 20px;
  background: #409eff;
  border-radius: 2px;
}

.category-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}

.category-card {
  background: #fff;
  border-radius: 12px;
  padding: 24px 20px;
  text-decoration: none;
  color: inherit;
  transition: all .25s;
  border: 1px solid #f0f0f0;
  position: relative;
  overflow: hidden;
}
.category-card::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 3px;
  border-radius: 0 0 3px 3px;
  transition: height .25s;
}
.card-trade::before { background: #409eff; }
.card-lost::before  { background: #e6a23c; }
.card-group::before { background: #6a5acd; }
.card-errand::before { background: #67c23a; }

.category-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 28px rgba(0,0,0,.1);
}
.category-card:hover::before { height: 5px; }

.card-icon { font-size: 36px; margin-bottom: 12px; }
.category-card h3 { font-size: 17px; font-weight: 700; color: #1f2937; margin-bottom: 6px; }
.category-card p  { font-size: 13px; color: #6b7280; line-height: 1.6; margin-bottom: 12px; }
.card-link { font-size: 12px; color: #409eff; font-weight: 600; }
</style>
