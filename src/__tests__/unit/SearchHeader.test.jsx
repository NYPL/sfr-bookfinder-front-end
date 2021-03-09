/* eslint-disable react/jsx-filename-extension */
/* eslint-env mocha */
import React from "react";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'chai' or its corresponding typ... Remove this comment to see the full error message
import { expect } from "chai";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'enzyme' or its corresponding t... Remove this comment to see the full error message
import { mount, configure } from "enzyme";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'enzyme-adapter-react-16' or it... Remove this comment to see the full error message
import Adapter from "enzyme-adapter-react-16";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module '../../src/app/components/Searc... Remove this comment to see the full error message
import SearchHeader from "../../src/app/components/SearchForm/SearchHeader";

configure({ adapter: new Adapter() });

// @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
describe("SearchHeader", () => {
  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe("Default rendering", () => {
    let component: any;

    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'before'.
    before(() => {
      component = mount(<SearchHeader />);
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it("has a form fieldset .search-bar", () => {
      expect(component.find(".search-bar")).to.have.length(1);
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it("contains a select with four options.", () => {
      const options = component.find("option");
      expect(options).to.have.length(4);
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it("contains an option for keyword.", () => {
      const kwOpt = component.find("option");
      expect(kwOpt.getElements()[0].props.value).to.equal("keyword");
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it("contains an option for title.", () => {
      const titleOpt = component.find("option");
      expect(titleOpt.getElements()[1].props.value).to.equal("title");
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it("contains an option for author.", () => {
      const authorOpt = component.find("option");
      expect(authorOpt.getElements()[2].props.value).to.equal("author");
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it("contains an option for subject.", () => {
      const authorOpt = component.find("option");
      expect(authorOpt.getElements()[3].props.value).to.equal("subject");
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it("should not contain placeholder prop in text input.", () => {
      const kwTextField = component.find("input");
      expect(kwTextField.getElements()[0].props.type).to.equal("text");
      expect(kwTextField.getElements()[0].props.placeholder).to.equal(
        undefined
      );
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it("should contain a aria label for the select input.", () => {
      const selectLabel = component.find("select");
      expect(selectLabel.getElements()[0].props["aria-label"]).to.equal(
        "Search by"
      );
    });
  });

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe("Changes from props", () => {
    let component: any;

    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'before'.
    before(() => {
      component = mount(<SearchHeader />);
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it("should updated state values based on passed props for select", () => {
      component
        .find("select")
        .simulate("change", { target: { value: "author" } });
      expect(component.state("searchQuery").queries[0].field).to.equal(
        "author"
      );
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it("should updated state values based on passed props for text input", () => {
      component
        .find("input")
        .simulate("change", { target: { value: "jefferson" } });
      expect(component.state("searchQuery").queries[0].query).to.equal(
        "jefferson"
      );
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it("should update state when the enter key is pressed", () => {
      component.find("input").props.value = "jefferson";
      component
        .find("input")
        .simulate("change", { target: { value: "jackson" } });

      expect(component.state("searchQuery").queries[0].query).to.equal(
        "jackson"
      );
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it("should update state when the button is clicked", () => {
      component.find("input").props.value = "jackson";
      component
        .find("input")
        .at(0)
        .simulate("change", { target: { value: "johnson" } });

      expect(component.state("searchQuery").queries[0].query).to.equal(
        "johnson"
      );
    });
  });

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe("search term prepopulation", () => {
    let component;
    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it("should prepopulate based on passed in value", () => {
      component = mount(
        <SearchHeader
          initialQuery={{ queries: [{ field: "author", query: "melville" }] }}
        />
      );
      expect(
        component.find("#searchBarId-input-textfield").prop("value")
      ).to.equal("melville");
      expect(component.find("#dropdownId").prop("value")).to.equal("author");
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it("if there are multiple search terms, it should not prepopulate", () => {
      component = mount(
        <SearchHeader
          initialQuery={{
            queries: [
              { field: "author", query: "melville" },
              { field: "keyword", query: "whale" },
            ],
          }}
        />
      );
      expect(
        component.find("#searchBarId-input-textfield").prop("value")
      ).to.equal("");
      expect(component.find("#dropdownId").prop("value")).to.equal("keyword");
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it("should prepopulate based on viaf if the viaf is for author", () => {
      component = mount(
        <SearchHeader
          initialQuery={{
            queries: [{ field: "viaf", query: "12345" }],
            showQueries: [{ field: "author", query: "shakespeare" }],
          }}
        />
      );
      expect(
        component.find("#searchBarId-input-textfield").prop("value")
      ).to.equal("shakespeare");
      expect(component.find("#dropdownId").prop("value")).to.equal("author");
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it("should not prepopulate if viaf is not for author", () => {
      component = mount(
        <SearchHeader
          initialQuery={{
            queries: [{ field: "viaf", query: "12345" }],
            showQueries: [{ field: "publisher", query: "houghton" }],
          }}
        />
      );
      expect(
        component.find("#searchBarId-input-textfield").prop("value")
      ).to.equal("");
      expect(component.find("#dropdownId").prop("value")).to.equal("keyword");
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it("should not prepopulate if there are multiple showQueries", () => {
      component = mount(
        <SearchHeader
          initialQuery={{
            queries: [{ field: "viaf", query: "12345" }],
            showQueries: [
              { field: "author", query: "shakespeare" },
              { field: "keyword", query: "witch" },
            ],
          }}
        />
      );
      expect(
        component.find("#searchBarId-input-textfield").prop("value")
      ).to.equal("");
      expect(component.find("#dropdownId").prop("value")).to.equal("keyword");
    });
  });
});
