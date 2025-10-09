<script setup lang="ts">
import { DownOutlined } from '@ant-design/icons-vue'
</script>

<template>
  <a-space>
    <a-dropdown-button :menu="{ items: [] }">
      <template #icon>
        <DownOutlined />
      </template>
      Submit
    </a-dropdown-button>
  </a-space>
</template>
