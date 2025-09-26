<script setup lang="ts">
import { DownOutlined, SmileOutlined } from '@ant-design/icons-vue'
import { h } from 'vue'

const items = [
  {
    key: '1',
    label: () => h('a', { href: 'https://www.antgroup.com', target: '_blank', rel: 'noopener noreferrer' }, '1st menu item'),
  },
  {
    key: '2',
    icon: () => h(SmileOutlined),
    disabled: true,
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
</script>

<template>
  <div class="dropdown-basic">
    <a-dropdown :menu="{ items }">
      <a class="dropdown-link" @click.prevent>
        <a-space>
          Hover me
          <DownOutlined />
        </a-space>
      </a>
    </a-dropdown>
  </div>
</template>

<style scoped>
.dropdown-basic {
  padding: 24px;
}

.dropdown-link {
  color: var(--ant-color-primary);
  cursor: pointer;
}
</style>
