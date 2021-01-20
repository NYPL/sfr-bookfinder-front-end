/* eslint-disable react/jsx-filename-extension */
/* eslint-env mocha */
import React from "react";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'chai' or its corresponding typ... Remove this comment to see the full error message
import { expect } from "chai";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'enzyme' or its corresponding t... Remove this comment to see the full error message
import { mount, configure } from "~/src/__tests__/unit/node_modules/enzyme";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'enzyme-adapter-react-16' or it... Remove this comment to see the full error message
import Adapter from "~/src/__tests__/unit/node_modules/enzyme-adapter-react-16";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module '../../src/app/components/Appli... Remove this comment to see the full error message
import Loading from "../../src/app/components/Application/Loading";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module '../../src/app/stores/configure... Remove this comment to see the full error message
import configureStore from "../../src/app/stores/configureStore";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module '../../src/app/stores/InitialSt... Remove this comment to see the full error message
import initialState from "../../src/app/stores/InitialState";

configure({ adapter: new Adapter() });

// @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
describe("Loading", () => {
  let wrapper: any;

  // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'before'.
  before(() => {
    const store = configureStore(initialState);
    wrapper = mount(<Loading store={store} />);
  });

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it("should have a aria-live element", () => {
    expect(wrapper.find(".loading")).to.have.length(1);
    expect(wrapper.find(".loading").prop("aria-live")).to.equal("assertive");
  });
});
