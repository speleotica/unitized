import UnitType from './UnitType'
import Unit, { CallableUnit } from './Unit'
import UnitizedNumber from './UnitizedNumber'

export default class Length extends UnitType<Length> {
  private readonly __nominal: void = undefined
  public static readonly type: Length = new Length()

  public static readonly kilometers = new Unit(Length.type, 'km', {
    fromBaseFactor: 0.001,
    toBaseFactor: 1000,
  }) as CallableUnit<Length>
  public static readonly meters = new Unit(Length.type, 'm', {
    fromBaseFactor: 1,
    toBaseFactor: 1,
  }) as CallableUnit<Length>
  public static readonly centimeters = new Unit(Length.type, 'cm', {
    fromBaseFactor: 100,
    toBaseFactor: 0.01,
  }) as CallableUnit<Length>
  public static readonly feet = new Unit(Length.type, 'ft', {
    fromBaseFactor: 1 / 0.3048,
    toBaseFactor: 0.3048,
  }) as CallableUnit<Length>
  public static readonly miles = new Unit(Length.type, 'mi', {
    fromBaseFactor: Length.feet.fromBaseFactor / 5280,
    toBaseFactor: Length.feet.toBaseFactor * 5280,
  }) as CallableUnit<Length>
  public static readonly yards = new Unit(Length.type, 'yd', {
    fromBaseFactor: Length.feet.fromBaseFactor / 3,
    toBaseFactor: Length.feet.toBaseFactor * 3,
  }) as CallableUnit<Length>
  public static readonly inches = new Unit(Length.type, 'in', {
    fromBaseFactor: Length.feet.fromBaseFactor * 12,
    toBaseFactor: Length.feet.fromBaseFactor / 12,
  }) as CallableUnit<Length>

  constructor() {
    super()
  }

  init(): void {
    this.addUnits(
      Length.kilometers,
      Length.meters,
      Length.centimeters,
      Length.feet,
      Length.miles,
      Length.yards,
      Length.inches
    )
  }
}

Length.type.init()
