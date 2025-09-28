import type { ComputedRef } from 'vue'
import type { DropdownItemClickInfo } from './define'
import { computed } from 'vue'
import createContext from '../_utils/createContext'

export interface DropdownOverlayContextProps {
  prefixCls: ComputedRef<string>
  onItemClick?: (info: DropdownItemClickInfo) => void
}

const DropdownOverlayContext = createContext<DropdownOverlayContextProps>({
  prefixCls: computed(() => 'ant-dropdown'),
  onItemClick: undefined,
})

export function useProvideDropdownOverlay(context: DropdownOverlayContextProps) {
  DropdownOverlayContext.useProvide(context)
}

export function useDropdownOverlay() {
  return DropdownOverlayContext.useInject()
}
