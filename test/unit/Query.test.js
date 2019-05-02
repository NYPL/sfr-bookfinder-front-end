/* eslint-env mocha */
import { expect } from 'chai';
import { buildQueryBody } from '../../src/app/search/query';

describe('Query Body Building', () => {
  let query;
  let field;

  beforeEach(() => {
    query = "$shakespeare's, 1632-1635 +hamlet gh:ost; select * && delete * || drop *";
    field = 'title';
  });

  it('should not contain certain punctuation', () => {
    const queryBody = buildQueryBody({ query, field });
    const parsedValueOne = queryBody.query;
    expect(parsedValueOne.indexOf('\\$')).to.equal(-1);
    expect(parsedValueOne.indexOf("'")).to.not.equal(-1);
    expect(parsedValueOne.indexOf('\\;')).to.equal(-1);
    expect(parsedValueOne.indexOf('*')).to.not.equal(-1);
  });

  it('should throw an error if an empty query string is passed', () => {
    const emptyQuery = '';
    expect(buildQueryBody.bind(buildQueryBody, emptyQuery)).to.throw('A valid query string must be passed');
  });

  it('should return field query object with a single string value.', () => {
    query = 'shakespeare';
    field = 'title';
    const queryBody = buildQueryBody({ query, field });
    expect(queryBody.query.length).to.equal(11);
    const queryString = queryBody.query;
    expect(queryString).to.not.include(' ');
  });

  it('should return field query with multiple words joined by a plus sign.', () => {
    const queryBody = buildQueryBody({ query });
    expect(queryBody.query.length).to.equal(72);
    const decodedQuery = queryBody.query;
    expect(decodedQuery).to.equal("$shakespeare's, 1632-1635  hamlet gh:ost; select * && delete * || drop *");
  });

  it('should return default field when the default query string is given', () => {
    const emptyQuery = '*';
    const defaultQueryBody = buildQueryBody({ query: emptyQuery });

    expect(defaultQueryBody).to.not.equal({});
    expect(defaultQueryBody.query).to.equal('*');
    expect(defaultQueryBody.field).to.equal('keyword');
  });
});
