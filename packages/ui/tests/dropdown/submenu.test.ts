import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import { defineComponent, h, nextTick } from 'vue'
import { Dropdown, DropdownItem } from '../../src'

const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

describe('dropdown submenu', () => {
  it('closes parent popup when submenu item is clicked', async () => {
    const onOpenChange = vi.fn()
    const items = [
      {
        key: 'sub',
        label: 'Sub menu',
        children: [
          { key: 'child', label: 'Sub menu item' },
        ],
      },
    ]

    const wrapper = mount(Dropdown, {
      props: {
        trigger: ['click'],
        menu: {
          items,
          openKeys: ['sub'],
        },
        onOpenChange,
      },
      slots: {
        default: () => h('button', { class: 'dropdown-trigger' }, 'Trigger'),
      },
      attachTo: document.body,
    })

    const trigger = wrapper.get('button.dropdown-trigger')
    await trigger.trigger('click')
    await nextTick()
    await nextTick()

    const overlay = document.body.querySelector('.ant-dropdown') as HTMLElement | null
    expect(overlay).not.toBeNull()

    await nextTick()
    await nextTick()

    const menuItems = Array.from(document.body.querySelectorAll('.ant-dropdown-menu-item')) as HTMLElement[]
    const target = menuItems.find(element => element.textContent?.includes('Sub menu item'))
    expect(target).toBeTruthy()

    target!.click()
    await nextTick()
    await nextTick()

    const closeCall = onOpenChange.mock.calls.find(([open, meta]) => open === false && meta?.source === 'menu')
    expect(closeCall).toBeTruthy()

    wrapper.unmount()
  })

  it('closes after clicking dropdown item rendered inside nested slot wrapper', async () => {
    const onOpenChange = vi.fn()

    const Wrapper = defineComponent({
      setup(_, { slots }) {
        return () => h('div', { class: 'submenu-wrapper' }, slots.default?.())
      },
    })

    const wrapper = mount(Dropdown, {
      props: {
        trigger: ['click'],
        onOpenChange,
      },
      slots: {
        default: () => h('button', { class: 'dropdown-trigger' }, 'Trigger'),
        overlay: () => h(Wrapper, null, {
          default: () => h(DropdownItem, { eventKey: 'child' }, {
            default: () => 'Nested child',
          }),
        }),
      },
      attachTo: document.body,
    })

    const trigger = wrapper.get('button.dropdown-trigger')
    await trigger.trigger('click')
    await nextTick()
    await nextTick()

    const popup = document.body.querySelector('.ant-dropdown') as HTMLElement | null
    expect(popup).not.toBeNull()

    const item = Array.from(document.body.querySelectorAll('.ant-dropdown-menu-item')).find(element => element.textContent?.includes('Nested child')) as HTMLElement | undefined
    expect(item).toBeTruthy()

    item!.click()
    await nextTick()
    await nextTick()

    const closeCall = onOpenChange.mock.calls.find(([open]) => open === false)
    expect(closeCall).toBeTruthy()

    wrapper.unmount()
  })

  it('keeps parent submenu open when pointer moves into popup', async () => {
    const onOpenChange = vi.fn()
    const onMenuOpenChange = vi.fn()
    const items = [
      {
        key: 'sub',
        label: 'Sub menu',
        children: [
          { key: 'child', label: 'Nested option' },
        ],
      },
    ]

    const wrapper = mount(Dropdown, {
      props: {
        trigger: ['hover'],
        menu: {
          items,
          onOpenChange: onMenuOpenChange,
        },
        onOpenChange,
      },
      slots: {
        default: () => h('button', { class: 'dropdown-trigger' }, 'Trigger'),
      },
      attachTo: document.body,
    })

    const trigger = wrapper.get('button.dropdown-trigger')
    await trigger.trigger('mouseenter')
    await wait(200)
    await nextTick()
    await nextTick()

    const submenuTitle = document.body.querySelector('.ant-dropdown-menu-submenu-title') as HTMLElement | null
    expect(submenuTitle).toBeTruthy()

    submenuTitle!.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }))
    await wait(200)
    await nextTick()
    await nextTick()

    const popup = document.body.querySelector('.ant-dropdown-menu-submenu-popup') as HTMLElement | null
    expect(popup).toBeTruthy()

    const dropdownOverlay = document.body.querySelector('.ant-dropdown') as HTMLElement | null
    expect(dropdownOverlay).toBeTruthy()

    dropdownOverlay!.dispatchEvent(new MouseEvent('mouseleave', {
      bubbles: true,
      relatedTarget: popup || undefined,
    }))
    popup!.dispatchEvent(new MouseEvent('mouseenter', {
      bubbles: true,
      relatedTarget: dropdownOverlay || undefined,
    }))

    await wait(200)
    await nextTick()
    await nextTick()

    expect(document.body.querySelector('.ant-dropdown')).toBeTruthy()
    expect(document.body.querySelector('.ant-dropdown-menu-submenu-popup')).toBeTruthy()
    expect(onMenuOpenChange.mock.calls.some(([openKeys]) => Array.isArray(openKeys) && openKeys.length === 0)).toBe(false)
    expect(onOpenChange.mock.calls.some(([open]) => open === false)).toBe(false)

    wrapper.unmount()
  })
})
