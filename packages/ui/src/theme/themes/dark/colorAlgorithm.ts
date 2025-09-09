import { FastColor } from '@ant-design/fast-color'

export function getAlphaColor(baseColor: string, alpha: number) {
  return new FastColor(baseColor).setA(alpha).toRgbString()
}

export function getSolidColor(baseColor: string, brightness: number) {
  const instance = new FastColor(baseColor)
  return instance.lighten(brightness).toHexString()
}
