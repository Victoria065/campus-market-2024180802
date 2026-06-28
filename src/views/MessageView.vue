<template>
  <main class="page">
    <h1>消息中心</h1>
    <p class="page-desc">查看私信、系统通知与互动消息</p>

    <div class="message-tabs">
      <span class="tab active">私信</span>
      <span class="tab">系统通知</span>
      <span class="tab">互动消息</span>
    </div>

    <div class="message-list">
      <div class="message-item">
        <div class="avatar">🧑</div>
        <div class="msg-content">
          <div class="msg-header">
            <span class="msg-name">张同学</span>
            <span class="msg-time">10分钟前</span>
          </div>
          <p class="msg-text">你好，这本教材还在吗？我想要……</p>
        </div>
      </div>
      <div class="message-item">
        <div class="avatar">👩</div>
        <div class="msg-content">
          <div class="msg-header">
            <span class="msg-name">李同学</span>
            <span class="msg-time">2小时前</span>
          </div>
          <p class="msg-text">拼单还差一人，要一起吗？</p>
        </div>
      </div>
      <p class="placeholder-tip">更多消息将在接入真实数据后展示</p>
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
  margin-bottom: 20px;
}

.message-tabs {
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
}

.tab.active {
  background: #409eff;
  color: #fff;
  border-color: #409eff;
}

.message-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.message-item {
  display: flex;
  gap: 12px;
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 16px;
  align-items: center;
}

.avatar {
  width: 44px;
  height: 44px;
  background: #f3f4f6;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  flex-shrink: 0;
}

.msg-content {
  flex: 1;
  min-width: 0;
}

.msg-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 4px;
}

.msg-name {
  font-size: 14px;
  font-weight: 600;
  color: #1f2937;
}

.msg-time {
  font-size: 12px;
  color: #9ca3af;
}

.msg-text {
  font-size: 13px;
  color: #6b7280;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.placeholder-tip {
  text-align: center;
  font-size: 13px;
  color: #9ca3af;
  margin-top: 16px;
}
</style>
