import path from 'node:path'
import { fileURLToPath } from 'node:url'
import fs from 'fs-extra'
import { genCSSVar, genMapToken } from '../src-old/theme/cssvar/genCssvar'
import { parseStyle } from '../src-old/theme/cssvar/parseStyle'
import compactDerivative from '../src-old/theme/themes/compact'
import darkDerivative from '../src-old/theme/themes/dark'
import derivative from '../src-old/theme/themes/default'
import seedToken from '../src-old/theme/themes/seed'

async function generateLess() {
  const components: (string | [string, string])[] = [
    // 'affix',
    // 'button',
    // 'color-picker',
    // 'wave',
    // 'alert',
    // 'anchor',
    // 'app',
    // 'avatar',
    // 'badge',
    // ['badge', 'ribbon'],
    // 'breadcrumb',
    // 'card',
    // 'carousel',
    // 'checkbox',
    // 'cascader',
    // ['cascader', 'panel'],
    // 'collapse',
    // 'descriptions',
    // 'divider',
    // 'drawer',
    // 'dropdown',
    // 'empty',
    // 'flex',
    // 'float-button',
    // 'form',
    // ['form', 'fallbackCmp'],
    // ['grid', 'row'],
    // ['grid', 'col'],
    // ['input', 'shared'],
    // ['input', 'otp'],
    // ['input', 'textarea'],
    // 'input',
    // 'input-number',
    // 'layout',
    // ['layout', 'sider'],
    // 'list',
    // 'mentions',
  ]
  const baseUrl = fileURLToPath(new URL('.', import.meta.url))
  let mapToken = genMapToken(seedToken, derivative)
  const mapTokenCssVar = genCSSVar<any>(mapToken, 'ant')
  mapToken = mapTokenCssVar.mapToken as any
  for (const component of components) {
    const [dir, outFile = 'index'] = Array.isArray(component) ? component : [component]
    const styleFn = (await import(`../src-old/${dir}/style/${outFile}.ts`)).default
    const { code } = styleFn(mapToken, mapTokenCssVar.cssToken)
    // 输出目录
    const outputFile = path.resolve(baseUrl, `../src/${dir}/style/${outFile}.less`)
    // 文件已经存在的话就不生成了
    if (!fs.existsSync(outputFile)) {
      await fs.outputFile(outputFile, code, 'utf-8')
    }
  }
  // 最后输出全局的css-var的样式
  const { cssVars } = genCSSVar<any>(mapToken, 'ant')
  const styles = {
    ':root': cssVars,
  }
  const code = parseStyle(styles, 'ant')
  const rootOutputFile = path.resolve(baseUrl, `../src/style/css-vars.css`)
  if (!fs.existsSync(rootOutputFile)) {
    await fs.outputFile(rootOutputFile, code, 'utf-8')
  }
  await Promise.all([
    generateDarkLess(),
    generateCompactLess(),
  ])
}

function removeNullAndUndefined(obj: any) {
  return Object.fromEntries(
    Object.entries(obj).filter(([_, v]) => v != null),
  )
}

async function generateDarkLess() {
  const mapToken = genMapToken(seedToken, derivative, darkDerivative)
  // 最后输出全局的css-var的样式
  const { cssVars } = genCSSVar<any>(mapToken, 'ant')
  const styles = {
    ':root': removeNullAndUndefined(cssVars),
  }
  const code = parseStyle(styles, 'ant')
  const baseUrl = fileURLToPath(new URL('.', import.meta.url))
  const rootOutputFile = path.resolve(baseUrl, `../src/style/css-vars-dark.css`)
  if (!fs.existsSync(rootOutputFile)) {
    await fs.outputFile(rootOutputFile, code, 'utf-8')
  }
}

async function generateCompactLess() {
  const mapToken = genMapToken(seedToken, derivative, compactDerivative)
  // 最后输出全局的css-var的样式
  const { cssVars } = genCSSVar<any>(mapToken, 'ant')
  const _cssVars = removeNullAndUndefined(cssVars)
  const styles = {
    ':root': _cssVars,
  }
  const code = parseStyle(styles, 'ant')
  const baseUrl = fileURLToPath(new URL('.', import.meta.url))
  const rootOutputFile = path.resolve(baseUrl, `../src/style/pure/css-vars-compact.css`)
  if (!fs.existsSync(rootOutputFile)) {
    await fs.outputFile(rootOutputFile, code, 'utf-8')
  }
}

generateLess().then(() => {
  // TODO
})
