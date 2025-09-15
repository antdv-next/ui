<script lang="ts" setup>
import { ref } from 'vue'

const spinning = ref<boolean>(false)
</script>

<template>
  <a-spin :spinning="spinning">
    <a-alert
      message="Alert message title"
      description="Further details about the context of this alert."
    />
  </a-spin>
  <div class="spin-state">
    Loading state：
    <a-switch v-model:checked="spinning" />
  </div>
</template>

<style scoped>
.spin-state {
  margin-top: 16px;
}
</style>
