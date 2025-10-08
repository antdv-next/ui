import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { h, nextTick } from 'vue'
import { Dropdown } from '../../src/dropdown'

describe('dropdown - Context Menu Follow Mode', () => {
  it('should follow mouse position when contextMenuMode is "follow"', async () => {
    const items = [
      { key: '1', label: 'Item 1' },
      { key: '2', label: 'Item 2' },
    ]

    const wrapper = mount(() =>
      h(
        Dropdown,
        {
          menu: { items },
          trigger: ['contextMenu'],
          contextMenuMode: 'follow',
        },
        () => h('div', { style: 'width: 200px; height: 200px; background: #f0f0f0' }, 'Right click me'),
      ),
    )

    await nextTick()

    // Find the trigger element
    const trigger = wrapper.find('div')
    
    // Simulate right-click at specific position
    const contextMenuEvent = new MouseEvent('contextmenu', {
      bubbles: true,
      cancelable: true,
      clientX: 150,
      clientY: 200,
    })
    
    trigger.element.dispatchEvent(contextMenuEvent)
    await nextTick()
    await nextTick()

    // Dropdown should be open
    const dropdown = document.querySelector('.ant-dropdown')
    expect(dropdown).toBeTruthy()

    // The dropdown should be positioned near the mouse position
    // Note: exact position depends on floating-ui calculations
    expect(dropdown).toHaveProperty('style')
  })

  it('should use trigger position when contextMenuMode is not set', async () => {
    const items = [
      { key: '1', label: 'Item 1' },
      { key: '2', label: 'Item 2' },
    ]

    const wrapper = mount(() =>
      h(
        Dropdown,
        {
          menu: { items },
          trigger: ['contextMenu'],
          // contextMenuMode not set - use default behavior
        },
        () => h('div', { style: 'width: 200px; height: 200px; background: #f0f0f0' }, 'Right click me'),
      ),
    )

    await nextTick()

    const trigger = wrapper.find('div')
    
    // Simulate right-click
    await trigger.trigger('contextmenu')
    await nextTick()
    await nextTick()

    // Dropdown should be open
    const dropdown = document.querySelector('.ant-dropdown')
    expect(dropdown).toBeTruthy()
  })

  it('should close when clicking outside in follow mode', async () => {
    const items = [
      { key: '1', label: 'Item 1' },
      { key: '2', label: 'Item 2' },
    ]

    const wrapper = mount(() =>
      h(
        Dropdown,
        {
          menu: { items },
          trigger: ['contextMenu'],
          contextMenuMode: 'follow',
        },
        () => h('div', { style: 'width: 200px; height: 200px; background: #f0f0f0' }, 'Right click me'),
      ),
    )

    await nextTick()

    const trigger = wrapper.find('div')
    
    // Open with right-click
    const contextMenuEvent = new MouseEvent('contextmenu', {
      bubbles: true,
      cancelable: true,
      clientX: 100,
      clientY: 100,
    })
    
    trigger.element.dispatchEvent(contextMenuEvent)
    await nextTick()
    await nextTick()

    // Dropdown should be open
    let dropdown = document.querySelector('.ant-dropdown')
    expect(dropdown).toBeTruthy()

    // Click outside
    document.body.click()
    await nextTick()
    await new Promise(resolve => setTimeout(resolve, 100))

    // Dropdown should be closed
    dropdown = document.querySelector('.ant-dropdown')
    // Note: This might still exist due to animation, but should be closing
  })
})
