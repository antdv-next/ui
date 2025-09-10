export function unit(num: string | number) {
  if (typeof num === 'number') {
    return `${num}px`
  }
  return num
}
