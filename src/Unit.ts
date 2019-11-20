import UnitType from './UnitType'
import UnitizedNumber from './UnitizedNumber'

export type CallableUnit<T extends UnitType<T>> = Unit<T> &
  ((value: number) => UnitizedNumber<T>)

export default class Unit<T extends UnitType<T>> {
  private readonly __nominal: void
  public readonly type: T
  public readonly id: string
  public readonly fromBaseFactor: number
  public readonly toBaseFactor: number

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
    const unitize = (value: number) => new UnitizedNumber(value, this)
    Object.setPrototypeOf(unitize, this)

    this.type = type
    this.id = id
    this.fromBaseFactor = fromBaseFactor != null ? fromBaseFactor : NaN
    this.toBaseFactor = toBaseFactor != null ? toBaseFactor : NaN

    return unitize as any
  }

  public of(value: number): UnitizedNumber<T> {
    return new UnitizedNumber(value, this)
  }

  public fromBase(value: number): number {
    return value * this.fromBaseFactor
  }
  public toBase(value: number): number {
    return value * this.toBaseFactor
  }

  public toString(): string {
    return this.id
  }

  get [Symbol.toStringTag](): string {
    return this.id
  }
}
