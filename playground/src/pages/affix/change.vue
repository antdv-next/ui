<script setup lang="ts">
function handleChange(affixed?: boolean) {
  console.log('Affix status changed:', affixed)
}
</script>

<template>
  <div>
    <div class="h-200px bg-gray-100" />
    <a-affix :offset-top="120" @change="handleChange">
      <a-button>120px to affix top</a-button>
    </a-affix>
    <div class="h-1000px bg-gradient-to-b from-blue-100 to-blue-300" />
  </div>
</template>
