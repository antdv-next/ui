<script setup lang="ts">
// 获取当前锚点的函数，对应React版本的getCurrentAnchor
const getCurrentAnchor = () => '#anchor-demo-static'

// 锚点项配置，包含嵌套子项
const items = [
  {
    key: '1',
    href: '#anchor-demo-basic',
    title: 'Basic demo',
  },
  {
    key: '2',
    href: '#anchor-demo-static',
    title: 'Static demo',
  },
  {
    key: '3',
    href: '#api',
    title: 'API',
    children: [
      {
        key: '4',
        href: '#anchor-props',
        title: 'Anchor Props',
      },
      {
        key: '5',
        href: '#link-props',
        title: 'Link Props',
      },
    ],
  },
]
</script>

<template>
  <div class="p-4">
    <a-anchor
      :affix="false"
      :get-current-anchor="getCurrentAnchor"
      :items="items"
    />
  </div>
</template>

<style scoped>

</style>
