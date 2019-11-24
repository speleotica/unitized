/* eslint-env mocha */

import { describe, it } from 'mocha'
import { Angle, Length, UnitizedNumber } from './index'
import checkConversions from './checkConversions.spec'
import { expect } from 'chai'

describe('Angle', () => {
  for (const unit of [
    Angle.radians,
    Angle.degrees,
    Angle.gradians,
    Angle.milsNATO,
    Angle.percentGrade,
  ]) {
    it(`calling ${unit} as a function works`, () => {
      expect(unit(2)).to.deep.equal(new UnitizedNumber(2, unit))
    })
  }
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
  it('.sin', () => {
    expect(Angle.sin(Angle.degrees(90))).to.equal(1)
  })
  it('.cos', () => {
    expect(Angle.cos(Angle.degrees(90))).to.be.closeTo(0, 1e-12)
  })
  it('.tan', () => {
    expect(Angle.tan(Angle.gradians(50))).to.be.closeTo(1, 1e-12)
  })
  it('.asin', () => {
    expect(Angle.asin(1)).to.deep.equal(Angle.radians(Math.PI / 2))
  })
  it('.acos', () => {
    expect(Angle.acos(1)).to.deep.equal(Angle.radians(0))
  })
  it('.atan', () => {
    expect(Angle.atan(1)).to.deep.equal(Angle.radians(Math.PI / 4))
  })
  it('.atan2(number, number)', () => {
    expect(Angle.atan2(2, 1)).to.deep.equal(Angle.radians(Math.atan2(2, 1)))
  })
  it('.atan2(UnitizedNumber, UnitizedNumber)', () => {
    expect(Angle.atan2(Length.meters(1), Length.feet(1))).to.deep.equal(
      Angle.radians(Math.atan2(1, Length.feet(1).get(Length.meters)))
    )
  })
  it('.normalize', () => {
    expect(Angle.normalize(Angle.radians(8))).to.deep.equal(
      Angle.radians(8 % (Math.PI * 2))
    )
    expect(Angle.normalize(Angle.radians(-2))).to.deep.equal(
      Angle.radians(Math.PI * 2 - 2)
    )
    expect(Angle.normalize(Angle.degrees(370))).to.deep.equal(Angle.degrees(10))
    expect(Angle.normalize(Angle.degrees(-150))).to.deep.equal(
      Angle.degrees(360 - 150)
    )
    expect(Angle.normalize(Angle.gradians(450))).to.deep.equal(
      Angle.gradians(50)
    )
    expect(Angle.normalize(Angle.gradians(-20))).to.deep.equal(
      Angle.gradians(400 - 20)
    )
    expect(Angle.normalize(Angle.milsNATO(82734))).to.deep.equal(
      Angle.milsNATO(82734 % 6400)
    )
    expect(Angle.normalize(Angle.milsNATO(-20))).to.deep.equal(
      Angle.milsNATO(6400 - 20)
    )
  })
  it('.opposite', () => {
    expect(Angle.opposite(Angle.degrees(60))).to.deep.equal(Angle.degrees(240))
    expect(Angle.opposite(Angle.gradians(70))).to.deep.equal(
      Angle.gradians(270)
    )
    expect(Angle.opposite(Angle.milsNATO(1000))).to.deep.equal(
      Angle.milsNATO(4200)
    )
    expect(Angle.opposite(Angle.radians(Math.PI / 4))).to.deep.equal(
      Angle.radians((Math.PI * 5) / 4)
    )
  })
})
