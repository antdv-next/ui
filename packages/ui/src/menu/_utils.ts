export function getCollapseMotionProps() {
  const transitionCls = 'ant-motion-collapse'
  function onInlineBeforeEnter(el: Element) {
    const _el = el as HTMLElement
    _el.style.height = '0px'
    _el.style.opacity = '0'
  }

  function onInlineEnter(el: Element) {
    const height = el.scrollHeight
    const _el = el as HTMLElement
    _el.style.height = `${height}px`
    _el.style.opacity = '1'
  }

  function onInlineAfterEnter(el: Element) {
    const _el = el as HTMLElement
    _el.style.height = ''
    _el.style.opacity = ''
  }

  function onInlineBeforeLeave(el: Element) {
    const _el = el as HTMLElement
    _el.style.height = `${el.scrollHeight}px`
    _el.style.opacity = '1'
  }

  function onInlineLeave(el: Element) {
    const _el = el as HTMLElement
    _el.style.height = '0px'
    _el.style.opacity = '0'
  }

  function onInlineAfterLeave(el: Element) {
    const _el = el as HTMLElement
    _el.style.height = ''
    _el.style.opacity = ''
  }

  return {
    appear: true,
    enterToClass: transitionCls,
    enterFromClass: transitionCls,
    enterActiveClass: transitionCls,
    leaveToClass: transitionCls,
    leaveActiveClass: transitionCls,
    leaveFromClass: transitionCls,
    onBeforeEnter: onInlineBeforeEnter,
    onEnter: onInlineEnter,
    onAfterEnter: onInlineAfterEnter,
    onBeforeLeave: onInlineBeforeLeave,
    onLeave: onInlineLeave,
    onAfterLeave: onInlineAfterLeave,
  }
}
