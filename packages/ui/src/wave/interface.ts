export type ShowWave = (event: MouseEvent) => void
export const TARGET_CLS = `ant-wave-target`

export type WaveComponent = 'Tag' | 'Button' | 'Checkbox' | 'Radio' | 'Switch'

export type ShowWaveEffect = (
  element: HTMLElement,
  info: {
    className: string
    component?: WaveComponent
  },
) => void
