<template>
  <main class="page">
    <div class="page-banner banner-publish">
      <div class="banner-text">
        <h1>📝 发布信息</h1>
        <p>选择你要发布的内容类型，让更多同学看到</p>
      </div>
    </div>

    <div class="publish-types">
      <div class="type-card card-trade">
        <div class="card-icon-wrap"><span>🛒</span></div>
        <div class="card-body">
          <h3>二手商品</h3>
          <p>上传图片、填写描述与价格，让闲置物品找到新主人</p>
        </div>
        <span class="card-arrow">→</span>
      </div>
      <div class="type-card card-lost">
        <div class="card-icon-wrap"><span>🔍</span></div>
        <div class="card-body">
          <h3>失物 / 招领</h3>
          <p>描述遗失或捡拾物品的信息，帮助失物物归原主</p>
        </div>
        <span class="card-arrow">→</span>
      </div>
      <div class="type-card card-group">
        <div class="card-icon-wrap"><span>👥</span></div>
        <div class="card-body">
          <h3>拼单 / 搭子</h3>
          <p>说明拼单需求或组队类型，快速找到志同道合的伙伴</p>
        </div>
        <span class="card-arrow">→</span>
      </div>
      <div class="type-card card-errand">
        <div class="card-icon-wrap"><span>🏃</span></div>
        <div class="card-body">
          <h3>跑腿委托</h3>
          <p>填写任务、报酬与截止时间，找人帮忙代办事务</p>
        </div>
        <span class="card-arrow">→</span>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts"></script>

<style scoped>
.page { padding: 0; }

.page-banner {
  border-radius: 14px; padding: 32px 28px; margin-bottom: 28px; color: #fff;
}
.banner-publish { background: linear-gradient(135deg, #f56c6c, #e63946); }
.banner-text h1 { font-size: 26px; font-weight: 800; margin-bottom: 4px; }
.banner-text p  { font-size: 14px; opacity: .85; }

.publish-types { display: flex; flex-direction: column; gap: 12px; }

.type-card {
  display: flex; align-items: center; gap: 18px;
  background: #fff; border: 1px solid #f0f0f0; border-radius: 14px;
  padding: 20px 22px; cursor: pointer; transition: all .25s;
}
.type-card:hover {
  transform: translateX(6px);
  box-shadow: 0 8px 24px rgba(0,0,0,.08);
}
.card-trade:hover { border-left: 4px solid #409eff; }
.card-lost:hover  { border-left: 4px solid #e6a23c; }
.card-group:hover { border-left: 4px solid #6a5acd; }
.card-errand:hover { border-left: 4px solid #67c23a; }

.card-icon-wrap {
  width: 56px; height: 56px; border-radius: 14px;
  display: flex; align-items: center; justify-content: center;
  font-size: 28px; flex-shrink: 0;
}
.card-trade .card-icon-wrap  { background: #ecf5ff; }
.card-lost .card-icon-wrap   { background: #fef7ed; }
.card-group .card-icon-wrap  { background: #f5f0ff; }
.card-errand .card-icon-wrap { background: #f0f9eb; }

.card-body { flex: 1; }
.card-body h3 { font-size: 17px; font-weight: 700; color: #222; margin-bottom: 4px; }
.card-body p  { font-size: 13px; color: #888; line-height: 1.5; }

.card-arrow {
  font-size: 18px; color: #ccc; transition: all .25s;
}
.type-card:hover .card-arrow {
  color: #409eff; transform: translateX(4px);
}
</style>
