import type { CSSObject, ParseConfig } from '../src/theme/cssvar/parseStyle'
import { describe, expect, it } from 'vitest'
import { parseStyle, parseStyleInterpolation, parseStyleToLess } from '../src/theme/cssvar/parseStyle'

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
})
