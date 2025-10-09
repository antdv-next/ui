<script setup lang="ts">
import { SmileOutlined } from '@ant-design/icons-vue'
import { h } from 'vue'

const items = [
  {
    key: '1',
    label: () =>
      h(
        'a',
        {
          href: 'https://www.antgroup.com',
          target: '_blank',
          rel: 'noopener noreferrer',
        },
        '1st menu item',
      ),
  },
  {
    key: '2',
    label: () =>
      h(
        'a',
        {
          href: 'https://www.aliyun.com',
          target: '_blank',
          rel: 'noopener noreferrer',
        },
        '2nd menu item (disabled)',
      ),
    icon: () => h(SmileOutlined),
    disabled: true,
  },
  {
    key: '3',
    label: () =>
      h(
        'a',
        {
          href: 'https://www.luohanacademy.com',
          target: '_blank',
          rel: 'noopener noreferrer',
        },
        '3rd menu item (disabled)',
      ),
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
  <div class="dropdown-panel">
    <a-menu mode="vertical" :selectable="false" :items="items" class="ant-dropdown-menu" />
  </div>
</template>

<style scoped>
.dropdown-panel {
  width: 240px;
  padding: 4px 0;
  border-radius: var(--ant-border-radius-lg);
  background: var(--ant-color-bg-elevated);
  box-shadow: var(--ant-box-shadow-secondary);
}

:deep(.ant-menu) {
  border-inline-end: 0;
}
</style>
