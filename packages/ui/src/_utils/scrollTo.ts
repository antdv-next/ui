import getScroll from './getScroll'

interface ScrollToOptions {
  getContainer?: () => HTMLElement | Window | Document
  callback?: () => void
  duration?: number
}

function easeInOutCubic(t: number, b: number, c: number, d: number) {
  const cc = c - b
  t /= d / 2
  if (t < 1) {
    return (cc / 2) * t * t * t + b
  }
  return (cc / 2) * ((t -= 2) * t * t + 2) + b
}

export default function scrollTo(y: number, options: ScrollToOptions = {}) {
  const { getContainer = () => window, callback, duration = 450 } = options
  const container = getContainer()
  const scrollTop = getScroll(container as HTMLElement | Window | null, true)
  const startTime = Date.now()

  const frameFunc = () => {
    const timestamp = Date.now()
    const time = timestamp - startTime
    const nextScrollTop = easeInOutCubic(time > duration ? duration : time, scrollTop, y, duration)
    if (container === window) {
      (container as Window).scrollTo(window.pageXOffset, nextScrollTop)
    } else {
      (container as HTMLElement).scrollTop = nextScrollTop
    }
    if (time < duration) {
      requestAnimationFrame(frameFunc)
    } else if (typeof callback === 'function') {
      callback()
    }
  }
  requestAnimationFrame(frameFunc)
}
