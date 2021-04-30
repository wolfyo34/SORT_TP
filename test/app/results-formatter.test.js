require('chai').should();

const {
  computeStandings,
  formatResults
} = require('../../app/results-formatter');

describe('app/results-formatter', () => {
  // Describe('#computeStandings()', () => {});

  describe('#formatResults()', () => {
    it('should parse csv format', () => {
      formatResults('aze,AZE,1:20:3\nqsd,QSD,30.2\n').should.be.eql([
        {firstname: 'aze', lastname: 'AZE', result: '1:20:3'},
        {firstname: 'qsd', lastname: 'QSD', result: '30.2'}
      ]);
    });
  });
});
