<script setup lang="ts">
import type { VNode } from 'vue'
import type { MenuEmits } from '../menu/define.ts'
import type { TooltipRef } from '../tooltip'
import type { DropdownEmits, DropdownProps, DropdownSlots } from './define'
import { LeftOutlined, RightOutlined } from '@ant-design/icons-vue'
import { filterEmpty } from '@v-c/util/dist/props-util'
import { cloneVNode, computed, Fragment, h, isVNode, nextTick, shallowRef, useSlots, watch } from 'vue'
import { flattenChildren } from '../_utils/checker.ts'
import { classNames } from '../_utils/classNames.ts'
import { useComponentConfig, useConfigContext } from '../config-provider/context.ts'
import Menu from '../menu/menu.vue'
import { Tooltip } from '../tooltip'
import DropdownOverlay from './dropdown-overlay.vue'

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

  props.onOpenChange?.(nextOpen, { source })
  props.onVisibleChange?.(nextOpen)
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

function normalizeSlotValue(value: any): any[] {
  if (value === undefined || value === null)
    return []
  const arrayValue = Array.isArray(value) ? value : [value]
  return filterEmpty(arrayValue)
}

function containsDropdownItem(nodes: any[]): any {
  return nodes.some((node: any) => {
    if (!node)
      return false
    if (isVNode(node)) {
      const type = node.type as any
      if (type?.name === 'ADropdownItem' || type?.__ANT_DROPDOWN_ITEM)
        return true
      if (Array.isArray(node.children))
        return containsDropdownItem(normalizeSlotValue(node.children as any))
    }
    return false
  })
}

function wrapOverlay(content: () => VNode[] | VNode | null | string | undefined) {
  return h(DropdownOverlay, {
    prefixCls: prefixCls.value,
    onItemClick: handleOverlayItemClick,
  }, { default: content })
}

function toSingleNode(node: VNode | VNode[] | string | null | undefined) {
  if (Array.isArray(node)) {
    if (node.length === 0)
      return null
    if (node.length === 1)
      return node[0]
    return h(Fragment, node)
  }
  return node ?? null
}

const overlayNode = computed(() => {
  let overlay: VNode | VNode[] | string | null | undefined

  if (slots.overlay) {
    const overlayContent = normalizeSlotValue(slots.overlay?.())
    const flat = flattenChildren(overlayContent, false)
    if (containsDropdownItem(flat as any))
      overlay = wrapOverlay(() => normalizeSlotValue(slots.overlay?.()))
    else
      overlay = overlayContent
  } else if (props.menu) {
    const {
      onClick,
      onOpenChange,
      selectable,
      mode,
      prefixCls: menuPrefixCls,
      expandIcon: menuExpandIcon,
      items,
      ...rest
    } = props.menu
    const resolvedMenuPrefix = menuPrefixCls ?? `${prefixCls.value}-menu`
    overlay = h(Menu, {
      mode: mode ?? 'vertical',
      selectable: selectable ?? false,
      prefixCls: resolvedMenuPrefix,
      expandIcon: menuExpandIcon ?? expandIcon.value,
      ...rest,
      items,
      onClick: (info: MenuEmits['click'][0]) => {
        onClick?.(info)
        if (!(props.menu?.selectable && props.menu?.multiple))
          triggerPopup(false, 'menu')
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
  if (popupTransform.value)
    result = popupTransform.value(result)

  return toSingleNode(result)
})

function handleOverlayItemClick() {
  triggerPopup(false, 'menu')
}

const triggerInfo = computed(() => {
  const children = flattenChildren(normalizeSlotValue(slots.default?.()))
  if (!children.length) {
    return {
      node: h('span', { class: `${prefixCls.value}-trigger` }),
      disabled: props.disabled,
    }
  }

  const first = children[0]

  if (!isVNode(first)) {
    return {
      node: h('span', { class: `${prefixCls.value}-trigger` }, children as any),
      disabled: props.disabled,
    }
  }

  const originDisabled = !!first.props?.disabled
  const mergedDisabled = props.disabled ?? originDisabled

  const triggerCls = classNames(
    `${prefixCls.value}-trigger`,
    { [`${prefixCls.value}-rtl`]: direction.value === 'rtl' },
    props.className,
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
