import Unit from './Unit'
import UnitType from './UnitType'
import UnitizedNumber from './UnitizedNumber'
import Length from './Length'
import Angle from './Angle'

export const bindUnit = <T extends UnitType<T>>(unit: Unit<T>) => (
  value: number
): UnitizedNumber<T> => new UnitizedNumber(value, unit)

export const meters = bindUnit(Length.meters)
export const centimeters = bindUnit(Length.centimeters)
export const kilometers = bindUnit(Length.kilometers)
export const feet = bindUnit(Length.feet)
export const inches = bindUnit(Length.inches)
export const yards = bindUnit(Length.yards)
export const miles = bindUnit(Length.miles)

export const radians = bindUnit(Angle.radians)
export const degrees = bindUnit(Angle.degrees)
export const gradians = bindUnit(Angle.gradians)
export const milsNATO = bindUnit(Angle.milsNATO)
export const percentGrade = bindUnit(Angle.percentGrade)
