/* eslint-disable react/jsx-filename-extension */
/* eslint-env mocha */
import React from "react";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'chai' or its corresponding typ... Remove this comment to see the full error message
import { expect } from "chai";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'enzyme' or its corresponding t... Remove this comment to see the full error message
import { mount, configure } from "enzyme";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'enzyme-adapter-react-16' or it... Remove this comment to see the full error message
import Adapter from "enzyme-adapter-react-16";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module '../../src/app/components/Detai... Remove this comment to see the full error message
import { WorkDetailDefinitionList } from "../../src/app/components/Detail/WorkDetailDefinitionList";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module '../../src/app/constants/labels... Remove this comment to see the full error message
import { workDetailDefinitionLabels } from "../../src/app/constants/labels";
// @ts-expect-error ts-migrate(2732) FIXME: Cannot find module '../fixtures/work-detail.json'.... Remove this comment to see the full error message
import work from "../fixtures/work-detail.json";

configure({ adapter: new Adapter() });

// @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
describe("Work Detail Definition List", () => {
  let component: any;

  // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'before'.
  before(() => {
    component = mount(<WorkDetailDefinitionList work={work.data} />);
  });

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it("should display a definition list of detail elements", () => {
    expect(component.find("dl")).to.have.length(1);
    expect(component.find("dt")).to.have.length(4);
    expect(component.find("dd")).to.have.length(4);
    const terms = component.find("dt");
    expect(terms.at(0).text()).to.equal(workDetailDefinitionLabels.series);
    expect(terms.at(1).text()).to.equal(workDetailDefinitionLabels.agents);
    expect(terms.at(2).text()).to.equal(workDetailDefinitionLabels.subjects);
    expect(terms.at(3).text()).to.equal(workDetailDefinitionLabels.language);
  });

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it("should have a table of Items", () => {
    expect(component.find("dl")).to.have.length(1);
    expect(component.find("dl dt")).to.have.length(4);
    expect(component.find("dl dd")).to.have.length(4);
  });

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it("should have a list of Subjects", () => {
    const subjects = component.find(".definitions-subjects");
    expect(subjects.find("Link")).to.have.length(8);
  });

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it("the list of subjects should be ordered alphabetically", () => {
    const subjects = component.find(".definitions-subjects");
    expect(subjects.find("Link").first().text()).to.equal("Aufsatzsammlung.");
  });

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it("should have a list of Authors", () => {
    const authors = component.find(".definitions-authors");
    expect(authors.find("Link")).to.have.length(2);
    expect(
      authors.find("Link").first().getElements()[0].props.children
    ).to.equal("Hawthorne, Nathaniel, author ");
  });

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it("should have a list of Languages", () => {
    const languages = component.find(".definitions-languages");
    expect(languages.find("li")).to.have.length(5);
  });
});
