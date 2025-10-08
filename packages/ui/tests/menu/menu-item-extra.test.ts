import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { h, nextTick } from 'vue'
import { MenuItem } from '../../src/menu'

describe('menu-item - extra', () => {
  it('should render extra content', async () => {
    const wrapper = mount(() =>
      h(MenuItem, {
        extra: '⌘P',
      }, () => 'Profile'),
    )

    await nextTick()
    expect(wrapper.html()).toContain('⌘P')
    expect(wrapper.find('.ant-menu-item-extra').exists()).toBe(true)
  })

  it('should add with-extra class when extra exists', async () => {
    const wrapper = mount(() =>
      h(MenuItem, {
        extra: '⌘S',
      }, () => 'Settings'),
    )

    await nextTick()
    expect(wrapper.find('.ant-menu-title-content-with-extra').exists()).toBe(true)
  })

  it('should support extra as VNode', async () => {
    const wrapper = mount(() =>
      h(MenuItem, {
        extra: () => h('span', { class: 'custom-extra' }, 'Custom'),
      }, () => 'Item'),
    )

    await nextTick()
    expect(wrapper.find('.custom-extra').exists()).toBe(true)
    expect(wrapper.html()).toContain('Custom')
  })

  it('should support extra slot', async () => {
    const wrapper = mount({
      setup() {
        return () =>
          h(MenuItem, null, {
            default: () => 'Item',
            extra: () => h('kbd', null, '⌘K'),
          })
      },
    })

    await nextTick()
    expect(wrapper.find('kbd').exists()).toBe(true)
    expect(wrapper.html()).toContain('⌘K')
  })

  it('should handle extra as 0', async () => {
    const wrapper = mount(() =>
      h(MenuItem, {
        extra: 0,
      }, () => 'Zero'),
    )

    await nextTick()
    // Should have the with-extra class even for 0
    expect(wrapper.find('.ant-menu-title-content-with-extra').exists()).toBe(true)
  })

  it('should render extra with icon', async () => {
    const wrapper = mount(() =>
      h(MenuItem, {
        icon: () => h('span', { class: 'icon' }, 'I'),
        extra: '⌘B',
      }, () => 'Billing'),
    )

    await nextTick()
    expect(wrapper.find('.icon').exists()).toBe(true)
    expect(wrapper.html()).toContain('⌘B')
    expect(wrapper.html()).toContain('Billing')
  })
})
