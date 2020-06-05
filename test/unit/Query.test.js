/* eslint-env mocha */
import { expect } from 'chai';
import { buildSearchQuery } from '../../src/app/search/query';

describe('Query Body Building', () => {
  let query;
  let field;

  beforeEach(() => {
    query = "$shakespeare's, 1632-1635 +hamlet gh:ost; select * && delete * || drop *";
    field = 'title';
  });

  it('should not contain certain punctuation', () => {
    const queryBody = buildSearchQuery({ query, field });
    const parsedValueOne = queryBody.query;
    expect(parsedValueOne.indexOf('\\$')).to.equal(-1);
    expect(parsedValueOne.indexOf("'")).to.not.equal(-1);
    expect(parsedValueOne.indexOf('\\;')).to.equal(-1);
    expect(parsedValueOne.indexOf('*')).to.not.equal(-1);
  });

  it('should return field query object with a single string value.', () => {
    query = 'shakespeare';
    field = 'title';
    const queryBody = buildSearchQuery({ query, field });
    expect(queryBody.query.length).to.equal(11);
    const queryString = queryBody.query;
    expect(queryString).to.not.include(' ');
  });

  it('should return field query with multiple words joined by a plus sign.', () => {
    const queryBody = buildSearchQuery({ query });
    expect(queryBody.query.length).to.equal(72);
    const decodedQuery = queryBody.query;
    expect(decodedQuery).to.equal("$shakespeare's, 1632-1635  hamlet gh:ost; select * && delete * || drop *");
  });

  it('should return default field when the default query string is given', () => {
    const emptyQuery = '*';
    const defaultQueryBody = buildSearchQuery({ query: emptyQuery });

    expect(defaultQueryBody).to.not.equal({});
    expect(defaultQueryBody.query).to.equal('*');
    expect(defaultQueryBody.field).to.equal('keyword');
  });
});
