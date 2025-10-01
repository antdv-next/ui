// Get CSS variable value
export function getCssVar(name: string, element = document.documentElement): string {
  return getComputedStyle(element).getPropertyValue(name).trim()
}

export function getCssVarNumber(name: string, element = document.documentElement): number {
  const value = getCssVar(name, element).replace(/[^\d.]/g, '')
  return Number(value.replace('px', ''))
}
