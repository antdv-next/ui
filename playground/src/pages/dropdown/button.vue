<script setup lang="ts">
import { DownOutlined, UserOutlined } from '@ant-design/icons-vue'
import { cloneVNode, h, resolveComponent } from 'vue'

const items = [
  { key: '1', label: '1st menu item', icon: () => h(UserOutlined) },
  { key: '2', label: '2nd menu item', icon: () => h(UserOutlined) },
  { key: '3', label: '3rd menu item', icon: () => h(UserOutlined), danger: true },
  { key: '4', label: '4th menu item', icon: () => h(UserOutlined), danger: true, disabled: true },
]

function handleButtonClick() {
  console.log('click left button')
}

function handleMenuClick(info: any) {
  console.log('click menu item', info)
}

const tooltipComponent = resolveComponent('a-tooltip') as any

function buttonsRender(buttons: any[]) {
  const [left, right] = buttons
  return [
    h(tooltipComponent, { title: 'tooltip' }, { default: () => left }),
    cloneVNode(right, { loading: true }),
  ]
}
</script>

<template>
  <a-space wrap>
    <a-dropdown-button :menu="{ items, onClick: handleMenuClick }" @click="handleButtonClick">
      Dropdown
    </a-dropdown-button>

    <a-dropdown-button
      :menu="{ items, onClick: handleMenuClick }"
      placement="bottom"
      :icon="() => h(UserOutlined)"
    >
      Custom Icon
    </a-dropdown-button>

    <a-dropdown-button :menu="{ items, onClick: handleMenuClick }" disabled>
      Disabled
    </a-dropdown-button>

    <a-dropdown-button :menu="{ items, onClick: handleMenuClick }" :buttons-render="buttonsRender">
      With Tooltip
    </a-dropdown-button>

    <a-dropdown :menu="{ items, onClick: handleMenuClick }">
      <a-button>
        <a-space>
          Button
          <DownOutlined />
        </a-space>
      </a-button>
    </a-dropdown>

    <a-dropdown-button :menu="{ items, onClick: handleMenuClick }" danger>
      Danger
    </a-dropdown-button>
  </a-space>
</template>
