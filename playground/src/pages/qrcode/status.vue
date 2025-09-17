<script setup lang="ts">
const value = 'https://ant.design'
</script>

<template>
  <a-qrcode :value="value" status="loading" />
  <a-qrcode :value="value" status="expired" @refresh="console.log('refresh')" />
  <a-qrcode :value="value" status="scanned" />
</template>

<style scoped>

</style>
