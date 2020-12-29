/* eslint-disable react/jsx-filename-extension */
/* eslint-env mocha */
import React from "react";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'sinon' or its corresponding ty... Remove this comment to see the full error message
import { stub } from "sinon";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'chai' or its corresponding typ... Remove this comment to see the full error message
import { expect } from "chai";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'enzyme' or its corresponding t... Remove this comment to see the full error message
import { shallow, mount, configure } from "enzyme";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'enzyme-adapter-react-16' or it... Remove this comment to see the full error message
import Adapter from "enzyme-adapter-react-16";
import * as DS from "@nypl/design-system-react-components";
import { mockRouterContext } from "../helpers/routing";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module '../../src/app/components/Searc... Remove this comment to see the full error message
import Filters from "../../src/app/components/SearchResults/Filters";
// @ts-expect-error ts-migrate(2732) FIXME: Cannot find module '../fixtures/results-list.json'... Remove this comment to see the full error message
import results from "../fixtures/results-list.json";
// @ts-expect-error ts-migrate(2732) FIXME: Cannot find module '../fixtures/search-query.json'... Remove this comment to see the full error message
import defaultQuery from "../fixtures/search-query.json";

configure({ adapter: new Adapter() });

const noResults = {
  took: 93,
  timed_out: false,
  _shards: {
    total: 5,
    successful: 5,
    skipped: 0,
    failed: 0,
  },
  hits: {
    total: 0,
    max_score: null,
    hits: [],
  },
  facets: {
    language: [],
  },
};

// @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
describe("Filters", () => {
  let component: any;

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe("No results behavior.", () => {
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'before'.
    before(() => {
      component = shallow(<Filters data={noResults} />);
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it("should show all filters even if results are empty", () => {
      expect(component.find("fieldset")).to.have.length(4);
    });
  });
  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe("No results behavior with searchQuery.", () => {
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'before'.
    before(() => {
      const searchQuery = {
        filters: [{ field: "language", value: "English" }],
      };
      const push = stub();
      const changeSort = stub();
      const changePerPage = stub();
      const toggleMenu = stub();
      const context = mockRouterContext(push);
      component = shallow(
        <Filters
          toggleMenu={toggleMenu}
          data={noResults}
          router={context.router}
          searchQuery={searchQuery}
          onChangeSort={changeSort}
          onChangePerPage={changePerPage}
        />
      );
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it("should not return null when there is no hits and there is a searchQuery.", () => {
      expect(component.find(DS.Heading).exists()).to.equal(true);
    });
  });

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe("Filters Desktop Rendering.", () => {
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'before'.
    before(() => {
      const searchQuery = defaultQuery;
      component = shallow(
        <Filters data={results.data} searchQuery={searchQuery} />
      );
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it("should display a list of fields (currently 4)", () => {
      expect(component.find("fieldset")).to.have.length(4);
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it("should display a list of filters inside the language field", () => {
      expect(component.find(DS.UnorderedList).find(DS.Checkbox)).to.have.length(
        7
      );
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it("should display the maximum count of language filter first", () => {
      expect(
        component.find(DS.UnorderedList).find(DS.Checkbox).first().props()
          .labelOptions.labelContent.props.children
      ).to.equal("English (2)");
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it("should contain Years Filter (a DateRangeForm)", () => {
      expect(component.find(DS.DateRangeForm)).to.have.length(1);
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it("should have a Read Now filter", () => {
      expect(
        component.find(DS.Checkbox).find('[name="show_all"]')
      ).to.have.lengthOf(1);
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it("should have a Read Now filter checked by default", () => {
      expect(
        component.find("fieldset").at(0).find(DS.Checkbox).props().isSelected
      ).to.equal(true);
    });
  });

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe("Filter Mobile Rendering", () => {
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'before'.
    before(() => {
      const searchQuery = defaultQuery;
      component = shallow(
        <Filters data={results.data} searchQuery={searchQuery} isMobile />
      );
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it("should display sort dropdowns", () => {
      expect(
        component.find(".search-dropdowns__mobile").find(DS.Dropdown)
      ).to.have.length(2);
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it("should display a list of fields (currently 4)", () => {
      expect(component.find("fieldset")).to.have.length(4);
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it("should display a list of filters inside the language field", () => {
      expect(component.find(DS.UnorderedList).find(DS.Checkbox)).to.have.length(
        7
      );
    });
    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it("should display the maximum count of language filter first", () => {
      expect(
        component.find(DS.UnorderedList).find(DS.Checkbox).first().props()
          .labelOptions.labelContent.props.children
      ).to.equal("English (2)");
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it("should contain Years Filter (a DateRangeForm)", () => {
      expect(component.find(DS.DateRangeForm)).to.have.length(1);
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it("should have a Read Now filter", () => {
      expect(
        component.find(DS.Checkbox).find('[name="show_all"]')
      ).to.have.lengthOf(1);
    });
    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it("should have a Read Now filter checked by default", () => {
      expect(
        component.find("fieldset").at(0).find(DS.Checkbox).props().isSelected
      ).to.equal(true);
    });
  });

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe("Filter Year Interactions", () => {
    let wrapper: any;
    let context;
    let childContextTypes;
    const push = stub();
    let start: any;
    let end: any;
    let submitButton: any;

    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'beforeEach'.
    beforeEach(() => {
      context = mockRouterContext(push);
      childContextTypes = mockRouterContext(push);

      wrapper = mount(
        <Filters
          data={results.data}
          searchQuery={defaultQuery}
          router={context.router}
        />,
        { context, childContextTypes }
      );
      start = wrapper.find(DS.DateRangeForm).find("#input-fromInput");
      end = wrapper.find(DS.DateRangeForm).find("#input-toInput");

      submitButton = wrapper.find(DS.DateRangeForm).find('[type="submit"]');
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it("no error on start date with no end date", () => {
      start.simulate("change", {
        target: {
          key: "filters.years.start",
          name: "filters.years.start",
          value: "1990",
        },
      });

      submitButton.simulate("click");

      expect(wrapper.find("#date-range-error").exists()).to.equal(false);
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it("no error on end date with no start date", () => {
      end.simulate("change", {
        target: {
          key: "filters.years.end",
          name: "filters.years.end",
          value: "1990",
        },
      });

      submitButton.simulate("click");

      expect(wrapper.find("#date-range-error").exists()).to.equal(false);
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it("displays error on invalid date range", () => {
      start.simulate("change", {
        target: {
          key: "filters.years.start",
          name: "filters.years.start",
          value: "1992",
        },
      });
      end.simulate("change", {
        target: {
          key: "filters.years.end",
          name: "filters.years.end",
          value: "1990",
        },
      });

      submitButton.simulate("click", { target: {} });
      expect(wrapper.find("#date-range-error").exists()).to.equal(true);
    });
  });

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe("Filter Year Mobile Interactions", () => {
    let wrapper: any;
    let context;
    let childContextTypes;
    const push = stub();
    const toggle = stub();
    let start: any;
    let end: any;
    let submitButton: any;

    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'beforeEach'.
    beforeEach(() => {
      context = mockRouterContext(push);
      childContextTypes = mockRouterContext(push);

      wrapper = mount(
        <Filters
          data={results.data}
          toggleMenu={toggle}
          isMobile
          searchQuery={defaultQuery}
          router={context.router}
        />,
        { context, childContextTypes }
      );

      start = wrapper.find(DS.DateRangeForm).find("#input-fromInput");
      end = wrapper.find(DS.DateRangeForm).find("#input-toInput");

      submitButton = wrapper.find("#btn-closeButton");
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it("no error on start date with no end date", () => {
      start.simulate("change", {
        target: {
          key: "filters.years.start",
          name: "filters.years.start",
          value: "1990",
        },
      });

      submitButton.simulate("click");

      expect(wrapper.find("#date-range-error").exists()).to.equal(false);
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it("no error on end date with no start date", () => {
      end.simulate("change", {
        target: {
          key: "filters.years.end",
          name: "filters.years.end",
          value: "1990",
        },
      });

      submitButton.simulate("click");

      expect(wrapper.find("#date-range-error").exists()).to.equal(false);
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it("No error on empty search", () => {
      submitButton.simulate("click");
      expect(wrapper.find("#date-range-error").exists()).to.equal(false);
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it("displays error on invalid date range", () => {
      start.simulate("change", {
        target: {
          key: "filters.years.start",
          name: "filters.years.start",
          value: "1992",
        },
      });
      end.simulate("change", {
        target: {
          key: "filters.years.end",
          name: "filters.years.end",
          value: "1990",
        },
      });

      submitButton.simulate("click", { target: {} });
      expect(wrapper.find("#date-range-error").exists()).to.equal(true);
    });
  });
});
