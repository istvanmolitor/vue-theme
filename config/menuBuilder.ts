import { MenuBuilder, type MenuItemConfig } from '@menu/index'
import { Palette } from 'lucide-vue-next'

export class ThemeMenuBuilder extends MenuBuilder {
  build(menu: MenuItemConfig, menuName: string): MenuItemConfig {
    if (menuName !== 'admin') {
      return menu
    }

    const themeSection: MenuItemConfig = {
      id: 'themes',
      title: 'Témák',
      icon: Palette,
      path: '/admin/theme',
      order: 90,
      children: [],
    }

    this.addMenuItem(menu, themeSection)

    return menu
  }
}

export const themeMenuBuilder = new ThemeMenuBuilder()

