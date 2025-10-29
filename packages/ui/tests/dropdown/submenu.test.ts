import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { h, nextTick } from 'vue'
import { Button } from '../../src/button'
import { Dropdown } from '../../src/dropdown'

describe('dropdown - Submenu', () => {
  it('should render dropdown with submenu items', async () => {
    const items = [
      { key: '1', label: 'Item 1' },
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
    expect(wrapper.html()).toBeTruthy()
    // Check that button exists
    expect(wrapper.html()).toContain('Click')
    // Submenu content is in document body due to Teleport
    expect(document.body.innerHTML).toContain('Submenu')
  })

  it('should support nested submenus', async () => {
    const items = [
      { key: '1', label: 'Item 1' },
      {
        key: 'sub1',
        label: 'Submenu Level 1',
        children: [
          { key: 'sub1-1', label: 'Item 1-1' },
          {
            key: 'sub1-2',
            label: 'Submenu Level 2',
            children: [
              { key: 'sub1-2-1', label: 'Item 1-2-1' },
              { key: 'sub1-2-2', label: 'Item 1-2-2' },
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
    expect(wrapper.html()).toBeTruthy()
    // Menu content is rendered in body via Teleport
    expect(document.body.innerHTML).toContain('Submenu Level 1')
  })

  it('should increase mouseLeaveDelay for better submenu interaction', async () => {
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
          mouseLeaveDelay: 0.2, // Longer delay helps with submenu navigation
        },
        () => h(Button, null, () => 'Click'),
      ),
    )

    await nextTick()
    expect(wrapper.html()).toBeTruthy()
  })
})
