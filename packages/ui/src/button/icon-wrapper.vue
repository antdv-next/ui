<script setup lang="ts">
const { prefixCls } = defineProps<{
  prefixCls?: string
}>()
</script>

<template>
  <span
    :class="{
      [`${prefixCls}-icon`]: true,
    }"
  >
    <slot />
  </span>
</template>

<style scoped>

</style>
