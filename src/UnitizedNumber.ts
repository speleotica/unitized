import UnitType from './UnitType'
import Unit from './Unit'

export default class UnitizedNumber<T extends UnitType<T>> {
  private readonly value: number
  public readonly unit: Unit<T>

  constructor(value: number, unit: Unit<T>) {
    this.value = value
    this.unit = unit
  }

  public get(unit: Unit<T>): number {
    return unit === this.unit
      ? this.value
      : this.unit.type.convert(this.value, this.unit, unit)
  }
}
