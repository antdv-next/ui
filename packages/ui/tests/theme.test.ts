import { describe, expect, it } from 'vitest'
import { genCssvar } from '../src'
import derivative from '../src/theme/themes/default'
import seedToken from '../src/theme/themes/seed'

describe('theme test', () => {
  it('default theme ', () => {
    const { cssVar, cssToken } = genCssvar(seedToken, derivative)
    expect(cssVar['--ant-color-primary']).toBe('#1677ff')
    expect(cssToken.colorPrimary).toBe('var(--ant-color-primary)')
  })
})
