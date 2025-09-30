<script setup lang="ts">
import { SmileOutlined } from '@ant-design/icons-vue'
import { h, ref } from 'vue'

const items = [
  {
    key: '1',
    label: () => h('a', { href: 'https://www.antgroup.com', target: '_blank', rel: 'noopener noreferrer' }, '1st menu item'),
  },
  {
    key: '2',
    disabled: true,
    icon: () => h(SmileOutlined),
    label: () => h('a', { href: 'https://www.aliyun.com', target: '_blank', rel: 'noopener noreferrer' }, '2nd menu item (disabled)'),
  },
  {
    key: '3',
    disabled: true,
    label: () => h('a', { href: 'https://www.luohanacademy.com', target: '_blank', rel: 'noopener noreferrer' }, '3rd menu item (disabled)'),
  },
  {
    key: '4',
    danger: true,
    label: 'a danger item',
  },
]

const containerRef = ref<HTMLElement>()

function getPopupContainer() {
  return containerRef.value || document.body
}
</script>

<template>
  <div ref="containerRef" class="dropdown-render-panel">
    <a-dropdown
      :menu="{ items }"
      :open="true"
      :trigger="[]"
      :get-popup-container="getPopupContainer"
    >
      <span class="dropdown-render-panel__anchor" />
    </a-dropdown>
  </div>
</template>

<style scoped>
.dropdown-render-panel {
  position: relative;
  padding: 24px;
  background: var(--ant-color-bg-layout);
  border-radius: var(--ant-border-radius-lg);
  min-height: 160px;
}

.dropdown-render-panel__anchor {
  display: inline-block;
  width: 0;
  height: 0;
}
</style>
