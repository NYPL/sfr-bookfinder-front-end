/* eslint-disable react/jsx-filename-extension */
/* eslint-env mocha */
import React from "react";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'chai' or its corresponding typ... Remove this comment to see the full error message
import { expect } from "chai";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'enzyme' or its corresponding t... Remove this comment to see the full error message
import { shallow } from "enzyme";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module '../../src/app/components/Appli... Remove this comment to see the full error message
import Application from "../../src/app/components/Application/Application";

// @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
describe("Application", () => {
  let application: any;

  // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'before'.
  before(() => {
    application = shallow(<Application />)
      .find("Application")
      .dive();
  });

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it("is wrapped in a div.app-wrapper", () => {
    expect(application.find(".app-wrapper")).to.have.length(1);
  });
});
