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
    <component :is="item" v-for="(item, index) in render" :key="index" v-bind="$attrs" />
  </template>

  <component :is="render" v-bind="$attrs" />
</template>
