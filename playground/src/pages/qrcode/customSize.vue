<script lang="ts" setup>
import { MinusOutlined, PlusOutlined } from '@ant-design/icons-vue'
import { ref } from 'vue'

const size = ref(160)
function decline() {
  size.value = size.value - 10
  if (size.value < 48) {
    size.value = 48
  }
}
function increase() {
  size.value = size.value + 10
  if (size.value > 300) {
    size.value = 300
  }
}
</script>

<template>
  <a-button-group>
    <a-button @click="decline">
      <template #icon>
        <MinusOutlined />
      </template>
      small
    </a-button>
    <a-button @click="increase">
      <template #icon>
        <PlusOutlined />
      </template>
      large
    </a-button>
  </a-button-group>
  <br>
  <br>
  <a-qrcode
    :size="size"
    :icon-size="size / 4"
    error-level="H"
    value="https://www.antdv.com"
    icon="https://www.antdv.com/assets/logo.1ef800a8.svg"
  />
</template>
