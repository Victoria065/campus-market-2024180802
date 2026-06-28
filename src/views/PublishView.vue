<template>
  <main class="page">
    <h1>发布信息</h1>
    <p class="page-desc">发布二手商品、失物招领、拼单搭子或跑腿委托信息</p>

    <div class="publish-types">
      <div class="type-card">
        <div class="type-icon">🛒</div>
        <h3>发布二手商品</h3>
        <p>上传商品图片、填写描述与价格，让闲置物品找到新主人</p>
      </div>
      <div class="type-card">
        <div class="type-icon">🔍</div>
        <h3>发布失物/招领</h3>
        <p>描述遗失或捡拾物品的关键信息，帮助失物尽快物归原主</p>
      </div>
      <div class="type-card">
        <div class="type-icon">👥</div>
        <h3>发布拼单/搭子</h3>
        <p>说明拼单需求或组队类型，快速找到志同道合的校园伙伴</p>
      </div>
      <div class="type-card">
        <div class="type-icon">🏃</div>
        <h3>发布跑腿委托</h3>
        <p>填写任务描述、报酬与截止时间，找人帮忙代办校园事务</p>
      </div>
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
  margin-bottom: 28px;
}

.publish-types {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

.type-card {
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 24px;
  cursor: pointer;
  transition: box-shadow 0.2s, border-color 0.2s;
}

.type-card:hover {
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  border-color: #409eff;
}

.type-icon {
  font-size: 32px;
  margin-bottom: 12px;
}

.type-card h3 {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 6px;
  color: #1f2937;
}

.type-card p {
  font-size: 13px;
  color: #6b7280;
  line-height: 1.6;
}
</style>
