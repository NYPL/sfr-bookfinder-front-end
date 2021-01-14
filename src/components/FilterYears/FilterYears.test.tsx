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
import FilterYears from "../../src/app/components/SearchResults/FilterYears";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module '../../src/app/components/Form/... Remove this comment to see the full error message
import TextInput from "../../src/app/components/Form/TextInput";

configure({ adapter: new Adapter() });

// @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
describe("FilterYears", () => {
  let component: any;

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe("No results behavior.", () => {
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'before'.
    before(() => {
      component = shallow(<FilterYears />);
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it("should show the form .", () => {
      expect(component.find(TextInput)).to.have.length(2);
    });
  });
  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe("Prepopulated years.", () => {
    const searchQuery = {
      query: '"Periodicals."',
      field: "subject",
      showQuery: "",
      showField: "",
      per_page: "10",
      page: "0",
      total: "0",
      filters: [{ field: "years", value: { start: 1926, end: 2017 } }],
      sort: [],
    };
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'before'.
    before(() => {
      component = shallow(<FilterYears searchQuery={searchQuery} />);
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it("should show the form .", () => {
      expect(component.find(TextInput)).to.have.length(2);
    });
    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it("should prepopulate the form .", () => {
      expect(component.find(TextInput).first().prop("value")).to.equal(1926);
    });
  });
});
