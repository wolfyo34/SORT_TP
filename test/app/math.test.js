require('chai').should();

const {add, subtract, divide, multiply} = require('../../app/math');

describe('app/math', () => {
  describe('#add()', () => {
    it('should add two numbers', () => {
      add(2, 3).should.be.equal(5);
      add(3, 2).should.be.equal(5);
      add(13, -1).should.be.equal(12);
    });

    it('should add two numbers from string', () => {
      add('2', '3').should.be.equal(5);
    });
  });

  describe('#subtract()', () => {
    it('should add two numbers', () => {
      subtract(2, 3).should.be.equal(-1);
      subtract(3, 2).should.be.equal(1);
      subtract(13, -1).should.be.equal(14);
    });

    it('should add two numbers from string', () => {
      subtract('2', '3').should.be.equal(-1);
    });
  });
});
