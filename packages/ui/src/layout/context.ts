import type { LayoutContextProps } from './define'
import createContext from '../_utils/createContext'

const defaultContext: LayoutContextProps = {
  siderHook: {
    addSider: () => undefined,
    removeSider: () => undefined,
  },
}

const LayoutContext = createContext<LayoutContextProps>(defaultContext)

export const useLayoutContext = LayoutContext.useInject
export const useProvideLayoutContext = LayoutContext.useProvide
