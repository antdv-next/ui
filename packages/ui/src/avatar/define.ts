import type { CSSProperties, InjectionKey, VNode } from 'vue'
import type { ScreenSizeMap } from '../_utils/responsiveObserve.ts'
import { inject, provide } from 'vue'

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

export interface AvatarContextType {
  size?: AvatarSize
  shape?: 'circle' | 'square'
}
const AvatarContextKey: InjectionKey<AvatarContextType> = Symbol('AvatarContextKey')

export function useAvatarInjectContext() {
  return inject(AvatarContextKey, {})
}
export function useAvatarProviderContext(context: AvatarContextType) {
  return provide(AvatarContextKey, context)
}

export interface AvatarGroupProps {
  prefixCls: string
  maxCount: number
  size?: AvatarSize
  maxStyle?: CSSProperties
  maxPopoverPlacement?: 'top' | 'bottom'
  maxPopoverTrigger?: 'hover' | 'click' | 'focus'
  shape?: 'circle' | 'square'
}
