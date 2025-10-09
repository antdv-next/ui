# Select 组件代码优化 - 修复 computed 使用问题

## 问题

在 `renderSelectContent` 和 `renderDropdown` 函数内部错误地使用了 `computed()`。

### 为什么这是错误的？

1. **性能问题**: 每次调用 render 函数都会创建新的 computed，导致不必要的开销
2. **内存泄漏**: computed 会在组件实例上注册响应式依赖，但在函数内创建无法正确清理
3. **响应式失效**: 函数内的 computed 不会在外层作用域被追踪，导致响应式更新问题
4. **违反 Vue 规范**: computed 应该在 setup 函数的顶层作用域创建

## 修复内容

### 1. 移除 renderSelectContent 中的 computed

**修复前：**
```typescript
function renderSelectContent(): VNode {
  const displayValue = computed(() => { // ❌ 错误！
    if (mergedValue.value === undefined || mergedValue.value === null) {
      return ''
    }
    // ...
  })
  // ...
}
```

**修复后：**
```typescript
// 在 setup 顶层定义 computed
const displayValue = computed(() => { // ✅ 正确！
  if (mergedValue.value === undefined || mergedValue.value === null) {
    return ''
  }
  // ...
})

function renderSelectContent(): VNode {
  // 直接使用 displayValue.value
}
```

### 2. 移除 renderDropdown 中的 computed

**修复前：**
```typescript
function renderDropdown(): VNode | null {
  const filteredOptions = computed(() => { // ❌ 错误！
    if (!mergedSearchValue.value || !props.filterOption) {
      return options
    }
    // ...
  })

  const optionNodes = filteredOptions.value.map((option, index) => {
    const isSelected = computed(() => { // ❌ 错误！
      if (isMultiple.value) {
        return Array.isArray(mergedValue.value) && mergedValue.value.includes(option.value)
      }
      return mergedValue.value === option.value
    })
    // ...
  })
}
```

**修复后：**
```typescript
// 在 setup 顶层定义 computed
const filteredOptions = computed(() => { // ✅ 正确！
  const { options } = props
  if (!options || options.length === 0) {
    return []
  }

  if (!mergedSearchValue.value || !props.filterOption) {
    return options
  }
  // ...
})

function renderDropdown(): VNode | null {
  const optionNodes = filteredOptions.value.map((option, index) => {
    // 直接计算值，不使用 computed
    const isSelected = isMultiple.value // ✅ 正确！
      ? Array.isArray(mergedValue.value) && mergedValue.value.includes(option.value)
      : mergedValue.value === option.value
    // ...
  })
}
```

## 修改的位置

### packages/ui/src/select/select.vue

1. **第 278-292 行**: 添加 `displayValue` computed（移出 renderSelectContent）
2. **第 295-314 行**: 添加 `filteredOptions` computed（移出 renderDropdown）
3. **第 334-380 行**: `renderSelectContent` 函数 - 移除内部 computed
4. **第 384-450 行**: `renderDropdown` 函数 - 移除内部 computed

## 优化结果

### 性能提升
- ✅ 避免每次渲染时创建新的 computed
- ✅ 正确的响应式依赖追踪
- ✅ 避免内存泄漏

### 代码质量
- ✅ 符合 Vue 3 最佳实践
- ✅ 更清晰的代码结构
- ✅ computed 都在顶层作用域

### 测试结果
```
✓ tests/select/width-matching.test.ts (5 tests) 70ms
✓ tests/select/base.test.ts (10 tests) 80ms

Test Files  2 passed (2)
Tests  15 passed (15) ✅
```

## Computed 属性清单

现在 select.vue 中所有的 computed 都在顶层作用域：

1. `prefixCls` - 组件前缀类名
2. `direction` - 文本方向
3. `isMultiple` - 是否多选模式
4. `mergedShowSearch` - 合并后的显示搜索配置
5. `mergedValue` - 合并后的值
6. `mergedOpen` - 合并后的打开状态
7. `mergedSearchValue` - 合并后的搜索值
8. `icons` - 图标配置
9. `sizeClass` - 尺寸类名
10. `variantClass` - 变体类名
11. `statusClass` - 状态类名
12. `mergedClassName` - 合并后的类名
13. `popupClassName` - 弹窗类名
14. `popupStyle` - 弹窗样式
15. `rootStyle` - 根元素样式
16. `mergedPlacement` - 合并后的位置
17. `transitionName` - 过渡动画名称
18. `mergedPopupMatchSelectWidth` - 合并后的宽度匹配配置
19. **`displayValue`** - 显示值（新增）
20. **`filteredOptions`** - 过滤后的选项（新增）

## 总结

这次优化修复了 Vue 3 中常见的错误模式，确保了：
- ✅ 所有 computed 在 setup 顶层定义
- ✅ render 函数内部没有 computed
- ✅ 响应式系统正确工作
- ✅ 性能最优
- ✅ 符合 Vue 3 最佳实践

所有测试继续通过，没有引入任何破坏性变更。
