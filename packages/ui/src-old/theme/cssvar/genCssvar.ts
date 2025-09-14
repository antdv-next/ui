import type { FullToken, MapToken, OverrideComponent, SeedToken } from '../interface'
import type { GenerateThemeDerivative } from '../interface/presetColors'
import formatToken from '../util/alias'
import genCalc from './calc'
import { unit } from './unit'

export function token2CSSVar(token: string, prefix = '') {
  return `--${prefix ? `${prefix}-` : ''}${token}`
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/([A-Z]+)([A-Z][a-z0-9]+)/g, '$1-$2')
    .replace(/([a-z])([A-Z0-9])/g, '$1-$2')
    .toLowerCase()
}

export function genMapToken(seedToken: SeedToken, ...derivatives: GenerateThemeDerivative[]) {
  // 执行对应的 derivative 方法，生成最终的 MapToken
  const mapToken = derivatives.reduce((result, derivative) => derivative(seedToken, result), {} as MapToken)
  const formatMapToken = formatToken({ ...mapToken, override: {} })
  return {
    ...formatMapToken,
    prefixCls: 'ant',
    calc: (number: string) => genCalc('css', new Set())(number),
    unit,
    max: (...args: (string | number)[]) => `max(${args.join(',')})`,
    min: (...args: (string | number)[]) => `min(${args.join(',')})`,
  }
}

export function addFunc(token: any) {
  return {
    ...token,
    calc: (number: string) => genCalc('css', new Set())(number),
    unit,
    max: (...args: (string | number)[]) => `max(${args.join(',')})`,
    min: (...args: (string | number)[]) => `min(${args.join(',')})`,
  }
}

export function genCSSVar<T extends OverrideComponent>(token: FullToken<T>, prefixCls?: string, component?: string) {
  const skipKeys = ['wireframe', 'motion', 'prefixCls', 'componentCls', 'antCls', 'calc', 'unit', 'checkboxCls', 'INTERNAL_FIXED_ITEM_MARGIN', 'max', 'min']
  const _cssVars: Record<string, any> = {}
  const cssToken: Record<string, any> = {}
  const mapToken: Record<string, string> = {}
  for (const cssVarsKey in token) {
    const value = (token as any)[cssVarsKey as keyof typeof token]

    if (skipKeys.includes(cssVarsKey) || cssVarsKey.endsWith('Cls')) {
      cssToken[cssVarsKey] = value
      mapToken[cssVarsKey] = value
      continue
    }
    let _cssVarsKey = cssVarsKey
    if (component) {
      _cssVarsKey = cssVarsKey.startsWith(component) ? cssVarsKey.replace(component!, '') : cssVarsKey
    }
    const _key = token2CSSVar(_cssVarsKey, prefixCls ?? token.prefixCls ?? 'ant')
    if (cssVarsKey.startsWith('zIndex')) {
      _cssVars[_key] = value
    } else {
      _cssVars[_key] = value
    }
    cssToken[cssVarsKey] = `var(${_key})`
    if (typeof value === 'string') {
      mapToken[cssVarsKey] = `var(${_key})`
    } else {
      mapToken[cssVarsKey] = value
    }
  }
  return { cssToken, cssVars: _cssVars, mapToken }
}
