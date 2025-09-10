<script setup lang="ts">
import type { ButtonEvents, ButtonProps, ButtonSlots, ColorVariantPairType } from './define.ts'
import { filterEmpty } from '@v-c/util/dist/props-util'
import { computed, onMounted, shallowRef, useSlots } from 'vue'
import { useComponentConfig, useConfigContext } from '../config-provider/context.ts'
import { useSize } from '../config-provider/size-context.ts'
import Wave from '../wave/wave.vue'
import { isTwoCNChar, isUnBorderedButtonVariant } from './buttonHelpers.ts'
import { ButtonTypeMap } from './define'
import IconWrapper from './icon-wrapper.vue'

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
  size: customizeSize,
  icon,
  ghost,
  autoInsertSpace = undefined,
  iconPosition = 'start',
  block,
  classNames: customClassNames,
  styles,
  ...rest
} = defineProps<ButtonProps>()
defineEmits<ButtonEvents>()
defineSlots<ButtonSlots>()
const mergedType = computed(() => type || 'default')
const shape = computed(() => customizeShape || 'default')
const buttonRef = shallowRef<HTMLElement>()
const innerLoading = shallowRef()
const hasTwoCNChar = shallowRef(false)
const slots = useSlots()

const context = useConfigContext()
const buttonCtx = useComponentConfig('button')

const mergedInsertSpace = computed(() => {
  return autoInsertSpace ?? buttonCtx.value?.autoInsertSpace ?? true
})

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
  const button = context.button
  // >>> Context fallback
  if (button?.color && button?.variant) {
    return [button.color, button.variant]
  }

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
const { size: ctxSize } = useSize()

const sizeClassNameMap = { large: 'lg', small: 'sm', middle: undefined }
const sizeFullName = computed(() => {
  return customizeSize || ctxSize?.value
})

const sizeCls = computed(() => {
  return sizeFullName.value ? (sizeClassNameMap[sizeFullName.value] ?? '') : undefined
})

const iconType = computed(() => {
  return innerLoading.value ? 'loading' : icon
})

const needInserted = computed(() => {
  const children = filterEmpty(slots.default?.() ?? [])
  const iconChildren = filterEmpty(slots.icon?.() ?? [])
  return children.length !== 0 && !icon && iconChildren.length < 1 && !isUnBorderedButtonVariant(mergeTypes.value[1])
})

// Two chinese characters check
onMounted(() => {
  if (!buttonRef.value || !mergedInsertSpace.value) {
    return
  }

  const buttonText = buttonRef.value.textContent || ''
  if (needInserted.value && isTwoCNChar(buttonText)) {
    if (!hasTwoCNChar.value) {
      hasTwoCNChar.value = true
    } else if (hasTwoCNChar.value) {
      hasTwoCNChar.value = false
    }
  }
})

const prefixCls = `ant-btn`
const cls = computed(() => {
  const [_, variant] = mergeTypes.value
  const children = filterEmpty(slots.default?.() ?? [])
  const iconChildren = filterEmpty(slots.icon?.() ?? [])
  return {
    [prefixCls]: true,
    [`${prefixCls}-${shape.value}`]: shape.value !== 'default',

    [`${prefixCls}-${type}`]: !!type,
    [`${prefixCls}-dangerous`]: isDanger.value,

    [`${prefixCls}-color-${mergedColorText.value}`]: !!mergedColorText.value,
    [`${prefixCls}-variant-${variant}`]: !!variant,
    [`${prefixCls}-${sizeCls.value}`]: sizeCls.value,
    [`${prefixCls}-icon-only`]: children.length !== 0 && !!iconType.value && iconChildren.length > 0,
    [`${prefixCls}-background-ghost`]: ghost && !isUnBorderedButtonVariant(variant),
    [`${prefixCls}-loading`]: innerLoading.value,
    [`${prefixCls}-two-chinese-chars`]: !innerLoading.value && hasTwoCNChar.value && mergedInsertSpace.value,
    [`${prefixCls}-block`]: block,
    [`${prefixCls}-rtl`]: buttonCtx.value?.direction === 'rtl',
    [`${prefixCls}-icon-end`]: iconPosition === 'end',
  }
})

// const iconClasses = computed(() => {
//   return [customClassNames?.icon, buttonCtx.value?.classNames?.icon]
// })
// const iconStyle = computed(() => {
//   return {
//     ...buttonCtx.value?.styles?.icon,
//     ...styles?.icon,
//   }
// })
</script>

<template>
  <template v-if="linkButtonRestProps.href !== undefined">
    <a
      ref="buttonRef"
      :class="[
        cls,
        {
          [`${prefixCls}-disabled`]: mergedDisabled,
        },
      ]"
      :style="[]"
      v-bind="$attrs"
    >
      <span>
        <slot />
      </span>
    </a>
  </template>
  <button
    v-else
    ref="buttonRef"
    :class="[cls]"
    :style="[]"
    :disabled="mergedDisabled"
  >
    <Wave
      v-if="!isUnBorderedButtonVariant(mergeTypes[1])"
      component="Button"
      :node="buttonRef"
    />
    <IconWrapper
      v-if="(icon || $slots?.icon) && !innerLoading"
      :prefix-cls="prefixCls"
      :class="[
        customClassNames?.icon,
        buttonCtx?.classNames?.icon,
      ]"
      :style="[
        buttonCtx?.styles?.icon,
        styles?.icon,
      ]"
    >
      <slot name="icon">
        <component :is="icon" />
      </slot>
    </IconWrapper>
    <IconWrapper v-else-if="loading && typeof loading === 'object' && (loading.icon || $slots.loadingIcon)">
      <slot name="loadingIcon">
        <component :is="loading.icon" />
      </slot>
    </IconWrapper>
    <template v-else>
      <!--      -->
    </template>
    <span>
      <slot />
    </span>
  </button>
</template>
