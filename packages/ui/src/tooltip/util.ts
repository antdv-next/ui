import type { Placement } from '@floating-ui/vue'
import type { CSSProperties } from 'vue'
import { isPresetColor } from '../_utils/colors'

export interface ColorInfo {
  className: string
  overlayStyle: CSSProperties
  arrowStyle: CSSProperties
}

export function parseColor(prefixCls: string, color?: string): ColorInfo {
  if (!color) {
    return {
      className: '',
      overlayStyle: {},
      arrowStyle: {},
    }
  }

  if (isPresetColor(color)) {
    return {
      className: `${prefixCls}-${color}`,
      overlayStyle: {},
      arrowStyle: {},
    }
  }

  // Custom color - 使用更完整的样式以确保圆角生效
  return {
    className: '',
    overlayStyle: {
      backgroundColor: color,
      // 显式指定圆角，使用多个值以确保兼容性
      borderRadius: 'var(--ant-border-radius, 6px)',
      // 确保其他重要的样式属性也被保留
      boxShadow: 'var(--ant-box-shadow-secondary)',
    },
    arrowStyle: {
      '--antd-arrow-background-color': color,
    },
  }
}

/**
 * Convert Ant Design placement to Floating UI placement
 */
export function convertPlacement(placement?: string): Placement {
  switch (placement) {
    case 'topLeft': return 'top-start'
    case 'topRight': return 'top-end'
    case 'bottomLeft': return 'bottom-start'
    case 'bottomRight': return 'bottom-end'
    case 'leftTop': return 'left-start'
    case 'leftBottom': return 'left-end'
    case 'rightTop': return 'right-start'
    case 'rightBottom': return 'right-end'
    case 'top':
    case 'bottom':
    case 'left':
    case 'right':
      return placement as Placement
    default:
      return 'top'
  }
}

/**
 * Get default placements configuration for tooltips
 */
export function getDefaultPlacements() {
  return {
    top: { offset: [0, 8] },
    topLeft: { offset: [0, 8] },
    topRight: { offset: [0, 8] },
    bottom: { offset: [0, 8] },
    bottomLeft: { offset: [0, 8] },
    bottomRight: { offset: [0, 8] },
    left: { offset: [8, 0] },
    leftTop: { offset: [8, 0] },
    leftBottom: { offset: [8, 0] },
    right: { offset: [8, 0] },
    rightTop: { offset: [8, 0] },
    rightBottom: { offset: [8, 0] },
  }
}

/**
 * Check if element can be focused
 */
export function isFocusable(element: HTMLElement): boolean {
  const focusableTags = ['INPUT', 'TEXTAREA', 'SELECT', 'BUTTON', 'A']

  if (focusableTags.includes(element.tagName)) {
    return true
  }

  if (element.tabIndex >= 0) {
    return true
  }

  return false
}

/**
 * Get the trigger element from a wrapper
 */
export function getTriggerElement(wrapper: Element): HTMLElement | null {
  // If it's a fragment or text node, get the next sibling
  if (wrapper.nodeType === Node.COMMENT_NODE) {
    return wrapper.nextElementSibling as HTMLElement
  }

  // If it's an element, return it directly
  if (wrapper.nodeType === Node.ELEMENT_NODE) {
    return wrapper as HTMLElement
  }

  return null
}
