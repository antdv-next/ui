<script lang="ts" setup>
import { Button, Dropdown } from 'antdv-next'

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
  {
    type: 'divider' as const,
  },
  {
    key: '4',
    label: 'Disabled Item',
    disabled: true,
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
    ],
  },
  {
    key: 'sub2',
    label: 'Navigation Four - Submenu',
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
]

function handleMenuClick(info: any) {
  console.log('Menu clicked:', info)
}
</script>

<template>
  <div class="demo-container">
    <h1>Dropdown Demos</h1>

    <section>
      <h2>Basic Dropdown</h2>
      <Dropdown :menu="{ items }">
        <Button>Hover me</Button>
      </Dropdown>
    </section>

    <section>
      <h2>Click Trigger</h2>
      <Dropdown :menu="{ items }" :trigger="['click']">
        <Button>Click me</Button>
      </Dropdown>
    </section>

    <section>
      <h2>With Arrow</h2>
      <Dropdown :menu="{ items }" :arrow="true">
        <Button>Arrow Dropdown</Button>
      </Dropdown>
    </section>

    <section>
      <h2>Placement Variations</h2>
      <div style="display: flex; gap: 16px; flex-wrap: wrap;">
        <Dropdown :menu="{ items }" placement="topLeft">
          <Button>Top Left</Button>
        </Dropdown>
        <Dropdown :menu="{ items }" placement="top">
          <Button>Top</Button>
        </Dropdown>
        <Dropdown :menu="{ items }" placement="topRight">
          <Button>Top Right</Button>
        </Dropdown>
        <Dropdown :menu="{ items }" placement="bottomLeft">
          <Button>Bottom Left</Button>
        </Dropdown>
        <Dropdown :menu="{ items }" placement="bottom">
          <Button>Bottom</Button>
        </Dropdown>
        <Dropdown :menu="{ items }" placement="bottomRight">
          <Button>Bottom Right</Button>
        </Dropdown>
      </div>
    </section>

    <section>
      <h2>With Submenu</h2>
      <Dropdown :menu="{ items: itemsWithSubmenu, onClick: handleMenuClick }">
        <Button>Dropdown with Submenu</Button>
      </Dropdown>
    </section>

    <section>
      <h2>Disabled</h2>
      <Dropdown :menu="{ items }" disabled>
        <Button>Disabled Dropdown</Button>
      </Dropdown>
    </section>

    <section>
      <h2>Custom Overlay using Slot</h2>
      <Dropdown>
        <template #overlay>
          <div style="background: white; padding: 16px; border-radius: 4px; box-shadow: 0 2px 8px rgba(0,0,0,0.15);">
            <h3 style="margin-top: 0;">
              Custom Content
            </h3>
            <p>This is a custom overlay content</p>
            <Button size="small">
              Action
            </Button>
          </div>
        </template>
        <Button>Custom Overlay</Button>
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
</style>
