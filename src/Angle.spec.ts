/* eslint-env mocha */

import { describe, it } from 'mocha'
import { Angle, Length, Unitize } from './index'
import checkConversions from './checkConversions.spec'
import { expect } from 'chai'

describe('Angle', () => {
  checkConversions(
    0,
    Unitize.degrees(90),
    Unitize.gradians(100),
    Unitize.milsNATO(1600)
  )
  checkConversions(
    1e-12,
    Unitize.radians(Math.PI / 4),
    Unitize.degrees(45),
    Unitize.gradians(50),
    Unitize.milsNATO(800),
    Unitize.percentGrade(100)
  )
  it('.sin', () => {
    expect(Angle.sin(Unitize.degrees(90))).to.equal(1)
  })
  it('.cos', () => {
    expect(Angle.cos(Unitize.degrees(90))).to.be.closeTo(0, 1e-12)
  })
  it('.tan', () => {
    expect(Angle.tan(Unitize.gradians(50))).to.be.closeTo(1, 1e-12)
  })
  it('.asin', () => {
    expect(Angle.asin(1)).to.deep.equal(Unitize.radians(Math.PI / 2))
  })
  it('.acos', () => {
    expect(Angle.acos(1)).to.deep.equal(Unitize.radians(0))
  })
  it('.atan', () => {
    expect(Angle.atan(1)).to.deep.equal(Unitize.radians(Math.PI / 4))
  })
  it('.atan2(number, number)', () => {
    expect(Angle.atan2(2, 1)).to.deep.equal(Unitize.radians(Math.atan2(2, 1)))
  })
  it('.atan2(UnitizedNumber, UnitizedNumber)', () => {
    expect(Angle.atan2(Unitize.meters(1), Unitize.feet(1))).to.deep.equal(
      Unitize.radians(Math.atan2(1, Unitize.feet(1).get(Length.meters)))
    )
  })
  it('.normalize', () => {
    expect(Angle.normalize(Unitize.radians(8))).to.deep.equal(
      Unitize.radians(8 % (Math.PI * 2))
    )
    expect(Angle.normalize(Unitize.radians(-2))).to.deep.equal(
      Unitize.radians(Math.PI * 2 - 2)
    )
    expect(Angle.normalize(Unitize.degrees(370))).to.deep.equal(
      Unitize.degrees(10)
    )
    expect(Angle.normalize(Unitize.degrees(-150))).to.deep.equal(
      Unitize.degrees(360 - 150)
    )
    expect(Angle.normalize(Unitize.gradians(450))).to.deep.equal(
      Unitize.gradians(50)
    )
    expect(Angle.normalize(Unitize.gradians(-20))).to.deep.equal(
      Unitize.gradians(400 - 20)
    )
    expect(Angle.normalize(Unitize.milsNATO(82734))).to.deep.equal(
      Unitize.milsNATO(82734 % 6400)
    )
    expect(Angle.normalize(Unitize.milsNATO(-20))).to.deep.equal(
      Unitize.milsNATO(6400 - 20)
    )
  })
  it('.opposite', () => {
    expect(Angle.opposite(Unitize.degrees(60))).to.deep.equal(
      Unitize.degrees(240)
    )
    expect(Angle.opposite(Unitize.gradians(70))).to.deep.equal(
      Unitize.gradians(270)
    )
    expect(Angle.opposite(Unitize.milsNATO(1000))).to.deep.equal(
      Unitize.milsNATO(4200)
    )
    expect(Angle.opposite(Unitize.radians(Math.PI / 4))).to.deep.equal(
      Unitize.radians((Math.PI * 5) / 4)
    )
  })
})
