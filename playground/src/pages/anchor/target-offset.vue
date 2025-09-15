<script setup lang="ts">
import { onMounted, ref } from 'vue'

// 固定顶部块的样式
const style = {
  height: '10vh',
  backgroundColor: 'rgba(0, 0, 0, 0.85)',
  position: 'fixed' as const,
  top: 0,
  insetInlineStart: 0,
  width: '75%',
  color: '#fff',
}

// ref 引用和响应式数据
const topRef = ref<HTMLDivElement>()
const targetOffset = ref<number>()

// 锚点项配置
const items = [
  { key: 'part-1', href: '#part-1', title: 'Part 1' },
  { key: 'part-2', href: '#part-2', title: 'Part 2' },
  { key: 'part-3', href: '#part-3', title: 'Part 3' },
]

// 组件挂载后设置目标偏移量
onMounted(() => {
  if (topRef.value) {
    targetOffset.value = topRef.value.clientHeight
  }
})
</script>

<template>
  <div>
    <div class="flex">
      <div class="w-[70vw]">
        <div
          id="part-1"
          class="h-100vh"
          style="background: rgba(255,0,0,0.02); margin-top: 30vh;"
        >
          Part 1
        </div>
        <div
          id="part-2"
          class="h-100vh"
          style="background: rgba(0,255,0,0.02)"
        >
          Part 2
        </div>
        <div
          id="part-3"
          class="h-100vh"
          style="background: rgba(0,0,255,0.02)"
        >
          Part 3
        </div>
      </div>
      <div class="w-[30vw]">
        <a-anchor
          :target-offset="targetOffset"
          :items="items"
        />
      </div>
    </div>
    <div
      ref="topRef"
      :style="style"
    >
      <div>Fixed Top Block</div>
    </div>
  </div>
</template>

<style scoped>

</style>
