/* eslint-env mocha */

import { expect } from 'chai'
import { Length } from './index'

describe('test setup', () => {
  it('works', () => {
    expect(Length.feet(2).get(Length.meters)).to.equal(2 * 0.3048)
  })
})
