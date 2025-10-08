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
    key: 'sub1',
    label: 'Sub Menu',
    type: 'submenu' as const,
    children: [
      {
        key: 'sub1-1',
        label: 'Sub Item 1',
      },
      {
        key: 'sub1-2',
        label: 'Sub Item 2',
      },
    ],
  },
]
</script>

<template>
  <a-space direction="vertical" :size="48" style="width: 100%">
    <div>
      <h3>Default Mode - Menu appears at trigger element</h3>
      <a-dropdown :menu="{ items }" :trigger="['contextMenu']">
        <div
          style="
            width: 400px;
            height: 200px;
            border: 2px dashed #d9d9d9;
            border-radius: 4px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: context-menu;
            background: #fafafa;
          "
        >
          Right click anywhere in this area<br>
          Menu appears at trigger element position
        </div>
      </a-dropdown>
    </div>

    <div>
      <h3>Follow Mode - Menu follows mouse cursor</h3>
      <a-dropdown
        :menu="{ items }"
        :trigger="['contextMenu']"
        context-menu-mode="follow"
      >
        <div
          style="
            width: 400px;
            height: 200px;
            border: 2px dashed #1890ff;
            border-radius: 4px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: context-menu;
            background: #e6f7ff;
          "
        >
          Right click anywhere in this area<br>
          Menu appears at your cursor position
        </div>
      </a-dropdown>
    </div>

    <div>
      <h3>Follow Mode with Custom Content</h3>
      <a-dropdown
        :menu="{ items }"
        :trigger="['contextMenu']"
        context-menu-mode="follow"
        placement="bottomLeft"
      >
        <div
          style="
            width: 600px;
            height: 300px;
            border: 2px dashed #52c41a;
            border-radius: 4px;
            padding: 20px;
            cursor: context-menu;
            background: #f6ffed;
          "
        >
          <h4>Large Content Area</h4>
          <p>Right click anywhere to open the context menu.</p>
          <p>The menu will appear exactly where you click.</p>
          <p>Try clicking in different corners to see the menu adjust its position automatically.</p>
          <p>The menu includes submenus that work perfectly with the follow mode.</p>
        </div>
      </a-dropdown>
    </div>

    <div>
      <h3>Follow Mode on Text</h3>
      <a-dropdown
        :menu="{ items }"
        :trigger="['contextMenu']"
        context-menu-mode="follow"
      >
        <p style="padding: 20px; background: #fff1f0; border: 2px dashed #ff4d4f; border-radius: 4px; cursor: context-menu;">
          This is a text paragraph with context menu support.
          Right click anywhere on this text to open the menu at your cursor position.
          This is useful for text editors, document viewers, or any content where
          the user might want to perform actions at a specific location.
        </p>
      </a-dropdown>
    </div>
  </a-space>
</template>

<style scoped>
h3 {
  margin: 0 0 16px;
  font-size: 16px;
  font-weight: 600;
  color: rgba(0, 0, 0, 0.85);
}

h4 {
  margin: 0 0 12px;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.85);
}

p {
  margin: 0 0 8px;
  line-height: 1.6;
}
</style>
