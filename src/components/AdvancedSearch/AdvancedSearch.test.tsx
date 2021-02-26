import React from "react";
import AdvancedSearch from "./AdvancedSearch";
import { initialSearchQuery } from "~/src/constants/InitialState";
import { FacetItem } from "~/src/types/DataModel";
import { SearchQuery } from "~/src/types/SearchQuery";
import { shallow, mount } from "enzyme";
import LanguageAccordion from "~/src/components/LanguageAccordion/LanguageAccordion";
import {
  MockNextRouterContextProvider,
  mockPush,
} from "~/src/__tests__/testUtils/MockNextRouter";
import { HelperErrorText } from "@nypl/design-system-react-components";

const defaultLanguages: FacetItem[] = [
  { value: "english", count: 25 },
  { value: "french", count: 30 },
];

const complicatedSearchQuery: SearchQuery = {
  perPage: 10,
  page: 0,
  filters: [{ value: "english", field: "language" }],
  filterYears: { start: 1990, end: 1999 },
  sort: { field: "relevance", dir: "DESC" },
  queries: [{ field: "keyword", query: "cat" }],
  showAll: false,
};

describe("renders advanced search correctly", () => {
  test("Renders correctly in when passed well-formed query", () => {
    const advancedSearch = shallow(
      <AdvancedSearch
        searchQuery={initialSearchQuery}
        languages={defaultLanguages}
      />
    );
    expect(advancedSearch).toMatchSnapshot();
  });

  test("Hides languages when no languages are passed", () => {
    const wrapper = shallow(
      <AdvancedSearch searchQuery={initialSearchQuery} languages={[]} />
    );
    expect(wrapper.exists(LanguageAccordion)).toEqual(false);
  });

  test("Prepopulates form input based on search query parameters", () => {
    const wrapper = mount(
      <AdvancedSearch
        searchQuery={complicatedSearchQuery}
        languages={defaultLanguages}
      />
    );

    expect(wrapper.find("#checkbox-english").props().checked).toEqual(true);
    expect(wrapper.find("input#date-filter-from").props().value).toEqual(1990);
    expect(wrapper.find("input#date-filter-to").props().value).toEqual(1999);
    expect(wrapper.find("input#keyword-input").props().value).toEqual("cat");
  });
});

describe("Advanced Search submit", () => {
  test("Submits well formed query", () => {
    const wrapper = mount(
      <MockNextRouterContextProvider>
        <AdvancedSearch
          searchQuery={complicatedSearchQuery}
          languages={defaultLanguages}
        />
      </MockNextRouterContextProvider>
    );
    wrapper.find("form").simulate("submit");

    const expectedQuery = {
      filters: `[{"field":"language","value":"english"},{"field":"years","value":{"start":1990,"end":1999}},{"field":"show_all","value":false}]`,
      queries: `[{"field":"keyword","query":"cat"}]`,
      per_page: "10",
      sort: `[]`,
    };
    expect(mockPush).toHaveBeenCalledTimes(1);
    expect(mockPush).toHaveBeenCalledWith({
      pathname: "/search",
      query: expectedQuery,
    });
  });

  test("shows error on empty query", () => {
    const wrapper = mount(
      <MockNextRouterContextProvider>
        <AdvancedSearch
          searchQuery={initialSearchQuery}
          languages={defaultLanguages}
        />
      </MockNextRouterContextProvider>
    );
    wrapper.find("form").simulate("submit");
    expect(mockPush).toHaveBeenCalledTimes(0);
    expect(wrapper.exists(HelperErrorText)).toEqual(true);
    expect(wrapper.find(HelperErrorText)).toMatchSnapshot();
  });

  test("show error on invalid year", () => {
    const invalidYearSearch = Object.assign({}, initialSearchQuery, {
      queries: [{ field: "keyword", query: "cat" }],
      filterYears: { start: 1990, end: 1880 },
    });
    const wrapper = mount(
      <MockNextRouterContextProvider>
        <AdvancedSearch
          searchQuery={invalidYearSearch}
          languages={defaultLanguages}
        />
      </MockNextRouterContextProvider>
    );
    wrapper.find("form").simulate("submit");
    expect(mockPush).toHaveBeenCalledTimes(0);
    expect(wrapper.exists(HelperErrorText)).toEqual(true);
    expect(wrapper.find(HelperErrorText)).toMatchSnapshot();
  });
});

describe("Advanced Search clear", () => {
  test("Clears search", () => {
    const wrapper = mount(
      <MockNextRouterContextProvider>
        <AdvancedSearch
          searchQuery={complicatedSearchQuery}
          languages={defaultLanguages}
        />
      </MockNextRouterContextProvider>
    );
    expect(wrapper.find("#checkbox-english").props().checked).toEqual(true);

    wrapper.find(`#clear-button`).hostNodes().simulate("click");
    expect(wrapper.find("#checkbox-english").props().checked).toEqual(false);
  });
});
