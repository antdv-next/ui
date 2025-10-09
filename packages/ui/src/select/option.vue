<script setup lang="ts">
import type { OptionProps } from './define'

defineOptions({
  name: 'ASelectOption',
})

defineProps<OptionProps>()
</script>

<template>
  <div>
    <slot />
  </div>
</template>
