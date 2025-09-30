<script setup lang="ts">
import { DownOutlined } from '@ant-design/icons-vue'
import { cloneVNode, h, resolveComponent } from 'vue'

const items = [
  {
    key: '1',
    label: () => h('a', { href: 'https://www.antgroup.com', target: '_blank', rel: 'noopener noreferrer' }, '1st menu item'),
  },
  {
    key: '2',
    disabled: true,
    label: () => h('a', { href: 'https://www.aliyun.com', target: '_blank', rel: 'noopener noreferrer' }, '2nd menu item (disabled)'),
  },
  {
    key: '3',
    disabled: true,
    label: () => h('a', { href: 'https://www.luohanacademy.com', target: '_blank', rel: 'noopener noreferrer' }, '3rd menu item (disabled)'),
  },
]

const dividerComponent = resolveComponent('a-divider') as any
const spaceComponent = resolveComponent('a-space') as any
const buttonComponent = resolveComponent('a-button') as any

const contentStyle = {
  background: 'var(--ant-color-bg-elevated)',
  borderRadius: 'var(--ant-border-radius-lg)',
  boxShadow: 'var(--ant-box-shadow-secondary)',
}

const menuStyle = {
  boxShadow: 'none',
}

const popupRender = (menu: any) => {
  return h('div', { style: contentStyle }, [
    menu ? cloneVNode(menu, { style: menuStyle }) : null,
    h(dividerComponent, { style: { margin: 0 } }),
    h(spaceComponent, { style: { padding: '8px' } }, () => [
      h(buttonComponent, { type: 'primary' }, () => 'Click me!'),
    ]),
  ])
}

function handleClick(event: MouseEvent) {
  event.preventDefault()
}
</script>

<template>
  <a-dropdown :menu="{ items }" :popup-render="popupRender">
    <a class="dropdown-custom-link" @click="handleClick">
      <a-space>
        Hover me
        <DownOutlined />
      </a-space>
    </a>
  </a-dropdown>
</template>

<style scoped>
.dropdown-custom-link {
  color: var(--ant-color-primary);
}
</style>
