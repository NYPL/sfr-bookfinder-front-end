/* eslint-env mocha */
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'chai' or its corresponding typ... Remove this comment to see the full error message
import { expect } from "chai";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module '../../src/app/search/query' or... Remove this comment to see the full error message
import { buildSearchQuery } from "../../src/app/search/query";

// @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
describe("Query Body Building", () => {
  let query: any;
  let field: any;

  // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'beforeEach'.
  beforeEach(() => {
    query =
      "$shakespeare's, 1632-1635 +hamlet gh:ost; select * && delete * || drop *";
    field = "title";
  });

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it("should not contain certain punctuation", () => {
    const queryBody = buildSearchQuery({ query, field });
    const parsedValueOne = queryBody.query;
    expect(parsedValueOne.indexOf("\\$")).to.equal(-1);
    expect(parsedValueOne.indexOf("'")).to.not.equal(-1);
    expect(parsedValueOne.indexOf("\\;")).to.equal(-1);
    expect(parsedValueOne.indexOf("*")).to.not.equal(-1);
  });

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it("should return field query object with a single string value.", () => {
    query = "shakespeare";
    field = "title";
    const queryBody = buildSearchQuery({ query, field });
    expect(queryBody.query.length).to.equal(11);
    const queryString = queryBody.query;
    expect(queryString).to.not.include(" ");
  });

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it("should return field query with multiple words joined by a plus sign.", () => {
    const queryBody = buildSearchQuery({ query });
    expect(queryBody.query.length).to.equal(72);
    const decodedQuery = queryBody.query;
    expect(decodedQuery).to.equal(
      "$shakespeare's, 1632-1635  hamlet gh:ost; select * && delete * || drop *"
    );
  });

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it("should return default field when the default query string is given", () => {
    const emptyQuery = "*";
    const defaultQueryBody = buildSearchQuery({ query: emptyQuery });

    expect(defaultQueryBody).to.not.equal({});
    expect(defaultQueryBody.query).to.equal("*");
    expect(defaultQueryBody.field).to.equal("keyword");
  });
});
