import FactorTableUnitType from './FactorTableUnitType'
import Unit from './Unit'
import UnitizedNumber from './UnitizedNumber'
import Length from './Length'

class AngleUnit extends Unit<Angle> {
  readonly range: UnitizedNumber<Angle>

  constructor(
    type: Angle,
    id: string,
    {
      fromBaseFactor,
      toBaseFactor,
      range,
    }: {
      fromBaseFactor: number
      toBaseFactor: number
      range: number
    }
  ) {
    super(type, id, { fromBaseFactor, toBaseFactor })
    this.range = new UnitizedNumber(range, this)
  }
}

class PercentGradeUnit extends AngleUnit {
  constructor(type: Angle) {
    super(type, '% grade', {
      fromBaseFactor: NaN,
      toBaseFactor: NaN,
      range: NaN,
    })
  }

  fromBase(angle: number): number {
    return Math.tan(angle) * 100
  }
  toBase(angle: number): number {
    return Math.atan(angle / 100)
  }
}

export default class Angle extends FactorTableUnitType<Angle> {
  private __nominal: void
  static readonly type: Angle = new Angle()

  constructor() {
    super({
      factors: {
        rad: {
          deg: 180 / Math.PI,
          grad: 200 / Math.PI,
          mil: 3200 / Math.PI,
        },
        deg: {
          rad: Math.PI / 180,
          grad: 200 / 180,
          mil: 3200 / 180,
        },
        grad: {
          rad: Math.PI / 200,
          deg: 180 / 200,
          mil: 3200 / 200,
        },
        mil: {
          rad: Math.PI / 3200,
          deg: 180 / 3200,
          grad: 200 / 3200,
        },
      },
    })
  }

  static readonly radians = new AngleUnit(Angle.type, 'rad', {
    fromBaseFactor: 1,
    toBaseFactor: 1,
    range: Math.PI * 2,
  })
  static readonly degrees = new AngleUnit(Angle.type, 'deg', {
    fromBaseFactor: 180 / Math.PI,
    toBaseFactor: Math.PI / 180,
    range: 360,
  })
  static readonly gradians = new AngleUnit(Angle.type, 'grad', {
    fromBaseFactor: 200 / Math.PI,
    toBaseFactor: Math.PI / 200,
    range: 400,
  })
  static readonly milsNATO = new AngleUnit(Angle.type, 'mil', {
    fromBaseFactor: 3200 / Math.PI,
    toBaseFactor: Math.PI / 3200,
    range: 6400,
  })
  static readonly percentGrade = new PercentGradeUnit(Angle.type)

  static sin(angle: UnitizedNumber<Angle>): number {
    return Math.sin(angle.get(Angle.radians))
  }
  static cos(angle: UnitizedNumber<Angle>): number {
    return Math.cos(angle.get(Angle.radians))
  }
  static tan(angle: UnitizedNumber<Angle>): number {
    return Math.tan(angle.get(Angle.radians))
  }
  static asin(value: number): UnitizedNumber<Angle> {
    return new UnitizedNumber(Math.asin(value), Angle.radians)
  }
  static acos(value: number): UnitizedNumber<Angle> {
    return new UnitizedNumber(Math.acos(value), Angle.radians)
  }
  static atan(value: number): UnitizedNumber<Angle> {
    return new UnitizedNumber(Math.atan(value), Angle.radians)
  }
  static atan2(y: number, x: number): UnitizedNumber<Angle>
  static atan2(
    y: UnitizedNumber<Length>,
    x: UnitizedNumber<Length>
  ): UnitizedNumber<Angle>
  static atan2(
    y: number | UnitizedNumber<Length>,
    x: number | UnitizedNumber<Length>
  ): UnitizedNumber<Angle> {
    if (typeof y === 'number' && typeof x === 'number') {
      return new UnitizedNumber(Math.atan2(y, x), Angle.radians)
    }
    if (y instanceof UnitizedNumber && x instanceof UnitizedNumber) {
      return new UnitizedNumber(
        Math.atan2(y.get(y.unit), x.get(y.unit)),
        Angle.radians
      )
    }
    throw new Error(`both x and y must be the same type`)
  }

  static normalize(a: UnitizedNumber<Angle>): UnitizedNumber<Angle> {
    const { range } = a.unit as AngleUnit
    return a.isNegative ? a.mod(range).add(range) : a.mod(range)
  }

  static opposite(a: UnitizedNumber<Angle>): UnitizedNumber<Angle> {
    const { range } = a.unit as AngleUnit
    return Angle.normalize(a.add(range.mul(0.5)))
  }

  init(): void {
    this.addUnits(
      Angle.radians,
      Angle.degrees,
      Angle.gradians,
      Angle.milsNATO,
      Angle.percentGrade
    )
  }
}

Angle.type.init()
