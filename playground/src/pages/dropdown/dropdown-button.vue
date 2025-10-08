<script lang="ts" setup>
import { DownOutlined, UserOutlined } from '@ant-design/icons-vue'
import { h } from 'vue'

function handleButtonClick(e: MouseEvent) {
  console.log('click left button', e)
  // message.info('Click on left button.')
}

function handleMenuClick(info: any) {
  console.log('click', info)
  // message.info('Click on menu item.')
}

const items = [
  {
    label: '1st menu item',
    key: '1',
    icon: () => h(UserOutlined),
  },
  {
    label: '2nd menu item',
    key: '2',
    icon: () => h(UserOutlined),
  },
  {
    label: '3rd menu item',
    key: '3',
    icon: () => h(UserOutlined),
    danger: true,
  },
  {
    label: '4th menu item',
    key: '4',
    icon: () => h(UserOutlined),
    danger: true,
    disabled: true,
  },
]

const menuProps = {
  items,
  onClick: handleMenuClick,
}
</script>

<template>
  <a-space wrap>
    <a-dropdown-button :menu="menuProps" @click="handleButtonClick">
      Dropdown
    </a-dropdown-button>

    <a-dropdown-button :menu="menuProps" placement="bottom">
      <template #icon>
        <UserOutlined />
      </template>
      Dropdown
    </a-dropdown-button>

    <a-dropdown-button :menu="menuProps" disabled @click="handleButtonClick">
      Dropdown
    </a-dropdown-button>

    <a-dropdown :menu="menuProps">
      <a-button>
        <a-space>
          Button
          <DownOutlined />
        </a-space>
      </a-button>
    </a-dropdown>

    <a-dropdown-button :menu="menuProps" danger @click="handleButtonClick">
      Danger
    </a-dropdown-button>
  </a-space>
</template>
