<script setup lang="ts">
import { ref } from 'vue'

const level = ref('L')
</script>

<template>
  <select v-model="level">
    <option value="L">
      l
    </option>
    <option value="M">
      M
    </option>
    <option value="Q">
      Q
    </option>
    <option value="H">
      H
    </option>
  </select>

  <a-qrcode value="https://baidu.com" :error-level="level" />
</template>

<style scoped>

</style>
