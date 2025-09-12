<script setup lang="ts">
import type { AffixProps } from './define.ts'

const props = defineProps<AffixProps>()
</script>

<template>
  <div class="ant-affix">
    <slot />
  </div>
</template>

<style scoped>

</style>
