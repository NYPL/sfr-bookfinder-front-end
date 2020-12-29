/* eslint-disable react/jsx-filename-extension, no-unused-expressions */
/* eslint-env mocha */
import React from "react";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'chai' or its corresponding typ... Remove this comment to see the full error message
import { expect } from "chai";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'sinon' or its corresponding ty... Remove this comment to see the full error message
import { stub, fake } from "sinon";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'enzyme' or its corresponding t... Remove this comment to see the full error message
import { shallow, configure } from "enzyme";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'enzyme-adapter-react-16' or it... Remove this comment to see the full error message
import Adapter from "enzyme-adapter-react-16";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module '../../src/app/components/Feedb... Remove this comment to see the full error message
import RequestDigital from "../../src/app/components/Feedback/RequestDigital";
// @ts-expect-error ts-migrate(2732) FIXME: Cannot find module '../fixtures/work-detail.json'.... Remove this comment to see the full error message
import work from "../fixtures/work-detail.json";

configure({ adapter: new Adapter() });

// @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
describe("RequestDigital", () => {
  let component: any;
  let mockProps: any;
  let submitStub: any;

  // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'before'.
  before(() => {
    mockProps = {
      requestedWork: work.data,
      requestedEdition: work.data.editions[1],
      closeForm: stub(),
    };
    submitStub = stub(RequestDigital.prototype, "sendFeedback");
    component = shallow(<RequestDigital {...mockProps} />);
  });

  // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'after'.
  after(() => {
    submitStub.restore();
  });

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe("RequestDigital Form", () => {
    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it("should have 1 checkbox", () => {
      expect(component.find(".sfr-feedback-checkbox")).to.have.length(1);
      component.find("#sfr-edition-specific-yes").simulate("change", {
        target: { name: "specificEdition", checked: true },
      });
      expect(component.state("needsSpecific")).to.equal("true");
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it("should have a textarea input for comments", () => {
      expect(component.exists("#request-digital-textarea-comment")).to.equal(
        true
      );
      component.find("#request-digital-textarea-comment").simulate("change", {
        target: { name: "sfr-request-digital-comments", value: "Test Comment" },
      });
      expect(component.state("comments")).to.equal("Test Comment");
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it("Should have a Submit and cancel button", () => {
      expect(component.exists(".cancel-button")).to.equal(true);
      expect(component.exists(".sfr-submit-feedback-button")).to.equal(true);
    });
  });

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe("Form Submission", () => {
    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it("should invoke method when success and feedback set", () => {
      component.setState({ comments: "Testing", needsSpecific: true });
      component.find("form").simulate("submit", { preventDefault: fake() });
      expect(submitStub.callCount).to.equal(1);
    });
  });

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe("Form Close", () => {
    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it("should reset state when form is closed", () => {
      component
        .find(".cancel-button")
        .simulate("click", { preventDefault: fake() });
      expect(mockProps.closeForm.callCount).to.equal(1);
    });
  });
});
