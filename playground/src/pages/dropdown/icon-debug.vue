<script setup lang="ts">
import { DownOutlined } from '@ant-design/icons-vue'
import { h } from 'vue'

const items: any[] = []
</script>

<template>
  <a-space>
    <a-dropdown-button :menu="{ items }" :icon="() => h(DownOutlined)">
      Submit
    </a-dropdown-button>
  </a-space>
</template>
