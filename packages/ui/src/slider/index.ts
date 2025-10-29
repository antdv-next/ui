import type { App } from 'vue'
import type { SliderRangeProps, SliderSingleProps } from './define'
import Slider from './Slider.vue'

export type { SliderRangeProps, SliderSingleProps }

export { Slider }

Slider.install = (app: App) => {
  app.component('ASlider', Slider)
}
export default Slider
