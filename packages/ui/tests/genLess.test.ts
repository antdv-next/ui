import { describe, expect, it } from 'vitest'
import { genCSSVar, genMapToken, parseStyle } from '../src'
import affixStyleFn from '../src/affix/style'
import colorPickerStyleFn from '../src/color-picker/style'
import derivative from '../src/theme/themes/default'
import seedToken from '../src/theme/themes/seed'

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
