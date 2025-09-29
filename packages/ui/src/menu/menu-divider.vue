<script setup lang="ts">
import type { MenuDividerProps } from './define.ts'
import { computed } from 'vue'
import { useMenuContext } from './context.ts'

defineOptions({
  name: 'AMenuDivider',
})

const props = withDefaults(defineProps<MenuDividerProps>(), {
  dashed: false,
})

const menuContext = useMenuContext()
const prefixCls = computed(() => menuContext.prefixCls.value)

const dividerClass = computed(() => [
  `${prefixCls.value}-item-divider`,
  { [`${prefixCls.value}-item-divider-dashed`]: props.dashed },
])
</script>

<template>
  <li :class="dividerClass" role="separator" />
</template>
