<script lang="ts" setup>
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
      <a-dropdown :menu="{ items }">
        <a-button>Hover me</a-button>
      </a-dropdown>
    </section>

    <section>
      <h2>Click Trigger</h2>
      <a-dropdown :menu="{ items }" :trigger="['click']">
        <a-button>Click me</a-button>
      </a-dropdown>
    </section>

    <section>
      <h2>With Arrow</h2>
      <a-dropdown :menu="{ items }" :arrow="true">
        <a-button>Arrow Dropdown</a-button>
      </a-dropdown>
    </section>

    <section>
      <h2>Placement Variations</h2>
      <div style="display: flex; gap: 16px; flex-wrap: wrap;">
        <a-dropdown :menu="{ items }" placement="topLeft">
          <a-button>Top Left</a-button>
        </a-dropdown>
        <a-dropdown :menu="{ items }" placement="top">
          <a-button>Top</a-button>
        </a-dropdown>
        <a-dropdown :menu="{ items }" placement="topRight">
          <a-button>Top Right</a-button>
        </a-dropdown>
        <a-dropdown :menu="{ items }" placement="bottomLeft">
          <a-button>Bottom Left</a-button>
        </a-dropdown>
        <a-dropdown :menu="{ items }" placement="bottom">
          <a-button>Bottom</a-button>
        </a-dropdown>
        <a-dropdown :menu="{ items }" placement="bottomRight">
          <a-button>Bottom Right</a-button>
        </a-dropdown>
      </div>
    </section>

    <section>
      <h2>With Submenu</h2>
      <a-dropdown :menu="{ items: itemsWithSubmenu, onClick: handleMenuClick }">
        <a-button>a-dropdown with Submenu</a-button>
      </a-dropdown>
    </section>

    <section>
      <h2>Disabled</h2>
      <a-dropdown :menu="{ items }" disabled>
        <a-button>Disabled a-dropdown</a-button>
      </a-dropdown>
    </section>

    <section>
      <h2>Custom Overlay using Slot</h2>
      <a-dropdown>
        <template #overlay>
          <div style="background: white; padding: 16px; border-radius: 4px; box-shadow: 0 2px 8px rgba(0,0,0,0.15);">
            <h3 style="margin-top: 0;">
              Custom Content
            </h3>
            <p>This is a custom overlay content</p>
            <a-button size="small">
              Action
            </a-button>
          </div>
        </template>
        <a-button>Custom Overlay</a-button>
      </a-dropdown>
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
