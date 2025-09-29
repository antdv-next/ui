<script lang="ts" setup>
import { UserOutlined } from '@ant-design/icons-vue'
</script>

<template>
  <a-space direction="vertical" :size="32">
    <a-space wrap :size="16">
      <a-avatar :size="64">
        <template #icon>
          <UserOutlined />
        </template>
      </a-avatar>
      <a-avatar size="large">
        <template #icon>
          <UserOutlined />
        </template>
      </a-avatar>
      <a-avatar>
        <template #icon>
          <UserOutlined />
        </template>
      </a-avatar>
      <a-avatar size="small">
        <template #icon>
          <UserOutlined />
        </template>
      </a-avatar>
    </a-space>
    <a-space wrap :size="16">
      <a-avatar shape="square" :size="64">
        <template #icon>
          <UserOutlined />
        </template>
      </a-avatar>
      <a-avatar shape="square" size="large">
        <template #icon>
          <UserOutlined />
        </template>
      </a-avatar>
      <a-avatar shape="square">
        <template #icon>
          <UserOutlined />
        </template>
      </a-avatar>
      <a-avatar shape="square" size="small">
        <template #icon>
          <UserOutlined />
        </template>
      </a-avatar>
    </a-space>
  </a-space>
</template>
