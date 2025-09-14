<script setup lang="ts">
import type { SpaceCompactItemProps } from './define'
import { SpaceCompactItemContext } from './define'

defineOptions({
  name: 'CompactItem',
})

const props = withDefaults(defineProps<SpaceCompactItemProps>(), {
  compactDirection: 'horizontal',
})

SpaceCompactItemContext.useProvide(props)
</script>

<template>
  <slot />
</template>
