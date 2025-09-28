// Get CSS variable value
export function getCssVar(name: string, element = document.documentElement): string {
  return getComputedStyle(element).getPropertyValue(name).trim()
}
