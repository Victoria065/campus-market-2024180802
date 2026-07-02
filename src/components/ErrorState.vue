<template>
  <div class="error-state">
    <span class="error-icon">😞</span>
    <p class="error-text">{{ message }}</p>
    <button v-if="retryText" class="retry-btn" @click="$emit('retry')">
      {{ retryText }}
    </button>
  </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  message?: string
  retryText?: string
}>(), {
  message: '请求失败，请确认 Mock 服务是否已启动',
  retryText: '重新加载'
})

defineEmits<{
  retry: []
}>()
</script>

<style scoped>
.error-state {
  text-align: center;
  padding: 80px 24px;
  background: #fff;
  border-radius: 16px;
  border: 2px dashed #fbc4c4;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}

.error-icon {
  font-size: 52px;
  opacity: .8;
}

.error-text {
  font-size: 15px;
  color: #f56c6c;
  font-weight: 500;
  margin: 0;
  line-height: 1.6;
}

.retry-btn {
  padding: 10px 28px;
  font-size: 14px;
  font-weight: 600;
  color: #fff;
  background: linear-gradient(135deg, #409eff, #2d6cdf);
  border: none;
  border-radius: 24px;
  cursor: pointer;
  transition: all .25s;
  letter-spacing: .5px;
}

.retry-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(64, 158, 255, .35);
}

.retry-btn:active {
  transform: translateY(0);
}
</style>
