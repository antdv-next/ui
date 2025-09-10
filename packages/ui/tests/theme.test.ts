import { describe, expect, it } from 'vitest'
import { genMapToken } from '../src-old/theme/cssvar/genCssvar.ts'
import derivative from '../src-old/theme/themes/default'
import seedToken from '../src-old/theme/themes/seed'

describe('theme test', () => {
  it('default theme ', () => {
    const mapToken = genMapToken(seedToken, derivative)
    expect(mapToken.colorPrimary).toBe('#1677ff')
  })
})
