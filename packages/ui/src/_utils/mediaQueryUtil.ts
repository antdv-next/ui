export type MediaQueryHandler = (mql: MediaQueryList | MediaQueryListEvent) => void

export function addMediaQueryListener(mql: MediaQueryList | null | undefined, handler: MediaQueryHandler) {
  if (!mql || !handler) {
    return
  }
  if (typeof mql.addEventListener === 'function') {
    mql.addEventListener('change', handler)
  } else if (typeof (mql as MediaQueryList).addListener === 'function') {
    ;(mql as MediaQueryList).addListener(handler)
  }
}

export function removeMediaQueryListener(mql: MediaQueryList | null | undefined, handler: MediaQueryHandler) {
  if (!mql || !handler) {
    return
  }
  if (typeof mql.removeEventListener === 'function') {
    mql.removeEventListener('change', handler)
  } else if (typeof (mql as MediaQueryList).removeListener === 'function') {
    ;(mql as MediaQueryList).removeListener(handler)
  }
}
