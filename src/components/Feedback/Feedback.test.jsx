/* eslint-disable react/jsx-filename-extension, no-unused-expressions */
/* eslint-env mocha */
import React from "react";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'chai' or its corresponding typ... Remove this comment to see the full error message
import { expect } from "chai";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'sinon' or its corresponding ty... Remove this comment to see the full error message
import { stub, fake } from "~/src/__tests__/helpers/node_modules/sinon";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'enzyme' or its corresponding t... Remove this comment to see the full error message
import { shallow, configure } from "~/src/__tests__/unit/node_modules/enzyme";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'enzyme-adapter-react-16' or it... Remove this comment to see the full error message
import Adapter from "~/src/__tests__/unit/node_modules/enzyme-adapter-react-16";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module '../../src/app/components/Feedb... Remove this comment to see the full error message
import Feedback from "../../src/app/components/Feedback/Feedback";

configure({ adapter: new Adapter() });

// @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
describe("Feedback", () => {
  let component: any;
  let mockProps;
  let submitStub: any;

  // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'before'.
  before(() => {
    mockProps = {
      props: {
        location: {
          path: "/testing",
          search: "?testQuery",
        },
      },
    };
    submitStub = stub(Feedback.prototype, "sendFeedback");
    component = shallow(<Feedback location={mockProps} />);
  });

  // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'after'.
  after(() => {
    submitStub.restore();
  });

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe("Feedback button", () => {
    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it("should display the Feedback button initially", () => {
      expect(component.exists(".feedback-button")).to.equal(true);
    });
  });

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe("Feedback Form", () => {
    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it("should have 3 radio buttons", () => {
      expect(component.find(".sfr-feedback-radio")).to.have.length(3);
      component.find("#sfr-feedback-found-yes").simulate("change", {
        target: { name: "feedback", value: "yes" },
      });
      expect(component.state("success")).to.equal("yes");
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it("should have a textarea input for comments", () => {
      expect(component.exists("#feedback-textarea-comment")).to.equal(true);
      component.find("#feedback-textarea-comment").simulate("change", {
        target: { name: "sfr-general-feedback", value: "Test Comment" },
      });
      expect(component.state("feedback")).to.equal("Test Comment");
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
      component.setState({
        showForm: true,
        feedback: "Testing",
        success: "test",
      });
      component.find("form").simulate("submit", { preventDefault: fake() });
      expect(submitStub.callCount).to.equal(1);
      expect(component.state("showForm")).to.be.false;
    });
  });
});
