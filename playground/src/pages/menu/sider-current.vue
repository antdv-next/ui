<script setup lang="ts">
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons-vue'
import { h, ref } from 'vue'

interface LevelItem {
  key?: string
  children?: LevelItem[]
}

const items = [
  {
    key: '1',
    icon: () => h(MailOutlined),
    label: 'Navigation One',
    children: [
      { key: '11', label: 'Option 1' },
      { key: '12', label: 'Option 2' },
      { key: '13', label: 'Option 3' },
      { key: '14', label: 'Option 4' },
    ],
  },
  {
    key: '2',
    icon: () => h(AppstoreOutlined),
    label: 'Navigation Two',
    children: [
      { key: '21', label: 'Option 1' },
      { key: '22', label: 'Option 2' },
      {
        key: '23',
        label: 'Submenu',
        children: [
          { key: '231', label: 'Option 1' },
          { key: '232', label: 'Option 2' },
          { key: '233', label: 'Option 3' },
        ],
      },
      {
        key: '24',
        label: 'Submenu 2',
        children: [
          { key: '241', label: 'Option 1' },
          { key: '242', label: 'Option 2' },
          { key: '243', label: 'Option 3' },
        ],
      },
    ],
  },
  {
    key: '3',
    icon: () => h(SettingOutlined),
    label: 'Navigation Three',
    children: [
      { key: '31', label: 'Option 1' },
      { key: '32', label: 'Option 2' },
      { key: '33', label: 'Option 3' },
      { key: '34', label: 'Option 4' },
    ],
  },
]

function buildLevelKeys(list: LevelItem[], level = 1, record: Record<string, number> = {}) {
  list.forEach((item) => {
    if (item.key)
      record[item.key] = level
    if (item.children)
      buildLevelKeys(item.children, level + 1, record)
  })
  return record
}

const levelKeys = buildLevelKeys(items as LevelItem[])

const openKeys = ref<string[]>(['2', '23'])

function onOpenChange(nextOpenKeys: string[]) {
  const currentOpenKey = nextOpenKeys.find(key => !openKeys.value.includes(key))

  if (currentOpenKey !== undefined) {
    const sameLevelIndex = nextOpenKeys
      .filter(key => key !== currentOpenKey)
      .findIndex(key => levelKeys[key] === levelKeys[currentOpenKey])

    const filtered = nextOpenKeys
      .filter((_, index) => index !== sameLevelIndex)
      .filter(key => levelKeys[key] <= levelKeys[currentOpenKey])

    openKeys.value = filtered
  } else {
    openKeys.value = nextOpenKeys
  }
}
</script>

<template>
  <a-menu
    mode="inline"
    style="width: 256px"
    :items="items"
    :open-keys="openKeys"
    :default-selected-keys="['231']"
    @update:open-keys="onOpenChange"
  />
</template>
