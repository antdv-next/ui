// Style as inline component
import type { CSSObject } from '@ant-design/cssinjs'

import type { GenerateStyle } from '../../theme/internal'
import type { ButtonToken } from './token'

export const genButtonCompactStyle: GenerateStyle<ButtonToken> = (token) => {
  const { componentCls, colorPrimaryHover, lineWidth, calc } = token
  const insetOffset = calc(lineWidth).mul(-1).equal()
  const getCompactBorderStyle = (vertical?: boolean) => {
    const selector = `${componentCls}-compact${vertical ? '-vertical' : ''}-item${componentCls}-primary:not([disabled])`
    return {
      [`${selector} + ${selector}::before`]: {
        position: 'absolute',
        top: vertical ? insetOffset : 0,
        insetInlineStart: vertical ? 0 : insetOffset,
        backgroundColor: colorPrimaryHover,
        content: '""',
        width: vertical ? '100%' : lineWidth,
        height: vertical ? lineWidth : '100%',
      } as CSSObject,
    }
  }
  // Special styles for Primary Button
  return {
    ...getCompactBorderStyle(),
    ...getCompactBorderStyle(true),
  }
}
