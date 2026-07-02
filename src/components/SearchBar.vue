<template>
  <div class="search-bar">
    <span class="search-icon">🔍</span>
    <input
      v-model="model"
      type="text"
      :placeholder="placeholder"
      class="search-input"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    />
    <button v-if="model" class="clear-btn" @click="clear">✕</button>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  modelValue?: string
  placeholder?: string
}>(), {
  modelValue: '',
  placeholder: '请输入关键词搜索...'
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const model = computed({
  get: () => props.modelValue,
  set: (val: string) => emit('update:modelValue', val)
})

function clear() {
  emit('update:modelValue', '')
}
</script>

<style scoped>
.search-bar {
  display: flex;
  align-items: center;
  gap: 10px;
  background: #fff;
  border: 1.5px solid #e8e8e8;
  border-radius: 12px;
  padding: 10px 16px;
  transition: all .25s;
}

.search-bar:focus-within {
  border-color: #409eff;
  box-shadow: 0 0 0 3px rgba(64, 158, 255, .08);
}

.search-icon {
  font-size: 16px;
  flex-shrink: 0;
  opacity: .6;
}

.search-input {
  flex: 1;
  border: none;
  outline: none;
  font-size: 14px;
  color: #333;
  background: transparent;
}

.search-input::placeholder {
  color: #bbb;
}

.clear-btn {
  flex-shrink: 0;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  border: none;
  background: #e8e8e8;
  color: #999;
  font-size: 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all .15s;
  padding: 0;
  line-height: 1;
}

.clear-btn:hover {
  background: #ccc;
  color: #666;
}
</style>
