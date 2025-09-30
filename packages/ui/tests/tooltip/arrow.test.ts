import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { h, nextTick } from 'vue'
import { Tooltip } from '../../src'

describe('tooltip arrow', () => {
  it('centers arrow when pointAtCenter is true', async () => {
    const wrapper = mount(Tooltip, {
      props: {
        open: true,
        placement: 'bottomLeft',
        arrow: { pointAtCenter: true },
        title: 'Dropdown menu',
      },
      slots: {
        default: () => h('button', 'Trigger'),
      },
      attachTo: document.body,
    })

    await nextTick()
    await nextTick()

    const popup = document.body.querySelector('.ant-tooltip')
    expect(popup?.classList.contains('ant-tooltip-placement-bottom')).toBe(true)

    const arrowEl = popup?.querySelector('.ant-tooltip-arrow') as HTMLElement | null
    expect(arrowEl?.style.left).toBe('')
    expect(arrowEl?.style.right).toBe('')

    wrapper.unmount()
  })
})
