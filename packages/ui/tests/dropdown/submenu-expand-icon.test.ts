import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { h, nextTick } from 'vue'
import { Button } from '../../src/button'
import { Dropdown } from '../../src/dropdown'

describe('dropdown - Submenu ExpandIcon', () => {
  it('should render submenu with default expand icon', async () => {
    const items = [
      {
        key: 'sub1',
        label: 'Submenu',
        children: [
          { key: 'sub1-1', label: 'Submenu Item 1' },
          { key: 'sub1-2', label: 'Submenu Item 2' },
        ],
      },
    ]

    const wrapper = mount(() =>
      h(
        Dropdown,
        {
          menu: { items },
          open: true,
        },
        () => h(Button, null, () => 'Click'),
      ),
    )

    await nextTick()
    await nextTick() // Extra tick for teleport

    // Should have the default expand icon (RightOutlined)
    expect(document.body.innerHTML).toContain('ant-dropdown-menu-submenu-arrow')
  })

  it('should render submenu with custom expand icon from menu prop', async () => {
    const CustomIcon = () => h('span', { class: 'custom-expand-icon' }, '>')

    const items = [
      {
        key: 'sub1',
        label: 'Submenu',
        children: [
          { key: 'sub1-1', label: 'Submenu Item 1' },
        ],
      },
    ]

    const wrapper = mount(() =>
      h(
        Dropdown,
        {
          menu: {
            items,
            expandIcon: CustomIcon,
          },
          open: true,
        },
        () => h(Button, null, () => 'Click'),
      ),
    )

    await nextTick()
    await nextTick()

    // Should use the custom expand icon from menu.expandIcon
    expect(document.body.innerHTML).toContain('custom-expand-icon')
  })

  it('should apply dropdown-specific expand icon styling', async () => {
    const items = [
      {
        key: 'sub1',
        label: 'Submenu',
        children: [
          { key: 'sub1-1', label: 'Submenu Item 1' },
        ],
      },
    ]

    const wrapper = mount(() =>
      h(
        Dropdown,
        {
          menu: { items },
          open: true,
        },
        () => h(Button, null, () => 'Click'),
      ),
    )

    await nextTick()
    await nextTick()

    // Verify the expand icon has dropdown-specific classes
    const bodyHTML = document.body.innerHTML
    expect(bodyHTML).toContain('ant-dropdown-menu-submenu-arrow')
    expect(bodyHTML).toContain('ant-dropdown-menu-submenu-arrow-icon')
  })

  it('should work with nested submenus', async () => {
    const items = [
      {
        key: 'sub1',
        label: 'Level 1',
        children: [
          {
            key: 'sub1-1',
            label: 'Level 2',
            children: [
              { key: 'sub1-1-1', label: 'Item' },
            ],
          },
        ],
      },
    ]

    const wrapper = mount(() =>
      h(
        Dropdown,
        {
          menu: { items },
          open: true,
        },
        () => h(Button, null, () => 'Click'),
      ),
    )

    await nextTick()
    await nextTick()

    // Both levels should have the expand icon
    const bodyHTML = document.body.innerHTML
    const expandIconMatches = bodyHTML.match(/ant-dropdown-menu-submenu-arrow/g)
    expect(expandIconMatches).toBeTruthy()
    // At least one expand icon should be present
    expect(expandIconMatches!.length).toBeGreaterThan(0)
  })
})
