import type { ComputedRef, InjectionKey, Ref } from 'vue'
import { computed, inject, provide } from 'vue'
import { generateKey } from '../env.ts'

export const ZIndexContextKey: InjectionKey<Ref<number>> = generateKey('zIndexContext')

export type ZIndexContainer
  = | 'Modal'
    | 'Drawer'
    | 'Popover'
    | 'Popconfirm'
    | 'Tooltip'
    | 'Tour'
    | 'FloatButton'

export type ZIndexConsumer = 'SelectLike' | 'Dropdown' | 'DatePicker' | 'Menu' | 'ImagePreview'

// Z-Index control range
// Container: 1000 + offset 100 (max base + 10 * offset = 2000)
// Popover: offset 50
// Notification: Container Max zIndex + componentOffset

const CONTAINER_OFFSET = 100
const CONTAINER_OFFSET_MAX_COUNT = 10

export const CONTAINER_MAX_OFFSET = CONTAINER_OFFSET * CONTAINER_OFFSET_MAX_COUNT

/**
 * Static function will default be the `CONTAINER_MAX_OFFSET`.
 * But it still may have children component like Select, Dropdown.
 * So the warning zIndex should exceed the `CONTAINER_MAX_OFFSET`.
 */
// const CONTAINER_MAX_OFFSET_WITH_CHILDREN = CONTAINER_MAX_OFFSET + CONTAINER_OFFSET

export const containerBaseZIndexOffset: Record<ZIndexContainer, number> = {
  Modal: CONTAINER_OFFSET,
  Drawer: CONTAINER_OFFSET,
  Popover: CONTAINER_OFFSET,
  Popconfirm: CONTAINER_OFFSET,
  Tooltip: CONTAINER_OFFSET,
  Tour: CONTAINER_OFFSET,
  FloatButton: CONTAINER_OFFSET,
}

export const consumerBaseZIndexOffset: Record<ZIndexConsumer, number> = {
  SelectLike: 50,
  Dropdown: 50,
  DatePicker: 50,
  Menu: 50,
  ImagePreview: 1,
}

function isContainerType(type: ZIndexContainer | ZIndexConsumer): type is ZIndexContainer {
  return type in containerBaseZIndexOffset
}
type ReturnResult = [zIndex: number | undefined, contextZIndex: number]

export function useZIndexProvider(zIndex: Ref<number>) {
  provide(ZIndexContextKey, zIndex)
}

export function useZIndex(
  componentType: ZIndexContainer | ZIndexConsumer,
  customZIndex?: number,
) {
  const zIndexPopupBase = 1000
  const parentZIndex = inject(ZIndexContextKey, undefined)
  const isContainer = isContainerType(componentType)
  const result = computed(() => {
    let result: ReturnResult
    if (customZIndex !== undefined) {
      result = [customZIndex, customZIndex]
    } else {
      let zIndex = parentZIndex?.value ?? 0

      if (isContainer) {
        zIndex
        // Use preset token zIndex by default but not stack when has parent container
          += (parentZIndex?.value ? 0 : zIndexPopupBase)
          // Container offset
            + containerBaseZIndexOffset[componentType]
      } else {
        zIndex += consumerBaseZIndexOffset[componentType]
      }
      result = [parentZIndex === undefined ? customZIndex : zIndex, zIndex]
    }
    return result
  })

  return [
    computed(() => result.value[0]),
    computed(() => result.value[1]),
  ] as [ComputedRef<number | undefined>, ComputedRef<number>]
}
