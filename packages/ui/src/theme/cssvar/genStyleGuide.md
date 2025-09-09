# genStyle 使用指南

这个 `genStyle` 方法是一个通用的样式生成工具，可以接收 `genStyleHooks` 调用后的结果，并直接生成 `CSSObject`，最后通过 `parseStyle` 解析成 LESS 文件。

## 基本用法

### 1. 定义样式钩子函数

```typescript
import type { AliasToken } from '../interface/alias'
import type { StyleHookFn } from './genStyle'

// 创建一个样式钩子函数
const buttonStyleHook: StyleHookFn = (token: AliasToken) => {
  return [
    {
      '.ant-btn': {
        position: 'relative',
        display: 'inline-flex',
        padding: '4px 15px',
        fontSize: token.fontSize || 14,
        borderRadius: token.borderRadius || 6,
        cursor: 'pointer',
        // ... 更多样式
      }
    },
    {
      '.ant-btn-primary': {
        background: token.colorPrimary || '#1890ff',
        color: '#fff',
        // ... 更多样式
      }
    }
  ]
}
```

### 2. 使用 genStyle 生成样式

```typescript
import { genStyle, genStyleToLess } from './genStyle'

// 定义 token
const token: AliasToken = {
  colorPrimary: '#1890ff',
  fontSize: 14,
  borderRadius: 6,
  // ... 更多 token
}

// 生成 CSSObject
const cssObject = genStyle(buttonStyleHook, token)

// 直接生成 LESS 字符串
const lessString = genStyleToLess(buttonStyleHook, token)
```

### 3. 与现有的 button 样式集成

```typescript
// 假设你有一个现有的 button 样式导出
import buttonStyles from '../button/style'

// 将现有的 genStyleHooks 结果包装为我们的 StyleHookFn
const wrappedButtonStyles: StyleHookFn = (token) => {
  // 如果 buttonStyles 是 genStyleHooks 的结果，它应该是一个函数
  // 调用它会返回样式数组
  const result = buttonStyles(token)
  // 根据实际的 genStyleHooks 返回格式调整
  return Array.isArray(result) ? result : result[0]
}

// 生成样式
const buttonCssObject = genStyle(wrappedButtonStyles, token)
const buttonLessString = genStyleToLess(wrappedButtonStyles, token)
```

## 高级用法

### 1. 带配置的样式生成

```typescript
import type { ParseConfig } from './parseStyle'

const config: ParseConfig = {
  hashId: 'my-component-hash',
  hashPriority: 'high',
}

const lessWithHash = genStyleToLess(buttonStyleHook, token, config)
```

### 2. 运行时样式注入

```typescript
// 在浏览器环境中动态注入样式
function injectStyles(styleHook: StyleHookFn, token: AliasToken) {
  const lessContent = genStyleToLess(styleHook, token)

  const style = document.createElement('style')
  style.textContent = lessContent
  document.head.appendChild(style)

  return style
}

// 使用
const styleElement = injectStyles(buttonStyleHook, token)
```

### 3. 构建时样式生成

```typescript
import * as fs from 'node:fs'
import * as path from 'node:path'

// 在构建脚本中生成 LESS 文件
function buildStyles(outputDir: string) {
  const token = loadTokenFromConfig() // 从配置加载 token

  const buttonLess = genStyleToLess(buttonStyleHook, token)

  fs.writeFileSync(
    path.join(outputDir, 'button.less'),
    buttonLess,
    'utf8'
  )
}
```

## 实际示例

```typescript
// 完整的按钮样式示例
import { generateButtonStylesExample } from './genStyleExample'

const { cssObject, lessString } = generateButtonStylesExample()

// cssObject 可以用于 CSS-in-JS
console.log('CSS Object:', cssObject)

// lessString 可以写入文件或用于构建
console.log('LESS Content:', lessString)

// 示例输出的 LESS 内容：
/*
.ant-btn{
  position:relative;
  display:inline-flex;
  align-items:center;
  justify-content:center;
  padding:4px 15px;
  font-size:14px;
  line-height:1.5715;
  font-weight:400;
  text-align:center;
  background:transparent;
  border:1px solid #d9d9d9;
  border-radius:6px;
  cursor:pointer;
  transition:all 0.2s;
  user-select:none;
  touch-action:manipulation;
  color:#000000d9;
  &:hover{border-color:#1890ff;color:#1890ff;}
  &:disabled{cursor:not-allowed;opacity:0.6;color:#00000040;background:#f5f5f5;}
}
.ant-btn-primary{
  background:#1890ff;
  border-color:#1890ff;
  color:#fff;
  &:hover{background:#40a9ff;border-color:#40a9ff;}
  &:active{background:#096dd9;border-color:#096dd9;}
}
// ... 更多样式
*/
```

## API 参考

### `genStyle(styleHookFn, token)`

- **styleHookFn**: `StyleHookFn` - 样式钩子函数
- **token**: `AliasToken` - 主题 token
- **返回**: `CSSObject` - CSS 对象

### `genStyleToLess(styleHookFn, token, config?)`

- **styleHookFn**: `StyleHookFn` - 样式钩子函数
- **token**: `AliasToken` - 主题 token
- **config**: `ParseConfig` - 可选的解析配置
- **返回**: `string` - LESS 字符串

### `StyleHookFn`

```typescript
type StyleHookFn = (token: AliasToken) => CSSInterpolation[]
```

这个函数接收一个 token 参数，返回一个 CSS 样式数组。
