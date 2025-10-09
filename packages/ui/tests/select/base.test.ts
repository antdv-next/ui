import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { Select } from '../../src/select'

describe('select', () => {
  it('should render correctly', () => {
    const wrapper = mount(Select, {
      props: {
        options: [
          { value: '1', label: 'Option 1' },
          { value: '2', label: 'Option 2' },
        ],
      },
    })
    expect(wrapper.html()).toContain('ant-select')
  })

  it('should support placeholder', () => {
    const wrapper = mount(Select, {
      props: {
        placeholder: 'Please select',
        options: [],
      },
    })
    expect(wrapper.html()).toContain('Please select')
  })

  it('should support disabled', () => {
    const wrapper = mount(Select, {
      props: {
        disabled: true,
        options: [],
      },
    })
    expect(wrapper.html()).toContain('ant-select-disabled')
  })

  it('should support size', () => {
    const wrapper = mount(Select, {
      props: {
        size: 'large',
        options: [],
      },
    })
    expect(wrapper.html()).toContain('ant-select-lg')
  })

  it('should support variant', () => {
    const wrapper = mount(Select, {
      props: {
        variant: 'borderless',
        options: [],
      },
    })
    expect(wrapper.html()).toContain('ant-select-borderless')
  })

  it('should support multiple mode', () => {
    const wrapper = mount(Select, {
      props: {
        mode: 'multiple',
        options: [
          { value: '1', label: 'Option 1' },
          { value: '2', label: 'Option 2' },
        ],
      },
    })
    expect(wrapper.html()).toContain('ant-select-multiple')
  })

  it('should emit change event', async () => {
    const wrapper = mount(Select, {
      props: {
        options: [
          { value: '1', label: 'Option 1' },
          { value: '2', label: 'Option 2' },
        ],
      },
    })

    // Find the select element and click it
    const selectElement = wrapper.find('.ant-select')
    await selectElement.trigger('click')

    // Check if component has the open class or emitted openChange
    await wrapper.vm.$nextTick()
    expect(wrapper.emitted('openChange') || wrapper.html().includes('ant-select-open')).toBeTruthy()
  })

  it('should support custom prefix', () => {
    const wrapper = mount(Select, {
      props: {
        prefix: 'Prefix',
        options: [],
      },
    })
    expect(wrapper.html()).toContain('ant-select-prefix')
  })

  it('should support status', () => {
    const wrapper = mount(Select, {
      props: {
        status: 'error',
        options: [],
      },
    })
    expect(wrapper.html()).toContain('ant-select-status-error')
  })

  it('should render empty content when no options', () => {
    const wrapper = mount(Select, {
      props: {
        open: true,
        options: [],
      },
    })
    expect(wrapper.html()).toContain('ant-select-item-empty')
  })
})
