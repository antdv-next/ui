import { describe, expect, it } from 'vitest'
import { genMapToken } from '../src'
import derivative from '../src/theme/themes/default'
import seedToken from '../src/theme/themes/seed'

describe('theme test', () => {
  it('default theme ', () => {
    const mapToken = genMapToken(seedToken, derivative)
    expect(mapToken.colorPrimary).toBe('#1677ff')
  })
})
