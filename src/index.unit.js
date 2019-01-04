// @flow
const { expect } = require('chai');
const { hi } = require('./index');

describe('hi', () => {
  it('should return "hi"', async () => {
    expect(hi()).to.equal('hi');
  });
});
