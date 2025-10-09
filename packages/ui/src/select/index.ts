import type { App, Plugin } from 'vue'
import ASelectOptGroup from './opt-group.vue'
import ASelectOption from './option.vue'
import ASelect from './select.vue'

export type { LabeledValue, OptGroupProps, OptionProps, SelectEmits, SelectProps, SelectRef, SelectValue } from './define'

export const Select = ASelect as typeof ASelect & Plugin & {
  Option: typeof ASelectOption
  OptGroup: typeof ASelectOptGroup
}

export const SelectOption = ASelectOption
export const SelectOptGroup = ASelectOptGroup

Select.Option = ASelectOption
Select.OptGroup = ASelectOptGroup

Select.install = (app: App) => {
  app.component(ASelect.name!, ASelect)
  app.component(ASelectOption.name!, ASelectOption)
  app.component(ASelectOptGroup.name!, ASelectOptGroup)
  return app
}

export default Select
