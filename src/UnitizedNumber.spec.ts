import { describe, it } from 'mocha'
import { expect } from 'chai'
import { UnitizedNumber, Length } from '.'

describe('UnitizedNumber', () => {
  it('.isNaN', () => {
    expect(Length.meters.of(0).isNaN).to.be.false
    expect(Length.meters.of(NaN).isNaN).to.be.true
    expect(Length.meters.of(Infinity).isNaN).to.be.false
  })
  it('.isNegative', () => {
    expect(Length.meters.of(1).isNegative).to.be.false
    expect(Length.meters.of(0).isNegative).to.be.false
    expect(Length.meters.of(-1).isNegative).to.be.true
    expect(Length.meters.of(NaN).isNegative).to.be.false
    expect(Length.meters.of(Infinity).isNegative).to.be.false
    expect(Length.meters.of(-Infinity).isNegative).to.be.true
  })
  it('.isPositive', () => {
    expect(Length.meters.of(1).isPositive).to.be.true
    expect(Length.meters.of(0).isPositive).to.be.false
    expect(Length.meters.of(-1).isPositive).to.be.false
    expect(Length.meters.of(NaN).isPositive).to.be.false
    expect(Length.meters.of(Infinity).isPositive).to.be.true
    expect(Length.meters.of(-Infinity).isPositive).to.be.false
  })
  it('.isInfinite', () => {
    expect(Length.meters.of(1).isInfinite).to.be.false
    expect(Length.meters.of(0).isInfinite).to.be.false
    expect(Length.meters.of(-1).isInfinite).to.be.false
    expect(Length.meters.of(NaN).isInfinite).to.be.false
    expect(Length.meters.of(Infinity).isInfinite).to.be.true
    expect(Length.meters.of(-Infinity).isInfinite).to.be.true
  })
  it('.isFinite', () => {
    expect(Length.meters.of(1).isFinite).to.be.true
    expect(Length.meters.of(0).isFinite).to.be.true
    expect(Length.meters.of(-1).isFinite).to.be.true
    expect(Length.meters.of(NaN).isFinite).to.be.false
    expect(Length.meters.of(Infinity).isFinite).to.be.false
    expect(Length.meters.of(-Infinity).isFinite).to.be.false
  })
  it('.isNonzero', () => {
    expect(Length.meters.of(1).isNonzero).to.be.true
    expect(Length.meters.of(0).isNonzero).to.be.false
    expect(Length.meters.of(-1).isNonzero).to.be.true
    expect(Length.meters.of(NaN).isNonzero).to.be.true
    expect(Length.meters.of(Infinity).isNonzero).to.be.true
    expect(Length.meters.of(-Infinity).isNonzero).to.be.true
  })
  it('.isZero', () => {
    expect(Length.meters.of(1).isZero).to.be.false
    expect(Length.meters.of(0).isZero).to.be.true
    expect(Length.meters.of(-1).isZero).to.be.false
    expect(Length.meters.of(NaN).isZero).to.be.false
    expect(Length.meters.of(Infinity).isZero).to.be.false
    expect(Length.meters.of(-Infinity).isZero).to.be.false
  })
  it('.get', () => {
    expect(Length.meters.of(1).get(Length.centimeters)).to.equal(100)
  })
  it('.add', () => {
    expect(Length.meters.of(1).add(Length.centimeters.of(3))).to.deep.equal(
      Length.meters.of(1.03)
    )
  })
  it('.in', () => {
    expect(
      Length.meters
        .of(1)
        .in(Length.centimeters)
        .get(Length.centimeters)
    ).to.equal(100)
    expect(Length.meters.of(1).in(Length.centimeters).unit).to.equal(
      Length.centimeters
    )
  })
  it('.negate', () => {
    expect(Length.meters.of(1).negate()).to.deep.equal(Length.meters.of(-1))
  })
  it('.sub', () => {
    expect(Length.meters.of(1).sub(Length.centimeters.of(3))).to.deep.equal(
      Length.meters.of(0.97)
    )
  })
  it('.mul', () => {
    expect(Length.meters.of(1).mul(3)).to.deep.equal(Length.meters.of(3))
  })
  it('.mod', () => {
    expect(Length.meters.of(5).mod(Length.meters.of(3))).to.deep.equal(
      Length.meters.of(2)
    )
  })
  it('.abs', () => {
    expect(Length.meters.of(-2).abs()).to.deep.equal(Length.meters.of(2))
    expect(Length.meters.of(3).abs()).to.deep.equal(Length.meters.of(3))
  })
  it('.div', () => {
    expect(Length.meters.of(2).div(4)).to.deep.equal(Length.meters.of(0.5))
    expect(Length.meters.of(2).div(Length.meters.of(4))).to.deep.equal(0.5)
  })
  it('.compare', () => {
    expect(Length.meters.of(5).compare(Length.meters.of(4))).to.be.above(0)
    expect(Length.meters.of(4).compare(Length.meters.of(5))).to.be.below(0)
    expect(Length.meters.of(NaN).compare(Length.meters.of(5))).to.equal(0)
    expect(Length.meters.of(5).compare(Length.meters.of(5))).to.equal(0)
  })
})
