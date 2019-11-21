import UnitType from './UnitType'
import UnitizedNumber from './UnitizedNumber'

export type CallableUnit<T extends UnitType<T>> = Unit<T> &
  ((value: number) => UnitizedNumber<T>)

export default class Unit<T extends UnitType<T>> {
  private readonly __nominal: void
  readonly type: T
  readonly id: string
  readonly fromBaseFactor: number
  readonly toBaseFactor: number

  constructor(
    type: T,
    id: string,
    {
      fromBaseFactor,
      toBaseFactor,
    }: {
      fromBaseFactor?: number
      toBaseFactor?: number
    }
  ) {
    const unitize = (value: number): UnitizedNumber<T> =>
      new UnitizedNumber(value, this)
    Object.setPrototypeOf(unitize, this)

    this.type = type
    this.id = id
    this.fromBaseFactor = fromBaseFactor != null ? fromBaseFactor : NaN
    this.toBaseFactor = toBaseFactor != null ? toBaseFactor : NaN

    return unitize as any
  }

  of(value: number): UnitizedNumber<T> {
    return new UnitizedNumber(value, this)
  }

  fromBase(value: number): number {
    return value * this.fromBaseFactor
  }
  toBase(value: number): number {
    return value * this.toBaseFactor
  }

  toString(): string {
    return this.id
  }

  get [Symbol.toStringTag](): string {
    return this.id
  }
}
