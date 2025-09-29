<script setup lang="ts">
import { QuestionCircleOutlined } from '@ant-design/icons-vue'
</script>

<template>
  <div class="popconfirm-demo">
    <a-popconfirm
      title="Delete the task"
      description="Are you sure to delete this task?"
    >
      <template #icon>
        <QuestionCircleOutlined style="color: red" />
      </template>
      <a-button danger>
        Delete
      </a-button>
    </a-popconfirm>
  </div>
</template>

<style scoped>
.popconfirm-demo {
  display: flex;
  gap: 24px;
  padding: 24px;
}
</style>
