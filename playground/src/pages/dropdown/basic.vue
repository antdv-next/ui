<script lang="ts" setup>
import { DownOutlined, SmileOutlined } from '@ant-design/icons-vue'
import { h } from 'vue'

const items = [
  {
    key: '1',
    label: '1st menu item',
  },
  {
    key: '2',
    label: '2nd menu item (disabled)',
    icon: () => h(SmileOutlined),
    disabled: true,
  },
  {
    key: '3',
    label: '3rd menu item (disabled)',
    disabled: true,
  },
  {
    key: '4',
    danger: true,
    label: 'a danger item',
  },
]
</script>

<template>
  <a-dropdown :menu="{ items }">
    <a @click.prevent>
      <a-space>
        Hover me
        <DownOutlined />
      </a-space>
    </a>
  </a-dropdown>
</template>
