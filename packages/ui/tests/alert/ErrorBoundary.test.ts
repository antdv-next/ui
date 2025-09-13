import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import { defineComponent, h } from 'vue'
import ErrorBoundary from '../../src/alert/ErrorBoundary.vue'

// 创建一个正常的测试组件
const NormalComponent = defineComponent({
  name: 'NormalComponent',
  render() {
    return h('div', 'Normal component content')
  },
})

describe('errorBoundary', () => {
  it('should render children when no error occurs', () => {
    const wrapper = mount(ErrorBoundary, {
      slots: {
        default: () => h(NormalComponent),
      },
    })

    expect(wrapper.text()).toContain('Normal component content')
    expect(wrapper.find('.ant-alert').exists()).toBe(false)
  })

  it('should render error alert when error occurs', async () => {
    // 捕获控制台错误，避免测试时输出错误信息
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})

    // 创建一个ErrorBoundary实例并直接测试错误状态
    const wrapper = mount(ErrorBoundary, {
      props: {
        message: 'Test error message',
      },
      slots: {
        default: () => h('div', 'Normal content'),
      },
    })

    // 手动触发错误状态
    const vm = wrapper.vm as any
    vm.error = new Error('Test error message')
    vm.errorInfo = { componentStack: 'test component stack' }

    await wrapper.vm.$nextTick()

    expect(wrapper.find('.ant-alert').exists()).toBe(true)
    expect(wrapper.find('.ant-alert-error').exists()).toBe(true)
    expect(wrapper.text()).toContain('Test error message')

    consoleSpy.mockRestore()
  })

  it('should render custom error message', async () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})

    const customMessage = 'Custom error message'

    const ThrowErrorInRender = {
      render() {
        throw new Error('Test error message')
      },
    }

    const wrapper = mount(ErrorBoundary, {
      props: {
        message: customMessage,
      },
      slots: {
        default: () => h(ThrowErrorInRender),
      },
    })

    await wrapper.vm.$nextTick()
    await new Promise(resolve => setTimeout(resolve, 100))

    expect(wrapper.text()).toContain(customMessage)

    consoleSpy.mockRestore()
  })

  it('should render custom error description', async () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})

    const customDescription = 'Custom error description'

    const ThrowErrorInRender = {
      render() {
        throw new Error('Test error message')
      },
    }

    const wrapper = mount(ErrorBoundary, {
      props: {
        description: customDescription,
      },
      slots: {
        default: () => h(ThrowErrorInRender),
      },
    })

    await wrapper.vm.$nextTick()
    await new Promise(resolve => setTimeout(resolve, 100))

    expect(wrapper.text()).toContain(customDescription)

    consoleSpy.mockRestore()
  })

  it('should pass id prop to Alert component', async () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})

    const testId = 'test-error-boundary'

    const ThrowErrorInRender = {
      render() {
        throw new Error('Test error message')
      },
    }

    const wrapper = mount(ErrorBoundary, {
      props: {
        id: testId,
      },
      slots: {
        default: () => h(ThrowErrorInRender),
      },
    })

    await wrapper.vm.$nextTick()
    await new Promise(resolve => setTimeout(resolve, 100))

    expect(wrapper.find(`#${testId}`).exists()).toBe(true)

    consoleSpy.mockRestore()
  })
})
