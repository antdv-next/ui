<script setup lang="ts">
import type { CSSProperties } from 'vue'
import type { BadgeProps } from './define'
import { flattenChildren } from '@v-c/util/dist/props-util'
import { computed, h, ref, toRefs, useAttrs, useSlots, watch } from 'vue'
import { isPresetColor } from '../_utils/colors'
import isNumeric from '../_utils/isNumeric'
import { cloneElement } from '../_utils/node'
import RenderComponent from '../_utils/renderComponent.vue'
import { getTransitionProps } from '../_utils/transition'
import { useConfigContext } from '../config-provider/context'
import ScrollNumber from './scroll-number.vue'

defineOptions({
  name: 'ABadge',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<BadgeProps>(), {
  count: null,
  overflowCount: 99,
  size: 'default',
})
// size
const {
  prefixCls: _prefixCls,
  offset,
  count,
  overflowCount,
  showZero,
  status,
  color,
  dot,
  title,
} = toRefs(props)
const ctx = useConfigContext()
const prefixCls = computed(() => ctx.getPrefixCls('badge', _prefixCls.value))
const direction = computed(() => ctx.direction)
const numberedDisplayCount = computed(() => {
  return (count.value as number) > (overflowCount.value as number)
    ? `${overflowCount.value}+`
    : count.value
})
const isZero = computed(
  () => numberedDisplayCount.value === '0' || numberedDisplayCount.value === 0,
)

const ignoreCount = computed(
  () => count.value === null || (isZero.value && !showZero.value),
)
const hasStatus = computed(
  () =>
    ((status.value !== null && status.value !== undefined)
      || (color.value !== null && color.value !== undefined))
    && ignoreCount.value,
)

const showAsDot = computed(() => dot.value && !isZero.value)

const mergedCount = computed(() =>
  showAsDot.value ? '' : numberedDisplayCount.value,
)

const isHidden = computed(() => {
  const isEmpty
    = mergedCount.value === null
      || mergedCount.value === undefined
      || mergedCount.value === ''
  return (isEmpty || (isZero.value && !showZero.value)) && !showAsDot.value
})

// Count should be cache in case hidden change it
const livingCount = ref(count.value)

// We need cache count since remove motion should not change count display
const displayCount = ref(mergedCount.value)

// We will cache the dot status to avoid shaking on leaved motion
const isDotRef = ref(showAsDot.value)

watch(
  [() => count.value, () => mergedCount.value, () => showAsDot.value],
  () => {
    if (!isHidden.value) {
      livingCount.value = count.value
      displayCount.value = mergedCount.value
      isDotRef.value = showAsDot.value
    }
  },
  { immediate: true },
)
// InternalColor
const isInternalColor = computed(() => isPresetColor(color.value, false))
// Shared styles
const statusCls = computed(() => ({
  [`${prefixCls.value}-status-dot`]: hasStatus.value,
  [`${prefixCls.value}-status-${status.value}`]: !!status.value,
  [`${prefixCls.value}-color-${color.value}`]: isInternalColor.value,
}))

const statusStyle = computed(() => {
  if (color.value && !isInternalColor.value) {
    return { background: color.value, color: color.value }
  } else {
    return {}
  }
})

const slots = useSlots()

const visible = computed(() => !!(!isHidden.value || slots.count))

const childrenNodes = computed(() => {
  return flattenChildren(slots.default?.())
})

const attrs = useAttrs()
const mergedStyles = computed(() => {
  const style = attrs.style || {}
  if (!offset.value) {
    return { ...style }
  }

  const offsetStyle: CSSProperties = {
    marginTop: isNumeric(offset.value[1])
      ? `${offset.value[1]}px`
      : offset.value[1],
  }
  if (direction.value === 'rtl') {
    offsetStyle.left = `${Number.parseInt(offset.value[0] as string, 10)}px`
  } else {
    offsetStyle.right = `${-Number.parseInt(offset.value[0] as string, 10)}px`
  }

  return {
    ...offsetStyle,
    ...style,
  }
})

const scrollNumberStyle = computed(() => {
  let styles: CSSProperties = { ...mergedStyles, ...props.numberStyle }

  if (color.value && !isInternalColor.value) {
    styles = styles || {}
    styles.background = color.value
  }

  return styles
})

const badgeClassNames = computed(() => [
  prefixCls.value,
  !!hasStatus.value && `${prefixCls.value}-status`,
  !childrenNodes.value.length && `${prefixCls.value}-not-a-wrapper`,
  direction.value === 'rtl' && `${prefixCls.value}-rtl`,
  attrs.class,
])

const transitionProps = computed(() =>
  getTransitionProps(childrenNodes.value.length ? `${prefixCls.value}-zoom` : '', {
    appear: false,
  }),
)

const titleNode = computed(() => {
  return (
    title.value
    ?? (typeof count.value === 'string' || typeof count.value === 'number'
      ? count.value
      : undefined)
  )
})

const scrollNumberCls = computed(() => ({
  [`${prefixCls.value}-dot`]: isDotRef.value,
  [`${prefixCls.value}-count`]: !isDotRef.value,
  [`${prefixCls.value}-count-sm`]: props.size === 'small',
  [`${prefixCls.value}-multiple-words`]:
    !isDotRef.value
    && displayCount.value
    && displayCount.value.toString().length > 1,
  [`${prefixCls.value}-status-${props.status}`]: !!props.status,
  [`${prefixCls.value}-color-${props.color}`]: isInternalColor.value,
}))

const displayNode = computed(() => {
  return typeof count.value === 'object'
    || (count.value === undefined && slots.count)
    ? cloneElement(
        (count.value ?? slots.count?.()) || [],
        {
          style: mergedStyles.value,
        },
        false,
      )
    : null
})

const statusTextNode = computed(() => {
  const text = props.text ?? slots.text?.()
  return visible.value || !text
    ? null
    : h(
        'span',
        {
          class: [`${prefixCls.value}-status-text`],
        },
        [text.value],
      )
})
</script>

<template>
  <span
    v-if="childrenNodes.length === 0 && hasStatus"
    v-bind="$attrs"
    :class="badgeClassNames"
    :style="mergedStyles"
  >
    <span :class="statusCls" :style="statusStyle" />
    <span
      :style="{ color: mergedStyles.color }"
      :class="[`${prefixCls}-status-text`]"
    >
      {{ text }}
    </span>
  </span>

  <span v-bind="$attrs" :class="badgeClassNames">
    <RenderComponent :render="childrenNodes" />
    <Transition v-bind="transitionProps">
      <ScrollNumber
        v-show="visible"
        key="scrollNumber"
        :prefix-cls="scrollNumberPrefixCls"
        :show="visible"
        :class="scrollNumberCls"
        :count="displayCount"
        :title="titleNode"
        :style="scrollNumberStyle"
      >
        <RenderComponent v-if="!!displayNode" :render="displayNode" />
      </ScrollNumber>
    </Transition>

    <RenderComponent :render="statusTextNode" />
  </span>
</template>
