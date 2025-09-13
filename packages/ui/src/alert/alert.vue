<script setup lang="ts">
import type { CSSProperties } from 'vue'
import type { AlertEmits, AlertExpose, AlertProps, AlertSlots } from './define.ts'
import { CloseOutlined } from '@ant-design/icons-vue'
import { computed, h, ref, shallowRef, useAttrs, useSlots } from 'vue'
import { useConfigContext } from '../config-provider/context.ts'
import IconNode from './IconNode.vue'

defineOptions({
  name: 'AAlert',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<AlertProps>(), {
  role: 'alert',
  showIcon: undefined,
  closable: undefined,
  closeIcon: undefined,
  closeText: undefined,
  icon: undefined,
})

const emit = defineEmits<AlertEmits>()

defineSlots<AlertSlots>()

const slots = useSlots()
const attrs = useAttrs()

// State
const closed = ref(false)
const alertRef = shallowRef<HTMLDivElement>()

// Config context
const context = useConfigContext()
// 暂时不使用alert config，因为还没定义
// const alertCtx = useComponentConfig('alert')

const prefixCls = 'ant-alert'
const direction = computed(() => context.direction)

// Alert type computation
const type = computed(() => {
  if (props.type !== undefined) {
    return props.type
  }
  // banner mode defaults to 'warning'
  return props.banner ? 'warning' : 'info'
})

// Handle close
function handleClose(e: MouseEvent) {
  closed.value = true
  emit('close', e)
}

// Closable computation
const isClosable = computed(() => {
  // 优先检查slots
  if (slots.closeIcon || slots.closeText)
    return true
  if (typeof props.closable === 'object' && props.closable?.closeIcon)
    return true
  if (props.closeText)
    return true
  if (typeof props.closable === 'boolean')
    return props.closable
  if (props.closeIcon !== false && props.closeIcon !== null && props.closeIcon !== undefined)
    return true
  return false // 暂时不支持context closable
})

// Show icon computation
const isShowIcon = computed(() => {
  // 有icon slot或icon prop时显示图标
  if (slots.icon || props.icon)
    return true
  return props.banner && props.showIcon === undefined ? true : props.showIcon
})

// Merged close icon
const mergedCloseIcon = computed(() => {
  if (typeof props.closable === 'object' && props.closable?.closeIcon) {
    return props.closable.closeIcon
  }
  if (props.closeText) {
    return props.closeText
  }
  if (props.closeIcon !== undefined) {
    return props.closeIcon
  }
  return undefined
})

// Aria props
const mergedAriaProps = computed(() => {
  const merged = props.closable
  if (typeof merged === 'object') {
    const { closeIcon: _, ...ariaProps } = merged
    return ariaProps
  }
  return {}
})

// CSS classes
const alertCls = computed(() => {
  return {
    [prefixCls]: true,
    [`${prefixCls}-${type.value}`]: true,
    [`${prefixCls}-with-description`]: !!(props.description || slots.description),
    [`${prefixCls}-no-icon`]: !isShowIcon.value,
    [`${prefixCls}-banner`]: props.banner,
    [`${prefixCls}-rtl`]: direction.value === 'rtl',
  }
})

// Filter attrs for aria and data attributes
const restAttrs = computed(() => {
  const result: Record<string, any> = {}
  for (const [key, value] of Object.entries(attrs)) {
    if (key.startsWith('aria-') || key.startsWith('data-')) {
      result[key] = value
    }
  }
  return result
})

// Render close icon
function renderCloseIcon() {
  if (!isClosable.value)
    return null

  // 优先使用slot，然后是props
  const closeIconToShow = slots.closeIcon
    ? slots.closeIcon()
    : slots.closeText
      ? slots.closeText()
      : mergedCloseIcon.value === true || mergedCloseIcon.value === undefined
        ? CloseOutlined
        : mergedCloseIcon.value
  return h('button', {
    type: 'button',
    onClick: handleClose,
    class: `${prefixCls}-close-icon`,
    tabindex: 0,
    ...mergedAriaProps.value,
  }, [h(closeIconToShow)])
}

// Expose
defineExpose<AlertExpose>({
  get nativeElement() {
    return alertRef.value!
  },
})

// Motion style
const motionStyle = computed<CSSProperties>(() => {
  if (closed.value) {
    return {
      maxHeight: 0,
      overflow: 'hidden',
      opacity: 0,
      transition: 'all 0.3s ease',
    }
  }
  return {}
})
</script>

<template>
  <Transition
    :name="`${prefixCls}-motion`"
    :appear="false"
    leave-from-class="ant-alert-motion-leave"
    leave-active-class="ant-alert-motion-leave ant-alert-motion-leave-active"
    leave-to-class="ant-alert-motion-leave ant-alert-motion-leave-active"
    @after-leave="afterClose"
  >
    <div
      v-if="!closed"
      :id="id"
      ref="alertRef"
      :data-show="!closed"
      :class="[alertCls, $attrs.class]"
      :style="[motionStyle]"
      :role="role"
      v-bind="restAttrs"
      @mouseenter="(e: MouseEvent) => emit('mouseenter', e)"
      @mouseleave="(e: MouseEvent) => emit('mouseleave', e)"
      @click="(e: MouseEvent) => emit('click', e)"
    >
      <IconNode
        v-if="isShowIcon"
        :description="slots.description || description"
        :icon="slots.icon || icon"
        :prefix-cls="prefixCls"
        :type="type"
      />
      <div :class="`${prefixCls}-content`">
        <div v-if="slots.message || slots.default || message" :class="`${prefixCls}-message`">
          <template v-if="slots.message">
            <slot name="message" />
          </template>
          <template v-else-if="slots.default">
            <slot />
          </template>
          <template v-else-if="message">
            <component :is="message" v-if="typeof message === 'function'" />
            <template v-else>
              {{ message }}
            </template>
          </template>
        </div>
        <div v-if="slots.description || description" :class="`${prefixCls}-description`">
          <template v-if="slots.description">
            <slot name="description" />
          </template>
          <template v-else-if="description">
            <component :is="description" v-if="typeof description === 'function'" />
            <template v-else>
              {{ description }}
            </template>
          </template>
        </div>
      </div>
      <div v-if="slots.action || action" :class="`${prefixCls}-action`">
        <template v-if="slots.action">
          <slot name="action" />
        </template>
        <template v-else-if="action">
          <component :is="action" v-if="typeof action === 'function'" />
          <template v-else>
            {{ action }}
          </template>
        </template>
      </div>
      <component :is="renderCloseIcon" v-if="isClosable" />
    </div>
  </Transition>
</template>
