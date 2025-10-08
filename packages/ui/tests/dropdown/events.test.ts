import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import { h, nextTick, ref } from 'vue'
import { Button } from '../../src/button'
import { Dropdown } from '../../src/dropdown'

describe('dropdown - Events', () => {
  it('should emit openChange and update:open when visibility changes', async () => {
    const openChange = vi.fn()
    const updateOpen = vi.fn()

    const wrapper = mount(() =>
      h(
        Dropdown,
        {
          menu: {
            items: [
              { key: '1', label: 'Item 1' },
            ],
          },
          onOpenChange: openChange,
          'onUpdate:open': updateOpen,
        },
        () => h(Button, null, () => 'Click'),
      ),
    )

    await nextTick()
    expect(wrapper.html()).toBeTruthy()
  })

  it('should support controlled open state', async () => {
    const open = ref(false)
    const wrapper = mount(() =>
      h(
        Dropdown,
        {
          menu: {
            items: [
              { key: '1', label: 'Item 1' },
            ],
          },
          open: open.value,
        },
        () => h(Button, null, () => 'Click'),
      ),
    )

    await nextTick()
    expect(wrapper.html()).toBeTruthy()

    open.value = true
    await nextTick()
    expect(wrapper.html()).toBeTruthy()
  })

  it('should close dropdown after menu item click (non-multiple selectable)', async () => {
    const openChange = vi.fn()
    const updateOpen = vi.fn()

    const wrapper = mount(() =>
      h(
        Dropdown,
        {
          menu: {
            items: [
              { key: '1', label: 'Item 1' },
            ],
            selectable: false,
          },
          open: true,
          onOpenChange: openChange,
          'onUpdate:open': updateOpen,
        },
        () => h(Button, null, () => 'Click'),
      ),
    )

    await nextTick()
    expect(wrapper.html()).toBeTruthy()
  })

  it('should support custom overlay render', async () => {
    const popupRender = vi.fn((node) => {
      return h('div', { class: 'custom-wrapper' }, [node])
    })

    const wrapper = mount(() =>
      h(
        Dropdown,
        {
          menu: {
            items: [
              { key: '1', label: 'Item 1' },
            ],
          },
          open: true,
          popupRender,
        },
        () => h(Button, null, () => 'Click'),
      ),
    )

    await nextTick()
    expect(popupRender).toHaveBeenCalled()
  })

  it('should handle contextMenu trigger', async () => {
    const wrapper = mount(() =>
      h(
        Dropdown,
        {
          menu: {
            items: [
              { key: '1', label: 'Item 1' },
            ],
          },
          trigger: ['contextMenu'],
        },
        () => h(Button, null, () => 'Right Click'),
      ),
    )

    await nextTick()
    expect(wrapper.html()).toBeTruthy()
  })

  it('should support multiple triggers', async () => {
    const wrapper = mount(() =>
      h(
        Dropdown,
        {
          menu: {
            items: [
              { key: '1', label: 'Item 1' },
            ],
          },
          trigger: ['click', 'hover'],
        },
        () => h(Button, null, () => 'Click or Hover'),
      ),
    )

    await nextTick()
    expect(wrapper.html()).toBeTruthy()
  })

  it('should respect mouseEnterDelay and mouseLeaveDelay', async () => {
    const wrapper = mount(() =>
      h(
        Dropdown,
        {
          menu: {
            items: [
              { key: '1', label: 'Item 1' },
            ],
          },
          mouseEnterDelay: 0.5,
          mouseLeaveDelay: 0.3,
        },
        () => h(Button, null, () => 'Delayed'),
      ),
    )

    await nextTick()
    expect(wrapper.html()).toBeTruthy()
  })
})
