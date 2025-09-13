<script setup lang="ts">
import { SpaceCompactItemContext } from './define'

defineOptions({
  name: 'NoCompactStyle',
})

SpaceCompactItemContext.useProvide(null)
</script>

<template>
  <slot />
</template>
