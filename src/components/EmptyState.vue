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
  padding: 72px 24px;
  background: #fff;
  border-radius: 16px;
  border: 2px dashed #e8ecf2;
}

.empty-icon {
  font-size: 52px;
  margin-bottom: 18px;
  opacity: .6;
}

.empty-text {
  font-size: 16px;
  font-weight: 600;
  color: #6b7280;
  margin-bottom: 8px;
}

.empty-hint {
  font-size: 13px;
  color: #aaa;
}
</style>
