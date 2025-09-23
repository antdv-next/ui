import type { SliderProps as VcSliderProps } from '@v-c/slider'
import type { CSSProperties, VNode } from 'vue'
import type { TooltipPlacement } from '../tooltip'

export type SliderMarks = VcSliderProps['marks']
export type SemanticName = 'root' | 'tracks' | 'track' | 'rail' | 'handle'
export type SliderClassNames = Partial<Record<SemanticName, string>>

interface HandleGeneratorInfo {
  value?: number
  dragging?: boolean
  index: number
}

export type HandleGeneratorFn = (config: {
  tooltipPrefixCls?: string
  prefixCls?: string
  info: HandleGeneratorInfo
}) => VNode

export type Formatter = ((value?: number) => VNode) | null

export interface SliderTooltipProps extends VcSliderProps {
  prefixCls?: string
  open?: boolean
  placement?: TooltipPlacement
  getPopupContainer?: (triggerNode: HTMLElement) => HTMLElement
  formatter?: Formatter
  autoAdjustOverflow?: boolean
}

export interface SliderBaseProps {
  prefixCls?: string
  reverse?: boolean
  min?: number
  max?: number
  step?: null | number
  marks?: SliderMarks
  dots?: boolean
  included?: boolean
  disabled?: boolean
  keyboard?: boolean
  vertical?: boolean
  className?: string
  rootClassName?: string
  id?: string
  style?: CSSProperties
  tooltip?: SliderTooltipProps
  autoFocus?: boolean

  styles?: VcSliderProps['styles']
  classNames?: VcSliderProps['classNames']
  onFocus?: (e: FocusEvent) => void
  onBlur?: (e: FocusEvent) => void

  // Deprecated
  /** @deprecated `tooltipPrefixCls` is deprecated. Please use `tooltip.prefixCls` instead. */
  tooltipPrefixCls?: string
  /** @deprecated `tipFormatter` is deprecated. Please use `tooltip.formatter` instead. */
  tipFormatter?: Formatter
  /** @deprecated `tooltipVisible` is deprecated. Please use `tooltip.open` instead. */
  tooltipVisible?: boolean
  /**
   * @deprecated `getTooltipPopupContainer` is deprecated. Please use `tooltip.getPopupContainer`
   *   instead.
   */
  getTooltipPopupContainer?: (triggerNode: HTMLElement) => HTMLElement
  /** @deprecated `tooltipPlacement` is deprecated. Please use `tooltip.placement` instead. */
  tooltipPlacement?: TooltipPlacement

  // Accessibility
  tabIndex?: VcSliderProps['tabIndex']
  ariaLabelForHandle?: VcSliderProps['ariaLabelForHandle']
  ariaLabelledByForHandle?: VcSliderProps['ariaLabelledByForHandle']
  ariaRequired?: VcSliderProps['ariaRequired']
  ariaValueTextFormatterForHandle?: VcSliderProps['ariaValueTextFormatterForHandle']
  range?: boolean
}

export interface SliderSingleProps extends SliderBaseProps {
  range?: false
  value?: number
  defaultValue?: number
  onChange?: (value: number) => void
  /** @deprecated Please use `onChangeComplete` instead */
  onAfterChange?: (value: number) => void
  onChangeComplete?: (value: number) => void
  /** @deprecated Please use `styles.handle` instead */
  handleStyle?: CSSProperties
  /** @deprecated Please use `styles.track` instead */
  trackStyle?: CSSProperties
  /** @deprecated Please use `styles.rail` instead */
  railStyle?: CSSProperties
}

export interface SliderRangeProps extends SliderBaseProps {
  range: true | SliderRange
  value?: number[]
  defaultValue?: number[]
  onChange?: (value: number[]) => void
  /** @deprecated Please use `onChangeComplete` instead */
  onAfterChange?: (value: number[]) => void
  onChangeComplete?: (value: number[]) => void
  /** @deprecated Please use `styles.handle` instead */
  handleStyle?: CSSProperties[]
  /** @deprecated Please use `styles.track` instead */
  trackStyle?: CSSProperties[]
  /** @deprecated Please use `styles.rail` instead */
  railStyle?: CSSProperties
}
type GetProp<T, P extends keyof T> = T[P]
type SliderRange = Exclude<GetProp<VcSliderProps, 'range'>, boolean>

export interface Opens { [index: number]: boolean }

export interface SliderEmits {
  changeComplete: [(value: number | number[]) => void]
  focus: [FocusEvent]
  blur: [FocusEvent]
}

export interface SliderSlots {
  mark?: ({ point, label }: { point: number, label: unknown }) => any
}
