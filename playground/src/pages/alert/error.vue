<script setup lang="ts">
import { onErrorCaptured, ref } from 'vue'

const error = ref<Error | null>(null)
const hasError = ref(false)

// 捕获子组件的错误
onErrorCaptured((err: Error) => {
  error.value = err
  hasError.value = true
  console.error('Caught error:', err)
  // 返回 false 阻止错误继续传播
  return false
})

function throwError() {
  throw new Error('An Uncaught Error')
}

function resetError() {
  error.value = null
  hasError.value = false
}
</script>

<template>
  <div>
    <!-- 错误边界显示 -->
    <a-alert
      v-if="hasError"
      :message="`Error: ${error?.message}`"
      type="error"
      show-icon
      closable
      @close="resetError"
    >
      <template #description>
        <div>
          <p>Something went wrong.</p>
          <pre v-if="error">{{ error.stack }}</pre>
        </div>
      </template>
      <template #action>
        <a-button size="small" @click="resetError">
          Reset
        </a-button>
      </template>
    </a-alert>

    <!-- 正常内容 -->
    <div v-else>
      <a-button danger @click="throwError">
        Click me to throw a error
      </a-button>
    </div>
  </div>
</template>

<style scoped>
pre {
  font-size: 12px;
  color: #666;
  margin-top: 8px;
  overflow-x: auto;
}
</style>
