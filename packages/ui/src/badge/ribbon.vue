<script setup lang="ts">
import type { CSSProperties } from 'vue'
import type { RibbonProps } from './define'
import { omit } from 'es-toolkit/compat'
import { computed, useAttrs } from 'vue'
import { isPresetColor } from '../_utils/colors'
import { useConfigContext } from '../config-provider/context'

defineOptions({
  name: 'ABadgeRibbon',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<RibbonProps>(), {
  placement: 'end',
})

const ctx = useConfigContext()
const prefixCls = computed(() => ctx.getPrefixCls('ribbon', props.prefixCls))
const direction = computed(() => ctx.direction)
const colorInPreset = computed(() => isPresetColor(props.color, false))
const ribbonCls = computed(() => [
  prefixCls.value,
  `${prefixCls.value}-placement-${props.placement}`,
  {
    [`${prefixCls.value}-rtl`]: direction.value === 'rtl',
    [`${prefixCls.value}-color-${props.color}`]: colorInPreset.value,
  },
])

const mergedColorStyle = computed(() => {
  const colorStyle: CSSProperties = {}
  const cornerColorStyle: CSSProperties = {}
  if (props.color && !colorInPreset.value) {
    colorStyle.background = props.color
    cornerColorStyle.color = props.color
  }
  return { colorStyle, cornerColorStyle }
})

const attrs = useAttrs()
</script>

<template>
  <div
    :class="[`${prefixCls}-wrapper`]"
    v-bind="omit(attrs, ['class', 'style'])"
  >
    <slot />
    <div
      :class="[ribbonCls, attrs.class]"
      :style="{ ...mergedColorStyle.colorStyle, ...(attrs.style || {}) }"
    >
      <span :class="[`${prefixCls}-text`]">

        <template v-if="text">
          {{ text }}
        </template>

        <template v-else>
          <slot name="text" />
        </template>

      </span>
      <div :class="[`${prefixCls}-corner`]" :style="mergedColorStyle.cornerColorStyle" />
    </div>
  </div>
</template>
