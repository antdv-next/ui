<script setup lang="ts">
import type { ProviderChildrenProps } from './define.ts'
import { computed, reactive, watchEffect } from 'vue'
import { useConfigProvider } from './context.ts'
import { PASSED_PROPS } from './define.ts'
import { useSizeProvider } from './size-context.ts'

const props = defineProps<ProviderChildrenProps>()
function getPrefixCls(suffixCls: string, customizePrefixCls?: string) {
  const { prefixCls, parentContext } = props
  if (customizePrefixCls) {
    return customizePrefixCls
  }
  const mergedPrefixCls = prefixCls || parentContext.getPrefixCls('')
  return suffixCls ? `${mergedPrefixCls}-${suffixCls}` : mergedPrefixCls
}

// const scp = computed(()=> props.csp || props.parentContext.csp)

const config = reactive({
  ...props.parentContext,
})
watchEffect(() => {
  Object.assign(config, props.parentContext)
  const baseConfig = {
    button: props.button,
    getPrefixCls,
  };
  (Object.keys(baseConfig) as (keyof typeof baseConfig)[]).forEach((key) => {
    if (baseConfig[key] !== undefined) {
      (config as any)[key] = baseConfig[key]
    }
  })

  // Pass the props used by `useContext` directly with child component.
  // These props should merge into `config`.
  PASSED_PROPS.forEach((propName) => {
    const propValue = (props as any)[propName]
    if (propValue) {
      (config as any)[propName] = propValue
    }
  })
})

useSizeProvider({
  size: computed(() => props.componentSize),
})

useConfigProvider(config)
</script>

<template>
  <slot />
</template>

<style scoped>

</style>
