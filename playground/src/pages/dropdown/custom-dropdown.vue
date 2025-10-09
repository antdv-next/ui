<script setup lang="ts">
import { DownOutlined } from '@ant-design/icons-vue'
import { cloneVNode, h, isVNode, resolveComponent } from 'vue'

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
]

const contentStyle = {
  backgroundColor: 'var(--ant-color-bg-elevated)',
  borderRadius: 'var(--ant-border-radius-lg)',
  boxShadow: 'var(--ant-box-shadow-secondary)',
} as const

const menuStyle = {
  boxShadow: 'none',
} as const

const Divider = resolveComponent('a-divider')
const Space = resolveComponent('a-space')
const Button = resolveComponent('a-button')

function renderPopup(originNode: any) {
  const nodes = Array.isArray(originNode) ? originNode : [originNode]
  const clonedNodes = nodes.map((node) => {
    if (!isVNode(node)) {
      return node
    }
    const mergedStyle = {
      ...(node.props?.style || {}),
      ...menuStyle,
    }
    return cloneVNode(node, {
      style: mergedStyle,
    })
  })

  return h('div', { style: contentStyle }, [
    ...clonedNodes,
    h(Divider, { style: { margin: 0 } }),
    h(
      Space,
      { style: { padding: '8px' } },
      () => [h(Button, { type: 'primary' }, () => 'Click me!')],
    ),
  ])
}
</script>

<template>
  <a-dropdown :menu="{ items }" :popup-render="renderPopup">
    <a @click.prevent>
      <a-space>
        Hover me
        <DownOutlined />
      </a-space>
    </a>
  </a-dropdown>
</template>
