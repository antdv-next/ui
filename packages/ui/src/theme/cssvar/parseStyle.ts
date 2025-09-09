import type { CSSObject as AntdCSSObject } from '@ant-design/cssinjs'
import type { AliasToken } from '../interface'
// CSS 相关类型定义
export type CSSObject = AntdCSSObject

export type CSSInterpolation
  = | undefined
    | null
    | string
    | number
    | boolean
    | CSSObject
    | CSSInterpolation[]

export type ArrayCSSInterpolation = CSSInterpolation[]

// 解析配置
export interface ParseConfig {
  hashId?: string
  layer?: {
    name: string
    dependencies?: string[]
  }
  path?: string[]
  hashPriority?: 'low' | 'high'
  transformers?: Transformer[]
  linters?: Linter[]
}

// 解析信息
export interface ParseInfo {
  root?: boolean
  injectHash?: boolean
  parentSelectors?: string[]
}

// Keyframes 类型
export interface Keyframes {
  _keyframe: boolean
  style: CSSObject
  getName: (hashId?: string) => string
}

// 转换器和检查器类型
export interface Transformer {
  visit?: (node: CSSObject) => CSSObject
}

export interface Linter {
  (key: string, value: any, info: {
    path?: string[]
    hashId?: string
    parentSelectors?: string[]
  }): void
}

// 多值标记
export const SKIP_CHECK = '_skip_check_'
export const MULTI_VALUE = '_multi_value_'

// 不需要单位的 CSS 属性
const unitless: Record<string, boolean> = {
  animationIterationCount: true,
  aspectRatio: true,
  borderImageOutset: true,
  borderImageSlice: true,
  borderImageWidth: true,
  boxFlex: true,
  boxFlexGroup: true,
  boxOrdinalGroup: true,
  columnCount: true,
  columns: true,
  flex: true,
  flexGrow: true,
  flexPositive: true,
  flexShrink: true,
  flexNegative: true,
  flexOrder: true,
  gridArea: true,
  gridRow: true,
  gridRowEnd: true,
  gridRowSpan: true,
  gridRowStart: true,
  gridColumn: true,
  gridColumnEnd: true,
  gridColumnSpan: true,
  gridColumnStart: true,
  fontWeight: true,
  lineClamp: true,
  lineHeight: true,
  opacity: true,
  order: true,
  orphans: true,
  tabSize: true,
  widows: true,
  zIndex: true,
  zoom: true,
  // SVG
  fillOpacity: true,
  floodOpacity: true,
  stopOpacity: true,
  strokeDasharray: true,
  strokeDashoffset: true,
  strokeMiterlimit: true,
  strokeOpacity: true,
  strokeWidth: true,
}

// 检查是否为复合 CSS 属性
function isCompoundCSSProperty(value: any): boolean {
  return typeof value === 'object' && value && (
    Object.prototype.hasOwnProperty.call(value, SKIP_CHECK)
    || value[MULTI_VALUE]
    || value[SKIP_CHECK]
  )
}

// 注入选择器哈希
function injectSelectorHash(
  key: string,
  hashId: string,
  hashPriority: 'low' | 'high' = 'low',
): string {
  if (!hashId)
    return key

  const hashSelector = `.${hashId}`

  if (!key || key === '&') {
    return hashSelector
  }

  // 处理伪类和伪元素
  if (key.startsWith('&:') || key.startsWith('&::')) {
    return `${hashSelector}${key.slice(1)}`
  }

  // 处理子选择器
  if (key.startsWith('&')) {
    return `${hashSelector}${key.slice(1)}`
  }

  // 处理媒体查询等 @ 规则
  if (key.startsWith('@')) {
    return key
  }

  // 其他情况根据优先级决定位置
  if (hashPriority === 'high') {
    return `${hashSelector} ${key}`
  }

  return `${key}${hashSelector}`
}

// 内容引号检查器
const contentQuotesLinter: Linter = (key, value, { path: _path }) => {
  if (key === 'content' && typeof value === 'string') {
    // 检查 content 值是否需要引号
    const hasQuotes = /^(['"]).*\1$/.test(value.trim())
    if (!hasQuotes && value !== 'none' && value !== 'normal') {
      console.warn(`content value should be quoted: ${value}`)
    }
  }
}

// 哈希动画检查器
const hashedAnimationLinter: Linter = (key, value, { hashId }) => {
  if (key === 'animationName' && typeof value === 'string' && hashId) {
    // 检查动画名称是否应该被哈希化
    if (!value.includes(hashId)) {
      console.warn(`animationName should be hashed with hashId: ${value}`)
    }
  }
}

// 将 CSS-in-JS 解析为样式内容
export function parseStyleInterpolation(
  interpolation: CSSInterpolation,
  config: ParseConfig = {},
  { root, injectHash, parentSelectors }: ParseInfo = {
    root: true,
    parentSelectors: [],
  },
): [
  parsedStr: string,
  // 应该在所有样式中唯一的样式内容（例如 Keyframes）
  // 当存在多个相同的关键帧时，Firefox 会闪烁
  effectStyle: Record<string, string>,
] {
  const {
    hashId,
    layer,
    path,
    hashPriority,
    transformers = [],
    linters = [],
  } = config

  let styleStr = ''
  let effectStyle: Record<string, string> = {}

  // 解析关键帧
  function parseKeyframes(keyframes: Keyframes) {
    const animationName = keyframes.getName(hashId)
    if (!effectStyle[animationName]) {
      const [parsedStr] = parseStyleInterpolation(keyframes.style, config, {
        root: false,
        parentSelectors,
      })

      effectStyle[animationName] = `@keyframes ${keyframes.getName(
        hashId,
      )}${parsedStr}`
    }
  }

  // 扁平化数组
  function flattenList(
    list: ArrayCSSInterpolation,
    fullList: CSSObject[] = [],
  ) {
    list.forEach((item) => {
      if (Array.isArray(item)) {
        flattenList(item, fullList)
      } else if (item) {
        fullList.push(item as CSSObject)
      }
    })

    return fullList
  }

  const flattenStyleList = flattenList(
    Array.isArray(interpolation) ? interpolation : [interpolation],
  )

  flattenStyleList.forEach((originStyle) => {
    // 只有根级别可以使用原始字符串
    const style: CSSObject
      = typeof originStyle === 'string' && !root ? {} : originStyle

    if (typeof style === 'string') {
      styleStr += `${style}\n`
    } else if ((style as any)._keyframe) {
      // 关键帧
      parseKeyframes(style as unknown as Keyframes)
    } else {
      const mergedStyle = transformers.reduce(
        (prev, trans) => trans?.visit?.(prev) || prev,
        style,
      )

      // 普通 CSSObject
      Object.keys(mergedStyle).forEach((key) => {
        const value = mergedStyle[key]

        if (
          typeof value === 'object'
          && value
          && (key !== 'animationName' || !(value as unknown as Keyframes)?._keyframe)
          && !isCompoundCSSProperty(value)
        ) {
          let subInjectHash = false

          // 当成嵌套对象来处理
          let mergedKey = key.trim()
          // 是否将子级当作根级处理。在大多数情况下为 false。
          let nextRoot = false

          // 拆分多个选择器
          if ((root || injectHash) && hashId) {
            if (mergedKey.startsWith('@')) {
              // 跳过媒体查询，交给子节点继续插入 hashId
              subInjectHash = true
            } else if (mergedKey === '&') {
              // 移除 root selector 上的单个 &
              mergedKey = injectSelectorHash('', hashId, hashPriority)
            } else {
              // 注入 hashId
              mergedKey = injectSelectorHash(key, hashId, hashPriority)
            }
          } else if (
            root
            && !hashId
            && (mergedKey === '&' || mergedKey === '')
          ) {
            // 在没有 hashId 的情况下，对于 `{ '&': { a: { color: 'red' } } }` 或 `{ '': { a: { color: 'red' } } }`，
            // 我们会得到 `&{a:{color:red;}}` 或 `{a:{color:red;}}` 字符串供 stylis 编译。
            // 但这不符合 stylis 语法，
            // 最终我们会得到 `{color:red;}` 作为 css，这是错误的。
            // 所以我们需要在根部移除 key，并将子级 `{ a: { color: 'red' } }` 当作根级处理。
            mergedKey = ''
            nextRoot = true
          }

          const [parsedStr, childEffectStyle] = parseStyleInterpolation(
            value as any,
            config,
            {
              root: nextRoot,
              injectHash: subInjectHash,
              parentSelectors: [...(parentSelectors || []), mergedKey],
            },
          )

          effectStyle = {
            ...effectStyle,
            ...childEffectStyle,
          }

          styleStr += `${mergedKey}${parsedStr}`
        } else {
          // 添加样式属性
          function appendStyle(cssKey: string, cssValue: any) {
            const isDev = typeof window !== 'undefined' && window.location?.hostname === 'localhost'
            if (
              isDev
              && (typeof value !== 'object' || !(value as any)?.[SKIP_CHECK])
            ) {
              [contentQuotesLinter, hashedAnimationLinter, ...linters].forEach(
                linter =>
                  linter(cssKey, cssValue, { path, hashId, parentSelectors }),
              )
            }

            // 如果是样式则直接插入
            const styleName = cssKey.replace(
              /[A-Z]/g,
              match => `-${match.toLowerCase()}`,
            )

            // 自动添加 px 后缀
            let formatValue = cssValue
            if (
              !unitless[cssKey]
              && typeof formatValue === 'number'
              && formatValue !== 0
            ) {
              formatValue = `${formatValue}px`
            }

            // 处理 animationName 和 Keyframe 值
            if (
              cssKey === 'animationName'
              && (cssValue as Keyframes)?._keyframe
            ) {
              parseKeyframes(cssValue as Keyframes)
              formatValue = (cssValue as Keyframes).getName(hashId)
            }

            styleStr += `${styleName}:${formatValue};`
          }

          const actualValue = (value as any)?.value ?? value
          if (
            typeof value === 'object'
            && (value as any)?.[MULTI_VALUE]
            && Array.isArray(actualValue)
          ) {
            actualValue.forEach((item) => {
              appendStyle(key, item)
            })
          } else {
            appendStyle(key, actualValue)
          }
        }
      })
    }
  })

  if (!root) {
    styleStr = `{${styleStr}}`
  } else if (layer) {
    // fixme: https://github.com/thysultan/stylis/pull/339
    if (styleStr) {
      styleStr = `@layer ${layer.name} {${styleStr}}`
    }

    if (layer.dependencies) {
      effectStyle[`@layer ${layer.name}`] = layer.dependencies
        .map(deps => `@layer ${deps}, ${layer.name};`)
        .join('\n')
    }
  }

  return [styleStr, effectStyle]
}

// 辅助函数：解析为 LESS 格式
export function parseStyleToLess(
  styles: CSSObject,
  config: ParseConfig = {},
): string {
  const [styleStr, effectStyle] = parseStyleInterpolation(styles, config)

  // 将效果样式添加到主样式中
  const effectStyles = Object.values(effectStyle).join('\n')

  return effectStyles ? `${effectStyles}\n${styleStr}` : styleStr
}

// 兼容原有接口
export function parseStyle(styles: Record<string, any>, _token: AliasToken): string {
  return parseStyleToLess(styles as CSSObject, {})
}
