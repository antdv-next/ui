import type { AlignType } from '../tooltip/define'

export interface PopupOverflow {
  adjustX?: boolean
  adjustY?: boolean
  shiftX?: boolean
  shiftY?: boolean
}

export function getBuiltInPlacements(_popupOverflow?: PopupOverflow): Record<string, AlignType> {
  const htmlRegion: AlignType['htmlRegion'] = 'visible'

  const sharedConfig: AlignType = {
    overflow: {
      adjustX: true,
      adjustY: true,
      shiftY: true,
    },
    htmlRegion,
    dynamicInset: true,
  }

  return {
    bottomLeft: {
      ...sharedConfig,
      points: ['tl', 'bl'],
      offset: [0, 4],
    },
    bottomRight: {
      ...sharedConfig,
      points: ['tr', 'br'],
      offset: [0, 4],
    },
    topLeft: {
      ...sharedConfig,
      points: ['bl', 'tl'],
      offset: [0, -4],
    },
    topRight: {
      ...sharedConfig,
      points: ['br', 'tr'],
      offset: [0, -4],
    },
  }
}

export function mergedBuiltinPlacements(
  builtinPlacements?: Record<string, AlignType>,
  _popupOverflow?: PopupOverflow,
): Record<string, AlignType> {
  return builtinPlacements || getBuiltInPlacements(_popupOverflow)
}
