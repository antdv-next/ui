<script setup lang="ts">
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
        '2nd menu item',
      ),
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
        '3rd menu item',
      ),
  },
]
</script>

<template>
  <a-space direction="vertical">
    <a-space wrap>
      <a-dropdown :menu="{ items }" placement="bottomLeft" :arrow="{ pointAtCenter: true }">
        <a-button>bottomLeft</a-button>
      </a-dropdown>
      <a-dropdown :menu="{ items }" placement="bottom" :arrow="{ pointAtCenter: true }">
        <a-button>bottom</a-button>
      </a-dropdown>
      <a-dropdown :menu="{ items }" placement="bottomRight" :arrow="{ pointAtCenter: true }">
        <a-button>bottomRight</a-button>
      </a-dropdown>
    </a-space>
    <a-space wrap>
      <a-dropdown :menu="{ items }" placement="topLeft" :arrow="{ pointAtCenter: true }">
        <a-button>topLeft</a-button>
      </a-dropdown>
      <a-dropdown :menu="{ items }" placement="top" :arrow="{ pointAtCenter: true }">
        <a-button>top</a-button>
      </a-dropdown>
      <a-dropdown :menu="{ items }" placement="topRight" :arrow="{ pointAtCenter: true }">
        <a-button>topRight</a-button>
      </a-dropdown>
    </a-space>
  </a-space>
</template>
