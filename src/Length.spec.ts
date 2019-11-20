/* eslint-env mocha */

import { Length } from './index'
import checkConversions from './checkConversions.spec'

describe('Length', () => {
  checkConversions(0, Length.yards(2), Length.feet(6), Length.inches(72))
  checkConversions(
    0,
    Length.kilometers(1.6),
    Length.meters(1600),
    Length.centimeters(160000)
  )
  checkConversions(
    1e-8,
    Length.kilometers(0.0003048),
    Length.meters(0.3048),
    Length.centimeters(30.48),
    Length.miles(1 / 5280),
    Length.yards(1 / 3),
    Length.feet(1),
    Length.inches(12)
  )
})
