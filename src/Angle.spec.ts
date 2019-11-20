/* eslint-env mocha */

import { Angle } from './index'
import checkConversions from './checkConversions.spec'

describe('Angle', () => {
  checkConversions(
    0,
    Angle.degrees(90),
    Angle.gradians(100),
    Angle.milsNATO(1600)
  )
  checkConversions(
    1e-12,
    Angle.radians(Math.PI / 4),
    Angle.degrees(45),
    Angle.gradians(50),
    Angle.milsNATO(800),
    Angle.percentGrade(100)
  )
})
