export interface WatermarkFontType {
  color?: string
  fontSize?: number | string
  fontWeight?: 'normal' | 'light' | 'weight' | number
  fontStyle?: 'none' | 'normal' | 'italic' | 'oblique'
  fontFamily?: string
}

export interface WatermarkProps {
  prefixCls?: string
  zIndex: number
  rotate: number
  width: number
  height: number
  image: string
  content: string | string[]
  font: WatermarkFontType
  rootClassName: string
  gap: number[]
  offset: number[]
}

export const BaseSize = 2
export const FontGap = 3
