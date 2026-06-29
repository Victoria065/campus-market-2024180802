<template>
  <div class="empty-state">
    <div class="empty-icon">📭</div>
    <p class="empty-text">{{ message }}</p>
    <p v-if="hint" class="empty-hint">{{ hint }}</p>
  </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  message?: string
  hint?: string
}>(), {
  message: '暂无数据',
  hint: '请稍后再来查看'
})
</script>

<style scoped>
.empty-state {
  text-align: center;
  padding: 64px 24px;
  color: #9ca3af;
}

.empty-icon {
  font-size: 48px;
  margin-bottom: 16px;
}

.empty-text {
  font-size: 16px;
  font-weight: 500;
  color: #6b7280;
  margin-bottom: 6px;
}

.empty-hint {
  font-size: 13px;
  color: #9ca3af;
}
</style>
