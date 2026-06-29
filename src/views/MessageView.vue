<template>
  <main class="page">
    <div class="page-banner banner-msg">
      <div class="banner-text">
        <h1>💬 消息中心</h1>
        <p>私信、通知、互动消息，随时查看不遗漏</p>
      </div>
    </div>

    <div class="msg-tabs">
      <span
        v-for="t in tabs"
        :key="t"
        class="tab"
        :class="{ active: activeTab === t }"
        @click="activeTab = t"
      >
        {{ t }}
        <span v-if="t === '私信'" class="badge">2</span>
      </span>
    </div>

    <div class="msg-list">
      <div class="msg-card unread">
        <div class="msg-avatar" style="background:#e8f4fd;">🧑</div>
        <div class="msg-body">
          <div class="msg-top">
            <span class="msg-name">张同学</span>
            <span class="msg-time">10分钟前</span>
          </div>
          <p class="msg-text">你好，这本教材还在吗？我想要买，方便的话可以博学楼面交……</p>
        </div>
        <div class="unread-dot"></div>
      </div>
      <div class="msg-card unread">
        <div class="msg-avatar" style="background:#fdf0f5;">👩</div>
        <div class="msg-body">
          <div class="msg-top">
            <span class="msg-name">李同学</span>
            <span class="msg-time">2小时前</span>
          </div>
          <p class="msg-text">喜茶拼单还差一人，要一起吗？下午4点半截止哦~</p>
        </div>
        <div class="unread-dot"></div>
      </div>
      <div class="msg-card">
        <div class="msg-avatar" style="background:#f5f5f5;">🔔</div>
        <div class="msg-body">
          <div class="msg-top">
            <span class="msg-name">系统通知</span>
            <span class="msg-time">昨天</span>
          </div>
          <p class="msg-text">欢迎来到校园轻集市！发布第一条信息，让更多同学看到你吧</p>
        </div>
      </div>
      <div class="msg-card">
        <div class="msg-avatar" style="background:#fef7ed;">❤️</div>
        <div class="msg-body">
          <div class="msg-top">
            <span class="msg-name">互动消息</span>
            <span class="msg-time">2天前</span>
          </div>
          <p class="msg-text">你的二手商品"机械键盘"被 3 人收藏了</p>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const tabs = ['私信', '系统通知', '互动消息']
const activeTab = ref('私信')
</script>

<style scoped>
.page { padding: 0; }

.page-banner {
  border-radius: 14px; padding: 32px 28px; margin-bottom: 24px; color: #fff;
}
.banner-msg { background: linear-gradient(135deg, #06b6d4, #0891b2); }
.banner-text h1 { font-size: 26px; font-weight: 800; margin-bottom: 4px; }
.banner-text p  { font-size: 14px; opacity: .85; }

.msg-tabs { display: flex; gap: 10px; margin-bottom: 24px; }
.tab {
  position: relative;
  padding: 8px 20px; border-radius: 22px; font-size: 13px; font-weight: 500;
  color: #555; background: #fff; border: 1px solid #e5e5e5;
  cursor: pointer; transition: all .2s; user-select: none;
}
.tab:hover { border-color: #06b6d4; color: #06b6d4; }
.tab.active {
  background: #06b6d4; color: #fff; border-color: #06b6d4;
  box-shadow: 0 4px 12px rgba(6,182,212,.35);
}
.badge {
  display: inline-block; min-width: 18px; height: 18px; line-height: 18px;
  text-align: center; font-size: 10px; font-weight: 700;
  background: #f56c6c; color: #fff; border-radius: 9px;
  padding: 0 5px; margin-left: 4px; vertical-align: middle;
}

.msg-list { display: flex; flex-direction: column; gap: 8px; }

.msg-card {
  display: flex; align-items: center; gap: 14px;
  background: #fff; border: 1px solid #f0f0f0; border-radius: 12px;
  padding: 16px 18px; cursor: pointer; transition: all .2s;
  position: relative;
}
.msg-card:hover { background: #fafcff; border-color: #d0d7ff; }
.msg-card.unread { background: #fafcff; }

.msg-avatar {
  width: 48px; height: 48px; border-radius: 12px;
  display: flex; align-items: center; justify-content: center;
  font-size: 22px; flex-shrink: 0;
}
.msg-body { flex: 1; min-width: 0; }
.msg-top { display: flex; justify-content: space-between; margin-bottom: 4px; }
.msg-name { font-size: 14px; font-weight: 700; color: #222; }
.msg-time { font-size: 12px; color: #bbb; }
.msg-text {
  font-size: 13px; color: #888;
  overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
  max-width: 480px;
}
.unread-dot {
  width: 8px; height: 8px; border-radius: 50%;
  background: #f56c6c; flex-shrink: 0;
}
</style>
