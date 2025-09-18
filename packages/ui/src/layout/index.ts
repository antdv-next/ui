import type { App } from 'vue'
import LayoutContent from './layout-content.vue'
import LayoutFooter from './layout-footer.vue'
import LayoutHeader from './layout-header.vue'
import Layout from './layout.vue'
import LayoutSider from './sider.vue'

export type {
  CollapseType,
  LayoutBasicProps,
  LayoutProps,
  LayoutSiderEmits,
  LayoutSiderExpose,
  LayoutSiderProps,
  LayoutSiderTheme,
} from './define'

const LayoutWithInstall = Layout as typeof Layout & {
  Header: typeof LayoutHeader
  Footer: typeof LayoutFooter
  Content: typeof LayoutContent
  Sider: typeof LayoutSider
}

LayoutWithInstall.Header = LayoutHeader
LayoutWithInstall.Footer = LayoutFooter
LayoutWithInstall.Content = LayoutContent
LayoutWithInstall.Sider = LayoutSider

;(LayoutWithInstall as any).install = (app: App) => {
  app.component(Layout.name!, Layout)
  // app.component(LayoutHeader.name!, LayoutHeader)
  // app.component(LayoutFooter.name!, LayoutFooter)
  // app.component(LayoutContent.name!, LayoutContent)
  // app.component(LayoutSider.name!, LayoutSider)
  return app
}

;(LayoutHeader as any).install = (app: App) => {
  app.component(LayoutHeader.name!, LayoutHeader)
  return app
}

;(LayoutFooter as any).install = (app: App) => {
  app.component(LayoutFooter.name!, LayoutFooter)
  return app
}

;(LayoutContent as any).install = (app: App) => {
  app.component(LayoutContent.name!, LayoutContent)
  return app
}

;(LayoutSider as any).install = (app: App) => {
  app.component(LayoutSider.name!, LayoutSider)
  return app
}

;(LayoutSider as any).__ANT_LAYOUT_SIDER = true

export {
  LayoutWithInstall as Layout,
  LayoutContent,
  LayoutFooter,
  LayoutHeader,
  LayoutSider,
}

export default LayoutWithInstall
