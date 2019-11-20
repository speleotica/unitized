import { UnitType, UnitizedNumber } from '.'
import { expect } from 'chai'

export default function checkConversions<T extends UnitType<T>>(
  epsilon: number,
  ...values: Array<UnitizedNumber<T>>
): void {
  for (let i = 0; i < values.length; i++) {
    for (let j = 0; j < values.length; j++) {
      it(`${String(values[i])} -> ${String(values[j])}`, () => {
        expect(values[i].get(values[j].unit)).to.be.closeTo(
          values[j].get(values[j].unit),
          epsilon
        )
      })
    }
  }
}
