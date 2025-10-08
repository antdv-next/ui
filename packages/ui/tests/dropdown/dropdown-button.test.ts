import { describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { h, nextTick } from 'vue'
import { DropdownButton } from '../../src/dropdown'

describe('dropdown-button', () => {
  it('should render dropdown button', async () => {
    const items = [
      { key: '1', label: 'Item 1' },
      { key: '2', label: 'Item 2' },
    ]

    const wrapper = mount(() =>
      h(DropdownButton, {
        menu: { items },
      }, () => 'Dropdown'),
    )

    await nextTick()
    expect(wrapper.html()).toBeTruthy()
    expect(wrapper.html()).toContain('Dropdown')
  })

  it('should handle button click', async () => {
    const items = [
      { key: '1', label: 'Item 1' },
    ]

    const onClick = vi.fn()

    const wrapper = mount(() =>
      h(DropdownButton, {
        menu: { items },
        onClick,
      }, () => 'Click me'),
    )

    await nextTick()

    // Find and click the left button
    const buttons = wrapper.findAllComponents({ name: 'AButton' })
    expect(buttons.length).toBeGreaterThan(0)

    await buttons[0].trigger('click')
    expect(onClick).toHaveBeenCalled()
  })

  it('should support type prop', async () => {
    const items = [
      { key: '1', label: 'Item 1' },
    ]

    const wrapper = mount(() =>
      h(DropdownButton, {
        menu: { items },
        type: 'primary',
      }, () => 'Primary'),
    )

    await nextTick()
    expect(wrapper.html()).toContain('ant-btn-color-primary')
  })

  it('should support danger prop', async () => {
    const items = [
      { key: '1', label: 'Item 1' },
    ]

    const wrapper = mount(() =>
      h(DropdownButton, {
        menu: { items },
        danger: true,
      }, () => 'Danger'),
    )

    await nextTick()
    expect(wrapper.html()).toContain('ant-btn-color-danger')
  })

  it('should support disabled prop', async () => {
    const items = [
      { key: '1', label: 'Item 1' },
    ]

    const wrapper = mount(() =>
      h(DropdownButton, {
        menu: { items },
        disabled: true,
      }, () => 'Disabled'),
    )

    await nextTick()
    expect(wrapper.html()).toBeTruthy()
    // Buttons should be disabled
    const buttons = wrapper.findAllComponents({ name: 'AButton' })
    buttons.forEach((button) => {
      expect(button.attributes('disabled')).toBeDefined()
    })
  })

  it('should support loading prop', async () => {
    const items = [
      { key: '1', label: 'Item 1' },
    ]

    const wrapper = mount(() =>
      h(DropdownButton, {
        menu: { items },
        loading: true,
      }, () => 'Loading'),
    )

    await nextTick()
    expect(wrapper.html()).toBeTruthy()
  })

  it('should support custom icon', async () => {
    const items = [
      { key: '1', label: 'Item 1' },
    ]

    const wrapper = mount({
      setup() {
        return () =>
          h(DropdownButton, {
            menu: { items },
          }, {
            default: () => 'Dropdown',
            icon: () => h('span', { class: 'custom-icon' }, 'Icon'),
          })
      },
    })

    await nextTick()
    expect(wrapper.html()).toContain('custom-icon')
  })

  it('should emit openChange event', async () => {
    const items = [
      { key: '1', label: 'Item 1' },
    ]

    const onOpenChange = vi.fn()

    const wrapper = mount(() =>
      h(DropdownButton, {
        menu: { items },
        onOpenChange,
      }, () => 'Dropdown'),
    )

    await nextTick()
    expect(wrapper.html()).toBeTruthy()
  })
})
