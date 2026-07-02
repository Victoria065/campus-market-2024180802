<template>
  <div class="loading-state">
    <span class="spinner"></span>
    <p>{{ text }}</p>
  </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  text?: string
}>(), {
  text: '正在加载...'
})
</script>

<style scoped>
.loading-state {
  text-align: center;
  padding: 80px 0;
  color: #999;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
}

.spinner {
  display: inline-block;
  width: 36px;
  height: 36px;
  border: 3px solid #e8e8e8;
  border-top-color: #409eff;
  border-radius: 50%;
  animation: spin .7s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

p {
  font-size: 14px;
  color: #999;
  margin: 0;
}
</style>
