/* eslint-disable react/jsx-filename-extension */
/* eslint-env mocha */
import React from "react";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'chai' or its corresponding typ... Remove this comment to see the full error message
import { expect } from "chai";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'enzyme' or its corresponding t... Remove this comment to see the full error message
import { mount, configure } from "enzyme";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'enzyme-adapter-react-16' or it... Remove this comment to see the full error message
import Adapter from "enzyme-adapter-react-16";
import * as DS from "@nypl/design-system-react-components";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module '../../src/app/components/Landi... Remove this comment to see the full error message
import LandingPage from "../../src/app/components/LandingPage/LandingPage";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module '../../src/app/stores/configure... Remove this comment to see the full error message
import configureStore from "../../src/app/stores/configureStore";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module '../../src/app/stores/InitialSt... Remove this comment to see the full error message
import initialState from "../../src/app/stores/InitialState";

configure({ adapter: new Adapter() });

// @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
describe("Landing Page render", () => {
  let wrapper: any;

  // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'before'.
  before(() => {
    const store = configureStore(initialState);
    wrapper = mount(<LandingPage store={store} />);
  });
  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it("contains a <Breadcrumbs /> component", () => {
    expect(wrapper.find("Breadcrumbs").exists()).to.equal(true);
  });

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it("contains an initialized <LandingPromo /> component", () => {
    expect(wrapper.find("LandingPromo").exists()).to.equal(true);
  });
  // it('contains a DS HeaderImgRight component', () => {
  //   expect(wrapper.find(DS.HeaderImgRight)).to.have.length(1);
  // });
  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it("contains a DS UnorderedList component", () => {
    expect(wrapper.find(DS.UnorderedList)).to.have.length(1);
  });
  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it("contains a list of subjects", () => {
    const browseList = wrapper.find(DS.UnorderedList);
    expect(browseList).to.have.length(1);
    expect(browseList.find("li")).to.have.length(5);
  });
});
