/* eslint-env mocha */
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'chai' or its corresponding typ... Remove this comment to see the full error message
import { expect } from "chai";
import {
  searchResults,
  workDetail,
  editionDetail,
  // @ts-expect-error ts-migrate(2307) FIXME: Cannot find module '../../src/app/actions/SearchAc... Remove this comment to see the full error message
} from "../../src/app/actions/SearchActions";

// @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
describe("SearchActions", () => {
  let results;
  let resultsAction;
  let details;
  let workDetailAction;
  let editionDetailAction;

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe("searchResults Action", () => {
    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it("should return an object with type and results", () => {
      results = {
        id: 0,
        _source: {
          title: "Sir Isaac Newton",
        },
      };
      resultsAction = searchResults(results);

      expect(resultsAction.type).to.equal("SEARCH");
      expect(JSON.stringify(resultsAction.results)).to.equal(
        JSON.stringify(results)
      );
    });
  });

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe("workDetail Action", () => {
    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it("should return an object with type and workDetail", () => {
      details = {
        work: {
          title:
            "The Tragedie of Hamlet, Prince of Denmark\nA Study with the Text of the Folio of 1623",
          rights_stmt: "Public domain in the USA.",
        },
      };
      workDetailAction = workDetail(details);

      expect(workDetailAction.type).to.equal("FETCH_WORK");
      expect(JSON.stringify(workDetailAction.work)).to.equal(
        JSON.stringify(details)
      );
    });
  });

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe("editionDetail Action", () => {
    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it("should return an object with type and editionDetail", () => {
      details = {
        edition: {
          title:
            "The Tragedie of Hamlet, Prince of Denmark\nA Study with the Text of the Folio of 1623",
        },
      };
      editionDetailAction = editionDetail(details);

      expect(editionDetailAction.type).to.equal("FETCH_EDITION");
      expect(JSON.stringify(editionDetailAction.edition)).to.equal(
        JSON.stringify(details)
      );
    });
  });
});
