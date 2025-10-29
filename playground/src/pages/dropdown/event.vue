<script setup lang="ts">
import { DownOutlined } from '@ant-design/icons-vue'

function handleClick({ key }: { key: string }) {
  console.log(`Click on item ${key}`)
  // message.info(`Click on item ${key}`)
}

const items = [
  {
    key: '1',
    label: '1st menu item',
  },
  {
    key: '2',
    label: '2nd menu item',
  },
  {
    key: '3',
    label: '3rd menu item',
  },
]
</script>

<template>
  <a-dropdown :menu="{ items, onClick: handleClick }">
    <a @click.prevent>
      <a-space>
        Hover me, Click menu item
        <DownOutlined />
      </a-space>
    </a>
  </a-dropdown>
</template>
