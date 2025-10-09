import type { App } from 'vue'
import MenuDivider from './menu-divider.vue'
import MenuItemGroup from './menu-item-group.vue'
import MenuItem from './menu-item.vue'
import Menu from './menu.vue'
import SubMenu from './sub-menu.vue'

export type {
  ItemType,
  Key,
  MenuDividerProps,
  MenuEmits,
  MenuItemGroupProps,
  MenuItemProps,
  MenuMode,
  MenuProps,
  MenuTheme,
  SubMenuProps,
  TriggerSubMenuAction,
} from './define'

export type { MenuOverrideContext } from './override-context'
export { useMenuOverride, useProvideMenuOverride } from './override-context'

const MenuWithInstall = Menu as typeof Menu & {
  Item: typeof MenuItem
  SubMenu: typeof SubMenu
  Divider: typeof MenuDivider
  ItemGroup: typeof MenuItemGroup
}

MenuWithInstall.Item = MenuItem
MenuWithInstall.SubMenu = SubMenu
MenuWithInstall.Divider = MenuDivider
MenuWithInstall.ItemGroup = MenuItemGroup

MenuWithInstall.install = (app: App) => {
  app.component(Menu.name!, Menu)
  return app
}

MenuItem.install = (app: App) => {
  app.component('AMenuItem', MenuItem)
  return app
}

SubMenu.install = (app: App) => {
  app.component('AMenuSubMenu', SubMenu)
  return app
}

MenuDivider.install = (app: App) => {
  app.component('AMenuDivider', MenuDivider)
  return app
}

MenuItemGroup.install = (app: App) => {
  app.component('AMenuItemGroup', MenuItemGroup)
  return app
}

export {
  MenuWithInstall as Menu,
  MenuDivider,
  MenuItem,
  MenuItemGroup,
  SubMenu,
}

export default MenuWithInstall
