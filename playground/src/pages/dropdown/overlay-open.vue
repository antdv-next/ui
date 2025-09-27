<script setup lang="ts">
import { DownOutlined } from '@ant-design/icons-vue'
import type { DropdownEmits } from 'antdv-next'
import type { MenuEmits } from 'antdv-next'
import { ref } from 'vue'

const open = ref(false)

const items = [
  { key: '1', label: 'Clicking me will not close the menu.' },
  { key: '2', label: 'Clicking me will not close the menu also.' },
  { key: '3', label: 'Clicking me will close the menu.' },
]

function handleMenuClick(info: MenuEmits['click'][0]) {
  if (info.key === '3')
    open.value = false
}

function handleOpenChange(nextOpen: boolean, info: DropdownEmits['openChange'][1]) {
  if (info.source === 'trigger' || nextOpen)
    open.value = nextOpen
}

function handleClick(event: MouseEvent) {
  event.preventDefault()
}
</script>

<template>
  <a-dropdown
    :menu="{ items, onClick: handleMenuClick }"
    :open="open"
    @openChange="handleOpenChange"
  >
    <a class="dropdown-link" @click="handleClick">
      <a-space>
        Hover me
        <DownOutlined />
      </a-space>
    </a>
  </a-dropdown>
</template>

<style scoped>
.dropdown-link {
  color: var(--ant-color-primary);
}
</style>
