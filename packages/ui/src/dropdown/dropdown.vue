<script setup lang="ts">
import type { VNode } from 'vue'
import type { MenuEmits } from '../menu'
import type { TooltipRef } from '../tooltip'
import type { DropdownEmits, DropdownProps, DropdownSlots } from './define'
import { LeftOutlined, RightOutlined } from '@ant-design/icons-vue'
import { cloneVNode, computed, h, isVNode, nextTick, shallowRef, useSlots, watch } from 'vue'
import { flattenChildren } from '../_utils/checker.ts'
import { classNames } from '../_utils/classNames.ts'
import { useComponentConfig, useConfigContext } from '../config-provider/context.ts'
import Menu from '../menu/menu.vue'
import { Tooltip } from '../tooltip'

defineOptions({
  name: 'ADropdown',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<DropdownProps>(), {
  trigger: () => ['hover'],
  arrow: false,
  autoAdjustOverflow: true,
  mouseEnterDelay: 0.15,
  mouseLeaveDelay: 0.1,
  open: undefined,
  visible: undefined,
})

const emit = defineEmits<DropdownEmits>()
const slots = useSlots() as DropdownSlots

const configCtx = useConfigContext()
const componentConfig = useComponentConfig('dropdown')

const uncontrolledOpen = shallowRef(props.open ?? props.visible ?? false)

watch(
  () => [props.open, props.visible],
  ([open, visible]) => {
    if (open !== undefined)
      uncontrolledOpen.value = open
    else if (visible !== undefined)
      uncontrolledOpen.value = visible
  },
)

const mergedOpen = computed(() => {
  if (props.open !== undefined)
    return props.open
  if (props.visible !== undefined)
    return props.visible
  return uncontrolledOpen.value
})

const rootPrefixCls = computed(() => configCtx.getPrefixCls())

const prefixCls = computed(() => {
  const getPrefixCls = componentConfig.value?.getPrefixCls ?? configCtx.getPrefixCls
  return getPrefixCls('dropdown', props.prefixCls)
})

const direction = computed(() => componentConfig.value?.direction ?? configCtx.direction ?? 'ltr')

const placement = computed(() => {
  if (props.placement)
    return props.placement
  return direction.value === 'rtl' ? 'bottomRight' : 'bottomLeft'
})

const transitionName = computed(() => {
  if (props.transitionName)
    return props.transitionName
  return placement.value.startsWith('top')
    ? `${rootPrefixCls.value}-slide-down`
    : `${rootPrefixCls.value}-slide-up`
})

const mergedClassName = computed(() => classNames(
  props.overlayClassName,
  props.rootClassName,
  componentConfig.value?.className,
  componentConfig.value?.classNames?.root,
))

const mergedStyle = computed(() => ({
  ...componentConfig.value?.styles?.root,
  ...componentConfig.value?.style,
  ...props.overlayStyle,
}))

const popupTransform = computed(() => props.popupRender ?? props.dropdownRender)

const destroyOnHidden = computed(() => props.destroyOnHidden ?? props.destroyPopupOnHide)

function triggerPopup(nextOpen: boolean, source: 'trigger' | 'menu') {
  if (props.disabled)
    return

  if (props.open === undefined && props.visible === undefined)
    uncontrolledOpen.value = nextOpen

  emit('update:open', nextOpen)
  emit('update:visible', nextOpen)
  emit('openChange', nextOpen, { source })
  emit('visibleChange', nextOpen)

  // props.onOpenChange?.(nextOpen, { source })
  // props.onVisibleChange?.(nextOpen)
}

function handleMenuClick() {
  const shouldKeep = props.menu?.selectable && props.menu?.multiple
  if (!shouldKeep)
    triggerPopup(false, 'menu')
}

const expandIcon = computed(() => {
  if (props.menu?.expandIcon !== undefined)
    return props.menu.expandIcon

  const arrowClass = `${prefixCls.value}-menu-submenu-arrow`
  const iconClass = `${prefixCls.value}-menu-submenu-arrow-icon`
  return () => h(
    'span',
    { class: arrowClass },
    direction.value === 'rtl'
      ? h(LeftOutlined, { class: iconClass })
      : h(RightOutlined, { class: iconClass }),
  )
})

const overlayNode = computed(() => {
  let overlay: VNode | null | VNode[] | string | undefined

  if (slots.overlay) {
    overlay = slots.overlay()
  } else if (props.menu) {
    const { onClick, onOpenChange, selectable, mode, prefixCls: menuPrefixCls, expandIcon: menuExpandIcon, ...rest } = props.menu
    overlay = h(Menu, {
      mode: mode ?? 'vertical',
      selectable: selectable ?? false,
      prefixCls: menuPrefixCls ?? `${prefixCls.value}-menu`,
      expandIcon: menuExpandIcon ?? expandIcon.value,
      ...rest,
      onClick: (info: MenuEmits['click'][0]) => {
        onClick?.(info)
        handleMenuClick()
      },
      onOpenChange: (openKeys: MenuEmits['openChange'][0]) => {
        onOpenChange?.(openKeys)
      },
    })
  } else if (typeof props.overlay === 'function') {
    overlay = (props as any).overlay?.()
  } else {
    overlay = props.overlay as any
  }

  if (!overlay)
    return null

  let result = overlay as any
  if (Array.isArray(result) && result.length === 1)
    [result] = result

  if (typeof result === 'string')
    result = h('span', result)

  if (popupTransform.value)
    result = popupTransform.value(result)

  return result
})

const triggerInfo = computed(() => {
  const children = flattenChildren(slots.default?.() ?? [])
  if (!children.length) {
    return {
      node: h('span', { class: `${prefixCls.value}-trigger` }),
      disabled: !!props.disabled,
    }
  }

  const first = children[0]

  if (!isVNode(first)) {
    return {
      node: h('span', { class: `${prefixCls.value}-trigger` }, children as any),
      disabled: !!props.disabled,
    }
  }

  const originDisabled = !!first.props?.disabled
  const mergedDisabled = props.disabled ?? originDisabled

  const triggerCls = classNames(
    `${prefixCls.value}-trigger`,
    { [`${prefixCls.value}-rtl`]: direction.value === 'rtl' },
    first.props?.class,
    props.openClassName && mergedOpen.value ? props.openClassName : null,
    { [`${prefixCls.value}-disabled`]: mergedDisabled },
  )

  if (children.length > 1) {
    return {
      node: h('span', { class: triggerCls }, children as any),
      disabled: mergedDisabled,
    }
  }

  const cloned = cloneVNode(first, {
    class: triggerCls,
    disabled: mergedDisabled,
  })

  return {
    node: cloned,
    disabled: mergedDisabled,
  }
})

const triggerNode = computed(() => triggerInfo.value.node)
const isTriggerDisabled = computed(() => triggerInfo.value.disabled)

const mergedTrigger = computed(() => {
  const list = Array.isArray(props.trigger) ? props.trigger : [props.trigger ?? 'hover']
  return (isTriggerDisabled.value ? [] : list.filter(Boolean)) as DropdownProps['trigger'][]
})

const tooltipRef = shallowRef<TooltipRef | null>(null)

watch(
  mergedOpen,
  (open) => {
    if (open && props.autoFocus) {
      nextTick(() => {
        tooltipRef.value?.popupElement?.focus?.({ preventScroll: true })
      })
    }
  },
)

function handleUpdateOpen(open: boolean) {
  triggerPopup(open, 'trigger')
}

defineExpose({
  forceAlign: () => tooltipRef.value?.forceAlign(),
  get nativeElement() {
    return tooltipRef.value?.nativeElement ?? null
  },
  get popupElement() {
    return tooltipRef.value?.popupElement ?? null
  },
})
</script>

<template>
  <Tooltip
    ref="tooltipRef"
    :prefix-cls="prefixCls"
    :class-names="{ root: mergedClassName as any }"
    :styles="{ root: mergedStyle }"
    :placement="placement"
    :trigger="mergedTrigger as any"
    :arrow="props.arrow"
    :align="props.align"
    :transition-name="transitionName"
    :auto-adjust-overflow="props.autoAdjustOverflow"
    :mouse-enter-delay="props.mouseEnterDelay"
    :mouse-leave-delay="props.mouseLeaveDelay"
    :get-popup-container="props.getPopupContainer"
    :destroy-on-hidden="destroyOnHidden"
    :overlay="overlayNode || undefined"
    :open="mergedOpen"
    :fresh="props.forceRender"
    :has-inner="false"
    @update:open="handleUpdateOpen"
  >
    <component :is="triggerNode" />
  </Tooltip>
</template>
