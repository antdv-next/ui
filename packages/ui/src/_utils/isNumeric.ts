function isNumeric(value: any): boolean {
  return !Number.isNaN(Number.parseFloat(value)) && Number.isFinite(value)
}

export default isNumeric
