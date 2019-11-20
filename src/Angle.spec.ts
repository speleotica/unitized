/* eslint-env mocha */

import { expect } from 'chai'
import { Angle, Length } from './index'

describe('Angle', () => {
  it('works', () => {
    expect(Angle.degrees(45).get(Angle.percentGrade)).to.equal(
      99.99999999999999
    )
  })
})
