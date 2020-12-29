/* eslint-disable react/jsx-filename-extension */
/* eslint-env mocha */
import React from "react";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'sinon-chai' or its correspondi... Remove this comment to see the full error message
import sinonChai from "sinon-chai";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'sinon' or its corresponding ty... Remove this comment to see the full error message
import { stub } from "sinon";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'chai' or its corresponding typ... Remove this comment to see the full error message
import chai, { expect } from "chai";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'enzyme' or its corresponding t... Remove this comment to see the full error message
import { mount, configure } from "enzyme";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'enzyme-adapter-react-16' or it... Remove this comment to see the full error message
import Adapter from "enzyme-adapter-react-16";
import * as DS from "@nypl/design-system-react-components";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module '../../src/app/stores/configure... Remove this comment to see the full error message
import configureStore from "../../src/app/stores/configureStore";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module '../../src/app/stores/InitialSt... Remove this comment to see the full error message
import initialState from "../../src/app/stores/InitialState";
import SearchResultsPage, {
  loadSearch,
  isValidSearchQuery,
  // @ts-expect-error ts-migrate(2307) FIXME: Cannot find module '../../src/app/components/Searc... Remove this comment to see the full error message
} from "../../src/app/components/SearchResults/SearchResultsPage";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module '../../src/app/actions/SearchAc... Remove this comment to see the full error message
import { Actions } from "../../src/app/actions/SearchActions";
import { mockRouterContext } from "../helpers/routing";

chai.use(sinonChai);

configure({ adapter: new Adapter() });

// @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
describe("Search Results Page", () => {
  const searchQuery = {
    filters: [],
    page: "0",
    per_page: "10",
    queries: [{ field: "keyword", query: "cat" }],
    showField: "",
    showQuery: "",
    sort: [],
    total: "0",
  };

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe("isValidSearchQuery", () => {
    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it("returns true if searchQuery has queries", () => {
      expect(isValidSearchQuery(searchQuery)).to.equal(true);
    });
    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it("returns false if it has other fields but no queries", () => {
      expect(
        isValidSearchQuery({
          filters: "[]",
          page: "0",
          per_page: "10",
          queries: "",
          showField: "",
          showQuery: "",
          sort: "[]",
          total: "0",
        })
      ).to.equal(false);
    });
    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it("returns false if passed empty", () => {
      expect(isValidSearchQuery({})).to.equal(false);
    });
    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it("returns false if passed null", () => {
      expect(isValidSearchQuery(null)).to.equal(false);
    });
  });

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe("loadSearch", () => {
    let props: any;
    let push;
    let context: any;

    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'beforeEach'.
    beforeEach(() => {
      push = stub();
      context = mockRouterContext(push);

      props = {
        location: {
          query: {
            filters: "[]",
            page: "0",
            per_page: "10",
            queries: '[{ "field": "keyword", "query": "cat" }]',
            showField: "",
            showQuery: "",
            sort: "[]",
            total: "0",
          },
        },
        dispatch: stub(),
        searchQuery: {},
      };
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it("Load search with query sets query and calls search with correct parameters ", () => {
      loadSearch(props, context);
      expect(props.dispatch.callCount).to.equal(2);
      expect(props.dispatch.getCall(0).args[0]).to.eql({
        type: Actions.SET_QUERY,
        searchQuery,
      });
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it("Load search with no query resets search", () => {
      props.location.query = null;
      loadSearch(props, context);
      expect(props.dispatch).to.have.been.calledWith({
        type: Actions.RESET_SEARCH,
        reset: true,
      });
      expect(context.router.push).to.have.been.calledWith("/");
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it("Does not call anything if searchQuery is the same as query in location", () => {
      props.searchQuery = searchQuery;
      loadSearch(props, context);
      expect(props.dispatch).to.have.callCount(0);
    });
  });

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe("Search Results Page render", () => {
    let wrapper: any;

    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'before'.
    before(() => {
      const push = stub();
      const context = mockRouterContext(push);
      const childContextTypes = mockRouterContext(push);

      const store = configureStore(initialState);
      wrapper = mount(<SearchResultsPage store={store} />, {
        context,
        childContextTypes,
      });
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it("contains a <Breadcrumbs /> component", () => {
      expect(wrapper.find("Breadcrumbs").exists()).to.equal(true);
    });
    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it("contains a <ResultsHeader /> component", () => {
      expect(wrapper.find("ResultsHeader").exists()).to.equal(true);
    });
    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it("contains an <h1>", () => {
      expect(wrapper.find("h1")).to.have.length(1);
    });
    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it("contains sort dropdowns", () => {
      expect(
        wrapper.find(".search-dropdowns").find(DS.Dropdown)
      ).to.have.length(2);
    });
    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it("contains filters", () => {
      expect(wrapper.find("Filters")).to.have.length(1);
    });
    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it("contains pagination", () => {
      expect(wrapper.find("SearchPagination")).to.have.length(1);
    });
    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('does not contain "Refine" button', () => {
      expect(wrapper.find(".filter-refine").exists()).to.equal(false);
    });
  });

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe("Search Results Mobile view", () => {
    let wrapper: any;

    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'before'.
    before(() => {
      const push = stub();
      const context = mockRouterContext(push);
      const childContextTypes = mockRouterContext(push);

      const store = configureStore(initialState);
      wrapper = mount(<SearchResultsPage store={store} />, {
        context,
        childContextTypes,
      });
      wrapper.find("SearchResultsPage").setState({ isMobile: true });
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('contains "Refine" button in narrow screen', () => {
      expect(wrapper.find(".filter-refine").exists()).to.equal(true);
    });
    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it("Does not contain filters", () => {
      expect(wrapper.find("Filters").exists()).to.equal(false);
    });
  });

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe("Filter show/hide interactions", () => {
    let wrapper: any;

    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'before'.
    before(() => {
      const push = stub();
      const context = mockRouterContext(push);
      const childContextTypes = mockRouterContext(push);

      const store = configureStore(initialState);
      wrapper = mount(<SearchResultsPage store={store} />, {
        context,
        childContextTypes,
      });
      wrapper.find("SearchResultsPage").setState({ isMobile: true });
    });
    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('Shows filter when "Refine" is clicked', () => {
      wrapper.find("#btn-filter-button").simulate("click");
      expect(wrapper.find("Filters").exists()).to.equal(true);
    });
  });
});
