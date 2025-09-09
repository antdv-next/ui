# parseStyle - CSS-in-JS 转 LESS 工具

这是一个完整的 parseStyle 实现，用于将 CSS-in-JS 对象转换为 LESS 格式的字符串。它兼容 Ant Design 的 parseStyle API，同时针对 Vue 项目进行了优化。

## 主要特性

- ✅ **完整的 CSS-in-JS 支持**：支持嵌套选择器、伪类、伪元素、媒体查询等
- ✅ **Vue 兼容**：基于 Vue 的 CSSProperties 类型
- ✅ **哈希注入**：支持样式隔离的哈希 ID 注入
- ✅ **LESS 生成**：直接生成 LESS 兼容的语法
- ✅ **智能单位**：自动为数值添加 px 单位（排除不需要单位的属性）
- ✅ **转换器支持**：支持自定义样式转换器
- ✅ **Linter 支持**：支持样式检查和警告
- ✅ **Keyframes 支持**：支持动画关键帧处理
- ✅ **Layer 支持**：支持 CSS Layers

## 基本用法

### 1. 简单样式对象

```typescript
import { parseStyleToLess } from './parseStyle'

const buttonStyles = {
  'backgroundColor': '#1890ff',
  'border': 'none',
  'borderRadius': 6,
  'padding': '4px 15px',
  'fontSize': 14,
  'cursor': 'pointer',

  '&:hover': {
    backgroundColor: '#40a9ff',
  },

  '&:active': {
    backgroundColor: '#096dd9',
  },

  '&.disabled': {
    backgroundColor: '#f5f5f5',
    color: '#00000040',
    cursor: 'not-allowed',
  }
}

const lessCode = parseStyleToLess(buttonStyles)
console.log(lessCode)
```

输出：
```less
background-color:#1890ff;
border:none;
border-radius:6px;
padding:4px 15px;
font-size:14px;
cursor:pointer;
&:hover{background-color:#40a9ff;}
&:active{background-color:#096dd9;}
&.disabled{background-color:#f5f5f5;color:#00000040;cursor:not-allowed;}
```

### 2. 复杂嵌套结构

```typescript
const cardStyles = {
  'position': 'relative',
  'background': 'white',
  'borderRadius': 8,
  'boxShadow': '0 2px 8px rgba(0, 0, 0, 0.15)',
  'overflow': 'hidden',

  '.card-header': {
    'padding': '16px 24px',
    'borderBottom': '1px solid #f0f0f0',
    'fontWeight': 500,

    '.title': {
      margin: 0,
      fontSize: 16,
      color: '#262626',
    },

    '.extra': {
      float: 'right',
      fontSize: 14,
      color: '#8c8c8c',
    }
  },

  '.card-body': {
    'padding': 24,

    '> *:last-child': {
      marginBottom: 0,
    }
  },

  // 响应式设计
  '@media (max-width: 768px)': {
    'margin': '0 16px',

    '.card-header': {
      padding: '12px 16px',
    },

    '.card-body': {
      padding: 16,
    }
  }
}

const lessCode = parseStyleToLess(cardStyles)
```

### 3. 带哈希ID的样式隔离

```typescript
import { parseStyleToLess } from './parseStyle'

const config = {
  hashId: 'my-component-abc123',
  hashPriority: 'high' as const, // 或 'low'
}

const isolatedStyles = {
  'color': 'red',

  '&:hover': {
    color: 'blue',
  },

  '.child': {
    fontSize: 14,
  }
}

const lessCode = parseStyleToLess(isolatedStyles, config)
// 生成带哈希的选择器，实现样式隔离
```

### 4. 与 Vue 组件结合使用

```vue
<script setup lang="ts">
import { computed } from 'vue'
import { parseStyleToLess } from '@/theme/cssvar/parseStyle'

interface Props {
  title: string
  size?: 'small' | 'medium' | 'large'
  theme?: 'light' | 'dark'
}

const props = withDefaults(defineProps<Props>(), {
  size: 'medium',
  theme: 'light',
})

const componentId = `my-card-${Math.random().toString(36).substr(2, 9)}`

const styles = computed(() => {
  const baseStyles = {
    'position': 'relative' as const,
    'borderRadius': 8,
    'overflow': 'hidden' as const,

    '.header': {
      padding: props.size === 'small' ? 12 : props.size === 'large' ? 20 : 16,
      fontWeight: 500,
      borderBottom: '1px solid',
      borderBottomColor: props.theme === 'dark' ? '#424242' : '#f0f0f0',
      backgroundColor: props.theme === 'dark' ? '#1f1f1f' : '#fafafa',
    },

    '.content': {
      padding: props.size === 'small' ? 12 : props.size === 'large' ? 24 : 16,
      backgroundColor: props.theme === 'dark' ? '#262626' : '#ffffff',
      color: props.theme === 'dark' ? '#ffffff' : '#000000',
    }
  }

  return parseStyleToLess(baseStyles, {
    hashId: componentId,
  })
})

const classNames = computed(() => [componentId])

// 在开发环境中动态注入样式
if (process.env.NODE_ENV === 'development') {
  const styleEl = document.createElement('style')
  styleEl.textContent = `.${componentId} { ${styles.value} }`
  document.head.appendChild(styleEl)
}
</script>

<template>
  <div :class="classNames">
    <div class="header">
      {{ title }}
    </div>
    <div class="content">
      <slot />
    </div>
  </div>
</template>
```

### 5. 生成 LESS 变量和 Mixins

```typescript
import { generateLessMixin, generateLessVariables } from './example'

// 从主题 token 生成 LESS 变量
const themeToken = {
  colorPrimary: '#1890ff',
  colorSuccess: '#52c41a',
  colorWarning: '#faad14',
  colorError: '#ff4d4f',
  borderRadius: 6,
  fontSize: 14,
  fontSizeHeading1: 38,
  fontSizeHeading2: 30,
}

const lessVariables = generateLessVariables(themeToken)
console.log(lessVariables)
// 输出:
// @ant-color-primary: #1890ff;
// @ant-color-success: #52c41a;
// @ant-color-warning: #faad14;
// @ant-color-error: #ff4d4f;
// @ant-border-radius: 6;
// @ant-font-size: 14;
// @ant-font-size-heading1: 38;
// @ant-font-size-heading2: 30;

// 生成 LESS Mixin
const buttonMixin = generateLessMixin('button-style', ['@size: medium'], {
  'padding': '4px 15px',
  'borderRadius': 6,
  'border': 'none',
  'cursor': 'pointer',

  '&.small': {
    padding: '0 7px',
    fontSize: 12,
  },

  '&.large': {
    padding: '6px 24px',
    fontSize: 16,
  }
})

console.log(buttonMixin)
// 输出:
// .button-style(@size: medium) {
//   padding:4px 15px;border-radius:6px;border:none;cursor:pointer;&.small{padding:0 7px;font-size:12px;}&.large{padding:6px 24px;font-size:16px;}
// }
```

### 6. 动画支持

```typescript
import { createKeyframes, parseStyleToLess } from './parseStyle'

// 创建关键帧动画
const spinKeyframes = createKeyframes('spin', {
  '0%': { transform: 'rotate(0deg)' },
  '100%': { transform: 'rotate(360deg)' }
})

const loadingStyles = {
  'position': 'relative' as const,

  '&.loading::after': {
    content: '""',
    position: 'absolute' as const,
    top: '50%',
    left: '50%',
    width: 20,
    height: 20,
    border: '2px solid #f0f0f0',
    borderTop: '2px solid #1890ff',
    borderRadius: '50%',
    transform: 'translate(-50%, -50%)',
    // 使用关键帧动画
    animationName: spinKeyframes,
    animationDuration: '1s',
    animationTimingFunction: 'linear',
    animationIterationCount: 'infinite',
  }
}

const [styleStr, effectStyle] = parseStyleInterpolation(loadingStyles)
// effectStyle 将包含 @keyframes 定义
console.log(Object.values(effectStyle).join('\n'))
console.log(styleStr)
```

## API 参考

### parseStyleToLess(styles, config?)

将 CSS-in-JS 对象转换为 LESS 字符串。

**参数:**
- `styles: CSSObject` - CSS 样式对象
- `config?: ParseConfig` - 可选配置

**返回:** `string` - LESS 格式的样式字符串

### parseStyleInterpolation(interpolation, config?, info?)

底层解析函数，支持更复杂的插值。

**参数:**
- `interpolation: CSSInterpolation` - CSS 插值
- `config?: ParseConfig` - 可选配置
- `info?: ParseInfo` - 解析信息

**返回:** `[string, Record<string, string>]` - 样式字符串和效果样式

### parseStyle(styles, token)

兼容原有 API 的接口。

**参数:**
- `styles: Record<string, any>` - 样式对象
- `token: AliasToken` - 主题 token（当前实现中未使用）

**返回:** `string` - LESS 格式的样式字符串

## 配置选项

### ParseConfig

```typescript
interface ParseConfig {
  hashId?: string // 哈希 ID，用于样式隔离
  layer?: { // CSS Layer 配置
    name: string
    dependencies?: string[]
  }
  path?: string[] // 样式路径，用于调试
  hashPriority?: 'low' | 'high' // 哈希优先级
  transformers?: Transformer[] // 样式转换器
  linters?: Linter[] // 样式检查器
}
```

### 转换器示例

```typescript
const prefixTransformer: Transformer = {
  visit: (node) => {
    const result = { ...node }
    // 为所有类选择器添加前缀
    Object.keys(result).forEach((key) => {
      if (key.startsWith('.') && !key.startsWith('.prefix-')) {
        const value = result[key]
        delete result[key]
        result[`.prefix-${key.slice(1)}`] = value
      }
    })
    return result
  }
}

const stylesWithPrefix = parseStyleToLess(styles, {
  transformers: [prefixTransformer]
})
```

### 检查器示例

```typescript
const colorLinter: Linter = (key, value, { path, hashId }) => {
  if (key.includes('color') && typeof value === 'string') {
    if (!value.startsWith('#') && !value.startsWith('rgb') && !value.startsWith('var(')) {
      console.warn(`Color value should use hex, rgb, or CSS variable: ${value}`)
    }
  }
}

const stylesWithLinting = parseStyleToLess(styles, {
  linters: [colorLinter]
})
```

## 最佳实践

1. **样式隔离**: 在组件中使用 `hashId` 来避免样式冲突
2. **响应式设计**: 充分利用媒体查询支持
3. **性能优化**: 在生产环境中预编译样式，避免运行时解析
4. **类型安全**: 使用 TypeScript 和提供的类型定义
5. **调试支持**: 在开发环境中启用 linters 来捕获潜在问题

这个实现提供了完整的 CSS-in-JS 到 LESS 的转换能力，同时保持了与 Ant Design 的兼容性，非常适合在 Vue 项目中使用。
