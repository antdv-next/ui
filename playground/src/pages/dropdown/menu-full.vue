<script setup lang="ts">
import { AppstoreOutlined, DownOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons-vue'
import { h } from 'vue'

type MenuItem = {
  key: string
  label?: string
  icon?: () => any
  children?: MenuItem[]
  type?: 'group'
}

function getItem(
  label: string,
  key: string,
  icon?: () => any,
  children?: MenuItem[],
  type?: 'group',
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  }
}

const items: (MenuItem | null)[] = [
  getItem(
    'Item Group',
    'group',
    undefined,
    [getItem('Option 0', '01'), getItem('Option 0', '02')],
    'group',
  ),
  getItem(
    'Navigation One',
    'sub1',
    () => h(MailOutlined),
    [
      getItem(
        'Item 1',
        'g1',
        undefined,
        [getItem('Option 1', '1'), getItem('Option 2', '2')],
        'group',
      ),
      getItem(
        'Item 2',
        'g2',
        undefined,
        [getItem('Option 3', '3'), getItem('Option 4', '4')],
        'group',
      ),
    ],
  ),
  getItem(
    'Navigation Two',
    'sub2',
    () => h(AppstoreOutlined),
    [
      getItem('Option 5', '5'),
      getItem('Option 6', '6'),
      getItem('Submenu', 'sub3', undefined, [getItem('Option 7', '7'), getItem('Option 8', '8')]),
    ],
  ),
  getItem(
    'Navigation Three',
    'sub4',
    () => h(SettingOutlined),
    [
      getItem('Option 9', '9'),
      getItem('Option 10', '10'),
      getItem('Option 11', '11'),
      getItem('Option 12', '12'),
    ],
  ),
  null,
]
</script>

<template>
  <a-dropdown
    :menu="{
      items,
      selectedKeys: ['1'],
      openKeys: ['sub1'],
    }"
  >
    <a @click.prevent>
      <a-space>
        Hover to check menu style
        <DownOutlined />
      </a-space>
    </a>
  </a-dropdown>
</template>
