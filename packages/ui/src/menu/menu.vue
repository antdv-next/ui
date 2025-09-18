<script setup lang="ts">
import type { CSSProperties, StyleValue } from 'vue'
import type {
  ItemType,
  Key,
  MenuDividerType,
  MenuEmits,
  MenuItemGroupType,
  MenuItemType,
  MenuProps,
  MenuSlots,
  SubMenuType,
} from './define.ts'
import { computed, h, isVNode, reactive, ref, shallowRef, useAttrs, useSlots, watch } from 'vue'
import { flattenChildren } from '../_utils/checker.ts'
import { classNames } from '../_utils/classNames.ts'
import { useComponentConfig, useConfigContext } from '../config-provider/context.ts'
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
  triggerSubMenuAction: 'hover',
  subMenuOpenDelay: 0.1,
  subMenuCloseDelay: 0.1,
  defaultSelectedKeys: () => [],
  defaultOpenKeys: () => [],
  styles: () => ({}),
  classNames: () => ({}),
})

const emit = defineEmits<MenuEmits>()
const slots = useSlots() as MenuSlots
const attrs = useAttrs()

const configCtx = useConfigContext()
const componentConfig = useComponentConfig('menu')

const prefixCls = computed(() => configCtx.getPrefixCls('menu', props.prefixCls))
const theme = computed(() => props.theme || 'light')
const mergedMode = computed(() => props.mode || 'vertical')
const inlineIndent = computed(() => props.inlineIndent ?? 24)
const selectable = computed(() => props.selectable !== false)
const multiple = computed(() => props.multiple === true)
const triggerAction = computed(() => props.triggerSubMenuAction ?? 'hover')
const openDelay = computed(() => props.subMenuOpenDelay ?? 0)
const closeDelay = computed(() => props.subMenuCloseDelay ?? 0.1)

const inlineCollapsed = computed(() => {
  if (mergedMode.value !== 'inline')
    return false
  return !!props.inlineCollapsed
})

const selectedKeySet = ref(new Set<Key>(props.selectedKeys ?? props.defaultSelectedKeys ?? []))
const openKeySet = ref(new Set<Key>(props.openKeys ?? props.defaultOpenKeys ?? []))

watch(
  () => props.selectedKeys,
  (keys) => {
    if (keys !== undefined)
      selectedKeySet.value = new Set(keys)
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

const inlineStoredOpenKeys = shallowRef<Key[]>([])

watch(
  inlineCollapsed,
  (collapsed) => {
    if (mergedMode.value !== 'inline')
      return
    if (collapsed) {
      inlineStoredOpenKeys.value = Array.from(openKeySet.value)
      if (props.openKeys === undefined)
        openKeySet.value = new Set()
    } else if (inlineStoredOpenKeys.value.length && props.openKeys === undefined) {
      openKeySet.value = new Set(inlineStoredOpenKeys.value)
    }
  },
)

const keyPathMap = reactive(new Map<Key, Key[]>())

function registerPath(key: Key, path: Key[]) {
  keyPathMap.set(key, path)
}

function unregisterPath(key: Key) {
  keyPathMap.delete(key)
}

function toArray(set: Set<Key>) {
  return Array.from(set)
}

function triggerSelect(action: 'select' | 'deselect' | null, nextSelectedKeys: Set<Key>, info: { key: Key, keyPath: Key[], domEvent: Event, item: any }) {
  if (!action)
    return

  const selectedKeysArray = toArray(nextSelectedKeys)
  if (props.selectedKeys === undefined)
    selectedKeySet.value = new Set(nextSelectedKeys)

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
    props.onSelect?.(emitInfo)
  } else if (action === 'deselect') {
    emit('deselect', emitInfo)
    props.onDeselect?.(emitInfo)
  }
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

  const finalSelectedKeys = toArray(nextSelected)
  const clickInfo = {
    key: info.key,
    keyPath: info.keyPath,
    domEvent: info.domEvent,
    item: info.item,
    selectedKeys: finalSelectedKeys,
  }

  emit('click', clickInfo)
  props.onClick?.(clickInfo)
}

function handleSubMenuToggle({ key, open }: { key: Key, keyPath: Key[], open: boolean, event: Event | null }) {
  const nextOpen = new Set(openKeySet.value)
  if (open)
    nextOpen.add(key)
  else
    nextOpen.delete(key)

  if (props.openKeys === undefined)
    openKeySet.value = new Set(nextOpen)

  const openKeysArray = toArray(nextOpen)
  emit('update:openKeys', openKeysArray)
  emit('openChange', openKeysArray)
  props.onOpenChange?.(openKeysArray)
}

const selectedKeysRef = computed(() => selectedKeySet.value)
const openKeysRef = computed(() => openKeySet.value)

useProvideMenuContext({
  prefixCls,
  mode: mergedMode,
  theme,
  inlineIndent,
  inlineCollapsed,
  selectable,
  multiple,
  triggerSubMenuAction: triggerAction,
  expandIcon: computed(() => props.expandIcon ?? null),
  openDelay,
  closeDelay,
  openKeys: openKeysRef,
  selectedKeys: selectedKeysRef,
  level: computed(() => 1),
  parentPath: computed(() => []),
  onMenuItemClick: handleItemClick,
  onSubMenuToggle: handleSubMenuToggle,
  registerPath,
  unregisterPath,
  getKeyPath: key => keyPathMap.get(key),
})

useProvideMenuLevel(ref(1))
useProvideMenuPath(ref<Key[]>([]))
useProvideMenuDisabled(ref(false))
useProvideParentMode(mergedMode)

function convertNode(node: any) {
  if (isVNode(node))
    return node
  if (typeof node === 'string' || typeof node === 'number')
    return h('span', node)
  return null
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
    .map((item, index) => {
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

const attrClass = computed(() => (attrs.class as string | undefined))
const attrStyle = computed(() => attrs.style as CSSProperties | undefined)

const rootClassName = computed(() => classNames(
  prefixCls.value,
  `${prefixCls.value}-${theme.value}`,
  `${prefixCls.value}-${mergedMode.value}`,
  {
    [`${prefixCls.value}-inline-collapsed`]: inlineCollapsed.value,
  },
  componentConfig.value?.className,
  componentConfig.value?.classNames?.root,
  props.rootClassName,
  props.classNames?.root,
  attrClass.value,
))

const mergedStyle = computed<StyleValue | undefined>(() => {
  const styles: StyleValue[] = []
  const contextStyle = componentConfig.value?.style as StyleValue | undefined
  if (contextStyle)
    styles.push(contextStyle)
  const configStyle = componentConfig.value?.styles?.root as StyleValue | undefined
  if (configStyle)
    styles.push(configStyle)
  if (props.style)
    styles.push(props.style)
  if (props.styles?.root)
    styles.push(props.styles.root)
  if (attrStyle.value)
    styles.push(attrStyle.value)
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
    :class="rootClassName"
    :style="mergedStyle"
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
