<script setup lang="ts">
import type { StyleValue } from 'vue'
import type {
  ItemType,
  Key,
  MenuDividerType,
  MenuEmits,
  MenuItemGroupType,
  MenuItemType,
  MenuProps,
  SubMenuType,
} from './define.ts'
import { computed, h, nextTick, onBeforeUnmount, onMounted, reactive, ref, shallowRef, useAttrs, watch } from 'vue'
import { flattenChildren } from '../_utils/checker.ts'
import { classNames } from '../_utils/classNames.ts'
import { useZIndex } from '../_utils/hooks/useZIndex.ts'
import { useComponentConfig, useConfigContext } from '../config-provider/context.ts'
import { useDropdownContext } from '../dropdown/context.ts'
import { useLayoutSider } from '../layout/context.ts'
import {
  useProvideMenuContext,
  useProvideMenuDisabled,
  useProvideMenuLevel,
  useProvideMenuPath,
  useProvideParentMode,
} from './context.ts'
import MenuDivider from './menu-divider.vue'
import MenuItemGroup from './menu-item-group.vue'
import MenuItem from './menu-item.vue'
import { useMenuOverride, useProvideMenuOverride } from './override-context'
import SubMenu from './sub-menu.vue'

defineOptions({
  name: 'AMenu',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<MenuProps>(), {
  theme: 'light',
  mode: 'vertical',
  inlineIndent: 24,
  selectable: true,
  multiple: false,
  inlineCollapsed: undefined,
  triggerSubMenuAction: 'hover',
  subMenuOpenDelay: 0.1,
  subMenuCloseDelay: 0.1,
  defaultSelectedKeys: () => [],
  defaultOpenKeys: () => [],
  styles: () => ({}),
  classNames: () => ({}),
})

const emit = defineEmits<MenuEmits>()
const attrs = useAttrs()

const configCtx = useConfigContext()
const componentConfig = useComponentConfig('menu')

// Try to get dropdown context if Menu is inside a Dropdown
const dropdownCtx = useDropdownContext()

// Try to get override context from parent (e.g., Dropdown)
const overrideCtx = useMenuOverride()

const prefixCls = computed(() => {
  const customPrefixCls = props.prefixCls || overrideCtx.prefixCls.value
  return configCtx.getPrefixCls('menu', customPrefixCls)
})
const theme = computed(() => props.theme || 'light')
const mergedMode = computed(() => overrideCtx.mode.value || props.mode || 'vertical')
const inlineIndent = computed(() => props.inlineIndent ?? 24)
const selectable = computed(() => {
  if (overrideCtx.selectable.value !== undefined) {
    return overrideCtx.selectable.value
  }
  return props.selectable
})
const multiple = computed(() => props.multiple)
const triggerAction = computed(() => props.triggerSubMenuAction ?? 'hover')
const openDelay = computed(() => props.subMenuOpenDelay ?? 0)
const closeDelay = computed(() => props.subMenuCloseDelay ?? 0.1)
const [zIndex] = useZIndex('Menu')

const layoutSider = useLayoutSider()

const inlineCollapsed = computed(() => {
  if (mergedMode.value !== 'inline')
    return false
  if (props.inlineCollapsed !== undefined)
    return props.inlineCollapsed
  return layoutSider.siderCollapsed?.value ?? false
})

const displayMode = computed(() => {
  if (mergedMode.value === 'inline' && inlineCollapsed.value)
    return 'vertical'
  return mergedMode.value
})

const openSelectedKeySet = ref(new Set<Key>())
const selectedKeySet = ref(new Set<Key>(props.selectedKeys ?? props.defaultSelectedKeys ?? []))
const openKeySet = ref(new Set<Key>(props.openKeys ?? props.defaultOpenKeys ?? []))
const popoverSubmenuKeySet = new Set<Key>()
const popoverSubmenuElements = new Map<Key, { trigger: HTMLElement | null, popup: HTMLElement | null }>()
const keyPathMap = reactive(new Map<Key, Key[]>())
const collapsingKeySet = ref(new Set<Key>())

watch(
  () => props.selectedKeys,
  (keys) => {
    if (keys !== undefined) {
      selectedKeySet.value = new Set(keys)
    }
    updateOpenSelectedKeySet(selectedKeySet.value)
  },
  { deep: true },
)

watch(
  () => props.openKeys,
  (keys) => {
    if (keys !== undefined)
      openKeySet.value = new Set(keys)
  },
  { deep: true },
)

updateOpenSelectedKeySet(selectedKeySet.value)

const inlineStoredOpenKeys = shallowRef<Key[]>([])

watch(
  inlineCollapsed,
  (collapsed) => {
    if (mergedMode.value !== 'inline')
      return
    if (collapsed) {
      collapsingKeySet.value = new Set(openKeySet.value)
      inlineStoredOpenKeys.value = Array.from(openKeySet.value)
      if (props.openKeys === undefined)
        openKeySet.value = new Set()
      nextTick(() => {
        collapsingKeySet.value = new Set()
      })
    } else if (inlineStoredOpenKeys.value.length && props.openKeys === undefined) {
      openKeySet.value = new Set(inlineStoredOpenKeys.value)
      collapsingKeySet.value = new Set()
    }
  },
)

function updateOpenSelectedKeySet(source?: Set<Key>) {
  const currentSelected = source ?? selectedKeySet.value
  const merged = new Set<Key>()
  currentSelected.forEach((key) => {
    const path = keyPathMap.get(key)

    if (path && path.length) {
      path.forEach((pathKey) => {
        merged.add(pathKey)
      })
    } else if (key !== undefined && key !== null) {
      merged.add(key)
    }
  })

  openSelectedKeySet.value = merged
}

function registerPath(key: Key, path: Key[]) {
  keyPathMap.set(key, path)
  updateOpenSelectedKeySet()
}

function unregisterPath(key: Key) {
  if (!selectedKeySet.value.has(key))
    keyPathMap.delete(key)
  updateOpenSelectedKeySet()
}

function setPopoverSubmenu(key: Key, isPopover: boolean) {
  if (isPopover) {
    popoverSubmenuKeySet.add(key)
  }
  else {
    popoverSubmenuKeySet.delete(key)
    popoverSubmenuElements.delete(key)
  }
}

function setPopoverElements(key: Key, elements: { trigger: HTMLElement | null, popup: HTMLElement | null } | null) {
  if (!elements) {
    popoverSubmenuElements.delete(key)
    return
  }

  popoverSubmenuElements.set(key, elements)
}

function isElementHovered(element: HTMLElement | null | undefined) {
  if (!element)
    return false
  try {
    return element.matches(':hover')
  } catch {
    return false
  }
}

function isSubmenuHovered(key: Key) {
  const entry = popoverSubmenuElements.get(key)
  if (!entry)
    return false
  return isElementHovered(entry.trigger) || isElementHovered(entry.popup)
}

// Check if any submenu is hovered - used by Dropdown to prevent closing
function isAnySubmenuHovered(): boolean {
  if (popoverSubmenuElements.size === 0)
    return false

  for (const [key] of popoverSubmenuElements.entries()) {
    if (isSubmenuHovered(key))
      return true
  }

  return false
}

// Register hover check with dropdown context if inside a dropdown
if (dropdownCtx) {
  onMounted(() => {
    dropdownCtx.registerSubmenuHoverCheck(isAnySubmenuHovered)
  })

  onBeforeUnmount(() => {
    dropdownCtx.unregisterSubmenuHoverCheck()
  })
}

function toArray(set: Set<Key>) {
  return Array.from(set)
}

function triggerSelect(action: 'select' | 'deselect' | null, nextSelectedKeys: Set<Key>, info: { key: Key, keyPath: Key[], domEvent: Event, item: any }) {
  if (!action)
    return

  const selectedKeysArray = toArray(nextSelectedKeys)
  if (props.selectedKeys === undefined) {
    const updatedSet = new Set(nextSelectedKeys)
    selectedKeySet.value = updatedSet
    updateOpenSelectedKeySet(updatedSet)
  } else {
    updateOpenSelectedKeySet(selectedKeySet.value)
  }

  emit('update:selectedKeys', selectedKeysArray)

  const emitInfo = {
    key: info.key,
    keyPath: info.keyPath,
    domEvent: info.domEvent,
    item: info.item,
    selectedKeys: selectedKeysArray,
  }

  if (action === 'select') {
    emit('select', emitInfo)
  } else if (action === 'deselect') {
    emit('deselect', emitInfo)
  }
}

function closePopoverSubmenus(keyPath: Key[], force = false) {
  if (!keyPath || keyPath.length <= 1)
    return

  const ancestorKeys = [...keyPath]
  const nextOpen = new Set(openKeySet.value)
  const keysToClose: Key[] = []
  let changed = false

  for (let i = ancestorKeys.length - 1; i >= 0; i -= 1) {
    const key = ancestorKeys[i]
    if (!popoverSubmenuKeySet.has(key) || !nextOpen.has(key))
      continue
    if (!force && isSubmenuHovered(key))
      break
    nextOpen.delete(key)
    keysToClose.push(key)
    changed = true
  }

  if (!changed)
    return

  if (mergedMode.value === 'inline' && inlineCollapsed.value && inlineStoredOpenKeys.value.length) {
    const keysToCloseSet = new Set(keysToClose)
    inlineStoredOpenKeys.value = inlineStoredOpenKeys.value.filter(key => !keysToCloseSet.has(key))
  }

  if (props.openKeys === undefined)
    openKeySet.value = nextOpen

  const openKeysArray = toArray(nextOpen)
  emit('update:openKeys', openKeysArray)
  emit('openChange', openKeysArray)
}

function handleItemClick(info: { key: Key, keyPath: Key[], domEvent: Event, isSelected: boolean, item: any }) {
  const currentSelected = new Set(selectedKeySet.value)
  let nextSelected = new Set(currentSelected)
  let action: 'select' | 'deselect' | null = null

  if (selectable.value) {
    if (multiple.value) {
      if (nextSelected.has(info.key)) {
        nextSelected.delete(info.key)
        action = 'deselect'
      } else {
        nextSelected.add(info.key)
        action = 'select'
      }
    } else {
      if (!nextSelected.has(info.key)) {
        nextSelected = new Set<Key>([info.key])
        action = 'select'
      }
    }
  }

  triggerSelect(action, nextSelected, info)
  closePopoverSubmenus(info.keyPath, true)

  const finalSelectedKeys = toArray(nextSelected)
  const clickInfo = {
    key: info.key,
    keyPath: info.keyPath,
    domEvent: info.domEvent,
    item: info.item,
    selectedKeys: finalSelectedKeys,
  }

  emit('click', clickInfo)

  // Call override onClick if available
  if (overrideCtx.onClick) {
    overrideCtx.onClick()
  }
}

function handleSubMenuToggle({ key, open }: { key: Key, keyPath: Key[], open: boolean, event: Event | null }) {
  const nextOpen = new Set(openKeySet.value)
  if (open && nextOpen.has(key)) {
    return
  }
  if (!open && !nextOpen.has(key)) {
    return
  }
  if (open)
    nextOpen.add(key)
  else
    nextOpen.delete(key)

  if (props.openKeys === undefined)
    openKeySet.value = new Set(nextOpen)

  const openKeysArray = toArray(nextOpen)
  emit('update:openKeys', openKeysArray)
  emit('openChange', openKeysArray)
}

const selectedKeysRef = computed(() => selectedKeySet.value)
const openKeysRef = computed(() => openKeySet.value)
const openSelectedKeysRef = computed(() => openSelectedKeySet.value)
const collapsingKeysRef = computed(() => collapsingKeySet.value)

useProvideMenuContext({
  prefixCls,
  mode: mergedMode,
  theme,
  inlineIndent,
  inlineCollapsed,
  selectable,
  multiple,
  triggerSubMenuAction: triggerAction,
  expandIcon: computed(() => {
    // Priority: props.expandIcon > overrideCtx.expandIcon > null
    if (props.expandIcon !== undefined && props.expandIcon !== null) {
      return props.expandIcon
    }
    const overrideExpandIcon = overrideCtx.expandIcon.value
    if (overrideExpandIcon !== undefined && overrideExpandIcon !== null) {
      return overrideExpandIcon
    }
    return null
  }),
  openDelay,
  closeDelay,
  openKeys: openKeysRef,
  selectedKeys: selectedKeysRef,
  openSelectedKeySet: openSelectedKeysRef,
  collapsingKeys: collapsingKeysRef,
  level: computed(() => 1),
  parentPath: computed(() => []),
  onMenuItemClick: handleItemClick,
  onSubMenuToggle: handleSubMenuToggle,
  registerPath,
  unregisterPath,
  getKeyPath: key => keyPathMap.get(key),
  setPopoverSubmenu,
  closePopoverSubmenus,
  setPopoverElements,
})

// Clear override context for nested menus to prevent cascading
useProvideMenuOverride()

useProvideMenuLevel(ref(1))
useProvideMenuPath(ref<Key[]>([]))
useProvideMenuDisabled(ref(false))
useProvideParentMode(displayMode)

function convertNode(node: any) {
  return node
}

function renderLabel(label?: any) {
  if (label === undefined)
    return []
  if (typeof label === 'function')
    return flattenChildren(label())
  return flattenChildren(label)
}

let itemUid = 0
function getItemKey(key: Key | undefined, fallbackPrefix: string) {
  if (key === undefined || key === null) {
    itemUid += 1
    return `${fallbackPrefix}-${itemUid}`
  }
  return key
}

function renderItems(items?: ItemType[] | null): any[] {
  if (!items || !items.length)
    return []
  return items
    .map((item) => {
      if (!item)
        return null

      if ((item as MenuDividerType).type === 'divider') {
        const divider = item as MenuDividerType
        const key = getItemKey(divider.key, 'divider')
        return h(MenuDivider, { dashed: divider.dashed, key })
      }

      if ((item as MenuItemGroupType).type === 'group') {
        const group = item as MenuItemGroupType
        const key = getItemKey(group.key, 'group')
        return h(
          MenuItemGroup,
          { key, title: group.title },
          {
            default: () => renderItems(group.children),
            title: group.label ? () => renderLabel(group.label).map(convertNode).filter(Boolean) : undefined,
          },
        )
      }

      const menuItem = item as MenuItemType | SubMenuType
      const hasChildren = Array.isArray((menuItem as SubMenuType).children) && (menuItem as SubMenuType).children.length > 0
      const key = getItemKey(menuItem.key, hasChildren ? 'submenu' : 'item')

      if (hasChildren || menuItem.type === 'submenu') {
        return h(
          SubMenu,
          {
            key,
            eventKey: key,
            icon: menuItem.icon,
            disabled: menuItem.disabled,
            popupClassName: (menuItem as SubMenuType).popupClassName,
            popupStyle: (menuItem as SubMenuType).popupStyle,
            triggerSubMenuAction: (menuItem as SubMenuType).triggerSubMenuAction,
            title: typeof menuItem.label === 'string' ? menuItem.label : undefined,
            theme: (menuItem as SubMenuType).theme,
            zIndex: zIndex.value,
          },
          {
            title: menuItem.label
              ? () => renderLabel(menuItem.label).map(convertNode).filter(Boolean)
              : undefined,
            default: () => renderItems((menuItem as SubMenuType).children),
          },
        )
      }

      return h(
        MenuItem,
        {
          key,
          eventKey: key,
          disabled: menuItem.disabled,
          danger: menuItem.danger,
          icon: menuItem.icon,
          title: typeof menuItem.label === 'string' ? menuItem.label : menuItem.title,
          extra: menuItem.extra,
          item: menuItem,
        },
        {
          default: menuItem.label
            ? () => renderLabel(menuItem.label).map(convertNode).filter(Boolean)
            : undefined,
        },
      )
    })
    .filter(Boolean) as any[]
}

const itemsNodes = computed(() => renderItems(props.items))
const hasItems = computed(() => Array.isArray(props.items) && props.items.length > 0)

const rootClassName = computed(() => classNames(
  prefixCls.value,
  `${prefixCls.value}-root`,
  `${prefixCls.value}-${theme.value}`,
  `${prefixCls.value}-${displayMode.value}`,
  {
    [`${prefixCls.value}-inline-collapsed`]: inlineCollapsed.value,
  },
  componentConfig.value?.className,
  componentConfig.value?.classNames?.root,
  props.rootClassName,
  props.classNames?.root,
  overrideCtx.rootClassName.value,
))

const mergedStyle = computed<StyleValue | undefined>(() => {
  const styles: StyleValue[] = []
  const contextStyle = componentConfig.value?.style as StyleValue | undefined
  if (contextStyle)
    styles.push(contextStyle)
  const configStyle = componentConfig.value?.styles?.root as StyleValue | undefined
  if (configStyle)
    styles.push(configStyle)
  if (props.styles?.root)
    styles.push(props.styles.root)
  if (styles.length === 0)
    return undefined
  if (styles.length === 1)
    return styles[0]
  return Object.assign({}, ...styles)
})

const restAttrs = computed(() => {
  const { class: _class, style: _style, ...rest } = attrs
  return rest
})
</script>

<template>
  <ul
    v-bind="restAttrs"
    :class="[rootClassName, $attrs.class] as any[]"
    :style="[mergedStyle, $attrs.style] as any[]"
    role="menu"
  >
    <template v-if="hasItems">
      <component
        :is="node"
        v-for="(node, index) in itemsNodes"
        :key="node?.key ?? index"
      />
    </template>
    <template v-else>
      <slot />
    </template>
  </ul>
</template>
