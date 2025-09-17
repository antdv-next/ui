<script setup lang="ts">

</script>

<template>
  <a-space wrap>
    <a-popover trigger="hover" title="Title">
      <a-button>Hover Me</a-button>
      <template #content>
        <div>
          <p>Content</p>
          <p>Content</p>
        </div>
      </template>
    </a-popover>
    <a-popover trigger="focus" title="Title">
      <a-button>Focus Me</a-button>
      <template #content>
        <div>
          <p>Content</p>
          <p>Content</p>
        </div>
      </template>
    </a-popover>
    <a-popover trigger="click" title="Title">
      <a-button>Click Me</a-button>
      <template #content>
        <div>
          <p>Content</p>
          <p>Content</p>
        </div>
      </template>
    </a-popover>
  </a-space>
</template>

<style scoped>

</style>
