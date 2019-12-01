import FactorTableUnitType from './FactorTableUnitType'
import Unit from './Unit'

export default class Length extends FactorTableUnitType<Length> {
  private __nominal: void
  static readonly type: Length = new Length()

  static readonly kilometers = new Unit(Length.type, 'km', {
    fromBaseFactor: 0.001,
    toBaseFactor: 1000,
  })
  static readonly meters = new Unit(Length.type, 'm', {
    fromBaseFactor: 1,
    toBaseFactor: 1,
  })
  static readonly centimeters = new Unit(Length.type, 'cm', {
    fromBaseFactor: 100,
    toBaseFactor: 0.01,
  })
  static readonly feet = new Unit(Length.type, 'ft', {
    fromBaseFactor: 1 / 0.3048,
    toBaseFactor: 0.3048,
  })
  static readonly miles = new Unit(Length.type, 'mi', {
    fromBaseFactor: Length.feet.fromBaseFactor / 5280,
    toBaseFactor: Length.feet.toBaseFactor * 5280,
  })
  static readonly yards = new Unit(Length.type, 'yd', {
    fromBaseFactor: Length.feet.fromBaseFactor / 3,
    toBaseFactor: Length.feet.toBaseFactor * 3,
  })
  static readonly inches = new Unit(Length.type, 'in', {
    fromBaseFactor: Length.feet.fromBaseFactor * 12,
    toBaseFactor: Length.feet.toBaseFactor / 12,
  })

  constructor() {
    super({
      factors: {
        km: {
          m: 1000,
          cm: 100000,
        },
        m: {
          km: 0.001,
          cm: 100,
          ft: 1 / 0.3048,
        },
        cm: {
          m: 0.01,
          km: 0.00001,
        },
        mi: {
          ft: 5280,
        },
        yd: {
          ft: 3,
          in: 36,
        },
        ft: {
          m: 0.3048,
          mi: 1 / 5280,
          yd: 1 / 3,
          in: 12,
        },
        in: {
          yd: 1 / 36,
          ft: 1 / 12,
        },
      },
    })
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
