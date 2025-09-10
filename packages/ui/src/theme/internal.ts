import type {
  AliasToken,
  FullToken,
  GenerateStyle,
  // GenStyleFn,
  // GetDefaultToken,
  // GlobalToken,
  OverrideComponent,
  PresetColorKey,
  PresetColorType,
  SeedToken,
  // UseComponentStyleResult,
} from './interface'

import { genCalc as calc, mergeToken, statistic, statisticToken } from '@ant-design/cssinjs-utils'
import { genStyleHooks } from './cssvar/genStyleHooks.ts'
import { PresetColors } from './interface'
import { getLineHeight } from './themes/shared/genFontSizes'
import genPresetColor from './util/genPresetColor'

export type { CSSUtil, TokenWithCommonCls } from './util/genPresetColor'
export {
  calc,
  // generators
  // genComponentStyleHook,
  genPresetColor,
  genStyleHooks,
  // genSubStyleComponent,
  getLineHeight,
  // utils
  mergeToken,
  // constant
  PresetColors,
  statistic,
  statisticToken,
  // hooks
  // useResetIconStyle,
  // useToken,
}
export type {
  AliasToken,
  FullToken,
  GenerateStyle,
  // GenStyleFn,
  // GetDefaultToken,
  // GlobalToken,
  OverrideComponent,
  PresetColorKey,
  PresetColorType,
  SeedToken,
  // UseComponentStyleResult,
}
