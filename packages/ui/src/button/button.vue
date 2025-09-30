<script setup lang="ts">
import type { ButtonEvents, ButtonProps, ButtonSlots, ColorVariantPairType } from './define.ts'
import { filterEmpty } from '@v-c/util/dist/props-util'
import { computed, defineComponent, h, onBeforeMount, onMounted, shallowRef, useSlots, watch } from 'vue'
import { useComponentConfig, useConfigContext } from '../config-provider/context.ts'
import { useSize } from '../config-provider/size-context.ts'
import { useCompactItemContext } from '../space/define.ts'
import Wave from '../wave/wave.vue'
import ButtonIcon from './button-icon.vue'
import { isTwoCNChar, isUnBorderedButtonVariant } from './buttonHelpers.ts'
import { ButtonTypeMap, getLoadingConfig } from './define'

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
  icon = undefined,
  ghost,
  autoInsertSpace = undefined,
  iconPosition = 'start',
  block,
  classNames: customClassNames,
  styles,
  loading = false,
  ...rest
} = defineProps<ButtonProps>()
const emit = defineEmits<ButtonEvents>()
defineSlots<ButtonSlots>()
const mergedType = computed(() => type || 'default')
const shape = computed(() => customizeShape || 'default')
const buttonRef = shallowRef<HTMLElement>()
const innerLoading = shallowRef()
const hasTwoCNChar = shallowRef(false)
const slots = useSlots()
const isMountRef = shallowRef(true)
const loadingOrDelay = computed(() => getLoadingConfig(loading))

// ========================= Mount ==========================
// Record for mount status.
// This will help to no to show the animation of loading on the first mount.
onMounted(() => {
  isMountRef.value = false
})

onBeforeMount(() => {
  isMountRef.value = true
})

watch(loadingOrDelay, (loadingOrDelay, _, onCleanup) => {
  let delayTimer: ReturnType<typeof setTimeout> | null = null
  if (loadingOrDelay.delay > 0) {
    delayTimer = setTimeout(() => {
      innerLoading.value = loadingOrDelay.loading
      delayTimer = null
    }, loadingOrDelay.delay)
  } else {
    innerLoading.value = loadingOrDelay.loading
  }

  function cleanupTimer() {
    if (delayTimer) {
      clearTimeout(delayTimer)
      delayTimer = null
    }
  }
  onCleanup(cleanupTimer)
}, {
  immediate: true,
})

const context = useConfigContext()
const buttonCtx = useComponentConfig('button')
const prefixCls = computed(() => `ant-btn`)
const direction = computed(() => buttonCtx.value?.direction)
const { compactSize, compactItemClassnames } = useCompactItemContext(prefixCls, direction)
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
  return customizeSize || compactSize.value || ctxSize?.value
})

const sizeCls = computed(() => {
  return sizeFullName.value ? (sizeClassNameMap[sizeFullName.value] ?? '') : undefined
})

const iconType = computed(() => {
  return innerLoading.value ? 'loading' : (icon ?? slots.icon)
})

const hasDefaultSlot = computed(() => {
  return !!slots.default
})

const hasIconSlot = computed(() => {
  return !!slots.icon
})

const needInserted = computed(() => {
  return hasDefaultSlot.value && !(icon || hasIconSlot.value) && !isUnBorderedButtonVariant(mergeTypes.value[1])
})

// Two chinese characters check
onMounted(() => {
  if (!buttonRef.value || !mergedInsertSpace.value) {
    return
  }

  const buttonText = (buttonRef.value.textContent || '').trim()
  if (needInserted.value && isTwoCNChar(buttonText)) {
    if (!hasTwoCNChar.value) {
      hasTwoCNChar.value = true
    } else if (hasTwoCNChar.value) {
      hasTwoCNChar.value = false
    }
  }
})

const cls = computed(() => {
  const [_, variant] = mergeTypes.value
  const _prefixCls = prefixCls.value
  return [
    {
      [_prefixCls]: true,
      [`${_prefixCls}-${shape.value}`]: shape.value !== 'default',

      [`${_prefixCls}-${type}`]: !!type,
      [`${_prefixCls}-dangerous`]: isDanger.value,

      [`${_prefixCls}-color-${mergedColorText.value}`]: !!mergedColorText.value,
      [`${_prefixCls}-variant-${variant}`]: !!variant,
      [`${_prefixCls}-${sizeCls.value}`]: sizeCls.value,
      [`${_prefixCls}-icon-only`]: !!iconType.value && !hasDefaultSlot.value,
      [`${_prefixCls}-background-ghost`]: ghost && !isUnBorderedButtonVariant(variant),
      [`${_prefixCls}-loading`]: innerLoading.value,
      [`${_prefixCls}-two-chinese-chars`]: !innerLoading.value && hasTwoCNChar.value && mergedInsertSpace.value,
      [`${_prefixCls}-block`]: block,
      [`${_prefixCls}-rtl`]: direction.value === 'rtl',
      [`${_prefixCls}-icon-end`]: iconPosition === 'end',
    },
    compactItemClassnames.value,
  ]
})

const RenderText = defineComponent({
  setup(_, { slots }) {
    return () => {
      const slotValue = slots.default?.()
      const children = filterEmpty(Array.isArray(slotValue) ? slotValue : [slotValue])
      if (!children.length) {
        return null
      }
      return h('span', {}, children)
    }
  },
})

function handleClick(e: Event) {
  if (mergedDisabled.value) {
    e.preventDefault()
    return
  }
  emit('click', e)
}
</script>

<template>
  <template v-if="linkButtonRestProps.href !== undefined">
    <a
      ref="buttonRef"
      v-bind="$attrs"
      :href="mergedDisabled ? undefined : linkButtonRestProps.href"
      :class="[
        cls,
        {
          [`${prefixCls}-disabled`]: mergedDisabled,
        },
        $attrs.class,
      ]"
      :style="[buttonCtx.style, $attrs.style as any]"
      :tabIndex="mergedDisabled ? -1 : 0"
      :aria-disabled="mergedDisabled"
      @click="handleClick"
    >
      <ButtonIcon
        :prefix-cls="prefixCls"
        :icon="icon"
        :loading="loading"
        :inner-loading="innerLoading"
        :is-mount-ref="isMountRef"
        :custom-class-names="customClassNames"
        :button-ctx="buttonCtx"
        :styles="styles"
      >
        <template v-if="$slots.icon" #icon>
          <slot name="icon" />
        </template>
        <template v-if="$slots.loadingIcon" #loadingIcon>
          <slot name="loadingIcon" />
        </template>
      </ButtonIcon>
      <RenderText>
        <slot />
      </RenderText>
    </a>
  </template>
  <button
    v-else
    ref="buttonRef"
    :type="htmlType"
    :class="[cls, $attrs.class]"
    :style="[buttonCtx.style, $attrs.style as any]"
    :disabled="mergedDisabled"
    @click="handleClick"
  >
    <Wave
      v-if="!isUnBorderedButtonVariant(mergeTypes[1])"
      component="Button"
      :node="buttonRef"
    />
    <ButtonIcon
      :prefix-cls="prefixCls"
      :icon="icon"
      :loading="loading"
      :inner-loading="innerLoading"
      :is-mount-ref="isMountRef"
      :custom-class-names="customClassNames"
      :button-ctx="buttonCtx"
      :styles="styles"
    >
      <template v-if="$slots.icon" #icon>
        <slot name="icon" />
      </template>
      <template v-if="$slots.loadingIcon" #loadingIcon>
        <slot name="loadingIcon" />
      </template>
    </ButtonIcon>
    <RenderText>
      <slot />
    </RenderText>
  </button>
</template>
