/* eslint-env mocha */
import { expect } from 'chai';
import { searchResults } from '../src/app/actions/SearchActions';

describe('SearchActions', () => {
  let results;
  let resultsAction;

  before(() => {
    results = {
      id: 0,
      _source: {
        title: 'Sir Isaac Newton',
      },
    };
    resultsAction = searchResults(results);
  });

  describe('searchResults Action', () => {
    it('should return an object with type and results', () => {
      expect(resultsAction.type).to.equal('SEARCH');
      expect(JSON.stringify(resultsAction.results)).to.equal(JSON.stringify(results));
    });
  });
});
