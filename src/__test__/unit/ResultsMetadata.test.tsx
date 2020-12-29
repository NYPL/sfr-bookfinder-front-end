/* eslint-disable react/jsx-filename-extension */
/* eslint-env mocha */
import React from "react";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'chai' or its corresponding typ... Remove this comment to see the full error message
import { expect } from "chai";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'enzyme' or its corresponding t... Remove this comment to see the full error message
import { shallow, configure } from "enzyme";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'enzyme-adapter-react-16' or it... Remove this comment to see the full error message
import Adapter from "enzyme-adapter-react-16";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module '../../src/app/components/Searc... Remove this comment to see the full error message
import ResultsMetadata from "../../src/app/components/SearchResults/ResultsMetadata";

configure({ adapter: new Adapter() });

// @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
describe("Results Metadata", () => {
  let component: any;
  let searchQuery;

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe("No results message delivery", () => {
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'before'.
    before(() => {
      component = shallow(<ResultsMetadata totalItems={0} />);
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it("should have a message stating no results found.", () => {
      expect(component.find("span")).to.have.length(1);
      expect(component.find("span").text()).to.equal("Viewing 0 items");
    });
  });

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe("Found < page size of results", () => {
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'before'.
    before(() => {
      searchQuery = {
        filters: [],
        page: "0",
        per_page: "10",
        queries: [
          {
            query: "cat",
            field: "keyword",
          },
        ],
        showField: "",
        showQuery: "",
        sort: [],
        total: "0",
      };
      component = shallow(
        <ResultsMetadata totalItems={5} searchQuery={searchQuery} />
      );
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it("should have a message displaying all 5 results found.", () => {
      expect(component.find("span")).to.have.length(1);
      expect(component.find("span").text()).to.equal(
        "Viewing 1 - 5 of 5 items"
      );
    });
  });

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe("Found > page size of results", () => {
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'before'.
    before(() => {
      searchQuery = {
        filters: [],
        page: "0",
        per_page: "10",
        queries: [
          {
            query: "cat",
            field: "keyword",
          },
        ],
        showField: "",
        showQuery: "",
        sort: [],
        total: "0",
      };
      component = shallow(<ResultsMetadata totalItems={15} />);
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it("should have a message displaying 10 of 15 results found.", () => {
      expect(component.find("span")).to.have.length(1);
      expect(component.find("span").text()).to.equal(
        "Viewing 1 - 10 of 15 items"
      );
    });
  });
});
