<script setup lang="ts">
import { ref } from 'vue'

const state = ref({
  value: 'https://www.baidu.com',
})
</script>

<template>
  <a-space direction="vertical" align="center">
    <a-qrcode v-model:value="state.value" />
    <input v-model="state.value" placeholder="-" maxlength="60">
  </a-space>
</template>

<style scoped>

</style>