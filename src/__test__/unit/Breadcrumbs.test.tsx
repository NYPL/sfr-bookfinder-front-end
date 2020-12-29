/* eslint-disable react/jsx-filename-extension */
/* eslint-env mocha */
import React from "react";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'chai' or its corresponding typ... Remove this comment to see the full error message
import { expect } from "chai";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'enzyme' or its corresponding t... Remove this comment to see the full error message
import { shallow, mount } from "enzyme";
import Breadcrumbs, {
  getBreadcrumbLinks,
  getCrumbTrail,
  // @ts-expect-error ts-migrate(2307) FIXME: Cannot find module '../../src/app/components/Bread... Remove this comment to see the full error message
} from "../../src/app/components/Breadcrumbs/Breadcrumbs";

// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module '../../src/app/stores/InitialSt... Remove this comment to see the full error message
import { initialSearchQuery } from "../../src/app/stores/InitialState";

// @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
describe("Breadcrumb", () => {
  const workDetail = { uuid: "12345", title: "random title" };
  const editionDetail = { id: "54321", publication_date: "2004" };
  const homeLocation = { pathname: "/" };
  const otherLocation = { pathName: "/other-location" };

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe("getBreadcrumbLinks", () => {
    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it("Gets a Home link when passed nothing", () => {
      expect(getBreadcrumbLinks(undefined, undefined)).to.eql([]);
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it("doesn't return a link when passed an empty search", () => {
      expect(getBreadcrumbLinks(undefined)).to.eql([]);
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it("doesn't return a link when passed a search with no query", () => {
      expect(getBreadcrumbLinks(initialSearchQuery, undefined)).to.eql([]);
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it("gets a work detail link when passed a work detail", () => {
      expect(getBreadcrumbLinks(workDetail)).to.eql([
        {
          href: "/work?workId=12345",
          text: "random title",
        },
      ]);
    });
    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it("doesn't get a work detail link when passed an empty work", () => {
      expect(getBreadcrumbLinks({}, {})).to.eql([]);
    });
    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it("gets an edition detail link when passed an edition detail", () => {
      expect(getBreadcrumbLinks(undefined, editionDetail)).to.eql([
        {
          href: "/edition?editionId=54321",
          text: "2004 Edition",
        },
      ]);
    });
  });

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe("getCrumbTrail", () => {
    const validLinks = [
      { href: "/link-param", text: "link 1" },
      { href: "/link2-param", text: "link 2" },
    ];

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it("returns home when no location is passed", () => {
      const crumbs = getCrumbTrail(undefined, validLinks, {});
      expect(crumbs.length).to.equal(1);
      const homeLink = shallow(crumbs[0]);
      expect(homeLink.find("a").text()).to.equal("Digital Research Books Beta");
    });
    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it("returns home when home location is passed", () => {
      const crumbs = getCrumbTrail(homeLocation, validLinks, {});
      expect(crumbs.length).to.equal(1);
      const homeLink = shallow(crumbs[0]);
      expect(homeLink.find("a").text()).to.equal("Digital Research Books Beta");
    });
    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it("returns home when no links are passed", () => {
      const crumbs = getCrumbTrail("not-home", [], {});
      expect(crumbs.length).to.equal(1);
      const homeLink = shallow(crumbs[0]);
      expect(homeLink.find("a").text()).to.equal("Digital Research Books Beta");
    });
    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it("returns an array of Link elements for every link passed", () => {
      const crumbs = getCrumbTrail(otherLocation, validLinks, {});
      expect(crumbs.length).to.equal(3);
      const homeLink = shallow(crumbs[0]);
      expect(homeLink.find("a").text()).to.equal("Digital Research Books Beta");
      const firstLink = shallow(crumbs[1]);
      expect(firstLink.find("a").text()).to.equal("link 1");
      const secondLink = shallow(crumbs[2]);
      expect(secondLink.find("a").text()).to.equal("link 2");
    });
  });

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe("Breadcrumbs render", () => {
    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it("returns a list with one item when passed no props", () => {
      const wrapper = mount(<Breadcrumbs />);
      expect(wrapper.find("li")).to.have.lengthOf(1);
    });
    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it("returns a list with two items when passed a work detail", () => {
      const wrapper = mount(
        <Breadcrumbs location={otherLocation} workDetail={workDetail} />
      );
      expect(wrapper.find("li")).to.have.lengthOf(2);
    });
    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it("returns a list with three items when passed an edition detail", () => {
      const wrapper = mount(
        <Breadcrumbs
          location={otherLocation}
          workDetail={workDetail}
          editionDetail={editionDetail}
        />
      );
      expect(wrapper.find("li")).to.have.lengthOf(3);
    });
  });
});
