<script setup lang="ts">
const colors = ['default', 'primary', 'danger', 'pink', 'purple', 'cyan'] as const
</script>

<template>
  <div class="flex flex-col gap-4 p-4">
    <template v-for="color in colors" :key="color">
      <div class="flex flex-wrap gap-4">
        <a-button variant="solid" :color="color">
          Solid
        </a-button>
        <a-button variant="outlined" :color="color">
          Outlined
        </a-button>
        <a-button variant="dashed" :color="color">
          Dashed
        </a-button>
        <a-button variant="filled" :color="color">
          Filled
        </a-button>
        <a-button variant="text" :color="color">
          Text
        </a-button>
        <a-button variant="link" :color="color">
          Link
        </a-button>
      </div>
    </template>
  </div>
</template>

<style scoped>

</style>
