import type { Key, VueNode } from '@v-c/util/dist/type'
import type { Ref } from 'vue'
import type { AffixProps } from '../affix'

export type AnchorDirection = 'vertical' | 'horizontal'
export type AnchorContainer = HTMLElement | Window
export interface AnchorLinkBaseProps {
  prefixCls?: string
  href: string
  target?: string
  title: VueNode | (() => VueNode)
  className?: string
  replace?: boolean
}
export interface AnchorLinkItemProps extends AnchorLinkBaseProps {
  key: Key
  children?: AnchorLinkItemProps[]
}

export interface AnchorProps {
  prefixCls?: string
  rootClassName?: string
  offsetTop?: number
  bounds?: number
  affix?: boolean | Omit<AffixProps, 'offsetTop' | 'target' | 'children'>
  showInkInFixed?: boolean
  getContainer?: () => AnchorContainer
  /** Return customize highlight anchor */
  getCurrentAnchor?: (activeLink: string) => string
  onClick?: (
    e: MouseEvent,
    link: { title: VueNode | (() => VueNode), href: string },
  ) => void
  /** Scroll to target offset value, if none, it's offsetTop prop value or 0. */
  targetOffset?: number
  /** Listening event when scrolling change active link */
  onChange?: (currentActiveLink: string) => void
  items?: AnchorLinkItemProps[]
  direction?: AnchorDirection
  replace?: boolean
}

export interface AntAnchor {
  registerLink: (link: string) => void
  unregisterLink: (link: string) => void
  activeLink: Ref<string | null>
  scrollTo: (link: string) => void
  onClick?: (
    e: MouseEvent,
    link: { title: VueNode | (() => VueNode), href: string },
  ) => void
  direction: Ref<AnchorDirection>
}
