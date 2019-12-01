import UnitType from './UnitType'

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
    this.type = type
    this.id = id
    this.fromBaseFactor = fromBaseFactor != null ? fromBaseFactor : NaN
    this.toBaseFactor = toBaseFactor != null ? toBaseFactor : NaN
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
