<script setup lang="ts">
import { ref } from 'vue'

const marks = {
  0: '0°C',
  26: '26°C',
  37: '37°C',
  100: {
    style: {
      color: '#f50',
    },
    label: '100°C',
  },
}
const singleValue = ref(37)
const rangeValue = ref([26, 37])
</script>

<template>
  <div style="padding: 20px;">
    <h4>included=true</h4>
    <a-slider v-model:value="singleValue" :marks="marks">
      <template #mark="{ point, label }">
        <template v-if="point === 100">
          <strong>{{ label }}</strong>
        </template>
        <template v-else>
          {{ label }}
        </template>
      </template>
    </a-slider>
    <a-slider v-model:value="rangeValue" range :marks="marks">
      <template #mark="{ point, label }">
        <template v-if="point === 100">
          <strong>{{ label }}</strong>
        </template>
        <template v-else>
          {{ label }}
        </template>
      </template>
    </a-slider>

    <h4>included=false</h4>
    <a-slider v-model:value="singleValue" :marks="marks" :included="false">
      <template #mark="{ point, label }">
        <template v-if="point === 100">
          <strong>{{ label }}</strong>
        </template>
        <template v-else>
          {{ label }}
        </template>
      </template>
    </a-slider>

    <h4>marks & step</h4>
    <a-slider v-model:value="singleValue" :marks="marks" :step="10">
      <template #mark="{ point, label }">
        <template v-if="point === 100">
          <strong>{{ label }}</strong>
        </template>
        <template v-else>
          {{ label }}
        </template>
      </template>
    </a-slider>

    <h4>step=null</h4>
    <a-slider v-model:value="singleValue" :marks="marks" :step="null">
      <template #mark="{ point, label }">
        <template v-if="point === 100">
          <strong>{{ label }}</strong>
        </template>
        <template v-else>
          {{ label }}
        </template>
      </template>
    </a-slider>
  </div>
</template>

<style scoped>
</style>
