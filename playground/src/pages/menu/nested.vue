<script setup lang="ts">
const nestedItems = [
  {
    key: 'mail',
    label: 'Navigation One',
    icon: () => '📧',
  },
  {
    key: 'app',
    label: 'Navigation Two',
    children: [
      { key: 'app1', label: 'Option 1' },
      { key: 'app2', label: 'Option 2' },
      {
        key: 'app3',
        label: 'Option 3',
        children: [
          { key: 'app3-1', label: 'Inner Option 1' },
          { key: 'app3-2', label: 'Inner Option 2' },
          {
            key: 'app3-3',
            label: 'Level 3',
            children: [
              { key: 'app3-3-1', label: 'Item 1' },
              { key: 'app3-3-2', label: 'Item 2' },
            ],
          },
        ],
      },
    ],
  },
  {
    key: 'settings',
    label: 'Navigation Three',
    children: [
      {
        key: 'group1',
        label: 'Group 1',
        type: 'group',
        children: [
          { key: 'settings-1', label: 'Option 1' },
          { key: 'settings-2', label: 'Option 2' },
        ],
      },
      {
        key: 'group2',
        label: 'Group 2',
        type: 'group',
        children: [
          {
            key: 'settings-3',
            label: 'Option 3',
          },
          {
            key: 'settings-4',
            label: 'Option 4',
          },
        ],
      },
    ],
  },
]
</script>

<template>
  <a-flex gap="middle" wrap="wrap">
    <a-menu :items="nestedItems" style="width: 260px" mode="inline" />

    <a-menu :items="nestedItems" mode="vertical" style="width: 260px" />

    <div class="w-full">
      <a-menu :items="nestedItems" mode="horizontal" />
    </div>
  </a-flex>
</template>
