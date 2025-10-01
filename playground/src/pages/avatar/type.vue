<script lang="ts" setup>
import { UserOutlined } from '@ant-design/icons-vue'
</script>

<template>
  <a-space :size="16" wrap>
    <a-avatar>
      <template #icon>
        <UserOutlined />
      </template>
    </a-avatar>
    <a-avatar>U</a-avatar>
    <a-avatar :size="40">
      USER
    </a-avatar>
    <a-avatar src="https://www.antdv.com/assets/logo.1ef800a8.svg" />
    <a-avatar style="color: #f56a00; background-color: #fde3cf">
      U
    </a-avatar>
    <a-avatar style="background-color: #87d068">
      <template #icon>
        <UserOutlined />
      </template>
    </a-avatar>
  </a-space>
</template>
