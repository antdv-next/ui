<script setup lang="ts">
const formatter = (value: unknown) => `${value}%`
</script>

<template>
  <a-slider :tooltip="{ formatter }"></a-slider>
  <a-slider :tooltip="{ formatter: null }"></a-slider>
</template>

<style scoped>

</style>