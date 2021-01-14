/* eslint-disable react/jsx-filename-extension */
/* eslint-env mocha */
import React from "react";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'sinon' or its corresponding ty... Remove this comment to see the full error message
import { stub } from "sinon";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'chai' or its corresponding typ... Remove this comment to see the full error message
import { expect } from "chai";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'enzyme' or its corresponding t... Remove this comment to see the full error message
import { mount, configure } from "enzyme";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'enzyme-adapter-react-16' or it... Remove this comment to see the full error message
import Adapter from "enzyme-adapter-react-16";
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import Select from "react-select";
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/core";
import { mockRouterContext } from "../../__test__/helpers/routing";
import AdvancedSearch, {
  initialState as initialAdvancedState,
  // @ts-expect-error ts-migrate(2307) FIXME: Cannot find module '../../src/app/components/Advan... Remove this comment to see the full error message
} from "../../src/app/components/AdvancedSearch/AdvancedSearch";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module '../../src/app/components/Form/... Remove this comment to see the full error message
import TextInput from "../../src/app/components/Form/TextInput";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module '../../src/app/components/Form/... Remove this comment to see the full error message
import Checkbox from "../../src/app/components/Form/Checkbox";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module '../../src/app/stores/configure... Remove this comment to see the full error message
import configureStore from "../../src/app/stores/configureStore";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module '../../src/app/stores/InitialSt... Remove this comment to see the full error message
import initialState from "../../src/app/stores/InitialState";

configure({ adapter: new Adapter() });
const cache = createCache();
function withCacheProvider(children: any) {
  return <CacheProvider value={cache}>{children}</CacheProvider>;
}
// @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
describe("Advanced Search Container interactions", () => {
  let wrapper: any;
  let context;
  let childContextTypes;
  let push;

  // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'beforeEach'.
  beforeEach(() => {
    const store = configureStore(initialState);
    push = stub();
    context = mockRouterContext(push);
    childContextTypes = mockRouterContext(push);

    wrapper = mount(withCacheProvider(<AdvancedSearch store={store} />), {
      context,
      childContextTypes,
    });
  });

  // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'afterEach'.
  afterEach(() => {
    wrapper.unmount();
  });

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it("contains 4 advanced search inputs", () => {
    expect(wrapper.find("fieldset").first().find(TextInput)).to.have.length(4);
  });

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it("contains Language Search", () => {
    expect(wrapper.find("fieldset").at(1).find(Select)).to.have.length(1);
  });

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it("contains Publication Year Search", () => {
    expect(wrapper.find("fieldset").at(2).find(TextInput)).to.have.length(2);
  });

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it("contains 3 format Searches", () => {
    expect(wrapper.find("fieldset").at(3).find(Checkbox)).to.have.length(3);
  });

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it("displays error on missing search query", () => {
    wrapper.find(".usa-button").find({ value: "Search" }).simulate("click");

    expect(wrapper.find(".usa-alert__text").exists()).to.equal(true);
  });

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it("no error on valid search query", () => {
    wrapper
      .find(".usa-input")
      .find({ name: "keyword" })
      .simulate("change", {
        target: { key: "keyword", name: "keyword", value: "london" },
      });
    wrapper.find(".usa-button").find({ value: "Search" }).simulate("click");
    expect(wrapper.find(".usa-alert__text").exists()).to.equal(false);
  });
});

// @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
describe("Advanced Search Prepopulates based on query", () => {
  let wrapper: any;
  let context;
  let childContextTypes;
  let push;

  // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'before'.
  before(() => {
    const store = configureStore(initialState);
    push = stub();
    context = mockRouterContext(push);
    childContextTypes = mockRouterContext(push);

    wrapper = mount(withCacheProvider(<AdvancedSearch store={store} />), {
      context,
      childContextTypes,
    });
  });

  // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'after'.
  after(() => {
    wrapper.find("AdvancedSearch").setState(initialAdvancedState);
    wrapper.unmount();
  });

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it("prepopulates field when passed showQuery without query", () => {
    wrapper.find("AdvancedSearch").setState({ showQueries: { author: "cat" } });
    expect(
      wrapper.find(".usa-input").find({ name: "author" }).prop("value")
    ).to.equal("cat");
  });
});

// @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
describe("Date Filter Validation", () => {
  let wrapper: any;
  let context;
  let childContextTypes;
  let push;

  // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'beforeEach'.
  beforeEach(() => {
    const store = configureStore(initialState);
    push = stub();
    context = mockRouterContext(push);
    childContextTypes = mockRouterContext(push);

    wrapper = mount(withCacheProvider(<AdvancedSearch store={store} />), {
      context,
      childContextTypes,
    });
  });

  // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'afterEach'.
  afterEach(() => {
    wrapper.unmount();
  });

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it("no error on start date with no end date", () => {
    wrapper
      .find(".usa-input")
      .find({ name: "keyword" })
      .simulate("change", {
        target: { key: "keyword", name: "keyword", value: "london" },
      });
    wrapper
      .find(".usa-input")
      .find({ name: "filters.years.start" })
      .simulate("change", {
        target: {
          key: "filters.years.start",
          name: "filters.years.start",
          value: "1990",
        },
      });
    wrapper
      .find(".usa-input")
      .find({ name: "filters.years.end" })
      .simulate("change", {
        target: {
          key: "filters.years.end",
          name: "filters.years.end",
          value: "",
        },
      });
    wrapper.find(".usa-button").find({ value: "Search" }).simulate("click");
    expect(wrapper.find(".usa-alert__text").exists()).to.equal(false);
  });

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it("no error on end date with no start date", () => {
    wrapper
      .find(".usa-input")
      .find({ name: "keyword" })
      .simulate("change", {
        target: { key: "keyword", name: "keyword", value: "london" },
      });
    wrapper
      .find(".usa-input")
      .find({ name: "filters.years.start" })
      .simulate("change", {
        target: {
          key: "filters.years.start",
          name: "filters.years.start",
          value: "",
        },
      });
    wrapper
      .find(".usa-input")
      .find({ name: "filters.years.end" })
      .simulate("change", {
        target: {
          key: "filters.years.end",
          name: "filters.years.end",
          value: "1890",
        },
      });
    wrapper.find(".usa-button").find({ value: "Search" }).simulate("click");
    expect(wrapper.find(".usa-alert__text").exists()).to.equal(false);
  });

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it("displays error on invalid date range", () => {
    wrapper
      .find(".usa-input")
      .find({ name: "keyword" })
      .simulate("change", {
        target: { key: "keyword", name: "keyword", value: "london" },
      });
    wrapper
      .find(".usa-input")
      .find({ name: "filters.years.start" })
      .simulate("change", {
        target: {
          key: "filters.years.start",
          name: "filters.years.start",
          value: "1990",
        },
      });
    wrapper
      .find(".usa-input")
      .find({ name: "filters.years.end" })
      .simulate("change", {
        target: {
          key: "filters.years.end",
          name: "filters.years.end",
          value: "1890",
        },
      });
    wrapper.find(".usa-button").find({ value: "Search" }).simulate("click");

    expect(wrapper.find(".usa-alert__text").exists()).to.equal(true);
  });
});
