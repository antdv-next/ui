import type AbstractCalculator from './calculator'
import CSSCalculator from './CSSCalculator'
import NumCalculator from './NumCalculator'

function genCalc(type: 'css' | 'js', unitlessCssVar: Set<string>) {
  const Calculator = type === 'css' ? CSSCalculator : NumCalculator

  return (num: number | string | AbstractCalculator) =>
    new Calculator(num, unitlessCssVar)
}

export default genCalc
