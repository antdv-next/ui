<script setup lang="ts">
import type { ButtonEvents, ButtonProps, ButtonSlots, ColorVariantPairType } from './define.ts'
import { computed, shallowRef } from 'vue'
import { PresetColors } from '../themes/interface/base'
import { genCssVar } from '../themes/utils/genCssVar'
import Wave from '../wave/wave.vue'
import { ButtonTypeMap } from './define'

defineOptions({
  name: 'AButton',
  inheritAttrs: false,
})
const {
  type,
  variant,
  color,
  danger = false,
  shape: customizeShape,
  disabled = false,
  ...rest
} = defineProps<ButtonProps>()
defineEmits<ButtonEvents>()
defineSlots<ButtonSlots>()
const mergedType = computed(() => type || 'default')
const shape = computed(() => customizeShape || 'default')
const domRef = shallowRef<HTMLElement>()

const mergeTypes = computed<ColorVariantPairType>(() => {
  // >>>>> Local
  // Color & Variant
  if (color && variant) {
    return [color, variant]
  }

  // Sugar syntax
  if (type || danger) {
    const colorVariantPair = ButtonTypeMap[mergedType.value] || []
    if (danger) {
      return ['danger', colorVariantPair[1]]
    }
    return colorVariantPair
  }

  // >>> Context fallback
  // if (button?.color && button?.variant) {
  //   return [button.color, button.variant];
  // }

  return ['default', 'outlined']
})
const isDanger = computed(() => {
  const [mergedColor] = mergeTypes.value
  return mergedColor === 'danger'
})

const mergedColorText = computed(() => {
  return isDanger.value ? 'dangerous' : mergeTypes.value[0]
})
const mergedDisabled = computed(() => disabled)
const linkButtonRestProps = computed(() => {
  return {
    href: rest.href,
  }
})

const prefixCls = `ant-btn`
const cls = computed(() => {
  const [_, variant] = mergeTypes.value
  return {
    [prefixCls]: true,
    [`${prefixCls}-${shape.value}`]: shape.value !== 'default',
    [`${prefixCls}-${type}`]: !!type,
    [`${prefixCls}-dangerous`]: isDanger.value,
    [`${prefixCls}-color-${mergedColorText.value}`]: !!mergedColorText.value,
    [`${prefixCls}-variant-${variant}`]: !!variant,
  }
})

const cssVars = computed(() => {
  const [color] = mergeTypes.value
  if (PresetColors.includes(color as any)) {
    return genCssVar(color as any)
  }
  return {}
})
</script>

<template>
  <template v-if="linkButtonRestProps.href !== undefined">
    <a
      ref="domRef"
      :class="[
        cls,
        {
          [`${prefixCls}-disabled`]: mergedDisabled,
        },
      ]"
      :style="cssVars"
      v-bind="$attrs"
    >
      <span>
        <slot />
      </span>
    </a>
  </template>
  <button
    v-else
    ref="domRef"
    :class="cls"
    :style="cssVars"
    :disabled="mergedDisabled"
  >
    <Wave
      component="Button"
      :node="domRef"
    />
    <span>
      <slot />
    </span>
  </button>
</template>
