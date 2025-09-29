import type { App, Plugin } from 'vue'
import Avatar from './avatar.vue'
import Group from './group.vue'

export type { AvatarGroupProps, AvatarProps } from './define'

Avatar.install = function (app: App) {
  app.component(Avatar.name!, Avatar)
  app.component(Group.name!, Group)
  return app
}

Avatar.Group = Group

export { Avatar, Group as AvatarGroup }

export default Avatar as typeof Avatar
  & Plugin & {
    readonly Group: typeof Group
  }
