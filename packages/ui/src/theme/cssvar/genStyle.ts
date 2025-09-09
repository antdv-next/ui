import type { AliasToken } from '../interface'
import type { CSSInterpolation, CSSObject } from './parseStyle'
import { parseStyleToLess } from './parseStyle'

// 样式钩子函数类型 - 简化为直接返回样式数组
export type StyleHookFn = (token: AliasToken) => CSSInterpolation[]

/**
 * 通用的样式生成方法
 * 接收一个样式钩子函数(如 genStyleHooks 的返回值)和 token，生成 CSSObject
 */
export function genStyle(styleHookFn: StyleHookFn, token: AliasToken): CSSObject {
  // 调用样式钩子函数获取样式数组
  const stylesArray = styleHookFn(token)

  // 合并所有样式对象
  const mergedStyles: CSSObject = {}

  stylesArray.forEach((styleItem) => {
    if (styleItem && typeof styleItem === 'object') {
      Object.assign(mergedStyles, styleItem)
    }
  })

  return mergedStyles
}

/**
 * 生成样式并直接转换为 LESS 字符串
 */
export function genStyleToLess(
  styleHookFn: StyleHookFn,
  token: AliasToken,
  config?: Parameters<typeof parseStyleToLess>[1],
): string {
  const cssObject = genStyle(styleHookFn, token)
  return parseStyleToLess(cssObject, config)
}

/**
 * 用于直接从 button 样式导出生成样式的便捷方法
 */
export function genButtonStyle(_token: AliasToken): CSSObject {
  // 这里需要动态导入 button 样式，避免循环依赖
  try {
    // 模拟 button 样式钩子的调用
    // 实际使用时会传入真正的 genStyleHooks 返回值
    return {
      '.ant-btn': {
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        // 基础样式会在实际调用时由传入的样式钩子函数生成
      },
    }
  } catch (error) {
    console.warn('Failed to generate button styles:', error)
    return {}
  }
}
