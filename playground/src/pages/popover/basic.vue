<script setup lang="ts">

</script>

<template>
  <div class="popover-demo">
    <a-popover title="Title1">
      <a-button type="primary">
        Hover me
      </a-button>
      <template #content>
        <div>
          <p>Content1</p>
          <p>Content2</p>
        </div>
      </template>
    </a-popover>
  </div>
</template>

<style scoped>
.popover-demo {
  display: flex;
  gap: 32px;
  flex-wrap: wrap;
  padding: 24px;
}
</style>
