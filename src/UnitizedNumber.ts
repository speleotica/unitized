import UnitType from './UnitType'
import Unit from './Unit'

export default class UnitizedNumber<T extends UnitType<T>> {
  private readonly value: number
  readonly unit: Unit<T>

  constructor(value: number, unit: Unit<T>) {
    this.value = value
    this.unit = unit
  }

  get(unit: Unit<T>): number {
    return unit === this.unit
      ? this.value
      : this.unit.type.convert(this.value, this.unit, unit)
  }

  add(addend: UnitizedNumber<T>): UnitizedNumber<T> {
    return new UnitizedNumber(this.value + addend.get(this.unit), this.unit)
  }

  get isFinite(): boolean {
    return Number.isFinite(this.value)
  }

  get isInfinite(): boolean {
    return this.value === Infinity || this.value === -Infinity
  }

  get isNaN(): boolean {
    return isNaN(this.value)
  }

  in(unit: Unit<T>): UnitizedNumber<T> {
    return new UnitizedNumber(this.get(unit), unit)
  }

  negate(): UnitizedNumber<T> {
    return new UnitizedNumber(-this.value, this.unit)
  }

  sub(subtrahend: UnitizedNumber<T>): UnitizedNumber<T> {
    return new UnitizedNumber(this.value - subtrahend.get(this.unit), this.unit)
  }

  mul(multiplicand: number): UnitizedNumber<T> {
    return new UnitizedNumber(this.value * multiplicand, this.unit)
  }

  get isNegative(): boolean {
    return this.value < 0
  }

  get isPositive(): boolean {
    return this.value > 0
  }

  get isZero(): boolean {
    return this.value === 0
  }

  get isNonzero(): boolean {
    return this.value !== 0
  }

  mod(modulus: UnitizedNumber<T>): UnitizedNumber<T> {
    const newValue = this.value % modulus.get(this.unit)
    return newValue === this.value
      ? this
      : new UnitizedNumber(newValue, this.unit)
  }

  abs(): UnitizedNumber<T> {
    return this.value < 0 ? this.negate() : this
  }

  div(denominator: UnitizedNumber<T>): number
  div(denominator: number): UnitizedNumber<T>
  div(denominator: number | UnitizedNumber<T>): number | UnitizedNumber<T> {
    if (typeof denominator === 'number') {
      return new UnitizedNumber(this.value / denominator, this.unit)
    }
    return this.value / denominator.get(this.unit)
  }

  compare(other: UnitizedNumber<T>): number {
    const otherValue = other.get(this.unit)
    const result = this.value - otherValue
    return isNaN(result) ? 0 : result
  }

  toString(): string {
    return `${this.value} ${String(this.unit)}`
  }
}
