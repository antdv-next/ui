import { describe, it } from 'vitest'
import { genCssvar } from '../src'
import affixStyleFn from '../src/affix/style'
import derivative from '../src/theme/themes/default'
import seedToken from '../src/theme/themes/seed.ts'

describe('genLess', () => {
  it('affix', () => {
    const { mapToken } = genCssvar(seedToken, derivative)

    const styleFn = affixStyleFn
    const res = styleFn(mapToken)
    console.log(res)
  })
})
