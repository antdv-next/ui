<script setup lang="ts">
import type { AnchorContainer, AnchorEmits, AnchorProps, AntAnchor } from './define.ts'
import { useEventListener } from '@vueuse/core'
import scrollIntoView from 'scroll-into-view-if-needed'
import { computed, nextTick, onMounted, shallowRef, watch } from 'vue'
import { classNames } from '../_utils/classNames.ts'
import getScroll from '../_utils/getScroll.ts'
import scrollTo from '../_utils/scrollTo.ts'
import Affix from '../affix/affix.vue'
import { useComponentConfig, useConfigContext } from '../config-provider/context.ts'
import AnchorLink from './anchor-link.vue'
import { useAnchorProvider } from './context.ts'

const props = withDefaults(defineProps<AnchorProps>(), {
  direction: 'vertical',
  affix: true,
  showInkInFixed: false,
  bounds: 5,
})

const emit = defineEmits<AnchorEmits>()

const anchorDirection = computed(() => props.direction === 'horizontal' ? 'horizontal' : 'vertical')

function getDefaultContainer() {
  return window
}

function getOffsetTop(element: HTMLElement, container: AnchorContainer): number {
  if (!element.getClientRects().length) {
    return 0
  }

  const rect = element.getBoundingClientRect()

  if (rect.width || rect.height) {
    if (container === window) {
      return rect.top - element.ownerDocument!.documentElement!.clientTop
    }
    return rect.top - (container as HTMLElement).getBoundingClientRect().top
  }

  return rect.top
}

const sharpMatcherRegex = /#([\S ]+)$/

interface Section {
  link: string
  top: number
}

const links = shallowRef<string[]>([])
const activeLink = shallowRef<string | null>(null)
const activeLinkRef = shallowRef<string | null>(null)
const wrapperRef = shallowRef<HTMLDivElement>()
const spanLinkNode = shallowRef<HTMLSpanElement>()
const animating = shallowRef(false)

const compCtx = useComponentConfig('anchor')
const configCtx = useConfigContext()
const prefixCls = computed(() => compCtx.value?.getPrefixCls?.('anchor', props.prefixCls))

const getCurrentContainer = computed(() => {
  return props.getContainer ?? configCtx.getTargetContainer ?? getDefaultContainer
})

const dependencyListItem = computed(() => {
  return JSON.stringify(links.value)
})

const registerLink: AntAnchor['registerLink'] = (link) => {
  if (!links.value.includes(link)) {
    links.value = [...links.value, link]
  }
}

const unregisterLink: AntAnchor['unregisterLink'] = (link) => {
  links.value = links.value.filter(item => item !== link)
}

function updateInk() {
  const linkNode = wrapperRef.value?.querySelector(`.${prefixCls.value}-link-title-active`) as HTMLElement
  if (linkNode && spanLinkNode.value) {
    const { style: inkStyle } = spanLinkNode.value
    const horizontalAnchor = anchorDirection.value === 'horizontal'
    inkStyle.top = horizontalAnchor ? '' : `${linkNode.offsetTop + linkNode.clientHeight / 2}px`
    inkStyle.height = horizontalAnchor ? '' : `${linkNode.clientHeight}px`
    inkStyle.left = horizontalAnchor ? `${linkNode.offsetLeft}px` : ''
    inkStyle.width = horizontalAnchor ? `${linkNode.clientWidth}px` : ''
    if (horizontalAnchor) {
      scrollIntoView(linkNode, { scrollMode: 'if-needed', block: 'nearest' })
    }
  }
}

function getInternalCurrentAnchor(_links: string[], _offsetTop = 0, _bounds = 5): string {
  const linkSections: Section[] = []
  const container = getCurrentContainer.value()
  _links.forEach((link) => {
    const sharpLinkMatch = sharpMatcherRegex.exec(link?.toString())
    if (!sharpLinkMatch) {
      return
    }
    const target = document.getElementById(sharpLinkMatch[1])
    if (target) {
      const top = getOffsetTop(target, container)
      if (top <= _offsetTop + _bounds) {
        linkSections.push({ link, top })
      }
    }
  })

  if (linkSections.length) {
    const maxSection = linkSections.reduce((prev, curr) => (curr.top > prev.top ? curr : prev))
    return maxSection.link
  }
  return ''
}

function setCurrentActiveLink(link: string) {
  if (activeLinkRef.value === link) {
    return
  }

  const newLink = typeof props.getCurrentAnchor === 'function' ? props.getCurrentAnchor(link) : link
  activeLink.value = newLink
  activeLinkRef.value = newLink

  emit('change', link)
}

function handleScroll() {
  if (animating.value) {
    return
  }

  const currentActiveLink = getInternalCurrentAnchor(
    links.value,
    props.targetOffset !== undefined ? props.targetOffset : props.offsetTop || 0,
    props.bounds,
  )

  setCurrentActiveLink(currentActiveLink)
}

function handleScrollTo(link: string) {
  setCurrentActiveLink(link)
  const sharpLinkMatch = sharpMatcherRegex.exec(link)
  if (!sharpLinkMatch) {
    return
  }
  const targetElement = document.getElementById(sharpLinkMatch[1])
  if (!targetElement) {
    return
  }

  const container = getCurrentContainer.value()
  const scrollTop = getScroll(container)
  const eleOffsetTop = getOffsetTop(targetElement, container)
  let y = scrollTop + eleOffsetTop
  y -= props.targetOffset !== undefined ? props.targetOffset : props.offsetTop || 0
  animating.value = true
  scrollTo(y, {
    getContainer: getCurrentContainer.value,
    callback() {
      animating.value = false
    },
  })
}

const wrapperClass = computed(() => {
  return classNames(
    `${prefixCls.value}-wrapper`,
    {
      [`${prefixCls.value}-wrapper-horizontal`]: anchorDirection.value === 'horizontal',
      [`${prefixCls.value}-rtl`]: compCtx.value?.direction === 'rtl',
    },
    props.rootClassName,
  )
})

const anchorClass = computed(() => {
  return classNames(prefixCls.value, {
    [`${prefixCls.value}-fixed`]: !props.affix && !props.showInkInFixed,
  })
})

const inkClass = computed(() => {
  return classNames(`${prefixCls.value}-ink`, {
    [`${prefixCls.value}-ink-visible`]: activeLink.value,
  })
})

const wrapperStyle = computed(() => {
  const style: any = {
    maxHeight: props.offsetTop ? `calc(100vh - ${props.offsetTop}px)` : '100vh',
  }
  return style
})

// Context value
const memoizedContextValue = {
  registerLink,
  unregisterLink,
  scrollTo: handleScrollTo,
  activeLink,
  onClick: (e: MouseEvent, link: { title: any, href: string }) => {
    emit('click', e, link)
  },
  direction: anchorDirection,
}

useAnchorProvider(memoizedContextValue)

const currentContainer = computed(() => getCurrentContainer.value())
useEventListener(currentContainer, 'scroll', handleScroll)
onMounted(() => {
  handleScroll()
})
watch(
  () => props.getCurrentAnchor,
  () => {
    if (typeof props.getCurrentAnchor === 'function') {
      setCurrentActiveLink(props.getCurrentAnchor(activeLinkRef.value || ''))
    }
  },
)

watch(
  [
    anchorDirection,
    () => props.getCurrentAnchor,
    dependencyListItem,
    activeLink,
  ],
  () => {
    nextTick(() => {
      updateInk()
    })
  },
)
</script>

<template>
  <template v-if="affix">
    <Affix
      :offset-top="offsetTop"
      :target="getCurrentContainer"
      v-bind="typeof affix === 'object' ? affix : {}"
    >
      <div ref="wrapperRef" :class="wrapperClass" :style="wrapperStyle">
        <div :class="anchorClass">
          <span ref="spanLinkNode" :class="inkClass" />
          <template v-if="items">
            <AnchorLink
              v-for="item in items"
              :key="item.key"
              :href="item.href"
              :title="item.title"
              :target="item.target"
              :replace="replace"
            >
              <template v-if="anchorDirection === 'vertical' && item.children">
                <AnchorLink
                  v-for="child in item.children"
                  :key="child.key"
                  :href="child.href"
                  :title="child.title"
                  :target="child.target"
                  :replace="replace"
                />
              </template>
            </AnchorLink>
          </template>
          <slot v-else />
        </div>
      </div>
    </Affix>
  </template>
  <template v-else>
    <div ref="wrapperRef" :class="wrapperClass" :style="wrapperStyle">
      <div :class="anchorClass">
        <span ref="spanLinkNode" :class="inkClass" />
        <template v-if="items">
          <AnchorLink
            v-for="item in items"
            :key="item.key"
            :href="item.href"
            :title="item.title"
            :target="item.target"
            :replace="replace"
          >
            <template v-if="anchorDirection === 'vertical' && item.children">
              <AnchorLink
                v-for="child in item.children"
                :key="child.key"
                :href="child.href"
                :title="child.title"
                :target="child.target"
                :replace="replace"
              />
            </template>
          </AnchorLink>
        </template>
        <slot v-else />
      </div>
    </div>
  </template>
</template>
