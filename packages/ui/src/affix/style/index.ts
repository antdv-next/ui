import type { CSSObject } from '../../theme/cssvar/parseStyle.ts'
import type { GenerateStyle } from '../../theme/interface'
import type { FullToken, GetDefaultToken } from '../../theme/interface/cssinjs-utils.ts'
import { genStyleHooks } from '../../theme/cssvar/genStyleHooks.ts'

export interface ComponentToken {
  /**
   * @desc 弹出层的 z-index
   * @descEN z-index of popup
   */
  zIndexPopup: number
}

interface AffixToken extends FullToken<'Affix'> {
  //
}

// ============================== Shared ==============================
const genSharedAffixStyle: GenerateStyle<AffixToken> = (token): CSSObject => {
  const { componentCls } = token
  return {
    [componentCls]: {
      position: 'fixed',
      zIndex: token.zIndexPopup,
    },
  }
}

export const prepareComponentToken: GetDefaultToken<'Affix'> = token => ({
  zIndexPopup: token.zIndexBase + 10,
})

// ============================== Export ==============================
export default genStyleHooks('Affix', genSharedAffixStyle, prepareComponentToken)
