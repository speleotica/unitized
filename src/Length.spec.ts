/* eslint-env mocha */

import { expect } from 'chai'
import { Length } from './index'

describe('Length', () => {
  it('works', () => {
    expect(Length.feet(2).get(Length.meters)).to.equal(2 * 0.3048)
    expect(Length.miles(1).get(Length.kilometers)).to.equal(1.609344)
    expect(Length.yards(1).get(Length.meters)).to.equal(0.9144000000000001)
  })
})
