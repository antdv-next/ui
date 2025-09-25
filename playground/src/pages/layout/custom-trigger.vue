<script setup lang="ts">
import type { ItemType } from 'antdv-next/menu'
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons-vue'
import { computed, h, ref } from 'vue'

const colorBgContainer = 'var(--ant-color-bg-container)'
const borderRadiusLG = 'var(--ant-border-radius-lg)'

const collapsed = ref(false)

const menuItems: ItemType[] = [
  {
    key: '1',
    icon: () => h(UserOutlined),
    label: 'nav 1',
  },
  {
    key: '2',
    icon: () => h(VideoCameraOutlined),
    label: 'nav 2',
  },
  {
    key: '3',
    icon: () => h(UploadOutlined),
    label: 'nav 3',
  },
]

const triggerIcon = computed(() => (collapsed.value ? MenuUnfoldOutlined : MenuFoldOutlined))

const headerStyle = {
  padding: 0,
  background: colorBgContainer,
}

const contentStyle = {
  margin: '24px 16px',
  padding: 24,
  minHeight: '280px',
  background: colorBgContainer,
  borderRadius: borderRadiusLG,
}

const buttonStyle = {
  fontSize: '16px',
  width: '64px',
  height: '64px',
}

function toggleCollapsed() {
  collapsed.value = !collapsed.value
}
</script>

<template>
  <a-layout>
    <a-layout-sider v-model:collapsed="collapsed" :trigger="null" collapsible>
      <div class="demo-logo-vertical" />
      <a-menu
        theme="dark"
        mode="inline"
        :default-selected-keys="['1']"
        :items="menuItems"
      />
    </a-layout-sider>
    <a-layout>
      <a-layout-header :style="headerStyle">
        <a-button type="text" :style="buttonStyle" @click="toggleCollapsed">
          <template #icon>
            <component :is="triggerIcon" />
          </template>
        </a-button>
      </a-layout-header>
      <a-layout-content :style="contentStyle">
        Content
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
