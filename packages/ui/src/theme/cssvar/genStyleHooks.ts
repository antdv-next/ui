export function genStyleHooks(component: string, styleFn: any, tokenFn: any) {
  return (defaultToken: any) => {
    // 优先处理token
    const token = {
      componentCls: `.${defaultToken.prefixCls}-${component.toLowerCase()}`,
      antCls: `.${defaultToken.prefixCls}`,
      ...defaultToken,
      ...tokenFn(defaultToken),
    }
    return styleFn(token)
  }
}
