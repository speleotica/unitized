import { describe, it } from 'mocha'
import { expect } from 'chai'
import { Length, Unitize } from '.'

describe('UnitizedNumber', () => {
  it('.toString', () => {
    expect(String(Unitize.meters(5))).to.equal('5 m')
  })
  it('.isNaN', () => {
    expect(Unitize.meters(0).isNaN).to.be.false
    expect(Unitize.meters(NaN).isNaN).to.be.true
    expect(Unitize.meters(Infinity).isNaN).to.be.false
  })
  it('.isNegative', () => {
    expect(Unitize.meters(1).isNegative).to.be.false
    expect(Unitize.meters(0).isNegative).to.be.false
    expect(Unitize.meters(-1).isNegative).to.be.true
    expect(Unitize.meters(NaN).isNegative).to.be.false
    expect(Unitize.meters(Infinity).isNegative).to.be.false
    expect(Unitize.meters(-Infinity).isNegative).to.be.true
  })
  it('.isPositive', () => {
    expect(Unitize.meters(1).isPositive).to.be.true
    expect(Unitize.meters(0).isPositive).to.be.false
    expect(Unitize.meters(-1).isPositive).to.be.false
    expect(Unitize.meters(NaN).isPositive).to.be.false
    expect(Unitize.meters(Infinity).isPositive).to.be.true
    expect(Unitize.meters(-Infinity).isPositive).to.be.false
  })
  it('.isInfinite', () => {
    expect(Unitize.meters(1).isInfinite).to.be.false
    expect(Unitize.meters(0).isInfinite).to.be.false
    expect(Unitize.meters(-1).isInfinite).to.be.false
    expect(Unitize.meters(NaN).isInfinite).to.be.false
    expect(Unitize.meters(Infinity).isInfinite).to.be.true
    expect(Unitize.meters(-Infinity).isInfinite).to.be.true
  })
  it('.isFinite', () => {
    expect(Unitize.meters(1).isFinite).to.be.true
    expect(Unitize.meters(0).isFinite).to.be.true
    expect(Unitize.meters(-1).isFinite).to.be.true
    expect(Unitize.meters(NaN).isFinite).to.be.false
    expect(Unitize.meters(Infinity).isFinite).to.be.false
    expect(Unitize.meters(-Infinity).isFinite).to.be.false
  })
  it('.isNonzero', () => {
    expect(Unitize.meters(1).isNonzero).to.be.true
    expect(Unitize.meters(0).isNonzero).to.be.false
    expect(Unitize.meters(-1).isNonzero).to.be.true
    expect(Unitize.meters(NaN).isNonzero).to.be.true
    expect(Unitize.meters(Infinity).isNonzero).to.be.true
    expect(Unitize.meters(-Infinity).isNonzero).to.be.true
  })
  it('.isZero', () => {
    expect(Unitize.meters(1).isZero).to.be.false
    expect(Unitize.meters(0).isZero).to.be.true
    expect(Unitize.meters(-1).isZero).to.be.false
    expect(Unitize.meters(NaN).isZero).to.be.false
    expect(Unitize.meters(Infinity).isZero).to.be.false
    expect(Unitize.meters(-Infinity).isZero).to.be.false
  })
  it('.get', () => {
    expect(Unitize.meters(1).get(Length.centimeters)).to.equal(100)
  })
  it('.add', () => {
    expect(Unitize.meters(1).add(Unitize.centimeters(3))).to.deep.equal(
      Unitize.meters(1.03)
    )
  })
  it('.in', () => {
    expect(
      Unitize.meters(1)
        .in(Length.centimeters)
        .get(Length.centimeters)
    ).to.equal(100)
    expect(Unitize.meters(1).in(Length.centimeters).unit).to.equal(
      Length.centimeters
    )
  })
  it('.negate', () => {
    expect(Unitize.meters(1).negate()).to.deep.equal(Unitize.meters(-1))
  })
  it('.sub', () => {
    expect(Unitize.meters(1).sub(Unitize.centimeters(3))).to.deep.equal(
      Unitize.meters(0.97)
    )
  })
  it('.mul', () => {
    expect(Unitize.meters(1).mul(3)).to.deep.equal(Unitize.meters(3))
  })
  it('.mod', () => {
    expect(Unitize.meters(5).mod(Unitize.meters(3))).to.deep.equal(
      Unitize.meters(2)
    )
  })
  it('.abs', () => {
    expect(Unitize.meters(-2).abs()).to.deep.equal(Unitize.meters(2))
    expect(Unitize.meters(3).abs()).to.deep.equal(Unitize.meters(3))
  })
  it('.div', () => {
    expect(Unitize.meters(2).div(4)).to.deep.equal(Unitize.meters(0.5))
    expect(Unitize.meters(2).div(Unitize.meters(4))).to.deep.equal(0.5)
  })
  it('.compare', () => {
    expect(Unitize.meters(5).compare(Unitize.meters(4))).to.be.above(0)
    expect(Unitize.meters(4).compare(Unitize.meters(5))).to.be.below(0)
    expect(Unitize.meters(NaN).compare(Unitize.meters(5))).to.equal(0)
    expect(Unitize.meters(5).compare(Unitize.meters(5))).to.equal(0)
  })
})
