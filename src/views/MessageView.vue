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
        <span v-if="t === '私信' && unreadCount" class="badge">{{ unreadCount }}</span>
      </span>
    </div>

    <div class="msg-list">
      <div class="msg-card unread">
        <div class="msg-avatar" style="background: linear-gradient(135deg, #e8f4fd, #d0e8ff);">🧑</div>
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
        <div class="msg-avatar" style="background: linear-gradient(135deg, #fdf0f5, #fce0ec);">👩</div>
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
        <div class="msg-avatar" style="background: linear-gradient(135deg, #f5f5f5, #e8e8e8);">🔔</div>
        <div class="msg-body">
          <div class="msg-top">
            <span class="msg-name">系统通知</span>
            <span class="msg-time">昨天</span>
          </div>
          <p class="msg-text">欢迎来到校园轻集市！发布第一条信息，让更多同学看到你吧</p>
        </div>
      </div>
      <div class="msg-card">
        <div class="msg-avatar" style="background: linear-gradient(135deg, #fef7ed, #fef0d5);">❤️</div>
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
const unreadCount = ref(2)
</script>

<style scoped>
.page { padding: 0; }

.page-banner {
  border-radius: 16px; padding: 36px 32px; margin-bottom: 24px; color: #fff;
  position: relative; overflow: hidden;
}
.banner-msg {
  background: linear-gradient(135deg, #06b6d4, #0891b2);
  box-shadow: 0 4px 20px rgba(6, 182, 212, 0.2);
}
.banner-text h1 { font-size: 28px; font-weight: 800; margin-bottom: 6px; }
.banner-text p  { font-size: 14px; opacity: .85; }

.msg-tabs { display: flex; gap: 10px; margin-bottom: 24px; }
.tab {
  position: relative;
  padding: 8px 22px; border-radius: 24px; font-size: 13px; font-weight: 500;
  color: #555; background: #fff; border: 1.5px solid #e8e8e8;
  cursor: pointer; transition: all .25s; user-select: none;
}
.tab:hover { border-color: #06b6d4; color: #06b6d4; background: #f5fdff; }
.tab.active {
  background: linear-gradient(135deg, #06b6d4, #22d3ee);
  color: #fff; border-color: transparent;
  box-shadow: 0 4px 14px rgba(6, 182, 212, .35);
}
.badge {
  display: inline-flex; align-items: center; justify-content: center;
  min-width: 20px; height: 20px;
  font-size: 11px; font-weight: 700;
  background: #f56c6c; color: #fff; border-radius: 10px;
  padding: 0 6px; margin-left: 4px; vertical-align: middle;
}

.msg-list { display: flex; flex-direction: column; gap: 10px; }

.msg-card {
  display: flex; align-items: center; gap: 16px;
  background: #fff; border: 1px solid #f0f0f0; border-radius: 14px;
  padding: 18px 20px; cursor: pointer; transition: all .25s;
  position: relative;
}
.msg-card:hover { background: #fafcff; border-color: #d0d7ff; transform: translateX(4px); }
.msg-card.unread { background: linear-gradient(135deg, #fafcff, #f5f8ff); border-left: 3px solid #409eff; }

.msg-avatar {
  width: 52px; height: 52px; border-radius: 16px;
  display: flex; align-items: center; justify-content: center;
  font-size: 24px; flex-shrink: 0;
}
.msg-body { flex: 1; min-width: 0; }
.msg-top { display: flex; justify-content: space-between; margin-bottom: 6px; }
.msg-name { font-size: 15px; font-weight: 700; color: #222; }
.msg-time { font-size: 12px; color: #bbb; }
.msg-text {
  font-size: 13px; color: #888; line-height: 1.5;
  overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
  max-width: 500px;
}
.unread-dot {
  width: 9px; height: 9px; border-radius: 50%;
  background: #f56c6c; flex-shrink: 0;
  box-shadow: 0 0 6px rgba(245, 108, 108, .4);
}
</style>
