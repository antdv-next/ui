<script lang="ts" setup>
import { MinusOutlined, PlusOutlined } from '@ant-design/icons-vue'
import { ref } from 'vue'

const count = ref<number>(5)
const show = ref<boolean>(true)
function decline() {
  if (count.value >= 1) {
    count.value--
  }
}

function increase() {
  count.value++
}
</script>

<template>
  <div style="display: flex; gap: 16px; margin-top: 16px">
    <a-badge :count="count">
      <a-avatar shape="square" size="large" />
    </a-badge>
    <a-button-group>
      <a-button @click="decline">
        <MinusOutlined />
      </a-button>
      <a-button @click="increase">
        <PlusOutlined />
      </a-button>
    </a-button-group>
  </div>
  <a-divider />
  <a-badge :dot="show">
    <a-avatar shape="square" size="large" />
  </a-badge>
  <a-switch v-model:checked="show" />
</template>
