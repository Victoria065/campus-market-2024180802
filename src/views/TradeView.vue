<template>
  <main class="page">
    <h1>二手交易</h1>
    <p class="page-desc">校园二手商品信息发布与浏览页面，涵盖教材、电子产品、生活用品等分类</p>

    <div class="category-tabs">
      <span class="tab active">全部</span>
      <span class="tab">教材教辅</span>
      <span class="tab">电子产品</span>
      <span class="tab">生活用品</span>
      <span class="tab">服饰鞋包</span>
      <span class="tab">其他</span>
    </div>

    <div class="goods-grid">
      <router-link to="/trade/1" class="goods-card">
        <div class="goods-cover">📖</div>
        <div class="goods-info">
          <h3>高等数学（第七版）</h3>
          <p class="goods-price">¥15.00</p>
          <p class="goods-meta">2024-09-15 发布</p>
        </div>
      </router-link>
      <router-link to="/trade/2" class="goods-card">
        <div class="goods-cover">💻</div>
        <div class="goods-info">
          <h3>机械键盘 Cherry MX 红轴</h3>
          <p class="goods-price">¥120.00</p>
          <p class="goods-meta">2024-09-14 发布</p>
        </div>
      </router-link>
    </div>
  </main>
</template>

<script setup lang="ts"></script>

<style scoped>
.page {
  padding: 24px;
}

.page h1 {
  font-size: 24px;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 8px;
}

.page-desc {
  font-size: 14px;
  color: #6b7280;
  margin-bottom: 24px;
}

.category-tabs {
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
}

.tab {
  padding: 6px 16px;
  border-radius: 20px;
  font-size: 13px;
  color: #374151;
  background: #fff;
  border: 1px solid #d1d5db;
  cursor: pointer;
  transition: all 0.2s;
}

.tab.active {
  background: #409eff;
  color: #fff;
  border-color: #409eff;
}

.goods-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}

.goods-card {
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  overflow: hidden;
  text-decoration: none;
  color: inherit;
  transition: box-shadow 0.2s;
}

.goods-card:hover {
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
}

.goods-cover {
  height: 120px;
  background: #f3f4f6;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 40px;
}

.goods-info {
  padding: 12px;
}

.goods-info h3 {
  font-size: 14px;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 6px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.goods-price {
  font-size: 16px;
  font-weight: 700;
  color: #f56c6c;
}

.goods-meta {
  font-size: 12px;
  color: #9ca3af;
  margin-top: 4px;
}
</style>
