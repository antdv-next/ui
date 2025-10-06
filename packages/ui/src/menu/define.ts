import type { VueNode } from '@v-c/util/dist/type'
import type { CSSProperties } from 'vue'

export type MenuMode = 'vertical' | 'horizontal' | 'inline'
export type MenuTheme = 'light' | 'dark'
export type TriggerSubMenuAction = 'click' | 'hover'

export type Key = string | number

export interface MenuInfo {
  key: Key
  keyPath: Key[]
  domEvent: Event
}

export interface MenuItemInfo extends MenuInfo {
  item: any
  selectedKeys: Key[]
}

export interface SubMenuInfo extends MenuInfo {
  openKeys: Key[]
}

export interface MenuItemProps {
  prefixCls?: string
  eventKey?: Key
  disabled?: boolean
  danger?: boolean
  icon?: VueNode | (() => VueNode)
  title?: string | VueNode | (() => VueNode)
  item?: Record<string, any>
  extra?: VueNode | (() => VueNode)
}

export interface SubMenuProps extends MenuItemProps {
  popupClassName?: string
  popupStyle?: CSSProperties
  popupOffset?: [number, number]
  theme?: MenuTheme
  triggerSubMenuAction?: TriggerSubMenuAction
  disabled?: boolean
  expandable?: boolean
  zIndex?: number
}

export interface MenuItemGroupProps {
  eventKey?: Key
  title?: VueNode
  prefixCls?: string
}

export interface MenuDividerProps {
  dashed?: boolean
  prefixCls?: string
}

export interface MenuItemType extends MenuItemProps {
  key?: Key
  label?: VueNode | (() => VueNode)
  children?: ItemType[]
  type?: 'item'
}

export interface SubMenuType extends Omit<SubMenuProps, 'children'> {
  key?: Key
  label?: VueNode | (() => VueNode)
  children: ItemType[]
  type: 'submenu'
}

export interface MenuItemGroupType extends MenuItemGroupProps {
  key?: Key
  label?: VueNode | (() => VueNode)
  children?: ItemType[]
  type: 'group'
}

export interface MenuDividerType extends MenuDividerProps {
  key?: Key
  type: 'divider'
}

export type ItemType = MenuItemType | SubMenuType | MenuItemGroupType | MenuDividerType | null

export interface MenuProps {
  prefixCls?: string
  rootClassName?: string
  theme?: MenuTheme
  mode?: MenuMode
  inlineIndent?: number
  inlineCollapsed?: boolean
  selectable?: boolean
  multiple?: boolean
  items?: ItemType[]
  expandIcon?: VueNode | ((info: { isOpen: boolean, disabled: boolean, level: number }) => VueNode)
  triggerSubMenuAction?: TriggerSubMenuAction
  subMenuOpenDelay?: number
  subMenuCloseDelay?: number
  selectedKeys?: Key[]
  defaultSelectedKeys?: Key[]
  openKeys?: Key[]
  defaultOpenKeys?: Key[]
  activeKey?: Key
  defaultActiveFirst?: boolean
  collapsedWidth?: number | string
  classNames?: {
    root?: string
  }
  styles?: {
    root?: CSSProperties
  }
}

export interface MenuEmits {
  'update:selectedKeys': [Key[]]
  'update:openKeys': [Key[]]
  select: [MenuItemInfo & { selectedKeys: Key[] }]
  deselect: [MenuItemInfo & { selectedKeys: Key[] }]
  click: [MenuItemInfo & { selectedKeys: Key[] }]
  openChange: [Key[]]
}

export interface MenuItemGroupSlots {
  title?: () => any
  default?: () => any
}

export interface MenuItemSlots {
  icon?: () => any
  default?: () => any
}

export interface SubMenuSlots extends MenuItemSlots {
  title?: () => any
}

export interface MenuSlots {
  default?: () => any
  items?: () => any
}
