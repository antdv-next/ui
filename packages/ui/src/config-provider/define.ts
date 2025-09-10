import type { ButtonConfig, ConfigConsumerProps } from './context.ts'
import type { SizeType } from './size-context.ts'

export interface ConfigProviderProps {
  getTargetContainer?: () => HTMLElement | Window
  getPopupContainer?: (triggerNode?: HTMLElement) => HTMLElement
  prefixCls?: string
  iconPrefixCls?: string
  // renderEmpty?: RenderEmptyHandler;
  // csp?: CSPConfig;
  //   variant?: Variant;
  //   form?: FormConfig;
  //   input?: InputConfig;
  //   inputNumber?: InputNumberConfig;
  //   textArea?: TextAreaConfig;
  //   select?: SelectConfig;
  //   pagination?: PaginationConfig;
  /**
   * @descCN 语言包配置，语言包可到 `antd/locale` 目录下寻找。
   * @descEN Language package setting, you can find the packages in `antd/locale`.
   */
  // locale?: Locale;
  componentSize?: SizeType
  componentDisabled?: boolean
  /**
   * @descCN 设置布局展示方向。
   * @descEN Set direction of layout.
   * @default ltr
   */
  // direction?: DirectionType;
  // space?: SpaceConfig;
  // splitter?: ComponentStyleConfig;
  /**
   * @descCN 设置 `false` 时关闭虚拟滚动。
   * @descEN Close the virtual scrolling when setting `false`.
   * @default true
   */
  virtual?: boolean
  /** @deprecated Please use `popupMatchSelectWidth` instead */
  dropdownMatchSelectWidth?: boolean
  popupMatchSelectWidth?: boolean
  // popupOverflow?: PopupOverflow;
  // theme?: ThemeConfig;
  // warning?: WarningContextProps;
  // alert?: AlertConfig;
  // anchor?: ComponentStyleConfig;
  button?: ButtonConfig
  // calendar?: ComponentStyleConfig;
  // carousel?: ComponentStyleConfig;
  // cascader?: CascaderConfig;
  // treeSelect?: TreeSelectConfig;
  // collapse?: CollapseConfig;
  // divider?: ComponentStyleConfig;
  // drawer?: DrawerConfig;
  // typography?: ComponentStyleConfig;
  // skeleton?: ComponentStyleConfig;
  // spin?: SpinConfig;
  // segmented?: ComponentStyleConfig;
  // statistic?: ComponentStyleConfig;
  // steps?: ComponentStyleConfig;
  // image?: ImageConfig;
  // layout?: ComponentStyleConfig;
  // list?: ListConfig;
  // mentions?: MentionsConfig;
  // modal?: ModalConfig;
  // progress?: ComponentStyleConfig;
  // result?: ComponentStyleConfig;
  // slider?: ComponentStyleConfig;
  // breadcrumb?: ComponentStyleConfig;
  // menu?: MenuConfig;
  // floatButton?: FloatButtonConfig;
  // floatButtonGroup?: FloatButtonGroupConfig;
  // checkbox?: ComponentStyleConfig;
  // descriptions?: ComponentStyleConfig;
  // empty?: EmptyConfig;
  // badge?: BadgeConfig;
  // radio?: ComponentStyleConfig;
  // rate?: ComponentStyleConfig;
  // switch?: ComponentStyleConfig;
  // transfer?: TransferConfig;
  // avatar?: ComponentStyleConfig;
  // message?: ComponentStyleConfig;
  // tag?: TagConfig;
  // table?: TableConfig;
  // card?: CardConfig;
  // tabs?: TabsConfig;
  // timeline?: ComponentStyleConfig;
  // timePicker?: TimePickerConfig;
  // upload?: UploadConfig;
  // notification?: NotificationConfig;
  // tree?: ComponentStyleConfig;
  // colorPicker?: ComponentStyleConfig;
  // datePicker?: DatePickerConfig;
  // rangePicker?: RangePickerConfig;
  // dropdown?: ComponentStyleConfig;
  // flex?: FlexConfig;
  // /**
  //  * Wave is special component which only patch on the effect of component interaction.
  //  */
  // wave?: WaveConfig;
  // tour?: TourConfig;
  // tooltip?: TooltipConfig;
  // popover?: PopoverConfig;
  // popconfirm?: PopconfirmConfig;
}

export interface ProviderChildrenProps extends ConfigProviderProps {
  parentContext: ConfigConsumerProps
  // legacyLocale: Locale
}

// These props is used by `useContext` directly in sub component
export const PASSED_PROPS: Exclude<
  keyof ConfigConsumerProps,
    'rootPrefixCls' | 'getPrefixCls' | 'warning'
>[] = [
  'getTargetContainer',
  'getPopupContainer',
  // 'renderEmpty',
  // 'input',
  // 'pagination',
  // 'form',
  // 'select',
  'button',
]
