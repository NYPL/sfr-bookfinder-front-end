/* eslint-disable no-unused-expressions */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable prefer-destructuring */
/* eslint-env mocha */
import React from "react";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'chai' or its corresponding typ... Remove this comment to see the full error message
import { expect } from "chai";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'enzyme' or its corresponding t... Remove this comment to see the full error message
import { shallow, configure } from "enzyme";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'enzyme-adapter-react-16' or it... Remove this comment to see the full error message
import Adapter from "enzyme-adapter-react-16";
import {
  formatUrl,
  joinArrayOfElements,
  getNumberOfPages,
  truncateStringOnWhitespace,
  // @ts-expect-error ts-migrate(2307) FIXME: Cannot find module '../../src/app/util/Util' or it... Remove this comment to see the full error message
} from "../../src/app/util/Util";

configure({ adapter: new Adapter() });

// @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
describe("formatUrl", () => {
  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it("prefixes a url with https in all environments", () => {
    expect(formatUrl("www.nypl.org")).to.equal("https://www.nypl.org");
  });
  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it("passes through http", () => {
    expect(formatUrl("http://nypl.org", "production")).to.equal(
      "http://nypl.org"
    );
  });
  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it("passes through https", () => {
    expect(formatUrl("https://nypl.org", "production")).to.equal(
      "https://nypl.org"
    );
  });
});

// @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
describe("JoinArrayOfElements", () => {
  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it("Joins an array of elements", () => {
    const element = React.createElement("div", [], "content");
    const joined = joinArrayOfElements(
      [element, element, element],
      <span className="joiner" />
    );
    const wrapper = shallow(<span>{joined}</span>);
    expect(wrapper.find("div").length).to.equal(3);
    expect(wrapper.find(".joiner").length).to.equal(2);
  });
  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it("Joins an array of elements and ignores invalid entries", () => {
    const element = React.createElement("div", [], "content");
    const joined = joinArrayOfElements(
      [element, null, element],
      <span className="joiner" />
    );
    const wrapper = shallow(<span>{joined}</span>);
    expect(wrapper.find("div").length).to.equal(2);
    expect(wrapper.find(".joiner").length).to.equal(1);
  });
  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it("joins elements with nothing when joiner is not passed", () => {
    const element = React.createElement("div", [], "content");
    const joined = joinArrayOfElements([element, element, element], null);
    const wrapper = shallow(<span>{joined}</span>);
    expect(wrapper.find("div").length).to.equal(3);
  });
  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it("returns empty element when empty array is passed", () => {
    const joined = joinArrayOfElements([]);
    const wrapper = shallow(<span>{joined}</span>);
    expect(wrapper.find("span").length).to.equal(1);
  });
  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it("returns empty element when no array is passed", () => {
    const joined = joinArrayOfElements(null);
    const wrapper = shallow(<span>{joined}</span>);
    expect(wrapper.find("span").length).to.equal(1);
  });
});

// @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
describe("getNumberOfPages", () => {
  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it("Returns correct number of pages", () => {
    expect(getNumberOfPages(100, 10)).to.equal(10);
  });

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it("Returns 1 page when perPage is greater than number of items", () => {
    expect(getNumberOfPages(10, 100)).to.equal(1);
  });

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it("Returns 1 pages when there are no items", () => {
    expect(getNumberOfPages(0, 10)).to.equal(1);
  });
});

// @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
describe("truncateStringOnWhitespace()", () => {
  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it("Should return a short title as-is", () => {
    expect(truncateStringOnWhitespace("Test Title", 25)).to.equal("Test Title");
  });

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it("Should truncate a long title when break lands in the middle of a word", () => {
    const truncStr = truncateStringOnWhitespace(
      "Longer Title Here To Become Shorter",
      25
    );
    expect(truncStr).to.equal("Longer Title Here To...");
    expect(truncStr.length).to.be.lessThan(26);
  });

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it("Should truncate a long title when break lands on a whitespace", () => {
    const truncStr = truncateStringOnWhitespace(
      "Longer Title Break On Whitespace",
      25
    );
    expect(truncStr).to.equal("Longer Title Break On...");
    expect(truncStr.length).to.be.lessThan(26);
  });

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it("Should truncate single word title regardless of whitespace", () => {
    const truncStr = truncateStringOnWhitespace(
      "ThisIsAOneWordTitleWhichCouldExistOutThere",
      25
    );
    expect(truncStr).to.equal("ThisIsAOneWordTitleWhi...");
    expect(truncStr.length).to.be.lessThan(26);
  });
});
