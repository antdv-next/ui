import type { Component } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

export default function mountTest(node: Component) {
  describe(`mount and unmount`, () => {
    it('component could be updated and unmounted without errors', () => {
      const wrpper = mount(node)
      expect(() => {
        wrpper.setProps({})
        wrpper.unmount()
      }).not.toThrow()
    })
  })
}
