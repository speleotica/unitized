import UnitType from './UnitType'
import Unit from './Unit'
import UnitizedNumber from './UnitizedNumber'
import Length from './Length'

class AngleUnit extends Unit<Angle> {
  public readonly range: UnitizedNumber<Angle>

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
    const result = super(type, id, { fromBaseFactor, toBaseFactor })
    this.range = new UnitizedNumber(range, this)
  }
}

export type CallableAngleUnit = AngleUnit &
  ((value: number) => UnitizedNumber<Angle>)

class PercentGradeUnit extends AngleUnit {
  constructor(type: Angle) {
    super(type, '% grade', {
      fromBaseFactor: NaN,
      toBaseFactor: NaN,
      range: NaN,
    })
  }

  get fromBaseFactor(): number {
    throw new Error('percent grade is not a linear unit')
  }
  get toBaseFactor(): number {
    throw new Error('percent grade is not a linear unit')
  }

  public fromBase(angle: number): number {
    return Math.tan(angle) * 100
  }
  public toBase(angle: number): number {
    return Math.atan(angle / 100)
  }
}

export default class Angle extends UnitType<Angle> {
  private readonly __nominal: void = undefined
  public static readonly type: Angle = new Angle()

  public static readonly radians = new AngleUnit(Angle.type, 'rad', {
    fromBaseFactor: 1,
    toBaseFactor: 1,
    range: Math.PI * 2,
  }) as CallableAngleUnit
  public static readonly degrees = new AngleUnit(Angle.type, 'deg', {
    fromBaseFactor: 180 / Math.PI,
    toBaseFactor: Math.PI / 180,
    range: 360,
  }) as CallableAngleUnit
  public static readonly gradians = new AngleUnit(Angle.type, 'grad', {
    fromBaseFactor: 200 / Math.PI,
    toBaseFactor: Math.PI / 200,
    range: 400,
  }) as CallableAngleUnit
  public static readonly milsNATO = new AngleUnit(Angle.type, 'mil', {
    fromBaseFactor: 200 / Math.PI,
    toBaseFactor: Math.PI / 200,
    range: 6400,
  }) as CallableAngleUnit
  public static readonly percentGrade = new PercentGradeUnit(
    Angle.type
  ) as CallableAngleUnit

  public static sin(angle: UnitizedNumber<Angle>): number {
    return Math.sin(angle.get(Angle.radians))
  }
  public static cos(angle: UnitizedNumber<Angle>): number {
    return Math.cos(angle.get(Angle.radians))
  }
  public static tan(angle: UnitizedNumber<Angle>): number {
    return Math.tan(angle.get(Angle.radians))
  }
  public static asin(value: number): UnitizedNumber<Angle> {
    return Angle.radians(Math.asin(value))
  }
  public static acos(value: number): UnitizedNumber<Angle> {
    return Angle.radians(Math.acos(value))
  }
  public static atan(value: number): UnitizedNumber<Angle> {
    return Angle.radians(Math.atan(value))
  }
  public static atan2(y: number, x: number): UnitizedNumber<Angle>
  public static atan2(
    y: UnitizedNumber<Length>,
    x: UnitizedNumber<Length>
  ): UnitizedNumber<Angle>
  public static atan2(
    y: number | UnitizedNumber<Length>,
    x: number | UnitizedNumber<Length>
  ): UnitizedNumber<Angle> {
    if (typeof y === 'number' && typeof x === 'number') {
      return Angle.radians(Math.atan2(y, x))
    }
    if (y instanceof UnitizedNumber && x instanceof UnitizedNumber) {
      return Angle.radians(Math.atan2(y.get(y.unit), x.get(y.unit)))
    }
    throw new Error(`both x and y must be the same type`)
  }

  public static normalize(a: UnitizedNumber<Angle>): UnitizedNumber<Angle> {
    const { range } = a.unit as AngleUnit
    return a.isNegative ? a.mod(range).add(range) : a.mod(range)
  }

  public static opposite(a: UnitizedNumber<Angle>): UnitizedNumber<Angle> {
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
