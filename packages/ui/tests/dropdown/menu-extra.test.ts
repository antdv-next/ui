import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { h, nextTick } from 'vue'
import { Button } from '../../src/button'
import { Dropdown } from '../../src/dropdown'

describe('dropdown - menu extra', () => {
  it('should render menu items with extra', async () => {
    const items = [
      {
        key: '1',
        label: 'Profile',
        extra: '⌘P',
      },
      {
        key: '2',
        label: 'Settings',
        extra: '⌘S',
      },
    ]

    const wrapper = mount(() =>
      h(Dropdown, {
        menu: { items },
        open: true,
      }, () => h(Button, null, () => 'Menu')),
    )

    await nextTick()
    await nextTick() // Extra tick for teleport

    // Check in document body (teleported)
    expect(document.body.innerHTML).toContain('⌘P')
    expect(document.body.innerHTML).toContain('⌘S')
    expect(document.body.innerHTML).toContain('Profile')
    expect(document.body.innerHTML).toContain('Settings')
  })

  it('should render extra with icons', async () => {
    const items = [
      {
        key: '1',
        label: 'My Account',
        disabled: true,
      },
      {
        type: 'divider' as const,
      },
      {
        key: '2',
        label: 'Billing',
        extra: '⌘B',
      },
    ]

    const wrapper = mount(() =>
      h(Dropdown, {
        menu: { items },
        open: true,
      }, () => h(Button, null, () => 'Menu')),
    )

    await nextTick()
    await nextTick()

    expect(document.body.innerHTML).toContain('⌘B')
    expect(document.body.innerHTML).toContain('Billing')
    expect(document.body.innerHTML).toContain('My Account')
  })

  it('should support extra in submenu items', async () => {
    const items = [
      {
        key: 'sub1',
        label: 'Submenu',
        children: [
          {
            key: 'sub1-1',
            label: 'Item 1',
            extra: '⌘1',
          },
          {
            key: 'sub1-2',
            label: 'Item 2',
            extra: '⌘2',
          },
        ],
      },
    ]

    const wrapper = mount(() =>
      h(Dropdown, {
        menu: { items },
        open: true,
      }, () => h(Button, null, () => 'Menu')),
    )

    await nextTick()
    await nextTick()

    expect(document.body.innerHTML).toContain('Submenu')
  })
})
