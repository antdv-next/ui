import type { OverrideComponent } from '../interface'
import { camelCase, kebabCase } from 'es-toolkit/compat'
import { addFunc, genCSSVar } from './genCssvar.ts'
import { parseStyle } from './parseStyle.ts'

export function genStyleHooks<K extends OverrideComponent>(
  component: string | string[],
  styleFn: (...args: any) => any,
  tokenFn?: (...args: any) => any,
  config?: any,
) {
  if (Array.isArray(component)) {
    component = component.reduce((prev, cur) => `${prev ? `${prev}${cur}` : cur}`)
  }
  return (defaultToken: any, cssVarToken: any) => {
    const componentToken = addFunc(tokenFn ? tokenFn(defaultToken) : defaultToken)
    const componentBaseCls = kebabCase(component)
    const componentCls = `${defaultToken.prefixCls}-${componentBaseCls}`
    const keyToken = camelCase(component)
    const componentCSSVar = genCSSVar<K>(componentToken, componentCls, keyToken)
    // 优先处理token
    const token = {
      componentCls: `.${componentCls}`,
      componentBaseCls,
      antCls: `.${defaultToken.prefixCls}`,
      rootPrefixCls: `${defaultToken.prefixCls}`,
      iconCls: `.anticon`,
      ...cssVarToken,
      ...componentCSSVar.cssToken,
    }
    // 处理token转换成cssVar
    let styles = styleFn(token, token)
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

    const cssCode = parseStyle(styles, componentCls, config)
    return {
      cssVar: componentCSSVar.cssVars,
      styles,
      code: cssCode,
    }
  }
}
