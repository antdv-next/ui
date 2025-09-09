// import type { CSSInterpolation, DerivativeFunc } from '@ant-design/cssinjs'

import type { CSSInterpolation } from '../cssvar/parseStyle.ts'
// import type { AnyObject } from '../../_util/type'
import type { AliasToken } from './alias'
// import type { MapToken } from './maps'
// import type { SeedToken } from './seeds'

export type MappingAlgorithm = any

export type { AliasToken } from './alias'

export type { ComponentTokenMap } from './components'
export type {
  FullToken,
  GenStyleFn,
  GetDefaultToken,
  GlobalToken,
  OverrideComponent,
  // OverrideToken,
} from './cssinjs-utils'
export interface OverrideToken {}
export type {
  ColorMapToken,
  ColorNeutralMapToken,
  CommonMapToken,
  FontMapToken,
  HeightMapToken,
  MapToken,
  SizeMapToken,
  StyleMapToken,
} from './maps'
export { PresetColors } from './presetColors'
export type {
  ColorPalettes,
  LegacyColorPalettes,
  PresetColorKey,
  PresetColorType,
} from './presetColors'
export type { SeedToken } from './seeds'

export type AnyObject = Record<string, any>
// export type UseComponentStyleResult = [(node: React.ReactNode) => React.ReactElement, string]

export type GenerateStyle<
  ComponentToken extends AnyObject = AliasToken,
  ReturnType = CSSInterpolation,
> = (token: ComponentToken) => ReturnType
