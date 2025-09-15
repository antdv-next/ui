<script setup lang="ts">
const items = [
  {
    key: 'part-1',
    href: '#part-1',
    title: 'part-1',
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
  <div>
    <div class="p-4">
      <a-anchor :items="items" direction="horizontal" />
    </div>
    <div>
      <div id="part-1" class="h-100vh w-full bg-red/10" />
      <div id="part-2" class="h-100vh w-full bg-green/10" />
      <div id="part-3" class="h-100vh w-full bg-blue/10" />
    </div>
  </div>
</template>

<style scoped>

</style>
