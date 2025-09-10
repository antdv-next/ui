import type { OverrideComponent } from '../interface'
import { camelCase, kebabCase } from 'es-toolkit/compat'
import { genCSSVar } from './genCssvar.ts'
import { parseStyle } from './parseStyle.ts'

export function genStyleHooks<K extends OverrideComponent>(
  component: K,
  styleFn: (...args: any) => any,
  tokenFn: (...args: any) => any,
  config?: any,
) {
  return (defaultToken: any, cssVarToken: any) => {
    const componentToken = tokenFn(defaultToken)
    const componentBaseCls = kebabCase(component)
    const componentCls = `${defaultToken.prefixCls}-${componentBaseCls}`
    const keyToken = camelCase(component)
    const componentCSSVar = genCSSVar<K>(componentToken, componentCls, keyToken)
    // 优先处理token
    const token = {
      componentCls: `.${componentCls}`,
      componentBaseCls,
      antCls: `.${defaultToken.prefixCls}`,
      ...cssVarToken,
      ...componentCSSVar.cssToken,
    }
    // 处理token转换成cssVar
    let styles = styleFn(token)
    if (Array.isArray(styles)) {
      styles = [
        {
          [token.componentCls]: {
            ...componentCSSVar.cssVars,
          },
        },
        ...styles,
      ]
    } else {
      const componentStyles = styles[token.componentCls]
      if (componentStyles) {
        styles[token.componentCls] = {
          ...componentCSSVar.cssVars,
          ...componentStyles,
        }
      } else {
        styles[token.componentCls] = componentCSSVar.cssVars
      }
    }

    const cssCode = parseStyle(styles, componentCls)
    return {
      cssVar: componentCSSVar.cssVars,
      styles,
      code: cssCode,
    }
  }
}
