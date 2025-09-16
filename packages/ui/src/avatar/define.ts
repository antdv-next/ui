import type { VNode } from 'vue'
import type { ScreenSizeMap } from '../_utils/responsiveObserve'

export type AvatarSize = 'large' | 'small' | 'default' | number | ScreenSizeMap

export interface AvatarProps {
  prefixCls: string
  shape?: 'circle' | 'square'
  size: AvatarSize
  src: string

  /** Srcset of image avatar */
  srcset: string

  icon: VNode

  alt: string
  gap: number
  draggable?: boolean
  crossOrigin: string
  loadError: () => boolean
}
