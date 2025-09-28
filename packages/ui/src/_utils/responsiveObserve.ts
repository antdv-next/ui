import { computed } from 'vue'
import { getCssVar } from './css'

export type Breakpoint = 'xxxl' | 'xxl' | 'xl' | 'lg' | 'md' | 'sm' | 'xs'
export type BreakpointMap = Record<Breakpoint, string>
export type ScreenMap = Partial<Record<Breakpoint, boolean>>
export type ScreenSizeMap = Partial<Record<Breakpoint, number>>
export const responsiveArray: Breakpoint[] = ['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs']

type SubscribeFunc = (screens: ScreenMap) => void

function getResponsiveMap(): BreakpointMap {
  return {
  // TODO: --namespace to config provider
    xs: `(max-width: ${getCssVar('--ant-screen-xs-max')})`,
    sm: `(min-width: ${getCssVar('--ant-screen-sm')})`,
    md: `(min-width: ${getCssVar('--ant-screen-md')})`,
    lg: `(min-width: ${getCssVar('--ant-screen-lg')})`,
    xl: `(min-width: ${getCssVar('--ant-screen-xl')})`,
    xxl: `(min-width: ${getCssVar('--ant-screen-xxl')})`,
    xxxl: `(min-width: ${getCssVar('--ant-screen-xxxl')})`,
  }
}

export default function useResponsiveObserve() {
  return computed(() => {
    const responsiveMap: BreakpointMap = getResponsiveMap()
    const subscribers = new Map<number, SubscribeFunc>()
    let subUid = -1
    let screens = {}
    return {
      matchHandlers: {} as {
        [prop: string]: {
          mql: MediaQueryList
          listener: ((this: MediaQueryList, ev: MediaQueryListEvent) => any) | null
        }
      },
      dispatch(pointMap: ScreenMap) {
        screens = pointMap
        subscribers.forEach(func => func(screens))
        return subscribers.size >= 1
      },
      subscribe(func: SubscribeFunc): number {
        if (!subscribers.size)
          this.register()
        subUid += 1
        subscribers.set(subUid, func)
        func(screens)
        return subUid
      },
      unsubscribe(paramToken: number) {
        subscribers.delete(paramToken)
        if (!subscribers.size)
          this.unregister()
      },
      unregister() {
        Object.keys(responsiveMap).forEach((screen: string) => {
          const matchMediaQuery = responsiveMap[screen as Breakpoint]
          const handler = this.matchHandlers[matchMediaQuery]
          handler?.mql.removeListener(handler?.listener)
        })
        subscribers.clear()
      },
      register() {
        Object.keys(responsiveMap).forEach((screen: string) => {
          const matchMediaQuery = responsiveMap[screen as Breakpoint]
          const listener = ({ matches }: { matches: boolean }) => {
            this.dispatch({
              ...screens,
              [screen]: matches,
            })
          }
          const mql = window.matchMedia(matchMediaQuery)
          mql.addListener(listener)
          this.matchHandlers[matchMediaQuery] = {
            mql,
            listener,
          }

          listener(mql)
        })
      },
      responsiveMap,
    }
  })
}
