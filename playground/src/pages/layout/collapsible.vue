<script setup lang="ts">
import { ref } from 'vue'

const collapsed = ref(false)

function toggleCollapsed() {
  collapsed.value = !collapsed.value
}
</script>

<template>
  <a-layout class="h-100vh border border-#f0f0f0">
    <a-layout-sider
      v-model:collapsed="collapsed"
      collapsible
      breakpoint="md"
    >
      <div class="flex h-full flex-col items-center justify-center text-white">
        Sider
      </div>
    </a-layout-sider>
    <a-layout>
      <a-layout-header class="bg-#001529 text-white">
        Collapsible Header
      </a-layout-header>
      <a-layout-content class="p-24px">
        <p>Resize the window or use the trigger to collapse the sider.</p>
        <a-button type="primary" @click="toggleCollapsed">
          Toggle Collapsed
        </a-button>
      </a-layout-content>
      <a-layout-footer class="text-center">
        Footer
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>
