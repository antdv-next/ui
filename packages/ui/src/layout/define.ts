import type { CSSProperties } from 'vue'
import type { VueNode } from '@v-c/util/dist/type'

export type LayoutTagType = 'header' | 'footer' | 'main' | 'div'

export interface LayoutBasicProps {
  prefixCls?: string
  className?: string
  rootClassName?: string
  suffixCls?: string
  tagName?: LayoutTagType
  style?: CSSProperties
}

export interface LayoutProps extends LayoutBasicProps {
  hasSider?: boolean
}

export type CollapseType = 'clickTrigger' | 'responsive'

export type LayoutSiderTheme = 'light' | 'dark'

export interface LayoutSiderProps extends LayoutBasicProps {
  collapsible?: boolean
  collapsed?: boolean
  defaultCollapsed?: boolean
  reverseArrow?: boolean
  trigger?: VueNode
  width?: number | string
  collapsedWidth?: number | string
  zeroWidthTriggerStyle?: CSSProperties
  breakpoint?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl'
  theme?: LayoutSiderTheme
}

export interface LayoutSiderEmits {
  collapse: [boolean, CollapseType]
  breakpoint: [boolean]
  'update:collapsed': [boolean]
}

export interface LayoutContextProps {
  siderHook: {
    addSider: (id: string) => void
    removeSider: (id: string) => void
  }
}

export interface LayoutSiderExpose {
  collapsed?: boolean
}

export const dimensionMaxMap = {
  xs: '479.98px',
  sm: '575.98px',
  md: '767.98px',
  lg: '991.98px',
  xl: '1199.98px',
  xxl: '1599.98px',
} as const

export type Breakpoint = keyof typeof dimensionMaxMap
