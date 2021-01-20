/* eslint-disable no-unused-expressions */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable prefer-destructuring */
/* eslint-env mocha */
import React from "react";

// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'chai' or its corresponding typ... Remove this comment to see the full error message
import { expect } from "chai";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'enzyme' or its corresponding t... Remove this comment to see the full error message
import { shallow, mount, configure } from "~/src/__tests__/unit/node_modules/enzyme";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'enzyme-adapter-react-16' or it... Remove this comment to see the full error message
import Adapter from "~/src/__tests__/unit/node_modules/enzyme-adapter-react-16";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module '../../src/app/components/Card/... Remove this comment to see the full error message
import EditionCard from "../../src/app/components/Card/EditionCard";
// @ts-expect-error ts-migrate(2732) FIXME: Cannot find module '../fixtures/results-list.json'... Remove this comment to see the full error message
import results from "../../__tests__/fixtures/results-list.json";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module '../../src/app/constants/editio... Remove this comment to see the full error message
import { PLACEHOLDER_COVER_LINK } from "../../src/app/constants/editioncard";

configure({ adapter: new Adapter() });

// @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
describe("Edition Card", () => {
  let component;
  const work = results.data.works[0];

  const viafAuthors = [
    {
      name: "author1",
      sort_name: "author 1",
      viaf: "57970242",
      lcnaf: "n82142775",
      birth_date_display: "1804",
      death_date_display: "1864",
      roles: ["author"],
    },
    {
      name: "author2",
      sort_name: "author 2",
      viaf: "57970242",
      lcnaf: "n82142775",
      roles: ["editor", "author"],
    },
  ];

  const agentsNoViaf = [
    {
      name: "author1",
      sort_name: "author 1",
      viaf: null,
      lcnaf: null,
      birth_date_display: "1804",
      death_date_display: "1864",
      roles: ["author"],
    },
    {
      name: "author2",
      sort_name: "author 2",
      viaf: null,
      lcnaf: null,
      roles: ["editor", "author"],
    },
  ];
  const mixedAuthors = [
    {
      name: "author1",
      sort_name: "author 1",
      viaf: null,
      lcnaf: null,
      birth_date_display: "1804",
      death_date_display: "1864",
      roles: ["author"],
    },
    {
      name: "author2",
      sort_name: "author 2",
      viaf: "57970242",
      lcnaf: "n82142775",
      roles: ["editor", "author"],
    },
  ];

  const testEdition = {
    date_created: "2020-01-14T15:49:48.646Z",
    date_modified: "2020-01-14T15:49:48.646Z",
    id: 33282,
    publication_place: "London",
    publication_date: "1852",
    edition: null,
    edition_statement: "[Another ed.].",
    volume: null,
    table_of_contents: null,
    extent: null,
    summary: null,
    work_id: 56071,
    languages: [],
    items: [],
    covers: [],
  };

  const testItem = {
    source: "hathitrust",
    content_type: "ebook",
    modified: "2020-01-04T00:34:35",
    drm: null,
    links: [],
    rights: null,
  };

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe("gets Preferred Agent", () => {
    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it("should return list of agents with viaf and correct row", () => {
      const agents = EditionCard.getPreferredAgent(viafAuthors, "author");
      expect(agents.length).to.equal(2);
      expect(agents[0].name).to.equal("author1");
    });
    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it("if no agent with viaf, should return first agent with correct role", () => {
      const agents = EditionCard.getPreferredAgent(agentsNoViaf, "author");
      expect(agents.length).to.equal(1);
      expect(agents[0].name).to.equal("author1");
    });
    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it("prefer agents with viaf", () => {
      const agents = EditionCard.getPreferredAgent(mixedAuthors, "author");
      expect(agents.length).to.equal(1);
      expect(agents[0].name).to.equal("author2");
    });
    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it("should return undefined if no suitable agents", () => {
      expect(EditionCard.getPreferredAgent(viafAuthors, "baker")).to.be
        .undefined;
    });
  });

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe("gets Edition Year", () => {
    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it("Should display the year as a link", () => {
      component = mount(EditionCard.editionYearElem(work.editions[0]));
      expect(component.find("a").text()).to.equal("1852 Edition");
    });
  });

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe("displays title with link", () => {
    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it("should display the title in a Link", () => {
      component = shallow(EditionCard.generateTitleLinkElem(work));
      expect(component.find("a").text()).to.equal(
        "The Blithedale romance, by Nathaniel Hawthorne."
      );
    });
    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it("should truncate the title if it is too long", () => {
      const tooLongTitle =
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent consequat velit diam.";
      const workWithTooLongTitle = {
        title: tooLongTitle,
        uuid: work.uuid,
      };
      const truncatedTitle =
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent consequat...";
      component = shallow(
        EditionCard.generateTitleLinkElem(workWithTooLongTitle)
      );
      expect(component.find("a").text()).to.equal(truncatedTitle);
    });

    const workWithNoTitle = {
      uuid: work.uuid,
    };
    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it("should display 'title unknown' when not passed a title", () => {
      component = shallow(EditionCard.generateTitleLinkElem(workWithNoTitle));
      expect(component.find("a").text()).to.equal("Title Unknown");
    });
  });

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe("getSubtitle", () => {
    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it("returns subtitle", () => {
      component = shallow(EditionCard.getSubtitle("Subtitle"));
      expect(component.find("span").text()).to.equal("Subtitle");
    });
    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it("should truncate the subtitle if it is too long", () => {
      const tooLongSubtitle =
        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. " +
        "Aenean commodo ligula eget dolor. Aenean massa. Cum sociis nato";
      component = shallow(EditionCard.getSubtitle(tooLongSubtitle));
      const truncatedSubtitle =
        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. " +
        "Aenean commodo ligula eget dolor. Aenean massa. Cum sociis...";
      expect(component.find("span").text()).to.equal(truncatedSubtitle);
    });
    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it("should return nothing if no subtitle is found", () => {
      expect(EditionCard.getSubtitle(undefined)).to.equal(undefined);
    });
  });

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe("gets Author list", () => {
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'before'.
    before(() => {});
    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it("should return a list of jsx links", () => {
      const authors = EditionCard.getAuthorsList(viafAuthors);
      expect(authors.length).to.equal(2);
      const firstAuthor = shallow(authors[0]);
      expect(firstAuthor.find("a").text()).to.equal("author1");
    });
    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it("should return null if no authors are found", () => {
      expect(EditionCard.getAuthorsList([])).to.equal(null);
    });
  });

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe("Get covers", () => {
    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it("Should get non-temporary cover url", () => {
      testEdition.covers = [
        {
          // @ts-expect-error ts-migrate(2322) FIXME: Type 'string' is not assignable to type 'never'.
          url: "https://not-local-url.com",
          // @ts-expect-error ts-migrate(2322) FIXME: Type 'string' is not assignable to type 'never'.
          media_type: "image/jpeg",
          flags: {
            // @ts-expect-error ts-migrate(2322) FIXME: Type 'boolean' is not assignable to type 'never'.
            cover: true,
            // @ts-expect-error ts-migrate(2322) FIXME: Type 'boolean' is not assignable to type 'never'.
            temporary: true,
          },
        },
        {
          // @ts-expect-error ts-migrate(2322) FIXME: Type 'string' is not assignable to type 'never'.
          url: "https://local-url.com",
          // @ts-expect-error ts-migrate(2322) FIXME: Type 'string' is not assignable to type 'never'.
          media_type: "image/jpeg",
          flags: {
            // @ts-expect-error ts-migrate(2322) FIXME: Type 'boolean' is not assignable to type 'never'.
            cover: true,
            // @ts-expect-error ts-migrate(2322) FIXME: Type 'boolean' is not assignable to type 'never'.
            temporary: false,
          },
        },
      ];
      expect(EditionCard.getCover(testEdition)).to.equal(
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'url' does not exist on type 'never'.
        testEdition.covers[1].url
      );
    });
    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it("Should get first non-temporary cover if multiple are passed", () => {
      testEdition.covers = [
        {
          // @ts-expect-error ts-migrate(2322) FIXME: Type 'string' is not assignable to type 'never'.
          url: "https://first-local-url.com",
          // @ts-expect-error ts-migrate(2322) FIXME: Type 'string' is not assignable to type 'never'.
          media_type: "image/jpeg",
          flags: {
            // @ts-expect-error ts-migrate(2322) FIXME: Type 'boolean' is not assignable to type 'never'.
            cover: true,
            // @ts-expect-error ts-migrate(2322) FIXME: Type 'boolean' is not assignable to type 'never'.
            temporary: false,
          },
        },
        {
          // @ts-expect-error ts-migrate(2322) FIXME: Type 'string' is not assignable to type 'never'.
          url: "https://second-local-url.com",
          // @ts-expect-error ts-migrate(2322) FIXME: Type 'string' is not assignable to type 'never'.
          media_type: "image/jpeg",
          flags: {
            // @ts-expect-error ts-migrate(2322) FIXME: Type 'boolean' is not assignable to type 'never'.
            cover: true,
            // @ts-expect-error ts-migrate(2322) FIXME: Type 'boolean' is not assignable to type 'never'.
            temporary: false,
          },
        },
      ];
      expect(EditionCard.getCover(testEdition)).to.equal(
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'url' does not exist on type 'never'.
        testEdition.covers[0].url
      );
    });
    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it("should return placeholder cover url if only temporary covers are found", () => {
      testEdition.covers = [
        {
          // @ts-expect-error ts-migrate(2322) FIXME: Type 'string' is not assignable to type 'never'.
          url: "https://not-local-url.com",
          // @ts-expect-error ts-migrate(2322) FIXME: Type 'string' is not assignable to type 'never'.
          media_type: "image/jpeg",
          flags: {
            // @ts-expect-error ts-migrate(2322) FIXME: Type 'boolean' is not assignable to type 'never'.
            cover: true,
            // @ts-expect-error ts-migrate(2322) FIXME: Type 'boolean' is not assignable to type 'never'.
            temporary: true,
          },
        },
      ];
      expect(EditionCard.getCover(testEdition)).to.equal(
        PLACEHOLDER_COVER_LINK
      );
    });
    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it("Should return placeholder cover url if no cover found", () => {
      // @ts-expect-error ts-migrate(2322) FIXME: Type 'null' is not assignable to type 'never[]'.
      testEdition.covers = null;
      expect(EditionCard.getCover(testEdition)).to.equal(
        PLACEHOLDER_COVER_LINK
      );
      testEdition.covers = [];
      expect(EditionCard.getCover(testEdition)).to.equal(
        PLACEHOLDER_COVER_LINK
      );
    });
  });

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe("get publisher place", () => {
    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it("Should return publisher location if available", () => {
      testEdition.publication_place = "London";
      expect(EditionCard.publisherDisplayLocation(testEdition)).to.equal(
        " in London"
      );
    });
    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it("Should return undefined if publisher location is missing", () => {
      // @ts-expect-error ts-migrate(2322) FIXME: Type 'null' is not assignable to type 'string'.
      testEdition.publication_place = null;
      expect(EditionCard.publisherDisplayLocation(testEdition)).to.equal("");
    });
  });

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe("get publisher name", () => {
    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it("Should return publisher", () => {
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'agents' does not exist on type '{ date_c... Remove this comment to see the full error message
      testEdition.agents = [
        {
          name: "publisher 1",
          sort_name: "publisher_1",
          viaf: "51542887",
          lcnaf: "nr91006845",
          birth_date_display: "1661?",
          death_date_display: "1731",
          roles: ["publisher"],
        },
      ];
      const publishers = EditionCard.publisherDisplayText(testEdition);
      expect(publishers).to.equal(" by publisher 1");
    });
    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it("Should truncate after first publisher", () => {
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'agents' does not exist on type '{ date_c... Remove this comment to see the full error message
      testEdition.agents = [
        {
          name: "publisher 1",
          sort_name: "publisher_1",
          viaf: "51542887",
          lcnaf: "nr91006845",
          birth_date_display: "1661?",
          death_date_display: "1731",
          roles: ["publisher"],
        },
        {
          name: "publisher 2",
          sort_name: "publisher_2",
          viaf: "51542887",
          lcnaf: "nr91006845",
          death_date_display: "1883",
          birth_date_display: "1817",
          roles: ["publisher"],
        },
      ];
      const publishers = EditionCard.publisherDisplayText(testEdition);
      expect(publishers).to.equal(" by publisher 1 + 1 more");
    });
    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it("if no viaf publishers, should return first non-viaf publisher", () => {
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'agents' does not exist on type '{ date_c... Remove this comment to see the full error message
      testEdition.agents = [
        {
          name: "publisher 1",
          sort_name: "publisher_1",
          viaf: null,
          lcnaf: null,
          birth_date_display: "1661?",
          death_date_display: "1731",
          roles: ["publisher"],
        },
        {
          name: "publisher 2",
          sort_name: "publisher_2",
          viaf: null,
          lcnaf: null,
          death_date_display: "1883",
          birth_date_display: "1817",
          roles: ["publisher"],
        },
      ];
      const publishers = EditionCard.publisherDisplayText(testEdition);
      expect(publishers).to.equal(" by publisher 1");
    });
    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it("truncate text if  too long", () => {
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'agents' does not exist on type '{ date_c... Remove this comment to see the full error message
      testEdition.agents = [
        {
          name:
            "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.",
          sort_name: "publisher_1",
          viaf: null,
          lcnaf: null,
          birth_date_display: "1661?",
          death_date_display: "1731",
          roles: ["publisher"],
        },
      ];
      const publishers = EditionCard.publisherDisplayText(testEdition);
      expect(publishers).to.equal(
        " by Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo..."
      );
    });
    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it("Should return undefined if no publishers are found", () => {
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'agents' does not exist on type '{ date_c... Remove this comment to see the full error message
      testEdition.agents = null;
      const publishers = EditionCard.publisherDisplayText(testEdition);
      expect(publishers).to.equal("");
    });
  });

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe("get publisher and location", () => {
    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it("Should return string with publisher and location", () => {
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'agents' does not exist on type '{ date_c... Remove this comment to see the full error message
      testEdition.agents = [
        {
          name: "publisher 1",
          sort_name: "publisher_1",
          viaf: "51542887",
          lcnaf: "nr91006845",
          birth_date_display: "1661?",
          death_date_display: "1731",
          roles: ["publisher"],
        },
      ];
      testEdition.publication_place = "London";
      const publisherAndLocation = mount(
        <div>{EditionCard.getPublisherAndLocation(testEdition)}</div>
      );
      expect(publisherAndLocation.text()).to.equal(
        "Published in London by publisher 1"
      );
    });
    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it("Should return string with publisher when location is undefined", () => {
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'agents' does not exist on type '{ date_c... Remove this comment to see the full error message
      testEdition.agents = [
        {
          name: "publisher 1",
          sort_name: "publisher_1",
          viaf: "51542887",
          lcnaf: "nr91006845",
          birth_date_display: "1661?",
          death_date_display: "1731",
          roles: ["publisher"],
        },
      ];
      // @ts-expect-error ts-migrate(2322) FIXME: Type 'null' is not assignable to type 'string'.
      testEdition.publication_place = null;
      const publisherAndLocation = mount(
        <div>{EditionCard.getPublisherAndLocation(testEdition)}</div>
      );
      expect(publisherAndLocation.text()).to.equal("Published by publisher 1");
    });
    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it("Should return string with location when publisher is not found", () => {
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'agents' does not exist on type '{ date_c... Remove this comment to see the full error message
      testEdition.agents = [
        {
          name: "publisher 1",
          sort_name: "publisher_1",
          viaf: "51542887",
          lcnaf: "nr91006845",
          birth_date_display: "1661?",
          death_date_display: "1731",
          roles: ["author"],
        },
      ];
      testEdition.publication_place = "London";
      const publisherAndLocation = mount(
        <div>{EditionCard.getPublisherAndLocation(testEdition)}</div>
      );
      expect(publisherAndLocation.text()).to.equal("Published in London");
    });
    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it("Should return placeholder", () => {
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'agents' does not exist on type '{ date_c... Remove this comment to see the full error message
      testEdition.agents = [];
      // @ts-expect-error ts-migrate(2322) FIXME: Type 'null' is not assignable to type 'string'.
      testEdition.publication_place = null;
      const publisherAndLocation = mount(
        <div>{EditionCard.getPublisherAndLocation(testEdition)}</div>
      );
      expect(publisherAndLocation.text()).to.equal(
        "Publisher and Location Unknown"
      );
    });
  });

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe("get languages", () => {
    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it("Should return provided languages", () => {
      // @ts-expect-error ts-migrate(2322) FIXME: Type 'string' is not assignable to type 'never'.
      testEdition.languages = [{ language: "English" }, { language: "French" }];
      const languages = mount(
        <div>{EditionCard.getLanguageDisplayText(testEdition)}</div>
      );
      expect(languages.text()).to.equal("Languages: English, French");
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('Should return "Undetermined" if invalid content is passed', () => {
      // @ts-expect-error ts-migrate(2322) FIXME: Type 'string' is not assignable to type 'never'.
      testEdition.languages = ["Not-A-Language"];
      const languages = mount(
        <div>{EditionCard.getLanguageDisplayText(testEdition)}</div>
      );
      expect(languages.text()).to.equal("Languages: Undetermined");
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('Should return "Undetermined" if no languages found', () => {
      // @ts-expect-error ts-migrate(2322) FIXME: Type 'null' is not assignable to type 'never[]'.
      testEdition.languages = null;
      const languages = mount(
        <div>{EditionCard.getLanguageDisplayText(testEdition)}</div>
      );
      expect(languages.text()).to.equal("Languages: Undetermined");
    });
  });

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe("get license", () => {
    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it("Should return License", () => {
      // @ts-expect-error ts-migrate(2322) FIXME: Type '{ license: string; rights_statement: string;... Remove this comment to see the full error message
      testItem.rights = [
        {
          license: "public_domain",
          rights_statement: "Public Domain",
        },
      ];
      expect(EditionCard.getLicense(testItem)).to.equal(
        "License: Public Domain"
      );
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('should return "License Unknown" if no license is found', () => {
      testItem.rights = null;
      expect(EditionCard.getLicense(testItem)).to.equal("License: Unknown");
    });
  });

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe("get download url", () => {
    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it("should return a link if one exists and is downloadable", () => {
      testItem.links = [
        {
          // @ts-expect-error ts-migrate(2322) FIXME: Type 'string' is not assignable to type 'never'.
          url: "download-url",
          // @ts-expect-error ts-migrate(2322) FIXME: Type 'string' is not assignable to type 'never'.
          media_type: "application/pdf",
          // @ts-expect-error ts-migrate(2322) FIXME: Type 'null' is not assignable to type 'never'.
          content: null,
          // @ts-expect-error ts-migrate(2322) FIXME: Type 'null' is not assignable to type 'never'.
          thumbnail: null,
          // @ts-expect-error ts-migrate(2322) FIXME: Type 'boolean' is not assignable to type 'never'.
          local: false,
          // @ts-expect-error ts-migrate(2322) FIXME: Type 'boolean' is not assignable to type 'never'.
          download: true,
          // @ts-expect-error ts-migrate(2322) FIXME: Type 'boolean' is not assignable to type 'never'.
          images: true,
          // @ts-expect-error ts-migrate(2322) FIXME: Type 'boolean' is not assignable to type 'never'.
          ebook: true,
        },
        {
          // @ts-expect-error ts-migrate(2322) FIXME: Type 'string' is not assignable to type 'never'.
          url: "read-online-url",
          // @ts-expect-error ts-migrate(2322) FIXME: Type 'string' is not assignable to type 'never'.
          media_type: "text/html",
          // @ts-expect-error ts-migrate(2322) FIXME: Type 'null' is not assignable to type 'never'.
          content: null,
          // @ts-expect-error ts-migrate(2322) FIXME: Type 'null' is not assignable to type 'never'.
          thumbnail: null,
          // @ts-expect-error ts-migrate(2322) FIXME: Type 'boolean' is not assignable to type 'never'.
          local: false,
          // @ts-expect-error ts-migrate(2322) FIXME: Type 'boolean' is not assignable to type 'never'.
          download: false,
          // @ts-expect-error ts-migrate(2322) FIXME: Type 'boolean' is not assignable to type 'never'.
          images: true,
          // @ts-expect-error ts-migrate(2322) FIXME: Type 'boolean' is not assignable to type 'never'.
          ebook: true,
        },
      ];
      const downloadComponent = mount(
        EditionCard.getDownloadLink(work, testItem)
      );
      expect(downloadComponent.find("a").prop("href")).to.equal(
        "https://download-url"
      );
    });
    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it("should return the first link if multiple are downloadable", () => {
      testItem.links = [
        {
          // @ts-expect-error ts-migrate(2322) FIXME: Type 'string' is not assignable to type 'never'.
          url: "download-url-1",
          // @ts-expect-error ts-migrate(2322) FIXME: Type 'string' is not assignable to type 'never'.
          media_type: "application/pdf",
          // @ts-expect-error ts-migrate(2322) FIXME: Type 'null' is not assignable to type 'never'.
          content: null,
          // @ts-expect-error ts-migrate(2322) FIXME: Type 'null' is not assignable to type 'never'.
          thumbnail: null,
          // @ts-expect-error ts-migrate(2322) FIXME: Type 'boolean' is not assignable to type 'never'.
          local: false,
          // @ts-expect-error ts-migrate(2322) FIXME: Type 'boolean' is not assignable to type 'never'.
          download: true,
          // @ts-expect-error ts-migrate(2322) FIXME: Type 'boolean' is not assignable to type 'never'.
          images: true,
          // @ts-expect-error ts-migrate(2322) FIXME: Type 'boolean' is not assignable to type 'never'.
          ebook: true,
        },
        {
          // @ts-expect-error ts-migrate(2322) FIXME: Type 'string' is not assignable to type 'never'.
          url: "download-url-2",
          // @ts-expect-error ts-migrate(2322) FIXME: Type 'string' is not assignable to type 'never'.
          media_type: "text/html",
          // @ts-expect-error ts-migrate(2322) FIXME: Type 'null' is not assignable to type 'never'.
          content: null,
          // @ts-expect-error ts-migrate(2322) FIXME: Type 'null' is not assignable to type 'never'.
          thumbnail: null,
          // @ts-expect-error ts-migrate(2322) FIXME: Type 'boolean' is not assignable to type 'never'.
          local: false,
          // @ts-expect-error ts-migrate(2322) FIXME: Type 'boolean' is not assignable to type 'never'.
          download: true,
          // @ts-expect-error ts-migrate(2322) FIXME: Type 'boolean' is not assignable to type 'never'.
          images: true,
          // @ts-expect-error ts-migrate(2322) FIXME: Type 'boolean' is not assignable to type 'never'.
          ebook: true,
        },
      ];
      const downloadComponent = mount(
        EditionCard.getDownloadLink(work, testItem)
      );
      expect(downloadComponent.find("a").prop("href")).to.equal(
        "https://download-url-1"
      );
    });
    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it("should return undefined if links are null", () => {
      // @ts-expect-error ts-migrate(2322) FIXME: Type 'null' is not assignable to type 'never[]'.
      testItem.links = null;
      expect(EditionCard.getDownloadLink(testItem)).to.equal(undefined);
    });
    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it("should return undefined if unsuitable links exist", () => {
      testItem.links = [
        {
          // @ts-expect-error ts-migrate(2322) FIXME: Type 'string' is not assignable to type 'never'.
          url: "read-online-url-1",
          // @ts-expect-error ts-migrate(2322) FIXME: Type 'string' is not assignable to type 'never'.
          media_type: "application/pdf",
          // @ts-expect-error ts-migrate(2322) FIXME: Type 'null' is not assignable to type 'never'.
          content: null,
          // @ts-expect-error ts-migrate(2322) FIXME: Type 'null' is not assignable to type 'never'.
          thumbnail: null,
          // @ts-expect-error ts-migrate(2322) FIXME: Type 'boolean' is not assignable to type 'never'.
          local: false,
          // @ts-expect-error ts-migrate(2322) FIXME: Type 'boolean' is not assignable to type 'never'.
          download: false,
          // @ts-expect-error ts-migrate(2322) FIXME: Type 'boolean' is not assignable to type 'never'.
          images: true,
          // @ts-expect-error ts-migrate(2322) FIXME: Type 'boolean' is not assignable to type 'never'.
          ebook: true,
        },
        {
          // @ts-expect-error ts-migrate(2322) FIXME: Type 'string' is not assignable to type 'never'.
          url: "read-online-url-2",
          // @ts-expect-error ts-migrate(2322) FIXME: Type 'string' is not assignable to type 'never'.
          media_type: "text/html",
          // @ts-expect-error ts-migrate(2322) FIXME: Type 'null' is not assignable to type 'never'.
          content: null,
          // @ts-expect-error ts-migrate(2322) FIXME: Type 'null' is not assignable to type 'never'.
          thumbnail: null,
          // @ts-expect-error ts-migrate(2322) FIXME: Type 'boolean' is not assignable to type 'never'.
          local: false,
          // @ts-expect-error ts-migrate(2322) FIXME: Type 'boolean' is not assignable to type 'never'.
          download: false,
          // @ts-expect-error ts-migrate(2322) FIXME: Type 'boolean' is not assignable to type 'never'.
          images: true,
          // @ts-expect-error ts-migrate(2322) FIXME: Type 'boolean' is not assignable to type 'never'.
          ebook: true,
        },
      ];
    });
    expect(EditionCard.getDownloadLink(testItem)).to.equal(undefined);
  });

  // Note:  generateStreamedReaderUrl(Webpub Viewer) links don't have specific tests.
  // The code is very brittle and will change whenever webpub-viewer changes its link generation methods.

  // due to an error in link.download entries, we are using download=true links when local=true
  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe("get read online url", () => {
    const eReaderUrl = "eReaderUrl";
    const referrer = "referrer";
    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it("should return appropriately formatted webpub-viewer link", () => {
      testItem.links = [
        {
          // @ts-expect-error ts-migrate(2322) FIXME: Type 'string' is not assignable to type 'never'.
          url: "https://read-online-url-1",
          // @ts-expect-error ts-migrate(2322) FIXME: Type 'string' is not assignable to type 'never'.
          media_type: "application/pdf",
          // @ts-expect-error ts-migrate(2322) FIXME: Type 'null' is not assignable to type 'never'.
          content: null,
          // @ts-expect-error ts-migrate(2322) FIXME: Type 'null' is not assignable to type 'never'.
          thumbnail: null,
          // @ts-expect-error ts-migrate(2322) FIXME: Type 'boolean' is not assignable to type 'never'.
          local: true,
          // @ts-expect-error ts-migrate(2322) FIXME: Type 'boolean' is not assignable to type 'never'.
          download: true,
          // @ts-expect-error ts-migrate(2322) FIXME: Type 'boolean' is not assignable to type 'never'.
          images: true,
          // @ts-expect-error ts-migrate(2322) FIXME: Type 'boolean' is not assignable to type 'never'.
          ebook: true,
        },
      ];
      const linkComponent = mount(
        EditionCard.getReadOnlineLink(work, testItem, eReaderUrl, referrer)
      );
      expect(linkComponent.find("Link").prop("to").pathname).to.equal(
        "/read-online"
      );
      expect(linkComponent.find("Link").prop("to").search).to.equal(
        "?url=eReaderUrl/readerNYPL/?url=eReaderUrl" +
          "/pub/aHR0cHM6Ly9yZWFkLW9ubGluZS11cmwtMQ%253D%253D/manifest.json#referrer"
      );
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it("should return appropriately formatted non-webpub-viewer link", () => {
      testItem.links = [
        {
          // @ts-expect-error ts-migrate(2322) FIXME: Type 'string' is not assignable to type 'never'.
          url: "read-online-url-1",
          // @ts-expect-error ts-migrate(2322) FIXME: Type 'string' is not assignable to type 'never'.
          media_type: "application/pdf",
          // @ts-expect-error ts-migrate(2322) FIXME: Type 'null' is not assignable to type 'never'.
          content: null,
          // @ts-expect-error ts-migrate(2322) FIXME: Type 'null' is not assignable to type 'never'.
          thumbnail: null,
          // @ts-expect-error ts-migrate(2322) FIXME: Type 'boolean' is not assignable to type 'never'.
          local: false,
          // @ts-expect-error ts-migrate(2322) FIXME: Type 'boolean' is not assignable to type 'never'.
          download: false,
          // @ts-expect-error ts-migrate(2322) FIXME: Type 'boolean' is not assignable to type 'never'.
          images: true,
          // @ts-expect-error ts-migrate(2322) FIXME: Type 'boolean' is not assignable to type 'never'.
          ebook: true,
        },
      ];
      const linkComponent = mount(
        EditionCard.getReadOnlineLink(work, testItem, eReaderUrl, referrer)
      );
      expect(linkComponent.find("Link").prop("to").pathname).to.equal(
        "/read-online"
      );
      expect(linkComponent.find("Link").prop("to").search).to.equal(
        "?url=https://read-online-url-1"
      );
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it("should select the first read-online link", () => {
      testItem.links = [
        {
          // @ts-expect-error ts-migrate(2322) FIXME: Type 'string' is not assignable to type 'never'.
          url: "read-online-url-1",
          // @ts-expect-error ts-migrate(2322) FIXME: Type 'string' is not assignable to type 'never'.
          media_type: "application/pdf",
          // @ts-expect-error ts-migrate(2322) FIXME: Type 'null' is not assignable to type 'never'.
          content: null,
          // @ts-expect-error ts-migrate(2322) FIXME: Type 'null' is not assignable to type 'never'.
          thumbnail: null,
          // @ts-expect-error ts-migrate(2322) FIXME: Type 'boolean' is not assignable to type 'never'.
          local: false,
          // @ts-expect-error ts-migrate(2322) FIXME: Type 'boolean' is not assignable to type 'never'.
          download: false,
          // @ts-expect-error ts-migrate(2322) FIXME: Type 'boolean' is not assignable to type 'never'.
          images: true,
          // @ts-expect-error ts-migrate(2322) FIXME: Type 'boolean' is not assignable to type 'never'.
          ebook: true,
        },
        {
          // @ts-expect-error ts-migrate(2322) FIXME: Type 'string' is not assignable to type 'never'.
          url: "read-online-url-2",
          // @ts-expect-error ts-migrate(2322) FIXME: Type 'string' is not assignable to type 'never'.
          media_type: "application/pdf",
          // @ts-expect-error ts-migrate(2322) FIXME: Type 'null' is not assignable to type 'never'.
          content: null,
          // @ts-expect-error ts-migrate(2322) FIXME: Type 'null' is not assignable to type 'never'.
          thumbnail: null,
          // @ts-expect-error ts-migrate(2322) FIXME: Type 'boolean' is not assignable to type 'never'.
          local: true,
          // @ts-expect-error ts-migrate(2322) FIXME: Type 'boolean' is not assignable to type 'never'.
          download: true,
          // @ts-expect-error ts-migrate(2322) FIXME: Type 'boolean' is not assignable to type 'never'.
          images: true,
          // @ts-expect-error ts-migrate(2322) FIXME: Type 'boolean' is not assignable to type 'never'.
          ebook: true,
        },
      ];
      const linkComponent = mount(
        EditionCard.getReadOnlineLink(work, testItem, eReaderUrl, referrer)
      );
      expect(linkComponent.find("Link").prop("to").pathname).to.equal(
        "/read-online"
      );
      expect(linkComponent.find("Link").prop("to").search).to.equal(
        "?url=https://read-online-url-1"
      );
    });
    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it("returns undefined when no links are passed", () => {
      // @ts-expect-error ts-migrate(2322) FIXME: Type 'null' is not assignable to type 'never[]'.
      testItem.links = null;
      expect(
        EditionCard.getReadOnlineLink(work, testItem, eReaderUrl, referrer)
      ).to.equal(undefined);
    });
  });

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe("get author identifier", () => {
    let testAuthor: any;
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'before'.
    before(() => {
      testAuthor = {
        name: "Tester, Test",
        viaf: "n123456",
        lcnaf: "098765x",
      };
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it("should return a tuple of viaf for viaf queries", () => {
      expect(EditionCard.getAuthorIdentifier(testAuthor)).to.deep.equal([
        "viaf",
        "viaf",
      ]);
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it("should return lcnaf if viaf is not set", () => {
      testAuthor.viaf = null;
      expect(EditionCard.getAuthorIdentifier(testAuthor)).to.deep.equal([
        "lcnaf",
        "lcnaf",
      ]);
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it("should return name/author if viaf and lcnaf are not set", () => {
      testAuthor.lcnaf = null;
      expect(EditionCard.getAuthorIdentifier(testAuthor)).to.deep.equal([
        "name",
        "author",
      ]);
    });
  });

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe("getEditionData", () => {
    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
    describe("Get Edition with Complete Data", () => {
      const edition = work.editions[0];
      const editionData = EditionCard.getEditionData(
        work,
        edition,
        "eReaderUrl",
        "referrer"
      );
      // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it("Edition has Year Heading Element", () => {
        expect(
          mount(<span>{editionData.editionYearHeading}</span>).text()
        ).to.equal("1852 Edition");
      });
      // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it("Edition has cover URL", () => {
        expect(editionData.coverUrl).to.equal(
          "https://test-sfr-covers.s3.amazonaws.com/hathitrust/077371092d774fb3b23e7991339216fb_nyp.33433076087844.jpg"
        );
      });
      // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it("Edition has info with publisher and location", () => {
        expect(
          mount(<span>{editionData.editionInfo[0]}</span>).text()
        ).to.equal("Published in London by Chapman and Hall, London + 4 more");
      });
      // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it("Edition info has list of languages", () => {
        expect(
          mount(<span>{editionData.editionInfo[1]}</span>).text()
        ).to.equal("Languages: English, German, Undetermined");
      });
      // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it("Edition info has license", () => {
        expect(
          mount(<span>{editionData.editionInfo[2]}</span>).text()
        ).to.equal("License: Unknown");
      });
      // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it("Edition has Read Online Link", () => {
        const linkComponent = mount(editionData.readOnlineLink);
        expect(linkComponent.find("Link").prop("to").pathname).to.equal(
          "/read-online"
        );
        expect(linkComponent.find("Link").prop("to").search).to.equal(
          "?url=https://archive.org/details/blithedaleromanc00hawtrich"
        );
      });
      // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it("Edition has Download link", () => {
        const linkComponent = mount(editionData.downloadLink);
        expect(linkComponent.find("a").prop("href")).to.equal(
          "https://catalog.hathitrust.org/api/volumes/oclc/39113388.html"
        );
      });
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
    describe("Get Edition with Missing Data", () => {
      const featuredEditionData = EditionCard.getEditionData(
        work,
        [{}],
        "eReaderUrl",
        "referrer"
      );
      // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it("Edition has Year Heading Element", () => {
        expect(
          mount(<span>{featuredEditionData.editionYearHeading}</span>).text()
        ).to.equal("Edition Year Unknown");
      });
      // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it("Edition has publisher and location", () => {
        expect(
          mount(<span>{featuredEditionData.editionInfo[0]}</span>).text()
        ).to.equal("Publisher and Location Unknown");
      });
      // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it("Edition has cover URL", () => {
        expect(featuredEditionData.coverUrl).to.equal(
          "https://test-sfr-covers.s3.amazonaws.com/default/defaultCover.png"
        );
      });
      // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it("Edition has list of languages", () => {
        expect(
          mount(<span>{featuredEditionData.editionInfo[1]}</span>).text()
        ).to.equal("Languages: Undetermined");
      });
      // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it("Edition has license", () => {
        const licenseElement = mount(featuredEditionData.editionInfo[2]);
        expect(licenseElement.find("a").text()).to.equal("License: Unknown");
      });
      // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it("Edition has no Read Online Link", () => {
        expect(featuredEditionData.readOnlineLink).to.equal(undefined);
      });
      // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it("Edition has no Download link", () => {
        expect(featuredEditionData.downloadLink).to.equal(undefined);
      });
    });
  });
});
