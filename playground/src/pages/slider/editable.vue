<script setup lang="ts">
import { ref } from 'vue'

const data = ref([20, 80])
</script>

<template>
  <a-slider v-model:value="data" :range="{ editable: true, minCount: 21, maxCount: 5 }" />
</template>

<style scoped>

</style>