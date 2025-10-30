<script lang="ts" setup>
import { reactive } from 'vue'

const state = reactive({
  checked1: true,
  checked2: false,
})
</script>

<template>
  <a-space direction="vertical">
    <a-switch v-model:checked="state.checked1" />
    <a-switch v-model:checked="state.checked2" size="small" />
  </a-space>
</template>
