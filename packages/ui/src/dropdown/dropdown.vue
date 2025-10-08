<script setup lang="ts">
import type { CSSProperties } from 'vue'
import type { TooltipRef } from '../tooltip'
import type { DropdownEmits, DropdownProps } from './define.ts'
import { computed, h, onBeforeUnmount, ref, shallowRef, useSlots, watch } from 'vue'
import { flattenChildren } from '../_utils/checker.ts'
import { classNames } from '../_utils/classNames.ts'
import { useConfigContext } from '../config-provider/context.ts'
import { Menu } from '../menu'
import { Tooltip } from '../tooltip'
import { useProvideDropdownContext } from './context'

defineOptions({
  name: 'ADropdown',
})

const props = withDefaults(defineProps<DropdownProps>(), {
  trigger: () => ['hover'],
  placement: 'bottomLeft',
  mouseEnterDelay: 0.15,
  mouseLeaveDelay: 0.1,
  arrow: false,
  destroyOnHidden: false,
  autoAdjustOverflow: true,
  disabled: false,
  autoFocus: false,
  open: undefined,
})

const emit = defineEmits<DropdownEmits>()

const slots = useSlots()

const configCtx = useConfigContext()
const prefixCls = computed(() => configCtx.getPrefixCls('dropdown', props.prefixCls))
const direction = computed(() => configCtx.direction?.value)

const tooltipRef = shallowRef<TooltipRef>()
const menuRef = shallowRef<any>()

// Internal open state for handling submenu interactions
const internalOpen = ref(props.open)

// Submenu hover checker function registered by Menu
const submenuHoverChecker = ref<(() => boolean) | null>(null)

// Provide dropdown context for Menu to register its hover checker
useProvideDropdownContext({
  registerSubmenuHoverCheck(checker: () => boolean) {
    submenuHoverChecker.value = checker
  },
  unregisterSubmenuHoverCheck() {
    submenuHoverChecker.value = null
  },
})

onBeforeUnmount(() => {
  submenuHoverChecker.value = null
})

// Compute transition name based on placement
const transitionName = computed(() => {
  if (props.transitionName !== undefined) {
    return props.transitionName
  }
  const rootPrefixCls = configCtx.getPrefixCls()
  if (props.placement && props.placement.includes('top')) {
    return `${rootPrefixCls}-slide-down`
  }
  return `${rootPrefixCls}-slide-up`
})

// Handle deprecated destroyPopupOnHide
const mergedDestroyOnHidden = computed(() => {
  return props.destroyOnHidden
})

// Merge menu props with click handler
const menuProps = computed(() => {
  if (!props.menu)
    return undefined
  return {
    ...props.menu,
    prefixCls: `${prefixCls.value}-menu`,
  }
})

// Handle menu click - close dropdown if not multiple selectable
function handleMenuClick() {
  if (props.menu?.selectable && props.menu?.multiple) {
    return
  }
  emit('openChange', false, { source: 'menu' })
  emit('update:open', false)
  internalOpen.value = false
}

// Render overlay - the dropdown menu
const overlayNode = computed(() => {
  if (!menuProps.value && !slots.overlay) {
    return null
  }

  let content: any = null

  if (menuProps.value?.items) {
    content = h(Menu, {
      ref: menuRef,
      ...menuProps.value,
      mode: 'vertical',
      selectable: false,
      onClick: handleMenuClick,
    })
  }
  else if (slots.overlay) {
    content = slots.overlay()
  }

  // Apply popupRender if provided
  if (props.popupRender && content) {
    content = props.popupRender(content)
  }

  return content
})

// Custom open change handler that checks submenu hover state
function handleOpenChange(open: boolean) {
  // If closing and we have hover trigger, check if submenu is hovered
  if (!open && props.trigger.includes('hover')) {
    // Check if any submenu is hovered
    if (submenuHoverChecker.value && submenuHoverChecker.value()) {
      // Don't close if submenu is hovered
      return
    }
  }

  // When controlled by props.open, sync internal state
  if (props.open !== undefined) {
    emit('openChange', open, { source: 'trigger' })
    emit('update:open', open)
    return
  }

  // Uncontrolled mode
  internalOpen.value = open
  emit('openChange', open, { source: 'trigger' })
  emit('update:open', open)
}

// Watch props.open changes to sync internal state
watch(() => props.open, (newOpen) => {
  if (newOpen !== undefined) {
    internalOpen.value = newOpen
  }
}, { immediate: true })

// Compute final open state
const finalOpen = computed(() => {
  return props.open !== undefined ? props.open : internalOpen.value
})

// Merge overlay className
const overlayClassName = computed(() => {
  return classNames(
    props.overlayClassName,
    props.rootClassName,
    {
      [`${prefixCls.value}-rtl`]: direction.value === 'rtl',
    },
  )
})

// Merge overlay style
const overlayStyle = computed<CSSProperties | undefined>(() => {
  return props.overlayStyle
})

// Get trigger actions
const triggerActions = computed(() => {
  if (props.disabled) {
    return []
  }
  return props.trigger
})

// Get default slot content (the trigger element)
function renderTrigger() {
  const children = slots.default?.()
  if (!children || children.length === 0) {
    return null
  }

  const child = flattenChildren(children)[0]
  if (!child) {
    return null
  }

  // Clone the child and add trigger class
  const triggerCls = classNames(
    `${prefixCls.value}-trigger`,
    {
      [`${prefixCls.value}-rtl`]: direction.value === 'rtl',
      [props.openClassName || '']: finalOpen.value,
    },
  )

  // Add class to child if it's an element
  if (typeof child === 'object' && 'props' in child) {
    const childProps: any = child.props || {}
    const mergedClass = classNames(childProps.class, triggerCls)
    const mergedDisabled = childProps.disabled ?? props.disabled

    return h(child as any, {
      ...childProps,
      class: mergedClass,
      disabled: mergedDisabled,
    })
  }

  // Wrap primitive content in span
  return h('span', { class: triggerCls }, child)
}
</script>

<template>
  <Tooltip
    ref="tooltipRef"
    :prefix-cls="prefixCls"
    :overlay-class-name="overlayClassName"
    :overlay-style="overlayStyle"
    :trigger="triggerActions"
    :placement="placement"
    :open="finalOpen"
    :arrow="arrow"
    :mouse-enter-delay="mouseEnterDelay"
    :mouse-leave-delay="mouseLeaveDelay"
    :destroy-on-hidden="mergedDestroyOnHidden"
    :get-popup-container="getPopupContainer"
    :transition-name="transitionName"
    :auto-adjust-overflow="autoAdjustOverflow"
    :has-inner="false"
    @open-change="handleOpenChange"
  >
    <template #overlay>
      <component :is="overlayNode" />
    </template>
    <component :is="renderTrigger()" />
  </Tooltip>
</template>
