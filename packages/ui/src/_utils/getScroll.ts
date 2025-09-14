export default function getScroll(target: HTMLElement | Window | null, top?: boolean): number {
  if (typeof window === 'undefined') {
    return 0
  }

  const method = top ? 'scrollTop' : 'scrollLeft'
  let result = 0
  if (target === window || target === null || target === undefined) {
    result = window[top ? 'pageYOffset' : 'pageXOffset']
  } else {
    result = (target as HTMLElement)[method]
  }

  if (target && target !== window && typeof result !== 'number') {
    result = ((target as HTMLElement).ownerDocument!).documentElement[method]
  }

  return result
}
