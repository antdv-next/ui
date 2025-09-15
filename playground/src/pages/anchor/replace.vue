<script setup lang="ts">
// 锚点项配置
const items = [
  {
    key: 'part-1',
    href: '#part-1',
    title: 'Part 1',
  },
  {
    key: 'part-2',
    href: '#part-2',
    title: 'Part 2',
  },
  {
    key: 'part-3',
    href: '#part-3',
    title: 'Part 3',
  },
]
</script>

<template>
  <div class="flex">
    <div class="w-[70vw]">
      <div
        id="part-1"
        class="h-100vh"
        style="background: rgba(255,0,0,0.02)"
      />
      <div
        id="part-2"
        class="h-100vh"
        style="background: rgba(0,255,0,0.02)"
      />
      <div
        id="part-3"
        class="h-100vh"
        style="background: rgba(0,0,255,0.02)"
      />
    </div>
    <div class="w-[30vw]">
      <a-anchor
        replace
        :items="items"
      />
    </div>
  </div>
</template>

<style scoped>

</style>
