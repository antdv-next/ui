<script setup lang="ts">
import { ref } from 'vue'

const open = ref(false)
const condition = ref(true)

function handleConfirm() {
  open.value = false
  console.log('Next step.')
}

function handleCancel() {
  open.value = false
  console.log('Click on cancel.')
}

function handleOpenChange(newOpen: boolean) {
  if (!newOpen) {
    open.value = false
    return
  }

  if (condition.value) {
    handleConfirm()
  } else {
    open.value = true
  }
}
</script>

<template>
  <div class="popconfirm-dynamic-demo">
    <a-popconfirm
      v-model:open="open"
      title="Delete the task"
      description="Are you sure to delete this task?"
      ok-text="Yes"
      cancel-text="No"
      @confirm="handleConfirm"
      @cancel="handleCancel"
      @open-change="handleOpenChange"
    >
      <a-button danger>
        Delete a task
      </a-button>
    </a-popconfirm>

    <div class="controller">
      <div>Whether directly execute：</div>
      <a-switch v-model:checked="condition" />
    </div>
  </div>
</template>

<style scoped>
.popconfirm-dynamic-demo {
  padding: 24px;
}

.controller {
  margin-top: 16px;
  display: flex;
  align-items: center;
  gap: 12px;
}
</style>
