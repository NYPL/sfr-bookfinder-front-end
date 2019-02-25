/* eslint-env mocha */
import { expect } from 'chai';
import { buildQueryBody } from '../../src/app/search/query';

describe('Query Body Building', () => {
  let query;

  beforeEach(() => {
    query = { query: { userQuery: "$shakespeare's, 1632-1635 +hamlet gh:ost; select * && delete * || drop *", field: 'title' } };
  });

  it('should not contain certain punctuation', () => {
    const queryBody = buildQueryBody(query);
    const parsedValueOne = queryBody.queries[0].value;
    expect(parsedValueOne.indexOf('\\$')).to.equal(-1);
    expect(parsedValueOne.indexOf('\'')).to.not.equal(-1);
    expect(parsedValueOne.indexOf('\\;')).to.equal(-1);
    expect(parsedValueOne.indexOf('\\*')).to.not.equal(-1);
  });

  it('should throw an error if an empty query string is passed', () => {
    const emptyQuery = { query: {} };
    expect(buildQueryBody.bind(buildQueryBody, emptyQuery)).to.throw('A valid query string must be passed');
  });

  it('should return field query object with a single string value.', () => {
    query = { query: { userQuery: 'shakespeare', field: 'title' } };
    const queryBody = buildQueryBody(query);
    expect(queryBody.queries.length).to.equal(1);
    const queryString = queryBody.queries[0].value;
    expect(queryString).to.not.include(' ');
  });

  it('should return field query with multiple words joined by a plus sign.', () => {
    const queryBody = buildQueryBody(query);
    expect(queryBody.queries.length).to.equal(1);
    const decodedQuery = queryBody.queries[0].value;
    expect(decodedQuery).to.equal("$shakespeare's, 1632\\-1635  hamlet gh\\:ost; select \\* \\&\\& delete \\* \\|\\| drop \\*");
  });

  it('should return default field when the default query string is given', () => {
    const emptyQuery = { query: { userQuery: '*' } };
    const defaultQueryBody = buildQueryBody(emptyQuery);

    expect(defaultQueryBody).to.not.equal({});
    expect(defaultQueryBody.queries[0].value).to.equal('\\*');
    expect(defaultQueryBody.queries[0].field).to.equal('keyword');
  });
});
