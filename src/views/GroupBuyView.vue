<template>
  <main class="page">
    <h1>拼单搭子</h1>
    <p class="page-desc">校园拼单、搭子组队、兴趣小组信息展示页面</p>

    <div class="feature-list">
      <div class="feature-item">
        <h3>🍔 外卖拼单</h3>
        <p>一起点外卖，分摊配送费，省钱又省心</p>
      </div>
      <div class="feature-item">
        <h3>📚 学习搭子</h3>
        <p>寻找一起自习、备考、刷题的学习伙伴</p>
      </div>
      <div class="feature-item">
        <h3>⚽ 运动组队</h3>
        <p>篮球、羽毛球、跑步……找到运动搭子，不再孤单</p>
      </div>
      <div class="feature-item">
        <h3>🎮 兴趣小组</h3>
        <p>桌游、摄影、吉他……和同好一起探索校园生活</p>
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

.feature-list {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

.feature-item {
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 20px;
}

.feature-item h3 {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 6px;
  color: #1f2937;
}

.feature-item p {
  font-size: 13px;
  color: #6b7280;
}
</style>
