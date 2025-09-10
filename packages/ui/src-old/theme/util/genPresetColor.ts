import type AbstractCalculator from '../cssvar/calc/calculator'
import type { CSSObject } from '../cssvar/parseStyle'
import type { AliasToken, PresetColorKey } from '../interface'
import { PresetColors } from '../interface'

export type TokenWithCommonCls<T> = T & {
  /** Wrap component class with `.` prefix */
  componentCls: string
  /** Origin prefix which do not have `.` prefix */
  prefixCls: string
  /** Wrap icon class with `.` prefix */
  iconCls: string
  /** Wrap ant prefixCls class with `.` prefix */
  antCls: string
} & CSSUtil

export interface CSSUtil {
  calc: (number: any) => AbstractCalculator
  max: (...values: (number | string)[]) => number | string
  min: (...values: (number | string)[]) => number | string
}
interface CalcColor {
  /** token[`${colorKey}-1`] */
  lightColor: string
  /** token[`${colorKey}-3`] */
  lightBorderColor: string
  /** token[`${colorKey}-6`] */
  darkColor: string
  /** token[`${colorKey}-7`] */
  textColor: string
}

type GenCSS = (colorKey: PresetColorKey, calcColor: CalcColor) => CSSObject

export default function genPresetColor<Token extends TokenWithCommonCls<AliasToken>>(
  token: Token,
  genCss: GenCSS,
): CSSObject {
  return PresetColors.reduce<CSSObject>((prev: CSSObject, colorKey: PresetColorKey) => {
    const lightColor = token[`${colorKey}1`]
    const lightBorderColor = token[`${colorKey}3`]
    const darkColor = token[`${colorKey}6`]
    const textColor = token[`${colorKey}7`]
    return {
      ...prev,
      ...genCss(colorKey, { lightColor, lightBorderColor, darkColor, textColor }),
    }
  }, {})
}
