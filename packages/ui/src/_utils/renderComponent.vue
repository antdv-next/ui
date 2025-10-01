<script setup lang="ts">
import type { VueNode } from '@v-c/util/dist/type'

defineOptions({
  name: 'RenderComponent',
  inheritAttrs: false,
})

defineProps<Props>()
interface Props {
  render: VueNode[] | VueNode
}
</script>

<template>
  <template v-if="Array.isArray(render)">
    <component :is="item" v-for="(item, index) in render" :key="index" />
  </template>

  <component :is="render" />
</template>
