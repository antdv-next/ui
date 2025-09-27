<script setup lang="ts">
import { h } from 'vue'

const items = [
  {
    key: '1',
    label: () => h('a', { href: 'https://www.antgroup.com', target: '_blank', rel: 'noopener noreferrer' }, '1st menu item'),
  },
  {
    key: '2',
    label: () => h('a', { href: 'https://www.aliyun.com', target: '_blank', rel: 'noopener noreferrer' }, '2nd menu item'),
  },
  {
    key: '3',
    label: () => h('a', { href: 'https://www.luohanacademy.com', target: '_blank', rel: 'noopener noreferrer' }, '3rd menu item'),
  },
]
</script>

<template>
  <a-space direction="vertical">
    <a-space wrap>
      <a-dropdown :menu="{ items }" placement="bottomLeft" arrow>
        <a-button>bottomLeft</a-button>
      </a-dropdown>
      <a-dropdown :menu="{ items }" placement="bottom" arrow>
        <a-button>bottom</a-button>
      </a-dropdown>
      <a-dropdown :menu="{ items }" placement="bottomRight" arrow>
        <a-button>bottomRight</a-button>
      </a-dropdown>
    </a-space>
    <a-space wrap>
      <a-dropdown :menu="{ items }" placement="topLeft" arrow>
        <a-button>topLeft</a-button>
      </a-dropdown>
      <a-dropdown :menu="{ items }" placement="top" arrow>
        <a-button>top</a-button>
      </a-dropdown>
      <a-dropdown :menu="{ items }" placement="topRight" arrow>
        <a-button>topRight</a-button>
      </a-dropdown>
    </a-space>
  </a-space>
</template>
