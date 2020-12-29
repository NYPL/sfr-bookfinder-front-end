/* eslint-disable react/jsx-filename-extension */
/* eslint-env mocha */
import React from "react";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'chai' or its corresponding typ... Remove this comment to see the full error message
import { expect } from "chai";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'enzyme' or its corresponding t... Remove this comment to see the full error message
import { mount } from "enzyme";
import * as DS from "@nypl/design-system-react-components";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module '../../src/app/components/List/... Remove this comment to see the full error message
import InstancesList from "../../src/app/components/List/InstancesList";
// @ts-expect-error ts-migrate(2732) FIXME: Cannot find module '../fixtures/edition-detail.jso... Remove this comment to see the full error message
import editionsResult from "../fixtures/edition-detail.json";

// @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
describe("Instances List", () => {
  let component: any;

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe("No instance behavior.", () => {
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'before'.
    before(() => {
      component = mount(<InstancesList work={{ instances: [] }} />);
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it("should return null when editions object given is empty.", () => {
      expect(component.find(DS.UnorderedList)).to.have.length(0);
    });
  });

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe("Displays DS EditionsList if instances passed", () => {
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'before'.
    before(() => {
      component = mount(<InstancesList edition={editionsResult.data} />);
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it("should return results", () => {
      expect(component.find(DS.UnorderedList)).to.have.length(1);
    });
  });
});
