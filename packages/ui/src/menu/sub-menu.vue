<script setup lang="ts">
import type { Key, SubMenuProps, SubMenuSlots } from './define'
import { computed, h, isVNode, onMounted, onUnmounted, ref, shallowRef, useSlots, watch, watchEffect } from 'vue'
import { flattenChildren } from '../_utils/checker'
import { classNames } from '../_utils/classNames'
import Tooltip from '../tooltip/tooltip.vue'
import { getCollapseMotionProps } from './_utils'
import {
  useMenuContext,
  useMenuDisabled,
  useMenuLevel,
  useMenuPath,
  useParentMode,
  useProvideMenuDisabled,
  useProvideMenuLevel,
  useProvideMenuPath,
  useProvideParentMode,
} from './context'

defineOptions({
  name: 'AMenuSubMenu',
})

const props = withDefaults(defineProps<SubMenuProps>(), {
  disabled: false,
  popupClassName: undefined,
  popupStyle: undefined,
  popupOffset: undefined,
  theme: undefined,
  triggerSubMenuAction: undefined,
  expandable: true,
})

defineSlots<SubMenuSlots>()
const slots = useSlots() as SubMenuSlots

let subUuid = 0
function createLocalKey() {
  subUuid += 1
  return `__menu-sub-${subUuid}`
}

const localKey = shallowRef(createLocalKey())

const menuContext = useMenuContext()
const parentDisabled = useMenuDisabled()
const parentPath = useMenuPath()
const parentPathValue = computed(() => parentPath?.value ?? [])
const levelRef = useMenuLevel()
const parentMode = useParentMode()

const prefixCls = computed(() => menuContext.prefixCls?.value ?? 'ant-menu')
const subMenuPrefixCls = computed(() => `${prefixCls.value}-submenu`)
const mode = computed(() => menuContext.mode?.value ?? 'vertical')
const inlineCollapsed = computed(() => menuContext.inlineCollapsed?.value ?? false)
const inlineIndentValue = computed(() => menuContext.inlineIndent?.value ?? 24)
const selectedKeySet = computed(() => menuContext.selectedKeys?.value ?? new Set<Key>())
const openSelectedKeySet = computed(() => menuContext.openSelectedKeySet?.value ?? new Set<Key>())
const openKeySet = computed(() => menuContext.openKeys?.value ?? new Set<Key>())
const openDelay = computed(() => menuContext.openDelay?.value ?? 0.1)
const closeDelay = computed(() => menuContext.closeDelay?.value ?? 0.1)

const eventKey = computed(() => props.eventKey ?? localKey.value)
const keyPath = computed<Key[]>(() => [eventKey.value, ...parentPathValue.value])

const mergedTriggerAction = computed(() => props.triggerSubMenuAction ?? menuContext.triggerSubMenuAction?.value ?? 'hover')
const isDisabled = computed(() => parentDisabled.value || props.disabled)
const collapsingKeys = computed(() => menuContext.collapsingKeys?.value ?? new Set<Key>())
const isHovering = ref(false)

const shouldUsePopover = computed(() => {
  if (!props.expandable)
    return false
  if (isDisabled.value)
    return false
  if (mode.value === 'horizontal')
    return true
  if (inlineCollapsed.value) {
    if (collapsingKeys.value.has(eventKey.value))
      return false
    return true
  }
  return false
})
const isInlineMode = computed(() => {
  return mode.value === 'inline' || mode.value === 'vertical'
})

const isPopupMode = computed(() => {
  if (mode.value !== 'inline')
    return true
  return shouldUsePopover.value
})

const triggerRef = shallowRef<HTMLElement>()
const popupRef = shallowRef<HTMLElement>()

watch(
  isPopupMode,
  (isPopover) => {
    menuContext.setPopoverSubmenu?.(eventKey.value, isPopover)
  },
  { immediate: true },
)

watchEffect(() => {
  if (!isPopupMode.value) {
    menuContext.setPopoverElements?.(eventKey.value, null)
    return
  }

  menuContext.setPopoverElements?.(eventKey.value, {
    trigger: triggerRef.value ?? null,
    popup: popupRef.value ?? null,
  })
})

const isOpen = computed(() => {
  return openKeySet.value.has(eventKey.value)
})
const submenuClass = computed(() => classNames(
  subMenuPrefixCls.value,
  {
    [`${subMenuPrefixCls.value}-horizontal`]: mode.value === 'horizontal' && !shouldUsePopover.value,
    [`${subMenuPrefixCls.value}-vertical`]: shouldUsePopover.value || parentMode.value === 'vertical',
    [`${subMenuPrefixCls.value}-inline`]: mode.value === 'inline' && !shouldUsePopover.value && !inlineCollapsed.value,
    [`${subMenuPrefixCls.value}-open`]: isOpen.value,
    [`${subMenuPrefixCls.value}-active`]: isHovering.value && !isDisabled.value,
    [`${subMenuPrefixCls.value}-disabled`]: isDisabled.value,
    [`${subMenuPrefixCls.value}-selected`]: openSelectedKeySet.value.has(eventKey.value),
  },
))

const itemPaddingStyle = computed(() => {
  if (!isInlineMode.value)
    return undefined

  const depth = levelRef.value
  const indentUnit = inlineIndentValue.value

  if (mode.value === 'inline') {
    if (inlineCollapsed.value)
      return undefined
    const indent = indentUnit * depth
    return indent > 0
      ? { paddingLeft: `${indent}px` }
      : undefined
  }

  if (shouldUsePopover.value)
    return undefined

  const indent = indentUnit * (depth - 1)
  return indent > 0
    ? { paddingLeft: `${indent}px` }
    : undefined
})

function resolveContent(content?: SubMenuProps['title'] | SubMenuProps['icon'], slot?: () => any) {
  let nodes: any[] = []
  if (slot)
    nodes = flattenChildren(slot())
  else if (typeof content === 'function')
    nodes = flattenChildren((content as () => any)())
  else if (content !== undefined)
    nodes = flattenChildren(content as any)

  return nodes
    .map((node) => {
      if (isVNode(node))
        return node
      if (typeof node === 'string' || typeof node === 'number')
        return h('span', node)
      return null
    })
    .filter(Boolean)
}

const iconNodes = computed(() => resolveContent(props.icon, slots.icon))
const titleNodes = computed(() => (slots.title ? resolveContent(undefined, slots.title) : resolveContent(props.title)))

const mergedThemeClass = computed(() => {
  const theme = props.theme ?? menuContext.theme?.value ?? 'light'
  return `${prefixCls.value}-${theme}`
})

function triggerOpen(open: boolean, event: Event | null) {
  if (isDisabled.value)
    return
  menuContext.onSubMenuToggle?.({ key: eventKey.value, keyPath: keyPath.value, open, event })
}

function handleTitleClick(event: MouseEvent) {
  event.stopPropagation()
  if (!props.expandable) {
    menuContext.onMenuItemClick?.({
      key: eventKey.value,
      keyPath: keyPath.value,
      domEvent: event,
      isSelected: selectedKeySet.value.has(eventKey.value),
      item: props,
    })
    return
  }
  if (shouldUsePopover.value && mergedTriggerAction.value === 'hover')
    return

  triggerOpen(!isOpen.value, event)
}

function handlePopupOpenChange(open: boolean) {
  if (!open) {
    const hasChildOpen = Array.from(openKeySet.value).some((key) => {
      if (key === eventKey.value)
        return false
      const path = menuContext.getKeyPath?.(key)
      return path?.includes(eventKey.value)
    })

    if (hasChildOpen)
      return
  }

  if (open !== isOpen.value)
    triggerOpen(open, null)

  if (!open)
    menuContext.closePopoverSubmenus?.(keyPath.value)
}

onMounted(() => {
  menuContext.registerPath?.(eventKey.value, keyPath.value)
})

onUnmounted(() => {
  menuContext.setPopoverSubmenu?.(eventKey.value, false)
  menuContext.unregisterPath?.(eventKey.value)
  menuContext.setPopoverElements?.(eventKey.value, null)
})

const expandIconNode = computed(() => {
  const expandIcon = menuContext.expandIcon?.value
  if (!expandIcon)
    return null
  if (typeof expandIcon === 'function')
    return expandIcon({ isOpen: isOpen.value, disabled: isDisabled.value, level: levelRef.value })
  return expandIcon
})

const childLevel = computed(() => levelRef.value + 1)
const childPath = computed(() => [eventKey.value, ...parentPathValue.value])

useProvideMenuPath(childPath)
useProvideMenuLevel(childLevel)
useProvideMenuDisabled(computed(() => isDisabled.value))
useProvideParentMode(computed(() => {
  if (shouldUsePopover.value) {
    return 'vertical'
  }
  return isInlineMode.value ? 'inline' : 'vertical'
}))

const titleClass = computed(() => `${subMenuPrefixCls.value}-title`)
function handleMouseEnter() {
  if (isDisabled.value)
    return
  isHovering.value = true
}

function handleMouseLeave() {
  isHovering.value = false
}

watch(isDisabled, (disabled) => {
  if (disabled)
    isHovering.value = false
})

const popupPlacement = computed(() => {
  if (mode.value === 'horizontal' && levelRef.value === 1)
    return 'bottom'
  return 'rightTop'
})
const popupMotion = computed(() => {
  return mode.value === 'horizontal' ? 'ant-slide-up' : 'ant-zoom-big'
})
const hasTransition = ref(false)
function handleBeforeLeave() {
  hasTransition.value = true
}
function handleAfterLeave() {
  hasTransition.value = false
}
function handleTransitionStart() {
  hasTransition.value = true
}

function handleTransitionEnd() {
  requestAnimationFrame(() => {
    hasTransition.value = false
  })
}
</script>

<template>
  <li
    :class="submenuClass"
    role="none"
    :aria-disabled="isDisabled"
    :aria-expanded="isOpen"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <template v-if="(!shouldUsePopover && mode === 'inline') || hasTransition">
      <div
        role="menuitem"
        aria-haspopup="true"
        :class="titleClass"
        :style="shouldUsePopover ? undefined : itemPaddingStyle"
        @transitionstart="handleTransitionStart"
        @transitionend="handleTransitionEnd"
        @click="handleTitleClick"
      >
        <component
          :is="node"
          v-for="(node, index) in iconNodes"
          :key="index"
          :class="{
            [`${prefixCls}-item-icon`]: isVNode(node),
          }"
        />
        <span :class="`${prefixCls}-title-content`">
          <template v-if="titleNodes.length">
            <component
              :is="node"
              v-for="(node, index) in titleNodes"
              :key="index"
            />
          </template>
        </span>
        <span v-if="expandIconNode" :class="`${subMenuPrefixCls}-expand-icon`">
          <component :is="expandIconNode" />
        </span>
        <i v-else :class="`${subMenuPrefixCls}-arrow`" />
      </div>
      <Transition
        v-bind="getCollapseMotionProps()"
        @before-leave="handleBeforeLeave"
        @after-leave="handleAfterLeave"
      >
        <ul
          v-if="isOpen"
          data-menu-list="true"
          role="menu"
          :class="`${prefixCls} ${prefixCls}-sub ${prefixCls}-inline`"
        >
          <slot />
        </ul>
      </Transition>
    </template>
    <template v-else>
      <Tooltip
        :open="isOpen"
        :trigger="mergedTriggerAction"
        :has-inner="false"
        :placement="popupPlacement"
        :mouse-enter-delay="openDelay"
        :mouse-leave-delay="closeDelay"
        :transition-name="popupMotion"
        :root-class-name="[
          {
            [`${prefixCls}-submenu-popup`]: true,
            [`${prefixCls}`]: true,
            [`${mergedThemeClass}`]: true,
          },
          popupClassName,
        ]"
        :prefix-cls="`${prefixCls}-submenu`"
        destroy-on-hidden
        :arrow="false"
        @update:open="handlePopupOpenChange"
      >
        <template #default>
          <div
            ref="triggerRef"
            role="menuitem"
            aria-haspopup="true"
            :class="titleClass"
          >
            <span v-if="iconNodes.length" :class="`${prefixCls}-item-icon`">
              <component
                :is="node"
                v-for="(node, index) in iconNodes"
                :key="index"
              />
            </span>
            <span :class="`${prefixCls}-title-content`">
              <template v-if="titleNodes.length">
                <component
                  :is="node"
                  v-for="(node, index) in titleNodes"
                  :key="index"
                />
              </template>
            </span>
            <span v-if="expandIconNode" :class="`${prefixCls}-expand-icon`">
              <component :is="expandIconNode" />
            </span>
            <i v-else :class="`${subMenuPrefixCls}-arrow`" />
          </div>
        </template>
        <template #title>
          <ul
            ref="popupRef"
            :class="[
              {
                [`${prefixCls}`]: true,
                [`${prefixCls}-sub`]: true,
                [`${prefixCls}-vertical`]: true,
              },
            ]"
          >
            <slot />
          </ul>
        </template>
      </Tooltip>
    </template>
  </li>
</template>
