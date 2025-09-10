import type { CSSObject, ParseConfig } from '../src'
import { describe, expect, it } from 'vitest'
import { parseStyle, parseStyleInterpolation, parseStyleToLess } from '../src'

describe('parseStyle', () => {
  it('should parse basic CSS properties', () => {
    const styles: CSSObject = {
      color: 'red',
      fontSize: 16,
      padding: '10px',
    }

    const result = parseStyleToLess(styles)
    expect(result).toContain('color:red;')
    expect(result).toContain('font-size:16px;')
    expect(result).toContain('padding:10px;')
  })

  it('should handle nested selectors', () => {
    const styles: CSSObject = {
      'color': 'blue',
      '&:hover': {
        color: 'red',
      },
      '.child': {
        marginTop: 8,
      },
    }

    const result = parseStyleToLess(styles)
    expect(result).toContain('color:blue;')
    expect(result).toContain('&:hover{color:red;}')
    expect(result).toContain('.child{margin-top:8px;}')
  })

  it('should handle media queries', () => {
    const styles: CSSObject = {
      'fontSize': 16,
      '@media (max-width: 768px)': {
        fontSize: 14,
      },
    }

    const result = parseStyleToLess(styles)
    expect(result).toContain('font-size:16px;')
    expect(result).toContain('@media (max-width: 768px){font-size:14px;}')
  })

  it('should inject hash ID correctly', () => {
    const styles: CSSObject = {
      'color': 'red',
      '&:hover': {
        color: 'blue',
      },
    }

    const config: ParseConfig = {
      hashId: 'test-123',
    }

    const result = parseStyleToLess(styles, config)
    expect(result).toContain('color:red;')
    expect(result).toContain('.test-123:hover{color:blue;}')
  })

  it('should handle complex nested structures', () => {
    const styles: CSSObject = {
      'position': 'relative',
      '.header': {
        'padding': 16,
        '&.active': {
          fontWeight: 'bold',
        },
      },
    }

    const result = parseStyleToLess(styles)
    expect(result).toContain('position:relative;')
    expect(result).toContain('.header{padding:16px;&.active{font-weight:bold;}}')
  })

  it('should add px units to numeric values when needed', () => {
    const styles: CSSObject = {
      width: 100,
      height: 200,
      zIndex: 1000, // should not add px
      lineHeight: 1.5, // should not add px
    }

    const result = parseStyleToLess(styles)
    expect(result).toContain('width:100px;')
    expect(result).toContain('height:200px;')
    expect(result).toContain('z-index:1000;')
    expect(result).toContain('line-height:1.5;')
  })

  it('should handle camelCase to kebab-case conversion', () => {
    const styles: CSSObject = {
      backgroundColor: 'white',
      borderRadius: 4,
      marginTop: 8,
    }

    const result = parseStyleToLess(styles)
    expect(result).toContain('background-color:white;')
    expect(result).toContain('border-radius:4px;')
    expect(result).toContain('margin-top:8px;')
  })

  it('should work with original interface', () => {
    const styles = {
      color: 'red',
      fontSize: 16,
    }

    const mockToken = {} as any
    const result = parseStyle(styles, mockToken)
    expect(result).toContain('color:red;')
    expect(result).toContain('font-size:16px;')
  })

  it('should handle empty styles', () => {
    const styles: CSSObject = {}
    const result = parseStyleToLess(styles)
    expect(result).toBe('')
  })

  it('should handle layer configuration', () => {
    const styles: CSSObject = {
      color: 'red',
    }

    const config: ParseConfig = {
      layer: {
        name: 'components',
        dependencies: ['base', 'theme'],
      },
    }

    const [styleStr, effectStyle] = parseStyleInterpolation(styles, config)
    expect(styleStr).toContain('@layer components')
    expect(effectStyle['@layer components']).toContain('@layer base, components;')
    expect(effectStyle['@layer components']).toContain('@layer theme, components;')
  })

  it('should handle string interpolation', () => {
    const styles = [
      'color: red;',
      {
        fontSize: 16,
      },
      'margin: 0;',
    ]

    const [result] = parseStyleInterpolation(styles)
    expect(result).toContain('color: red;')
    expect(result).toContain('font-size:16px;')
    expect(result).toContain('margin: 0;')
  })

  it('should handle deep nesting correctly', () => {
    const styles: CSSObject = {
      '.container': {
        '.header': {
          '.title': {
            'fontSize': 18,
            '&.large': {
              fontSize: 24,
            },
          },
        },
      },
    }

    const result = parseStyleToLess(styles)
    expect(result).toContain('.container{.header{.title{font-size:18px;&.large{font-size:24px;}}}}')
  })

  it('should handle hash priority', () => {
    const styles: CSSObject = {
      'color': 'red',
      '.child': {
        color: 'blue',
      },
    }

    const highPriorityConfig: ParseConfig = {
      hashId: 'test-hash',
      hashPriority: 'high',
    }

    const lowPriorityConfig: ParseConfig = {
      hashId: 'test-hash',
      hashPriority: 'low',
    }

    const highResult = parseStyleToLess(styles, highPriorityConfig)
    const lowResult = parseStyleToLess(styles, lowPriorityConfig)

    // 高优先级会把 hash 放在前面
    expect(highResult).toContain('.test-hash .child')
    // 低优先级会把 hash 放在后面
    expect(lowResult).toContain('.child.test-hash')
  })

  it('should not add px units to z-index CSS variables', () => {
    const styles: CSSObject = {
      // 传统 z-index 属性
      'zIndex': 1000,
      // CSS 变量形式的 z-index
      '--ant-z-index': 1001,
      // 其他数值属性应该添加 px
      'width': 100,
      'height': 200,
      // CSS 变量但非 z-index 相关
      '--ant-color-primary': 16,
    }
    const result = parseStyleToLess(styles)

    // z-index 相关属性不应该有 px
    expect(result).toContain('z-index:1000;')
    expect(result).toContain('--ant-z-index:1001;')

    // 其他数值属性应该有 px
    expect(result).toContain('width:100px;')
    expect(result).toContain('height:200px;')
    expect(result).toContain('--ant-color-primary:16px;')
  })

  it('should handle custom prefix for z-index CSS variables', () => {
    const styles: CSSObject = {
      '--ant-custom-z-index': 1002,
      '--ant-custom-z-index-mask': 1003,
      '--ant-custom-z-index-overlay': 1004,
    }

    const config: ParseConfig = {
      prefixCls: 'ant-custom',
    }

    const result = parseStyleToLess(styles, config)

    expect(result).toContain('--ant-custom-z-index:1002;')
    expect(result).toContain('--ant-custom-z-index-mask:1003;')
    expect(result).toContain('--ant-custom-z-index-overlay:1004;')
  })

  it('should format CSS with proper indentation and line breaks', () => {
    const styles: CSSObject = {
      'color': 'red',
      'fontSize': 16,
      'padding': '10px',
      '&:hover': {
        color: 'blue',
        fontSize: 18,
      },
      '.child': {
        marginTop: 8,
        backgroundColor: 'white',
      },
    }

    const formattedResult = parseStyleToLess(styles, { formatStyle: true })
    const unformattedResult = parseStyleToLess(styles, { formatStyle: false })

    // 格式化的结果应该包含换行和缩进
    expect(formattedResult).toContain('  color: red;\n')
    expect(formattedResult).toContain('  font-size: 16px;\n')
    expect(formattedResult).toContain('&:hover {\n')
    expect(formattedResult).toContain('  color: blue;\n')
    expect(formattedResult).toContain('}\n')

    // 未格式化的结果应该是一行
    expect(unformattedResult).toContain('color:red;')
    expect(unformattedResult).toContain('font-size:16px;')
    expect(unformattedResult).not.toContain('\n  ')
  })

  it('should handle nested formatting correctly', () => {
    const styles: CSSObject = {
      '@media (max-width: 768px)': {
        'fontSize': 14,
        '.container': {
          'padding': 16,
          '&:hover': {
            opacity: 0.8,
          },
        },
      },
    }

    const result = parseStyleToLess(styles, { formatStyle: true })

    // 检查嵌套缩进
    expect(result).toContain('@media (max-width: 768px) {\n')
    expect(result).toContain('  font-size: 14px;\n')
    expect(result).toContain('.container {\n')
    expect(result).toContain('    padding: 16px;\n')
    expect(result).toContain('&:hover {\n')
    expect(result).toContain('      opacity: 0.8;\n')
  })
})
