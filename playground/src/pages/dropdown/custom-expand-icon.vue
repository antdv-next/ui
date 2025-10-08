<script lang="ts" setup>
import { DownOutlined, StarOutlined } from '@ant-design/icons-vue'
import { h } from 'vue'

// Default submenu with default expand icon (RightOutlined)
const defaultItems = [
  {
    key: '1',
    label: 'Regular Item',
  },
  {
    key: 'sub1',
    label: 'Submenu (Default Icon)',
    type: 'submenu' as const,
    children: [
      {
        key: 'sub1-1',
        label: 'Sub Item 1',
      },
      {
        key: 'sub1-2',
        label: 'Nested Submenu',
        type: 'submenu' as const,
        children: [
          {
            key: 'sub1-2-1',
            label: 'Deep Item 1',
          },
          {
            key: 'sub1-2-2',
            label: 'Deep Item 2',
          },
        ],
      },
    ],
  },
]

// Submenu with custom expand icon
const customItems = [
  {
    key: '1',
    label: 'Regular Item',
  },
  {
    key: 'sub1',
    label: 'Submenu (Custom Icon)',
    type: 'submenu' as const,
    children: [
      {
        key: 'sub1-1',
        label: 'Sub Item 1',
      },
      {
        key: 'sub1-2',
        label: 'Nested Submenu',
        type: 'submenu' as const,
        children: [
          {
            key: 'sub1-2-1',
            label: 'Deep Item 1',
          },
          {
            key: 'sub1-2-2',
            label: 'Deep Item 2',
          },
        ],
      },
    ],
  },
]

// Custom expand icon function
function customExpandIcon({ isOpen }: { isOpen: boolean }) {
  return h(StarOutlined, {
    style: {
      fontSize: '12px',
      transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)',
      transition: 'transform 0.3s',
    },
  })
}
</script>

<template>
  <a-space direction="vertical" :size="24">
    <div>
      <h3>Default Expand Icon (RightOutlined)</h3>
      <a-dropdown :menu="{ items: defaultItems }">
        <a @click.prevent>
          <a-space>
            Hover me (default)
            <DownOutlined />
          </a-space>
        </a>
      </a-dropdown>
    </div>

    <div>
      <h3>Custom Expand Icon (StarOutlined)</h3>
      <a-dropdown :menu="{ items: customItems, expandIcon: customExpandIcon }">
        <a @click.prevent>
          <a-space>
            Hover me (custom)
            <DownOutlined />
          </a-space>
        </a>
      </a-dropdown>
    </div>

    <div>
      <h3>Custom Text Expand Icon</h3>
      <a-dropdown :menu="{ items: customItems, expandIcon: () => h('span', '▶') }">
        <a @click.prevent>
          <a-space>
            Hover me (text icon)
            <DownOutlined />
          </a-space>
        </a>
      </a-dropdown>
    </div>
  </a-space>
</template>

<style scoped>
h3 {
  margin: 0 0 8px;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.85);
}
</style>
