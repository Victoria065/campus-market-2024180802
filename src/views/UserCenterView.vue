<template>
  <main class="page">
    <h1>个人中心</h1>
    <p class="page-desc">查看个人资料、管理我的发布与收藏</p>

    <div class="user-profile">
      <div class="user-card">
        <div class="user-avatar">😊</div>
        <div class="user-info">
          <h2>用户昵称</h2>
          <p>学号：2024XXXXXXXX</p>
          <p>注册时间：2024-09-01</p>
        </div>
      </div>

      <div class="user-stats">
        <div class="stat-item">
          <span class="stat-num">0</span>
          <span class="stat-label">我的发布</span>
        </div>
        <div class="stat-item">
          <span class="stat-num">0</span>
          <span class="stat-label">我的收藏</span>
        </div>
        <div class="stat-item">
          <span class="stat-num">0</span>
          <span class="stat-label">浏览历史</span>
        </div>
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

.user-profile {
  max-width: 600px;
}

.user-card {
  display: flex;
  gap: 20px;
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 24px;
  align-items: center;
  margin-bottom: 20px;
}

.user-avatar {
  width: 64px;
  height: 64px;
  background: #f3f4f6;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
  flex-shrink: 0;
}

.user-info h2 {
  font-size: 18px;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 6px;
}

.user-info p {
  font-size: 13px;
  color: #6b7280;
  margin-bottom: 2px;
}

.user-stats {
  display: flex;
  gap: 12px;
}

.stat-item {
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 20px;
  text-align: center;
  flex: 1;
}

.stat-num {
  display: block;
  font-size: 28px;
  font-weight: 700;
  color: #409eff;
  margin-bottom: 4px;
}

.stat-label {
  font-size: 13px;
  color: #6b7280;
}
</style>
