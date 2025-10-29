<script setup lang="ts">
import { DownOutlined } from '@ant-design/icons-vue'
import { ref } from 'vue'

const open = ref(false)

function handleMenuClick({ key }: { key: string }) {
  if (key === '3') {
    open.value = false
  }
}

function handleOpenChange(nextOpen: boolean, info: { source: 'trigger' | 'menu' }) {
  if (info.source === 'trigger' || nextOpen) {
    open.value = nextOpen
  }
}

const items = [
  {
    key: '1',
    label: 'Clicking me will not close the menu.',
  },
  {
    key: '2',
    label: 'Clicking me will not close the menu also.',
  },
  {
    key: '3',
    label: 'Clicking me will close the menu.',
  },
]
</script>

<template>
  <a-dropdown
    :menu="{ items, onClick: handleMenuClick }"
    :open="open"
    @open-change="handleOpenChange"
  >
    <a @click.prevent>
      <a-space>
        Hover me
        <DownOutlined />
      </a-space>
    </a>
  </a-dropdown>
</template>
