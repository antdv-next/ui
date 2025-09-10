<script setup lang="ts">
import type { ConfigProviderProps } from './define.ts'
import { useConfigContext } from './context.ts'
import ProviderChildren from './provider-children.vue'

defineProps<ConfigProviderProps>()
const context = useConfigContext()
</script>

<template>
  <ProviderChildren :parent-context="context" v-bind="$props">
    <slot />
  </ProviderChildren>
</template>

<style scoped>

</style>
