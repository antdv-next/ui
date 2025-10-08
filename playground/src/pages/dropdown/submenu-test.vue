<script lang="ts" setup>
import { Button, Dropdown } from 'antdv-next'
import { ref } from 'vue'

const items = [
  {
    key: '1',
    label: 'Menu Item 1',
  },
  {
    key: '2',
    label: 'Menu Item 2',
  },
  {
    key: '3',
    label: 'Menu Item 3',
  },
]

const itemsWithSubmenu = [
  {
    key: '1',
    label: 'Navigation One',
  },
  {
    key: '2',
    label: 'Navigation Two',
  },
  {
    key: 'sub1',
    label: 'Navigation Three - Submenu',
    type: 'submenu' as const,
    children: [
      {
        key: '3',
        label: 'Option 1',
      },
      {
        key: '4',
        label: 'Option 2',
      },
      {
        key: 'sub1-1',
        label: 'Submenu Level 2',
        type: 'submenu' as const,
        children: [
          {
            key: '5',
            label: 'Option 3',
          },
          {
            key: '6',
            label: 'Option 4',
          },
        ],
      },
    ],
  },
  {
    key: 'sub2',
    label: 'Navigation Four - Submenu',
    type: 'submenu' as const,
    children: [
      {
        key: '7',
        label: 'Option 5',
      },
      {
        key: '8',
        label: 'Option 6',
      },
    ],
  },
]

const open = ref(false)

function handleMenuClick(info: any) {
  console.log('Menu clicked:', info)
}

function handleOpenChange(visible: boolean, info: any) {
  console.log('Open change:', visible, info)
  open.value = visible
}
</script>

<template>
  <div class="demo-container">
    <h1>Dropdown Submenu Test</h1>

    <section>
      <h2>Hover on Submenu (Testing Issue)</h2>
      <p>Move mouse from trigger to submenu - dropdown should stay open</p>
      <Dropdown
        :menu="{ items: itemsWithSubmenu, onClick: handleMenuClick }"
        :mouse-leave-delay="0.2"
        @open-change="handleOpenChange"
      >
        <Button>Hover me and move to submenu</Button>
      </Dropdown>
      <p>Open state: {{ open }}</p>
    </section>

    <section style="margin-top: 100px;">
      <h2>Nested Submenus</h2>
      <p>Test deeply nested submenus</p>
      <Dropdown
        :menu="{ items: itemsWithSubmenu }"
        :mouse-leave-delay="0.2"
      >
        <Button>Nested Submenus</Button>
      </Dropdown>
    </section>

    <section style="margin-top: 100px;">
      <h2>Basic Items (No Submenu)</h2>
      <Dropdown :menu="{ items }">
        <Button>Basic Dropdown</Button>
      </Dropdown>
    </section>
  </div>
</template>

<style scoped>
.demo-container {
  padding: 24px;
  max-width: 1200px;
  margin: 0 auto;
}

section {
  margin-bottom: 48px;
}

h1 {
  font-size: 28px;
  margin-bottom: 24px;
}

h2 {
  font-size: 20px;
  margin-bottom: 16px;
  color: #1890ff;
}

p {
  margin-bottom: 12px;
  color: #666;
}
</style>
