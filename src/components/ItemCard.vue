<template>
  <div class="item-card" :class="{ 'is-closed': isClosed }">
    <div class="card-header">
      <span class="card-tag" :class="tagClass">{{ tagText }}</span>
      <span v-if="isClosed" class="card-badge">{{ badgeText }}</span>
    </div>

    <h3 class="card-title">{{ title }}</h3>

    <p v-if="description" class="card-desc">{{ description }}</p>

    <div class="card-meta">
      <slot name="meta" />
    </div>

    <div class="card-footer">
      <span class="card-person">{{ person }}</span>
      <span class="card-time">{{ time }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  title: string
  description?: string
  person: string
  time: string
  tagText: string
  tagType?: 'primary' | 'success' | 'warning' | 'info' | 'danger'
  status?: string
}>()

const isClosed = computed(() => {
  const s = props.status || ''
  return ['sold', 'reserved', 'closed', 'done', 'full'].includes(s)
})

const badgeText = computed(() => {
  const s = props.status || ''
  const map: Record<string, string> = {
    sold: '已售出',
    reserved: '已预定',
    closed: '已关闭',
    done: '已完成',
    full: '已满员'
  }
  return map[s] || s
})

const tagClass = computed(() => `tag-${props.tagType || 'info'}`)
</script>

<style scoped>
.item-card {
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 16px;
  transition: box-shadow 0.2s, border-color 0.2s;
  position: relative;
  overflow: hidden;
}

.item-card:hover {
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  border-color: #cbd5e1;
}

.item-card.is-closed {
  opacity: 0.65;
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
}

.card-tag {
  font-size: 12px;
  padding: 2px 10px;
  border-radius: 10px;
  font-weight: 500;
}

.tag-primary {
  background: #ecf5ff;
  color: #409eff;
}

.tag-success {
  background: #f0f9eb;
  color: #67c23a;
}

.tag-warning {
  background: #fdf6ec;
  color: #e6a23c;
}

.tag-info {
  background: #f4f4f5;
  color: #909399;
}

.tag-danger {
  background: #fef0f0;
  color: #f56c6c;
}

.card-badge {
  font-size: 11px;
  background: #fef0f0;
  color: #f56c6c;
  padding: 1px 8px;
  border-radius: 4px;
}

.card-title {
  font-size: 15px;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 6px;
  line-height: 1.4;
}

.card-desc {
  font-size: 13px;
  color: #6b7280;
  margin-bottom: 10px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-height: 1.5;
}

.card-meta {
  margin-bottom: 10px;
  font-size: 13px;
  color: #374151;
}

.card-footer {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: #9ca3af;
  border-top: 1px solid #f3f4f6;
  padding-top: 10px;
}
</style>
