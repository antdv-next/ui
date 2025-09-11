import { describe } from 'vitest'
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
})
