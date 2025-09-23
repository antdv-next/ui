<script setup lang="ts">
import { ref } from 'vue'

const data1 = ref([30])
const data2 = ref([20, 50])
function onChange(value: number | number[]) {
  console.log('onChange: ', value)
}

function onChangeComplete(value: number | number[]) {
  console.log('onChangeComplete: ', value)
}
</script>

<template>
  <a-slider v-model:value="data1" @change-complete="onChangeComplete" @change="onChange" />
  <a-slider v-model:value="data2" range :step="10" @change="onChange" @change-complete="onChangeComplete" />
</template>

<style scoped>

</style>
