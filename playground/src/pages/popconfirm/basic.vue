<script setup lang="ts">
function handleConfirm(e: MouseEvent) {
  console.log('Confirmed', e)
}

function handleCancel(e: MouseEvent) {
  console.log('Cancelled', e)
}
</script>

<template>
  <div class="popconfirm-demo">
    <a-popconfirm
      title="Delete the task"
      description="Are you sure to delete this task?"
      ok-text="Yes"
      cancel-text="No"
      @confirm="handleConfirm"
      @cancel="handleCancel"
    >
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
