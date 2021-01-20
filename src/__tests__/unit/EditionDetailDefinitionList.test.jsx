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
import { EditionDetailDefinitionList } from "../../src/app/components/Detail/EditionDetailDefinitionList";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module '../../src/app/constants/labels... Remove this comment to see the full error message
import { editionDetailDefinitionLabels } from "../../src/app/constants/labels";
// @ts-expect-error ts-migrate(2732) FIXME: Cannot find module '../fixtures/edition-detail.jso... Remove this comment to see the full error message
import edition from "../fixtures/edition-detail.json";

configure({ adapter: new Adapter() });

// @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
describe("Edition Detail Definition List", () => {
  let component: any;

  // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'before'.
  before(() => {
    component = mount(<EditionDetailDefinitionList edition={edition.data} />);
  });

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it("should display a definition list of detail elements", () => {
    expect(component.find("dl")).to.have.length(1);
    expect(component.find("dt")).to.have.length(7);
    expect(component.find("dd")).to.have.length(7);
    const terms = component.find("dt");
    expect(terms.at(0).text()).to.equal(
      editionDetailDefinitionLabels.publication_date
    );
    expect(terms.at(1).text()).to.equal(
      editionDetailDefinitionLabels.publication_place
    );
    expect(terms.at(2).text()).to.equal(editionDetailDefinitionLabels.agents);
  });

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it("should have a table of Items", () => {
    expect(component.find("dl")).to.have.length(1);
    expect(component.find("dl dt")).to.have.length(7);
    expect(component.find("dl dd")).to.have.length(7);
  });

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it("should have a list of Languages", () => {
    const languages = component.find(".definitions-languages");
    expect(languages.find("li")).to.have.length(2);
  });

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it("should have a list of publishers", () => {
    const languages = component.find(".definitions-publishers");
    expect(languages.find("li")).to.have.length(3);
  });
});
