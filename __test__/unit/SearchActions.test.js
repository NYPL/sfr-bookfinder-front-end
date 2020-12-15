/* eslint-env mocha */
import { expect } from 'chai';
import { searchResults, workDetail, editionDetail } from '../../src/app/actions/SearchActions';

describe('SearchActions', () => {
  let results;
  let resultsAction;
  let details;
  let workDetailAction;
  let editionDetailAction;

  describe('searchResults Action', () => {
    it('should return an object with type and results', () => {
      results = {
        id: 0,
        _source: {
          title: 'Sir Isaac Newton',
        },
      };
      resultsAction = searchResults(results);

      expect(resultsAction.type).to.equal('SEARCH');
      expect(JSON.stringify(resultsAction.results)).to.equal(JSON.stringify(results));
    });
  });

  describe('workDetail Action', () => {
    it('should return an object with type and workDetail', () => {
      details = {
        work: {
          title: 'The Tragedie of Hamlet, Prince of Denmark\nA Study with the Text of the Folio of 1623',
          rights_stmt: 'Public domain in the USA.',
        },
      };
      workDetailAction = workDetail(details);

      expect(workDetailAction.type).to.equal('FETCH_WORK');
      expect(JSON.stringify(workDetailAction.work)).to.equal(JSON.stringify(details));
    });
  });

  describe('editionDetail Action', () => {
    it('should return an object with type and editionDetail', () => {
      details = {
        edition: {
          title: 'The Tragedie of Hamlet, Prince of Denmark\nA Study with the Text of the Folio of 1623',
        },
      };
      editionDetailAction = editionDetail(details);

      expect(editionDetailAction.type).to.equal('FETCH_EDITION');
      expect(JSON.stringify(editionDetailAction.edition)).to.equal(JSON.stringify(details));
    });
  });
});