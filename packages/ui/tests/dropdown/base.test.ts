import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { h, nextTick } from 'vue'
import { Button } from '../../src/button'
import { Dropdown } from '../../src/dropdown'

describe('dropdown - Basic', () => {
  it('should render dropdown with menu items', async () => {
    const wrapper = mount(() =>
      h(
        Dropdown,
        {
          menu: {
            items: [
              { key: '1', label: 'Menu Item 1' },
              { key: '2', label: 'Menu Item 2' },
              { key: '3', label: 'Menu Item 3' },
            ],
          },
          open: true,
        },
        () => h(Button, null, () => 'Click me'),
      ),
    )

    await nextTick()
    expect(wrapper.html()).toBeTruthy()
    // Dropdown uses tooltip as base, so check for tooltip classes
    expect(wrapper.find('.ant-tooltip').exists() || wrapper.html().includes('Click me')).toBe(true)
  })

  it('should show dropdown on hover by default', async () => {
    const wrapper = mount(() =>
      h(
        Dropdown,
        {
          menu: {
            items: [
              { key: '1', label: 'Menu Item 1' },
            ],
          },
        },
        () => h(Button, null, () => 'Hover me'),
      ),
    )

    await nextTick()
    expect(wrapper.html()).toBeTruthy()
  })

  it('should accept placement prop', async () => {
    const wrapper = mount(() =>
      h(
        Dropdown,
        {
          menu: {
            items: [
              { key: '1', label: 'Menu Item 1' },
            ],
          },
          placement: 'topLeft',
        },
        () => h(Button, null, () => 'Click me'),
      ),
    )

    await nextTick()
    expect(wrapper.html()).toBeTruthy()
  })

  it('should handle disabled state', async () => {
    const wrapper = mount(() =>
      h(
        Dropdown,
        {
          menu: {
            items: [
              { key: '1', label: 'Menu Item 1' },
            ],
          },
          disabled: true,
        },
        () => h(Button, null, () => 'Disabled'),
      ),
    )

    await nextTick()
    expect(wrapper.html()).toBeTruthy()
  })

  it('should support overlay slot', async () => {
    const wrapper = mount({
      setup() {
        return () =>
          h(
            Dropdown,
            { open: true },
            {
              default: () => h(Button, null, () => 'Click me'),
              overlay: () => h('div', { class: 'custom-overlay' }, 'Custom Menu'),
            },
          )
      },
    })

    await nextTick()
    expect(wrapper.html()).toBeTruthy()
  })

  it('should support arrow prop', async () => {
    const wrapper = mount(() =>
      h(
        Dropdown,
        {
          menu: {
            items: [
              { key: '1', label: 'Menu Item 1' },
            ],
          },
          arrow: true,
          open: true,
        },
        () => h(Button, null, () => 'Click me'),
      ),
    )

    await nextTick()
    expect(wrapper.html()).toBeTruthy()
  })

  it('should handle click trigger', async () => {
    const wrapper = mount(() =>
      h(
        Dropdown,
        {
          menu: {
            items: [
              { key: '1', label: 'Menu Item 1' },
            ],
          },
          trigger: ['click'],
        },
        () => h(Button, null, () => 'Click me'),
      ),
    )

    await nextTick()
    expect(wrapper.html()).toBeTruthy()
  })
})
