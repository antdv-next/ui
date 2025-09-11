<script setup lang="ts">
import { PoweroffOutlined, SyncOutlined } from '@ant-design/icons-vue'
import { h, shallowRef } from 'vue'

const loadings = shallowRef<boolean[]>([])

function enterLoading(index: number) {
  const newLoadings = [...loadings.value]
  newLoadings[index] = true
  loadings.value = newLoadings

  setTimeout(() => {
    const newLoadings = [...loadings.value]
    newLoadings[index] = false
    loadings.value = newLoadings
  }, 3000)
}
</script>

<template>
  <div class="flex flex-col gap-2 p-3">
    <div class="flex flex-wrap gap-2 items-center">
      <a-button type="primary" loading>
        Loading
      </a-button>
      <a-button type="primary" size="small" loading>
        Loading
      </a-button>
      <a-button type="primary" loading>
        <template #icon>
          <PoweroffOutlined />
        </template>
      </a-button>
      <a-button type="primary" :loading="{ icon: () => h(SyncOutlined, { spin: true }) }">
        Loading Icon
      </a-button>
    </div>
    <div class="flex flex-wrap gap-2">
      <a-button type="primary" :loading="loadings[0]" @click="enterLoading(0)">
        Icon Start
      </a-button>
      <a-button
        type="primary"
        :loading="loadings[2]"
        icon-position="end"
        @click="enterLoading(2)"
      >
        Icon End
      </a-button>
      <a-button
        type="primary"
        :loading="loadings[1]"
        @click="enterLoading(1)"
      >
        <template #icon>
          <PoweroffOutlined />
        </template>
        Icon Replace
      </a-button>
      <a-button
        type="primary"
        :loading="loadings[3]"
        @click="enterLoading(3)"
      >
        <template #icon>
          <PoweroffOutlined />
        </template>
      </a-button>
      <a-button
        type="primary"
        :loading="loadings[3] && { icon: () => h(SyncOutlined, { spin: true }) }"
        @click="enterLoading(3)"
      >
        <template #icon>
          <PoweroffOutlined />
        </template>
        Loading Icon
      </a-button>
    </div>
  </div>
</template>

<style scoped>

</style>
