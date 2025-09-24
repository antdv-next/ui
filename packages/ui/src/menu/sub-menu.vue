<script setup lang="ts">
import type { Key, SubMenuProps, SubMenuSlots } from './define.ts'
import { computed, h, isVNode, onMounted, onUnmounted, shallowRef, useSlots } from 'vue'
import { flattenChildren } from '../_utils/checker.ts'
import { classNames } from '../_utils/classNames.ts'
import Tooltip from '../tooltip/tooltip.vue'
import {
  useMenuContext,
  useMenuDisabled,
  useMenuLevel,
  useMenuPath,
  useProvideMenuDisabled,
  useProvideMenuLevel,
  useProvideMenuPath,
  useProvideParentMode,
} from './context.ts'

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

const prefixCls = computed(() => menuContext.prefixCls?.value ?? 'ant-menu')
const subMenuPrefixCls = computed(() => `${prefixCls.value}-submenu`)
const mode = computed(() => menuContext.mode?.value ?? 'vertical')
const inlineCollapsed = computed(() => menuContext.inlineCollapsed?.value ?? false)
const inlineIndentValue = computed(() => menuContext.inlineIndent?.value ?? 24)
const selectedKeySet = computed(() => menuContext.selectedKeys?.value ?? new Set<Key>())
const openKeySet = computed(() => menuContext.openKeys?.value ?? new Set<Key>())
const openDelay = computed(() => menuContext.openDelay?.value ?? 0.1)
const closeDelay = computed(() => menuContext.closeDelay?.value ?? 0.1)

const eventKey = computed(() => props.eventKey ?? localKey.value)
const keyPath = computed<Key[]>(() => [eventKey.value, ...parentPathValue.value])

const mergedTriggerAction = computed(() => props.triggerSubMenuAction ?? menuContext.triggerSubMenuAction?.value ?? 'hover')
const isDisabled = computed(() => parentDisabled.value || props.disabled)

const isInlineMode = computed(() => {
  return mode.value === 'inline' || mode.value === 'vertical'
})

const shouldUsePopover = computed(() => {
  if (!props.expandable)
    return false
  if (isDisabled.value)
    return false
  if (mode.value === 'horizontal')
    return true
  if (inlineCollapsed.value && levelRef.value === 1)
    return true
  return false
})

const isOpen = computed(() => {
  return openKeySet.value.has(eventKey.value)
})
const submenuClass = computed(() => classNames(
  {
    [`${prefixCls.value}-item`]: shouldUsePopover.value,
  },
  subMenuPrefixCls.value,
  {
    [`${subMenuPrefixCls.value}-horizontal`]: mode.value === 'horizontal',
    [`${subMenuPrefixCls.value}-inline`]: isInlineMode.value,
    [`${subMenuPrefixCls.value}-open`]: isOpen.value,
    // [`${subMenuPrefixCls.value}-active`]: isOpen.value,
    [`${subMenuPrefixCls.value}-disabled`]: isDisabled.value,
    [`${subMenuPrefixCls.value}-selected`]: isOpen.value || menuContext.selectedKeys.value.has(eventKey.value),
  },
))

const titlePadding = computed(() => {
  if (isInlineMode.value) {
    const indent = inlineIndentValue.value * (levelRef.value - 1)
    return {
      padddingLeft: `${Math.max(indent, 0)}px`,
    }
  }
  return undefined
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
}

onMounted(() => {
  menuContext.registerPath?.(eventKey.value, keyPath.value)
})

onUnmounted(() => {
  menuContext.unregisterPath?.(eventKey.value)
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
useProvideParentMode(computed(() => (isInlineMode.value ? 'inline' : 'vertical')))

const titleClass = computed(() => `${subMenuPrefixCls.value}-title`)
const popupPlacement = computed(() => {
  if (mode.value === 'horizontal' && levelRef.value === 1)
    return 'bottom'
  return 'rightTop'
})
const popupMotion = computed(() => {
  return mode.value === 'horizontal' ? 'ant-slide-up' : 'ant-zoom-big'
})

function onInlineBeforeEnter(el: Element) {
  const _el = el as HTMLElement
  _el.style.height = '0px'
  _el.style.opacity = '0'
}

function onInlineEnter(el: Element) {
  const height = el.scrollHeight
  const _el = el as HTMLElement
  _el.style.height = `${height}px`
  _el.style.opacity = '1'
}

function onInlineAfterEnter(el: Element) {
  const _el = el as HTMLElement
  _el.style.height = ''
  _el.style.opacity = ''
}

function onInlineBeforeLeave(el: Element) {
  const _el = el as HTMLElement
  _el.style.height = `${el.scrollHeight}px`
  _el.style.opacity = '1'
}

function onInlineLeave(el: Element) {
  const _el = el as HTMLElement
  _el.style.height = '0px'
  _el.style.opacity = '0'
}

function onInlineAfterLeave(el: Element) {
  const _el = el as HTMLElement
  _el.style.height = ''
  _el.style.opacity = ''
}
const transitionCls = 'ant-motion-collapse'
</script>

<template>
  <li
    :class="submenuClass"
    role="none"
    :aria-disabled="isDisabled"
    :aria-expanded="isOpen"
  >
    <template v-if="!shouldUsePopover">
      <div
        role="menuitem"
        aria-haspopup="true"
        :class="titleClass"
        :style="titlePadding"
        @click="handleTitleClick"
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
        <span v-if="expandIconNode" :class="`${subMenuPrefixCls}-expand-icon`">
          <component :is="expandIconNode" />
        </span>
        <i v-else :class="`${subMenuPrefixCls}-arrow`" />
      </div>
    </template>
    <template v-if="!shouldUsePopover && isInlineMode">
      <Transition
        :enter-to-class="transitionCls"
        :enter-from-class="transitionCls"
        :enter-active-class="transitionCls"
        :leave-active-class="transitionCls"
        :leave-from-class="transitionCls"
        :leave-to-class="transitionCls"
        @after-appear="onInlineAfterEnter"
        @appear="onInlineEnter"
        @before-enter="onInlineBeforeEnter"
        @enter="onInlineEnter"
        @after-enter="onInlineAfterEnter"
        @before-leave="onInlineBeforeLeave"
        @leave="onInlineLeave"
        @after-leave="onInlineAfterLeave"
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
        :trigger="mergedTriggerAction"
        :open="isOpen"
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
            :class="titleClass"
            :style="titlePadding"
            @click="handleTitleClick"
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
          </div>
        </template>
        <template #title>
          <ul
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
