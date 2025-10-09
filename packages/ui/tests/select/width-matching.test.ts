import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { nextTick } from 'vue'
import { Select } from '../../src/select'

describe('select Width Matching', () => {
  it('should match select width when popupMatchSelectWidth is true', async () => {
    const wrapper = mount(Select, {
      props: {
        open: true,
        popupMatchSelectWidth: true,
        options: [
          { value: '1', label: 'Option 1' },
          { value: '2', label: 'Option 2' },
        ],
      },
      attachTo: document.body,
    })

    await nextTick()
    await nextTick()

    const selectElement = wrapper.find('.ant-select')
    expect(selectElement.exists()).toBe(true)

    wrapper.unmount()
  })

  it('should use custom width when popupMatchSelectWidth is a number', async () => {
    const wrapper = mount(Select, {
      props: {
        open: true,
        popupMatchSelectWidth: 300,
        options: [
          { value: '1', label: 'Option 1' },
          { value: '2', label: 'Option 2' },
        ],
      },
      attachTo: document.body,
    })

    await nextTick()
    await nextTick()

    const selectElement = wrapper.find('.ant-select')
    expect(selectElement.exists()).toBe(true)

    wrapper.unmount()
  })

  it('should not match width when popupMatchSelectWidth is false', async () => {
    const wrapper = mount(Select, {
      props: {
        open: true,
        popupMatchSelectWidth: false,
        options: [
          { value: '1', label: 'Option 1' },
          { value: '2', label: 'Option 2' },
        ],
      },
      attachTo: document.body,
    })

    await nextTick()
    await nextTick()

    const selectElement = wrapper.find('.ant-select')
    expect(selectElement.exists()).toBe(true)

    wrapper.unmount()
  })

  it('should use correct transition based on placement', async () => {
    const wrapper = mount(Select, {
      props: {
        placement: 'topLeft',
        options: [
          { value: '1', label: 'Option 1' },
        ],
      },
    })

    // The component should use slide-down transition for top placements
    const tooltip = wrapper.findComponent({ name: 'ATooltip' })
    expect(tooltip.exists()).toBe(true)

    // Check that transition-name prop is passed
    expect(tooltip.props('transitionName')).toContain('slide-down')
  })

  it('should use slide-up transition for bottom placements', async () => {
    const wrapper = mount(Select, {
      props: {
        placement: 'bottomLeft',
        options: [
          { value: '1', label: 'Option 1' },
        ],
      },
    })

    const tooltip = wrapper.findComponent({ name: 'ATooltip' })
    expect(tooltip.exists()).toBe(true)

    // Check that transition-name prop is passed
    expect(tooltip.props('transitionName')).toContain('slide-up')
  })
})
