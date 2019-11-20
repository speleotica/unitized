import Unit from './Unit'
import UnitType from './UnitType'

export default abstract class FactorTableUnitType<
  T extends FactorTableUnitType<T>
> extends UnitType<T> {
  private readonly factors: Record<string, Record<string, number>>

  constructor({
    factors,
  }: {
    factors: Record<string, Record<string, number>>
  }) {
    super()
    this.factors = factors
  }

  protected addUnits(...units: Array<Unit<T>>): void {
    super.addUnits(...units)
    for (const unit of units) {
      if (!this.factors[unit.id]) this.factors[unit.id] = {}
      this.factors[unit.id][unit.id] = 1
    }
  }

  public convert(value: number, from: Unit<T>, to: Unit<T>): number {
    const factor0 = this.factors[from.id]
    if (!factor0) return super.convert(value, from, to)
    const factor = factor0[to.id]
    if (factor != null) return value * factor
    return super.convert(value, from, to)
  }
}
