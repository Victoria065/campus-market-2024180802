<template>
  <main class="page">
    <div class="page-banner banner-user">
      <div class="banner-text">
        <h1>👤 个人中心</h1>
        <p>管理你的信息、发布和收藏</p>
      </div>
    </div>

    <div class="profile-card">
      <div class="avatar-section">
        <div class="big-avatar">😊</div>
        <button class="edit-btn">✏️ 编辑资料</button>
      </div>
      <div class="profile-info">
        <h2>用户昵称</h2>
        <p>学号：2024XXXXXXXX</p>
        <p>注册时间：2024年9月1日</p>
      </div>
    </div>

    <div class="stats-row">
      <div class="stat-card">
        <div class="stat-icon" style="background:#ecf5ff;">📦</div>
        <div class="stat-num">0</div>
        <div class="stat-label">我的发布</div>
      </div>
      <div class="stat-card">
        <div class="stat-icon" style="background:#fef7ed;">⭐</div>
        <div class="stat-num">0</div>
        <div class="stat-label">我的收藏</div>
      </div>
      <div class="stat-card">
        <div class="stat-icon" style="background:#f0f9eb;">👀</div>
        <div class="stat-num">0</div>
        <div class="stat-label">浏览历史</div>
      </div>
      <div class="stat-card">
        <div class="stat-icon" style="background:#f5f0ff;">💬</div>
        <div class="stat-num">2</div>
        <div class="stat-label">未读消息</div>
      </div>
    </div>

    <div class="menu-section">
      <div class="menu-item">📋 我发布的商品</div>
      <div class="menu-item">❤️ 我收藏的商品</div>
      <div class="menu-item">📝 我参与的拼单</div>
      <div class="menu-item">🏃 我接的跑腿任务</div>
      <div class="menu-item">⚙️ 账号设置</div>
    </div>
  </main>
</template>

<script setup lang="ts"></script>

<style scoped>
.page { padding: 0; }

.page-banner {
  border-radius: 14px; padding: 32px 28px; margin-bottom: 24px; color: #fff;
}
.banner-user { background: linear-gradient(135deg, #8b5cf6, #6d28d9); }
.banner-text h1 { font-size: 26px; font-weight: 800; margin-bottom: 4px; }
.banner-text p  { font-size: 14px; opacity: .85; }

.profile-card {
  display: flex; gap: 22px; align-items: center;
  background: #fff; border: 1px solid #f0f0f0; border-radius: 14px;
  padding: 24px; margin-bottom: 20px;
}
.avatar-section {
  display: flex; flex-direction: column; align-items: center; gap: 10px;
}
.big-avatar {
  width: 72px; height: 72px; border-radius: 50%;
  background: linear-gradient(135deg, #f0e6ff, #e0d5f7);
  display: flex; align-items: center; justify-content: center; font-size: 36px;
}
.edit-btn {
  font-size: 11px; color: #8b5cf6; background: #f5f0ff;
  border: none; padding: 4px 12px; border-radius: 10px; cursor: pointer;
}
.profile-info h2 { font-size: 20px; font-weight: 700; color: #222; margin-bottom: 6px; }
.profile-info p  { font-size: 13px; color: #888; margin-bottom: 2px; }

.stats-row { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; margin-bottom: 24px; }
.stat-card {
  background: #fff; border: 1px solid #f0f0f0; border-radius: 12px;
  padding: 20px; text-align: center; transition: all .2s;
}
.stat-card:hover { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(0,0,0,.06); }
.stat-icon {
  width: 44px; height: 44px; border-radius: 12px;
  display: flex; align-items: center; justify-content: center;
  font-size: 20px; margin: 0 auto 10px;
}
.stat-num { font-size: 28px; font-weight: 800; color: #333; }
.stat-label { font-size: 12px; color: #aaa; margin-top: 2px; }

.menu-section {
  background: #fff; border: 1px solid #f0f0f0; border-radius: 14px; overflow: hidden;
}
.menu-item {
  padding: 16px 22px; font-size: 14px; color: #444; cursor: pointer;
  border-bottom: 1px solid #f5f5f5; transition: all .15s;
  display: flex; align-items: center; gap: 10px;
}
.menu-item:last-child { border-bottom: none; }
.menu-item:hover { background: #fafcff; color: #8b5cf6; }
</style>
