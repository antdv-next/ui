/**
 * Fallback of IE.
 * Safe to remove.
 */

import type { FormToken } from '.'
import type { GenerateStyle } from '../../theme/internal'
// Style as inline component
import { prepareToken } from '.'
import { genStyleHooks } from '../../theme/internal'
// import { genSubStyleComponent } from '../../theme/internal'

// ============================= Fallback =============================
const genFallbackStyle: GenerateStyle<FormToken> = (token) => {
  const { formItemCls } = token

  return {
    '@media screen and (-ms-high-contrast: active), (-ms-high-contrast: none)': {
      // Fallback for IE, safe to remove we not support it anymore
      [`${formItemCls}-control`]: {
        display: 'flex',
      },
    },
  }
}

// ============================== Export ==============================
export default genStyleHooks('FormItemItem', (token, { rootPrefixCls }) => {
  const formToken = prepareToken(token, rootPrefixCls)

  return genFallbackStyle(formToken)
})
