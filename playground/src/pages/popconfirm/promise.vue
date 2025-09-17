<script setup lang="ts">
function handleConfirm(_e: MouseEvent) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(null), 3000)
  })
}

function handleOpenChange(open: boolean) {
  console.log('open change', open)
}
</script>

<template>
  <div class="popconfirm-demo">
    <a-popconfirm
      title="Title"
      description="Open Popconfirm with Promise"
      @confirm="handleConfirm"
      @open-change="handleOpenChange"
    >
      <a-button type="primary">
        Open Popconfirm with Promise
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
