# Select 组件改进 - 下拉效果和宽度匹配

## 改进内容

### 1. 下拉动画效果

为 Select 组件添加了正确的下拉动画效果：

- **向下展开时**（placement 为 `bottomLeft`、`bottomRight` 等）：使用 `slide-up` 动画
- **向上展开时**（placement 为 `topLeft`、`topRight` 等）：使用 `slide-down` 动画

这与 Ant Design 的行为完全一致。

#### 实现方式

在 `select.vue` 中添加了 `transitionName` 计算属性：

```typescript
const transitionName = computed(() => {
  const rootPrefixCls = configCtx.getPrefixCls()
  if (mergedPlacement.value && mergedPlacement.value.includes('top')) {
    return `${rootPrefixCls}-slide-down`
  }
  return `${rootPrefixCls}-slide-up`
})
```

### 2. 下拉框宽度匹配

实现了下拉框宽度与 Select 输入框宽度匹配的功能。

#### 新增功能

1. **默认行为**：`popupMatchSelectWidth={true}` - 下拉框宽度自动匹配 Select 宽度
2. **自定义宽度**：`popupMatchSelectWidth={300}` - 下拉框使用固定宽度（像素）
3. **不匹配**：`popupMatchSelectWidth={false}` - 下拉框宽度由内容决定

#### Tooltip 组件改进

为了支持宽度匹配，在 Tooltip 组件中添加了新的 prop：

**`tooltip/define.ts`**:
```typescript
export interface TooltipProps {
  // ...其他属性

  // Width matching for dropdowns (like Select)
  matchReferenceWidth?: boolean | number
}
```

**`tooltip/tooltip.vue`**:
```typescript
const tooltipStyles = computed(() => {
  const style: CssVars = {
    ...floatingStyles.value,
    zIndex: zIndex.value || 1070,
    ...colorInfo.value.overlayStyle,
    ...props.overlayStyle,
    ...props.styles?.root,
  }

  // Match reference width for dropdowns (like Select)
  if (props.matchReferenceWidth && reference.value) {
    if (typeof props.matchReferenceWidth === 'number') {
      style.width = `${props.matchReferenceWidth}px`
    } else {
      style.width = `${reference.value.offsetWidth}px`
    }
  }

  // ... 其他样式
  return style
})
```

## 使用示例

### 基本用法（默认匹配宽度）

```vue
<template>
  <Select
    v-model:value="value"
    style="width: 300px"
    :options="options"
  />
</template>
```

下拉框会自动匹配 Select 的 300px 宽度。

### 自定义下拉框宽度

```vue
<template>
  <Select
    v-model:value="value"
    style="width: 200px"
    :popup-match-select-width="400"
    :options="options"
  />
</template>
```

Select 宽度为 200px，但下拉框宽度为 400px。

### 不匹配宽度

```vue
<template>
  <Select
    v-model:value="value"
    style="width: 200px"
    :popup-match-select-width="false"
    :options="options"
  />
</template>
```

下拉框宽度由内容决定，不受 Select 宽度限制。

### 向上展开的下拉框

```vue
<template>
  <Select
    v-model:value="value"
    placement="topLeft"
    :options="options"
  />
</template>
```

使用 `slide-down` 动画向上展开。

## 测试覆盖

新增了 `width-matching.test.ts` 测试文件，包含 5 个测试用例：

1. ✅ 测试宽度匹配（`popupMatchSelectWidth={true}`）
2. ✅ 测试自定义宽度（`popupMatchSelectWidth={300}`）
3. ✅ 测试不匹配宽度（`popupMatchSelectWidth={false}`）
4. ✅ 测试 top 位置使用 slide-down 动画
5. ✅ 测试 bottom 位置使用 slide-up 动画

所有测试通过：
```
✓ tests/select/width-matching.test.ts (5 tests) 72ms
✓ tests/select/base.test.ts (10 tests) 79ms

Test Files  2 passed (2)
Tests  15 passed (15)
```

## 更新的文件

### 核心改动
1. `packages/ui/src/tooltip/define.ts` - 添加 `matchReferenceWidth` prop
2. `packages/ui/src/tooltip/tooltip.vue` - 实现宽度匹配逻辑
3. `packages/ui/src/select/select.vue` - 添加 transition name 和宽度匹配支持

### 测试文件
4. `packages/ui/tests/select/width-matching.test.ts` - 新增宽度匹配测试

### 示例文件
5. `playground/src/pages/select/basic.vue` - 更新示例展示新功能

### 文档
6. `packages/ui/src/select/README.md` - 更新特性列表
7. `packages/ui/src/select/IMPROVEMENTS.md` - 本文档

## 兼容性

这些改进完全向后兼容，不会破坏现有代码：

- 默认行为（`popupMatchSelectWidth={true}`）符合用户期望
- 所有现有测试继续通过
- API 设计与 Ant Design React 保持一致

## 效果对比

### 改进前
- ❌ 下拉框宽度不一致，可能比 Select 窄或宽
- ❌ 没有下拉动画，或动画方向不正确
- ❌ 视觉体验不佳

### 改进后
- ✅ 下拉框宽度默认匹配 Select 宽度
- ✅ 根据位置自动选择正确的动画方向
- ✅ 支持自定义宽度
- ✅ 完美匹配 Ant Design 的视觉效果
