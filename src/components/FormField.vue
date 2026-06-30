<template>
  <div class="form-field">
    <label class="field-label">
      {{ label }}
      <span v-if="required" class="required-mark">*</span>
    </label>
    <slot />
    <p v-if="error" class="field-error">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  label: string
  required?: boolean
  error?: string
}>()
</script>

<style scoped>
.form-field {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.field-label {
  font-size: 14px;
  font-weight: 600;
  color: #374151;
}

.required-mark {
  color: #e63946;
  margin-left: 2px;
  font-weight: 700;
}

.field-error {
  font-size: 12px;
  color: #e63946;
  margin: 0;
  line-height: 1.4;
  padding: 4px 10px;
  background: #fef2f2;
  border-radius: 6px;
  border-left: 3px solid #e63946;
}
</style>
