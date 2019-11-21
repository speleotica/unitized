import { describe, it } from 'mocha'
import { expect } from 'chai'
import { Length } from '.'

describe('UnitizedNumber', () => {
  it('.isNaN', () => {
    expect(Length.meters(0).isNaN).to.be.false
    expect(Length.meters(NaN).isNaN).to.be.true
    expect(Length.meters(Infinity).isNaN).to.be.false
  })
  it('.isNegative', () => {
    expect(Length.meters(1).isNegative).to.be.false
    expect(Length.meters(0).isNegative).to.be.false
    expect(Length.meters(-1).isNegative).to.be.true
    expect(Length.meters(NaN).isNegative).to.be.false
    expect(Length.meters(Infinity).isNegative).to.be.false
    expect(Length.meters(-Infinity).isNegative).to.be.true
  })
  it('.isPositive', () => {
    expect(Length.meters(1).isPositive).to.be.true
    expect(Length.meters(0).isPositive).to.be.false
    expect(Length.meters(-1).isPositive).to.be.false
    expect(Length.meters(NaN).isPositive).to.be.false
    expect(Length.meters(Infinity).isPositive).to.be.true
    expect(Length.meters(-Infinity).isPositive).to.be.false
  })
  it('.isInfinite', () => {
    expect(Length.meters(1).isInfinite).to.be.false
    expect(Length.meters(0).isInfinite).to.be.false
    expect(Length.meters(-1).isInfinite).to.be.false
    expect(Length.meters(NaN).isInfinite).to.be.false
    expect(Length.meters(Infinity).isInfinite).to.be.true
    expect(Length.meters(-Infinity).isInfinite).to.be.true
  })
  it('.isFinite', () => {
    expect(Length.meters(1).isFinite).to.be.true
    expect(Length.meters(0).isFinite).to.be.true
    expect(Length.meters(-1).isFinite).to.be.true
    expect(Length.meters(NaN).isFinite).to.be.false
    expect(Length.meters(Infinity).isFinite).to.be.false
    expect(Length.meters(-Infinity).isFinite).to.be.false
  })
  it('.isNonzero', () => {
    expect(Length.meters(1).isNonzero).to.be.true
    expect(Length.meters(0).isNonzero).to.be.false
    expect(Length.meters(-1).isNonzero).to.be.true
    expect(Length.meters(NaN).isNonzero).to.be.true
    expect(Length.meters(Infinity).isNonzero).to.be.true
    expect(Length.meters(-Infinity).isNonzero).to.be.true
  })
  it('.isZero', () => {
    expect(Length.meters(1).isZero).to.be.false
    expect(Length.meters(0).isZero).to.be.true
    expect(Length.meters(-1).isZero).to.be.false
    expect(Length.meters(NaN).isZero).to.be.false
    expect(Length.meters(Infinity).isZero).to.be.false
    expect(Length.meters(-Infinity).isZero).to.be.false
  })
  it('.get', () => {
    expect(Length.meters(1).get(Length.centimeters)).to.equal(100)
  })
  it('.add', () => {
    expect(Length.meters(1).add(Length.centimeters(3))).to.deep.equal(
      Length.meters(1.03)
    )
  })
  it('.in', () => {
    expect(
      Length.meters(1)
        .in(Length.centimeters)
        .get(Length.centimeters)
    ).to.equal(100)
    expect(Length.meters(1).in(Length.centimeters).unit).to.equal(
      Length.centimeters
    )
  })
  it('.negate', () => {
    expect(Length.meters(1).negate()).to.deep.equal(Length.meters(-1))
  })
  it('.sub', () => {
    expect(Length.meters(1).sub(Length.centimeters(3))).to.deep.equal(
      Length.meters(0.97)
    )
  })
  it('.mul', () => {
    expect(Length.meters(1).mul(3)).to.deep.equal(Length.meters(3))
  })
  it('.mod', () => {
    expect(Length.meters(5).mod(Length.meters(3))).to.deep.equal(
      Length.meters(2)
    )
  })
  it('.abs', () => {
    expect(Length.meters(-2).abs()).to.deep.equal(Length.meters(2))
    expect(Length.meters(3).abs()).to.deep.equal(Length.meters(3))
  })
  it('.div', () => {
    expect(Length.meters(2).div(4)).to.deep.equal(Length.meters(0.5))
    expect(Length.meters(2).div(Length.meters(4))).to.deep.equal(0.5)
  })
  it('.compare', () => {
    expect(Length.meters(5).compare(Length.meters(4))).to.be.above(0)
    expect(Length.meters(4).compare(Length.meters(5))).to.be.below(0)
    expect(Length.meters(NaN).compare(Length.meters(5))).to.equal(0)
    expect(Length.meters(5).compare(Length.meters(5))).to.equal(0)
  })
})
