import type { CSSProperties, InjectionKey } from 'vue'
import type { ButtonProps } from '../button/define.ts'
import type { TooltipProps } from '../tooltip'
import { computed, inject, provide } from 'vue'
import { generateKey } from '../_utils/env.ts'

export type DirectionType = 'ltr' | 'rtl' | undefined

export type SizeType = 'small' | 'middle' | 'large' | undefined

export interface ConfigComponentProps {
  // input?: InputConfig;
  // textArea?: TextAreaConfig;
  // inputNumber?: InputNumberConfig;
  // pagination?: PaginationConfig;
  // space?: SpaceConfig;
  splitter?: ComponentStyleConfig
  // form?: FormConfig;
  // select?: SelectConfig;
  // alert?: AlertConfig;
  anchor?: ComponentStyleConfig
  button?: ButtonConfig
  divider?: ComponentStyleConfig
  // drawer?: DrawerConfig;
  calendar?: ComponentStyleConfig
  carousel?: ComponentStyleConfig
  // cascader?: CascaderConfig;
  // treeSelect?: TreeSelectConfig;
  // collapse?: CollapseConfig;
  // floatButton?: FloatButtonConfig;
  // floatButtonGroup?: FloatButtonGroupConfig;
  typography?: ComponentStyleConfig
  skeleton?: ComponentStyleConfig
  // spin?: SpinConfig;
  segmented?: ComponentStyleConfig
  steps?: ComponentStyleConfig
  statistic?: ComponentStyleConfig
  // image?: ImageConfig;
  layout?: ComponentStyleConfig
  // list?: ListConfig;
  // mentions?: MentionsConfig;
  // modal?: ModalConfig;
  progress?: ComponentStyleConfig
  result?: ComponentStyleConfig
  // slider?: SliderConfig;
  breadcrumb?: ComponentStyleConfig
  // menu?: MenuConfig;
  checkbox?: ComponentStyleConfig
  // descriptions?: DescriptionsConfig;
  // empty?: EmptyConfig;
  // badge?: BadgeConfig;
  radio?: ComponentStyleConfig
  rate?: ComponentStyleConfig
  switch?: ComponentStyleConfig
  // transfer?: TransferConfig;
  avatar?: ComponentStyleConfig
  message?: ComponentStyleConfig
  // tag?: TagConfig;
  // table?: TableConfig;
  // card?: CardConfig;
  // tabs?: TabsConfig;
  timeline?: ComponentStyleConfig
  // timePicker?: TimePickerConfig;
  // tour?: TourConfig;
  tooltip?: TooltipConfig
  // popover?: PopoverConfig;
  // popconfirm?: PopconfirmConfig;
  // upload?: UploadConfig;
  // notification?: NotificationConfig;
  tree?: ComponentStyleConfig
  colorPicker?: ComponentStyleConfig
  // datePicker?: DatePickerConfig;
  // rangePicker?: RangePickerConfig;
  dropdown?: ComponentStyleConfig
  // flex?: FlexConfig;
  // wave?: WaveConfig;
}

export interface ConfigConsumerProps extends ConfigComponentProps {
  getTargetContainer?: () => HTMLElement
  getPopupContainer?: (triggerNode?: HTMLElement) => HTMLElement
  rootPrefixCls?: string
  iconPrefixCls: string
  getPrefixCls: (suffixCls?: string, customizePrefixCls?: string) => string
  // renderEmpty?: RenderEmptyHandler;
  /**
   * @descCN 设置 [Content Security Policy](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/CSP) 配置。
   * @descEN Set the [Content Security Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP) config.
   */
  // csp?: CSPConfig;
  /** @deprecated Please use `{ button: { autoInsertSpace: boolean }}` instead */
  autoInsertSpaceInButton?: boolean
  // variant?: Variant;
  virtual?: boolean
  // locale?: Locale;
  direction?: DirectionType
  popupMatchSelectWidth?: boolean
  // popupOverflow?: PopupOverflow;
  // theme?: ThemeConfig;
  // warning?: WarningContextProps;
  space?: 'small' | 'middle' | 'large' | number
  size: SizeType
}

export const ConfigProviderKey: InjectionKey<ConfigConsumerProps> = generateKey('ConfigProviderKey')

export function useConfigProvider(props: ConfigConsumerProps) {
  provide(ConfigProviderKey, props)
}
export const defaultPrefixCls = 'ant'
export const defaultIconPrefixCls = 'anticon'

function defaultGetPrefixCls(suffixCls?: string, customizePrefixCls?: string) {
  if (customizePrefixCls) {
    return customizePrefixCls
  }
  return suffixCls ? `${defaultPrefixCls}-${suffixCls}` : defaultPrefixCls
}

const EMPTY_OBJECT = {}

let globalPrefixCls: string
let globalIconPrefixCls: string
// let globalTheme: ThemeConfig;
// let globalHolderRender: holderRenderType | undefined;

function getGlobalPrefixCls() {
  return globalPrefixCls || defaultPrefixCls
}

function getGlobalIconPrefixCls() {
  return globalIconPrefixCls || defaultIconPrefixCls
}

export interface GlobalConfigProps {
  prefixCls?: string
  iconPrefixCls?: string
  // theme?: Theme | ThemeConfig;
  // holderRender?: holderRenderType;
}

export function setGlobalConfig(props: GlobalConfigProps) {
  if (props.prefixCls !== undefined) {
    globalPrefixCls = props.prefixCls
  }
  if (props.iconPrefixCls !== undefined) {
    globalIconPrefixCls = props.iconPrefixCls
  }
}

export function globalConfig() {
  return {
    getPrefixCls: (suffixCls?: string, customizePrefixCls?: string) => {
      if (customizePrefixCls)
        return customizePrefixCls
      return suffixCls ? `${getGlobalPrefixCls()}-${suffixCls}` : getGlobalPrefixCls()
    },
    getIconPrefixCls: getGlobalIconPrefixCls,
    getRootPrefixCls: () => {
      // If Global prefixCls provided, use this
      if (globalPrefixCls) {
        return globalPrefixCls
      }

      // Fallback to default prefixCls
      return getGlobalPrefixCls()
    },
  }
}

export function useConfigContext() {
  return inject(ConfigProviderKey, {
    getPrefixCls: defaultGetPrefixCls,
    iconPrefixCls: defaultIconPrefixCls,
  } as ConfigConsumerProps)
}

export function useComponentConfig<T extends keyof ConfigComponentProps>(propName: T) {
  const context = useConfigContext()
  return computed(() => {
    const propValue = context[propName]

    return {
      classNames: EMPTY_OBJECT,
      styles: EMPTY_OBJECT,
      ...propValue,
      getPrefixCls: context.getPrefixCls,
      direction: context.direction,
      getPopupContainer: context.getPopupContainer,
    }
  })
}

export interface ComponentStyleConfig {
  className?: string
  style?: CSSProperties
}
export type ButtonConfig = ComponentStyleConfig
  & Pick<ButtonProps, 'classNames' | 'styles' | 'autoInsertSpace' | 'variant' | 'color' | 'shape'>

export type TooltipConfig = ComponentStyleConfig & Pick<TooltipProps, 'classNames' | 'styles'>
