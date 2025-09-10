// eslint-disable-next-line node/prefer-global/process
export const isProd = process.env.NODE_ENV === 'production'
export function generateKey(name: string) {
  return isProd ? Symbol(name) : (`__${name}__` as unknown as symbol)
}
