<script setup lang="ts">
import type { DropdownProps } from './define.ts'
import { computed } from 'vue'
import { useConfigContext } from '../config-provider/context.ts'

defineOptions({
  name: 'ADropdown',
})

const props = defineProps<DropdownProps>()
const context = useConfigContext()
const prefixCls = computed(() => context.getPrefixCls('dropdown', props.prefixCls))
</script>

<template>
  <div>
    <!--  -->
  </div>
</template>

<style scoped>

</style>
