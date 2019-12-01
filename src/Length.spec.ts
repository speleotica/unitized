import { describe } from 'mocha'
import { Unitize } from './index'
import checkConversions from './checkConversions.spec'

describe('Length', () => {
  checkConversions(0, Unitize.yards(2), Unitize.feet(6), Unitize.inches(72))
  checkConversions(
    0,
    Unitize.kilometers(1.6),
    Unitize.meters(1600),
    Unitize.centimeters(160000)
  )
  checkConversions(
    1e-8,
    Unitize.kilometers(0.0003048),
    Unitize.meters(0.3048),
    Unitize.centimeters(30.48),
    Unitize.miles(1 / 5280),
    Unitize.yards(1 / 3),
    Unitize.feet(1),
    Unitize.inches(12)
  )
})
