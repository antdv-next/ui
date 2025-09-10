import type {
  ColorGenInput,
} from '@rc-component/color-picker'

export type { ColorGenInput }

export type Colors<T> = {
  color: ColorGenInput<T>
  percent: number
}[]
