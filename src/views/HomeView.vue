<template>
  <main class="home-page">
    <section class="hero">
      <h1>校园轻集市</h1>
      <p class="hero-desc">轻量、可信、面向校园生活的信息发布与交易平台</p>
    </section>

    <section class="categories">
      <h2>业务分类</h2>
      <div class="category-grid">
        <div class="category-card">
          <h3>🛒 二手交易</h3>
          <p>教材、电子产品、生活用品，让闲置流转起来</p>
        </div>
        <div class="category-card">
          <h3>🔍 失物招领</h3>
          <p>遗失物品发布、捡拾物品登记，帮助失物找到主人</p>
        </div>
        <div class="category-card">
          <h3>👥 拼单搭子</h3>
          <p>外卖拼单、学习搭子、运动组队，找到志同道合的伙伴</p>
        </div>
        <div class="category-card">
          <h3>🏃 跑腿委托</h3>
          <p>代取快递、代办事务，让校园生活更轻松</p>
        </div>
      </div>
    </section>

    <section class="latest">
      <h2>最新发布</h2>
      <p class="placeholder-tip">更多内容将在后续版本中接入真实数据</p>
    </section>
  </main>
</template>

<script setup lang="ts"></script>

<style scoped>
.home-page {
  padding: 24px;
}

.hero {
  text-align: center;
  padding: 48px 0 32px;
}

.hero h1 {
  font-size: 32px;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 12px;
}

.hero-desc {
  font-size: 16px;
  color: #6b7280;
}

.categories {
  margin-top: 40px;
}

.categories h2 {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 20px;
  color: #374151;
}

.category-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}

.category-card {
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 20px;
  transition: box-shadow 0.2s;
}

.category-card:hover {
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
}

.category-card h3 {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 8px;
  color: #1f2937;
}

.category-card p {
  font-size: 13px;
  color: #6b7280;
  line-height: 1.6;
}

.latest {
  margin-top: 40px;
}

.latest h2 {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 12px;
  color: #374151;
}

.placeholder-tip {
  font-size: 14px;
  color: #9ca3af;
}
</style>
