import type { FullToken, MapToken, SeedToken } from '../interface'
import type { GenerateThemeDerivative } from '../interface/presetColors'
import formatToken from '../util/alias'

const toPx = (num: unknown) => (typeof num === 'number' ? `${num}px` : num)

export function token2CSSVar(token: string, prefix = '') {
  return `--${prefix ? `${prefix}-` : ''}${token}`
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/([A-Z]+)([A-Z][a-z0-9]+)/g, '$1-$2')
    .replace(/([a-z])([A-Z0-9])/g, '$1-$2')
    .toLowerCase()
}

export function genCssvar(seedToken: SeedToken, ...derivatives: GenerateThemeDerivative[]) {
  // 执行对应的 derivative 方法，生成最终的 MapToken
  const mapToken = derivatives.reduce((result, derivative) => derivative(seedToken, result), {} as MapToken)
  const formatMapToken = formatToken({ ...mapToken, override: {} }) as FullToken<'Affix'>
  const skipKeys = ['wireframe', 'motion']
  const _cssVars: Record<string, any> = {}
  const cssToken: Record<string, string> = {}
  for (const cssVarsKey in formatMapToken) {
    if (skipKeys.includes(cssVarsKey)) {
      continue
    }
    const value = formatMapToken[cssVarsKey as keyof typeof formatMapToken]
    const _key = token2CSSVar(cssVarsKey, 'ant')
    if (cssVarsKey.startsWith('zIndex')) {
      _cssVars[_key] = value
    } else {
      _cssVars[_key] = toPx(value)
    }
    cssToken[cssVarsKey] = `var(${_key})`
  }

  formatMapToken.componentCls = 'ant-affix'
  formatMapToken.antCls = 'ant'
  formatMapToken.prefixCls = 'ant'
  return {
    cssVar: _cssVars,
    cssToken,
    mapToken: formatMapToken,
  } as {
    cssVar: Record<string, string>
    cssToken: Record<keyof MapToken, string>
    mapToken: FullToken<any>
  }
}
