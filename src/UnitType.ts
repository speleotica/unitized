import Unit from './Unit'

export default abstract class UnitType<T extends UnitType<T>> {
  private readonly units: Map<string, Unit<T>> = new Map()

  protected addUnits(...units: Array<Unit<T>>): void {
    for (const unit of units) {
      this.units.set(unit.id, unit)
    }
  }

  public convert(value: number, from: Unit<T>, to: Unit<T>): number {
    return to.fromBase(from.toBase(value))
  }
}
