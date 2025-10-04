<script setup lang="ts">
import { ref } from 'vue'

const reverse = ref(true)
const data = ref(30)
const data1 = ref([20, 50])
</script>

<template>
  <a-slider v-model:value="data" :reverse="reverse" />
  <a-slider range :value="data1" :reverse="reverse" />
  <a-button @click="reverse = !reverse">
    toggle
  </a-button>
</template>

<style scoped>

</style>
