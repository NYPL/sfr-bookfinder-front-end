/* eslint-disable react/jsx-filename-extension */
/* eslint-env mocha */
import React from "react";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'chai' or its corresponding typ... Remove this comment to see the full error message
import { expect } from "chai";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'enzyme' or its corresponding t... Remove this comment to see the full error message
import { shallow, configure } from "enzyme";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'enzyme-adapter-react-16' or it... Remove this comment to see the full error message
import Adapter from "enzyme-adapter-react-16";
import * as DS from "@nypl/design-system-react-components";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'sinon' or its corresponding ty... Remove this comment to see the full error message
import { stub } from "sinon";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module '../../src/app/stores/configure... Remove this comment to see the full error message
import configureStore from "../../src/app/stores/configureStore";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module '../../src/app/stores/InitialSt... Remove this comment to see the full error message
import initialState from "../../src/app/stores/InitialState";
// @ts-expect-error ts-migrate(2732) FIXME: Cannot find module '../fixtures/edition-detail.jso... Remove this comment to see the full error message
import detail from "../fixtures/edition-detail.json";
import { mockRouterContext, mockRouter } from "../helpers/routing";

// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module '../../src/app/components/Detai... Remove this comment to see the full error message
import EditionDetail from "../../src/app/components/Detail/EditionDetail";

configure({ adapter: new Adapter() });
// @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
describe("Edition Detail Page Test", () => {
  configure({ adapter: new Adapter() });
  let component: any;
  const store = configureStore(initialState);
  let push;
  let router: any;

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe("EditionDetail Rendering with empty work", () => {
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'before'.
    before(() => {
      push = stub();
      router = mockRouter(push);
      const context = mockRouterContext(push);

      component = shallow(<EditionDetail store={store} />, { context })
        .dive()
        .dive();
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it("should redirect to landing page", () => {
      expect(component.exists()).to.equal(true);
      expect(router.push.called).to.equal(true);
    });
  });

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe("EditionDetail Rendering with valid edition", () => {
    let container: any;
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'before'.
    before(() => {
      const props = { store };
      push = stub();
      router = mockRouter(push);
      const context = mockRouterContext(push);
      container = shallow(<EditionDetail {...props} />, { context })
        .dive()
        .dive();
      container.setProps({
        editionResult: detail,
      });
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it("should show breadcrumb", () => {
      expect(container.find("Breadcrumbs").exists()).to.equal(true);
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it("should show ResultsHeader", () => {
      expect(
        container.find("SearchComponent").dive().find("ResultsHeader").exists()
      ).to.equal(true);
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it("should show work header", () => {
      expect(container.find("#edition-title").exists()).to.equal(true);
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it("should show a EditionDetailDefinitionList", () => {
      expect(container.find("EditionDetailDefinitionList").exists()).to.equal(
        true
      );
    });
    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it("should show available items toggle checkbox", () => {
      expect(container.find(DS.Checkbox).exists()).to.equal(true);
    });
    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it("should show InstancesList", () => {
      expect(container.find("InstancesList").exists()).to.equal(true);
    });
  });
});
