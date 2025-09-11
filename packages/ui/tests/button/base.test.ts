import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { h } from 'vue'
import { Button } from '../../src'
import mountTest from '../shared/mountTest.ts'

describe('button', () => {
  mountTest(Button)
  mountTest(h(Button, {
    size: 'large',
  }))
  mountTest(h(Button, {
    size: 'small',
  }))

  it('renders correctly', () => {
    const wrapper = mount(h(Button, {}, {
      default: () => 'Follow',
    }))
    expect(wrapper.html()).toMatchSnapshot()
    wrapper.unmount()
  })
})
