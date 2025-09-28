# 开发者贡献文档

欢迎您对本项目的贡献！无论是代码、文档还是其他形式的帮助，我们都非常感谢您的支持。以下是一些指导，帮助您更好地参与到项目中来。

## 样式

本项目借用了Ant Design的样式规范，我们已经完全生成了Ant Design的样式，您可以直接使用，不需要自行编写，只需要真对需求进行微调即可。

## 案例展示

对于案例展示部分，我们采用的是`unplugin-vue-router`来实现的路径声明式路由，您可以参考`src/pages`目录下的文件结构来添加新的案例。

默认会按照文件名自动生成路由，您只需要在`src/pages`目录下创建新的Vue组件文件即可。

例如文件路径是`src/pages/example/MyComponent.vue`，那么生成的路由路径就是`https://localhost:5173/example/MyComponent`。

直接访问这个路径就可以看到您的组件展示效果，不需要在全局引入展示.

## 关于工具库

1. 使用`es-toolkit`来代替`lodash`，因为`es-toolkit`是基于ES6+的原生方法封装的工具库，体积更小，性能更好。
2. 如果遇到一些类似`rc-util`的工具，可以参开[@v-c/util](https://github.com/antdv-next/vue-components/tree/main/packages/util)来代替，这个库基本上涵盖了大部分`rc-util`的功能。
3. 关于`classnames`这个库，由于他是一个`cjs`的库，对于`vite@7`的兼容性并不是很好，所以我们不再使用这个库，并且`vue`本身就支持这种类名的绑定，所以我们不需要引入任何库来实现这个功能，如果要兼容写法，可以引用`import { classNames } from "相对路径/_utils/classNames"`。

## git 提交规范

我们采用`Conventional Commits`规范来编写提交信息，具体格式如下：

feat: 新功能
fix: 修复bug
docs: 文档更新
style: 代码格式（不影响功能，例如空格、分号等）
refactor: 代码重构（既不是新增功能，也不是修复bug）
test: 添加或修改测试
chore: 构建过程或辅助工具的变动
ci: 持续集成相关的变动
perf: 性能优化
build: 构建相关的变动
revert: 回滚到上一个版本
BREAKING CHANGE: 重大变更（会影响现有功能）
例如：

```
feat: 添加新的登录功能
fix: 修复注册页面的bug
docs: 更新README文件
```

## 致谢

感谢所有为本项目做出贡献的开发者和用户，您的支持是我们前进的动力！如果您有任何问题或建议，欢迎随时与我们联系。
