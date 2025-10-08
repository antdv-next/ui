import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { h, nextTick } from 'vue'
import { Button } from '../../src/button'
import { Dropdown } from '../../src/dropdown'

describe('dropdown - Tooltip Close Behavior', () => {
  it('should close dropdown tooltip when mouse leaves the entire dropdown area', async () => {
    const items = [
      { key: '1', label: 'Item 1' },
      { key: '2', label: 'Item 2' },
    ]

    const wrapper = mount(() =>
      h(
        Dropdown,
        {
          menu: { items },
          trigger: ['hover'],
        },
        () => h(Button, null, () => 'Hover me'),
      ),
    )

    await nextTick()
    await nextTick()

    // Hover on button to open dropdown
    const button = wrapper.find('button')
    await button.trigger('mouseenter')
    await nextTick()
    await new Promise(resolve => setTimeout(resolve, 200))

    // Dropdown should be open
    let dropdownMenu = document.querySelector('.ant-dropdown-menu')
    expect(dropdownMenu).toBeTruthy()

    // Mouse leaves button
    await button.trigger('mouseleave')
    await nextTick()

    // Before the delay completes, mouse enters the dropdown menu
    if (dropdownMenu) {
      dropdownMenu.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }))
      await nextTick()
      await new Promise(resolve => setTimeout(resolve, 150))
    }

    // Dropdown should still be open (mouse is in menu)
    dropdownMenu = document.querySelector('.ant-dropdown-menu')
    expect(dropdownMenu).toBeTruthy()

    // Now mouse leaves the dropdown menu
    if (dropdownMenu) {
      dropdownMenu.dispatchEvent(new MouseEvent('mouseleave', { bubbles: true }))
      await nextTick()
      await new Promise(resolve => setTimeout(resolve, 200))
    }

    // Dropdown should be closed
    dropdownMenu = document.querySelector('.ant-dropdown-menu')
    expect(dropdownMenu).toBeFalsy()
  })

  it('should close dropdown when hovering on submenu and then leaving', async () => {
    const items = [
      {
        key: 'sub1',
        label: 'Submenu',
        type: 'submenu' as const,
        children: [
          { key: 'sub1-1', label: 'Sub Item 1' },
        ],
      },
    ]

    const wrapper = mount(() =>
      h(
        Dropdown,
        {
          menu: { items },
          trigger: ['hover'],
          open: true,
        },
        () => h(Button, null, () => 'Hover me'),
      ),
    )

    await nextTick()
    await nextTick()

    // Dropdown is open
    let dropdownMenu = document.querySelector('.ant-dropdown-menu')
    expect(dropdownMenu).toBeTruthy()

    // Open submenu
    const submenuTrigger = document.querySelector('.ant-dropdown-menu-submenu-title')
    if (submenuTrigger) {
      submenuTrigger.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }))
      await nextTick()
      await new Promise(resolve => setTimeout(resolve, 200))
    }

    // Submenu popup should be open
    let submenuPopup = document.querySelector('.ant-dropdown-menu-submenu-popup')
    expect(submenuPopup).toBeTruthy()

    // Leave submenu popup
    if (submenuPopup) {
      submenuPopup.dispatchEvent(new MouseEvent('mouseleave', { bubbles: true }))
      await nextTick()
      await new Promise(resolve => setTimeout(resolve, 200))
    }

    // Submenu should close
    submenuPopup = document.querySelector('.ant-dropdown-menu-submenu-popup')
    expect(submenuPopup).toBeFalsy()

    // Main dropdown should still be there (not testing main dropdown close here)
    dropdownMenu = document.querySelector('.ant-dropdown-menu')
    expect(dropdownMenu).toBeTruthy()
  })
})
