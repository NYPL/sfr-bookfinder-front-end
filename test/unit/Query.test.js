/* eslint-env mocha */
import { expect } from 'chai';
import { buildQueryBody } from '../../src/app/search/query';

describe('Query Body Building', () => {
  const query = { query: { userQuery: "$shakespeare's, ghost; select *", field: 'title' } };

  it('should not contain certain punctuation', () => {
    const queryBody = buildQueryBody(query);
    const parsedValueOne = queryBody.queries[0].value;
    const parsedValueTwo = queryBody.queries[1].value;
    const parsedValueFour = queryBody.queries[3].value;
    expect(parsedValueOne.indexOf('$')).to.equal(-1);
    expect(parsedValueOne.indexOf(',')).to.equal(-1);
    expect(parsedValueOne.indexOf('\'')).to.not.equal(-1);
    expect(parsedValueTwo.indexOf(';')).to.equal(-1);
    expect(parsedValueFour).to.equal('*');
  });

  it('should return field query objects for each word within the "queries" array.', () => {
    const queryBody = buildQueryBody(query);
    expect(queryBody.queries.length).to.equal(4);
  });

  it('should throw an error if an empty query string is passed', () => {
    const emptyQuery = { query: {} };
    expect(buildQueryBody.bind(buildQueryBody, emptyQuery)).to.throw('A valid query string must be passed');
  });

  it('should return default field when the default query string is given', () => {
    const emptyQuery = { query: { userQuery: '*' } };
    const defaultQueryBody = buildQueryBody(emptyQuery);

    expect(defaultQueryBody).to.not.equal({});
    expect(defaultQueryBody.queries[0].value).to.equal('*');
    expect(defaultQueryBody.queries[0].field).to.equal('keyword');
  });
});
