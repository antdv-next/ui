<script setup lang="ts">
import { DownOutlined } from '@ant-design/icons-vue'
import { ref } from 'vue'

const items = [
  {
    key: '1',
    label: 'Submit and continue',
  },
]

const loadings = ref<boolean[]>([])

function enterLoading(index: number) {
  const next = [...loadings.value]
  next[index] = true
  loadings.value = next

  setTimeout(() => {
    const reset = [...loadings.value]
    reset[index] = false
    loadings.value = reset
  }, 6000)
}
</script>

<template>
  <a-space direction="vertical">
    <a-dropdown-button type="primary" loading :menu="{ items }">
      Submit
    </a-dropdown-button>
    <a-dropdown-button type="primary" size="small" loading :menu="{ items }">
      Submit
    </a-dropdown-button>
    <a-dropdown-button
      type="primary"
      :loading="loadings[0]"
      :menu="{ items }"
      @click="enterLoading(0)"
    >
      Submit
    </a-dropdown-button>
    <a-dropdown-button
      :loading="loadings[1]"
      :menu="{ items }"
      @click="enterLoading(1)"
    >
      <template #icon>
        <DownOutlined />
      </template>
      Submit
    </a-dropdown-button>
  </a-space>
</template>
