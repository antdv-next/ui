import type { CSSProperties } from 'vue'

export const TRIGGER_EVENTS: (keyof WindowEventMap)[] = [
  'resize',
  'scroll',
  'touchstart',
  'touchmove',
  'touchend',
  'pageshow',
  'load',
]

export function getDefaultTarget() {
  return typeof window !== 'undefined' ? window : null
}

// Affix
export interface AffixProps {
  /** Triggered when the specified offset is reached from the top of the window */
  offsetTop?: number
  /** Triggered when the specified offset is reached from the bottom of the window */
  offsetBottom?: number
  style?: CSSProperties
  /** Callback function triggered when fixed state changes */
  onChange?: (affixed?: boolean) => void
  /** Set the element that Affix needs to listen to its scroll event, the value is a function that returns the corresponding DOM element */
  target?: () => Window | HTMLElement | null
  prefixCls?: string
  // className?: string
  rootClassName?: string
}
