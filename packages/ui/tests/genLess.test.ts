import { describe, expect, it } from 'vitest'
import affixStyleFn from '../src-old/affix/style'
import colorPickerStyleFn from '../src-old/color-picker/style'
import { genCSSVar, genMapToken } from '../src-old/theme/cssvar/genCssvar.ts'
import { parseStyle } from '../src-old/theme/cssvar/parseStyle.ts'
import derivative from '../src-old/theme/themes/default'
import seedToken from '../src-old/theme/themes/seed'

describe('genLess', () => {
  const mapToken = genMapToken(seedToken, derivative)
  const mapTokenCssVar = genCSSVar<any>(mapToken, 'ant')
  it('all css-var', () => {
    const { cssVars } = genCSSVar<any>(mapToken, 'ant')
    const styles = {
      ':root': cssVars,
    }
    expect(cssVars).toBeTruthy()
    const code = parseStyle(styles)
    expect(code).toContain('--ant-blue: #1677FF;')
  })
  it('affix', () => {
    const styleFn = affixStyleFn
    const { cssVar, styles, code } = styleFn(mapToken, mapTokenCssVar.cssToken)
    expect(cssVar).toBeTruthy()
    expect(styles).toBeTruthy()
    expect(code).toContain('--ant-affix-z-index-popup: 10;')
  })
  it('color-picker', () => {
    const styleFn = colorPickerStyleFn
    const { cssVar, styles, code } = styleFn(mapToken, mapTokenCssVar.cssToken)
    expect(cssVar).toBeTruthy()
    expect(styles).toBeTruthy()
    expect(code).toMatchSnapshot()
  })
})
