<script setup lang="ts">
import { CloseSquareOutlined } from '@ant-design/icons-vue'

function onClose(e: MouseEvent) {
  console.log(e, 'I was closed.')
}
</script>

<template>
  <div>
    <a-alert
      type="warning"
      :closable="true"
      @close="onClose"
    >
      <template #message>
        Warning Text Warning Text Warning Text Warning Text Warning Text Warning Text Warning Text
      </template>
    </a-alert>
    <br>
    <a-alert
      type="error"
      closable
      @close="onClose"
    >
      <template #message>
        Error
      </template>

      <template #description>
        Error Description Error Description Error Description Error Description Error Description Error Description
      </template>
    </a-alert>
    <br>
    <a-alert
      message="Error Text"
      description="Error Description Error Description Error Description Error Description Error Description Error Description"
      type="error"
      :closable="{
        'aria-label': 'close',
        'closeIcon': CloseSquareOutlined,
      }"
      @close="onClose"
    />
  </div>
</template>
