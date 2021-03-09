/* eslint-disable react/jsx-filename-extension */
/* eslint-env mocha */
import React from "react";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'chai' or its corresponding typ... Remove this comment to see the full error message
import { expect } from "chai";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'sinon' or its corresponding ty... Remove this comment to see the full error message
import { stub } from "sinon";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'enzyme' or its corresponding t... Remove this comment to see the full error message
import { mount, configure } from "enzyme";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'enzyme-adapter-react-16' or it... Remove this comment to see the full error message
import Adapter from "enzyme-adapter-react-16";
import SearchNavigation, {
  submit,
  // @ts-expect-error ts-migrate(2307) FIXME: Cannot find module '../../src/app/components/Searc... Remove this comment to see the full error message
} from "../../src/app/components/SearchResults/SearchNavigation";
// @ts-expect-error ts-migrate(2732) FIXME: Cannot find module '../fixtures/results-list.json'... Remove this comment to see the full error message
import results from "../fixtures/results-list.json";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module '../../src/app/constants/sorts'... Remove this comment to see the full error message
import { sortMap, numbersPerPage } from "../../src/app/constants/sorts";
import { mockRouterContext, mockRouter } from "../helpers/routing";

configure({ adapter: new Adapter() });

// @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
describe("Search Navigation", () => {
  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe("No results behavior.", () => {
    let query: any;
    let component: any;
    let push;
    let router: any;

    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'before'.
    before(() => {
      push = stub();
      router = mockRouter(push);
      const context = mockRouterContext(push);

      query = { query: "dsdasd", field: "keyword" };
      component = mount(
        <SearchNavigation totalItems={0} searchQuery={query} />,
        { context }
      );
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it("Calls submit with query", () => {
      submit(query, router);
      expect(router.push.called).to.equal(true);
      expect(router.push.args[0]).to.eql([
        "/search?query=dsdasd&field=keyword",
      ]);
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it("Should contain a SearchHeader Component", () => {
      expect(component.find("h2").exists()).to.equal(true);
      expect(component.find("h2").text()).to.equal("Viewing 0 items");
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it("Should contain a dropdown with number of items per page", () => {
      expect(component.find("select#items-per-page-select").exists()).to.equal(
        true
      );
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it("Should contain a dropdown with select options", () => {
      expect(component.find("select#sort-by-select").exists()).to.equal(true);
    });
  });

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe("Search Navigation behavior", () => {
    const query = { query: "Chicago", field: "keyword" };
    const component = mount(
      <SearchNavigation
        metadata={results.data.totalWorks}
        searchQuery={query}
      />
    );

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it("should contain a select with list of numbers per page", () => {
      expect(
        component.find("#items-per-page-select").find("option")
      ).to.have.length(4);
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it("should contain a select with list of numbers per page equal to 10, 20, 50, 100", () => {
      expect(
        component
          .find("#items-per-page-select")
          .find("option")
          .map((opt: any) => opt.props().value)
      ).to.eql(numbersPerPage);
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it("should contain a select with list of sort options", () => {
      expect(component.find("#sort-by-select").find("option")).to.have.length(
        7
      );
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it("should contain a select with sort selections", () => {
      expect(component.find("#sort-by-select").find("option")).to.have.length(
        Object.keys(sortMap).length
      );
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it("should contain a select with sort selections equal to the sortMap", () => {
      expect(
        component
          .find("#sort-by-select")
          .find("option")
          .map((opt: any) => opt.props().value)
      ).to.eql(Object.keys(sortMap));
    });
  });
});
