<script setup lang="ts">
import { ref } from 'vue'

const reverse = ref(true)
const data = ref([20, 50])
</script>

<template>
  <a-slider :value="30" :reverse="reverse" />
  <a-slider range :value="data" :reverse="reverse" />
  <a-button @click="reverse = !reverse">toggle</a-button>
</template>

<style scoped>

</style>
