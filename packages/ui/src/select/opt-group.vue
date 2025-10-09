<script setup lang="ts">
import type { OptGroupProps } from './define'

defineOptions({
  name: 'ASelectOptGroup',
})

defineProps<OptGroupProps>()
</script>

<template>
  <div>
    <slot />
  </div>
</template>
