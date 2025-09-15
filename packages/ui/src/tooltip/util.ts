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

  // Custom color
  return {
    className: '',
    overlayStyle: {
      backgroundColor: color,
    },
    arrowStyle: {
      '--antd-arrow-background-color': color,
    },
  }
}

/**
 * Convert Ant Design placement to Floating UI placement
 */
export function convertPlacement(placement?: string) {
  switch (placement) {
    case 'topLeft': return 'top-start'
    case 'topRight': return 'top-end'
    case 'bottomLeft': return 'bottom-start'
    case 'bottomRight': return 'bottom-end'
    case 'leftTop': return 'left-start'
    case 'leftBottom': return 'left-end'
    case 'rightTop': return 'right-start'
    case 'rightBottom': return 'right-end'
    default: return placement || 'top'
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
