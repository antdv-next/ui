import type { PresetColorKey } from '../interface/base.ts'
import { generate } from '@ant-design/colors'

export function genCssVar(color: PresetColorKey, theme: 'default' | 'dark' = 'default') {
  const colors = generate(color, {
    theme,
  })

  const cssVar: Record<string, string> = {}
  colors.forEach((color, index) => {
    cssVar[`--color-primary-${index + 1}`] = color
  })
  cssVar['--color-primary'] = colors[6] // Default to the 6th color as primary
  return {
    style: cssVar,
  }
}
