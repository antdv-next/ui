<script setup lang="ts">
import { ref } from 'vue'

const data = ref(30)
</script>

<template>
  <a-slider v-model:value="data" :tooltip="{ open: true }" />
</template>

<style scoped>

</style>
