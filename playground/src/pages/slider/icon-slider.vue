<script setup lang="ts">
import { FrownOutlined, SmileOutlined } from '@ant-design/icons-vue'
import { computed, ref } from 'vue'

const min = 0
const max = 20
const data = ref(0)
const mid = Number(((min - max) / 2).toFixed(5))
const preColor = computed(() => data.value >= mid ? '' : 'rgba(0, 0, 0, .45)')
const nextColor = computed(() => data.value >= mid ? 'rgba(0, 0, 0, .45)' : '')
</script>

<template>
  <div class="icon-wrapper">
    <FrownOutlined :style="preColor" />
    <a-slider v-model:value="data" :min="min" :max="max" />
    <SmileOutlined :style="nextColor" />
  </div>
</template>

<style scoped>
.icon-wrapper {
  position: relative;
  padding: 0px 30px;
}

.icon-wrapper .anticon {
  position: absolute;
  top: -2px;
  width: 16px;
  height: 16px;
  line-height: 1;
  font-size: 16px;
  color: rgba(0, 0, 0, 0.25);
}

.icon-wrapper .anticon:first-child {
  left: 0;
}

.icon-wrapper .anticon:last-child {
  right: 0;
}
</style>
