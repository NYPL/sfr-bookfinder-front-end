/* eslint-env mocha */
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'chai' or its corresponding typ... Remove this comment to see the full error message
import { expect } from "chai";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'enzyme' or its corresponding t... Remove this comment to see the full error message
import { configure } from "enzyme";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'enzyme-adapter-react-16' or it... Remove this comment to see the full error message
import Adapter from "enzyme-adapter-react-16";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'sinon' or its corresponding ty... Remove this comment to see the full error message
import { stub } from "sinon";
// @ts-expect-error ts-migrate(2732) FIXME: Cannot find module '../fixtures/results-list.json'... Remove this comment to see the full error message
import results from "../fixtures/results-list.json";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module '../../src/app/components/Citat... Remove this comment to see the full error message
import CitationFormatter from "../../src/app/components/Citations/formatCitation";

configure({ adapter: new Adapter() });

// @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
describe("Formatted Citation", () => {
  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe("getCitationData()", () => {
    let work: any;
    let agentStub: any;
    let linkStub: any;
    let govReportStub: any;
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'before'.
    before(() => {
      agentStub = stub(CitationFormatter, "getAgentsOfType").returns([
        "agent1",
        "agent2",
      ]);
      linkStub = stub(CitationFormatter, "setLinkFields").returns("test_link");
      govReportStub = stub(CitationFormatter, "isGovernmentReport").returns(
        false
      );
    });

    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'after'.
    after(() => {
      agentStub.restore();
      linkStub.restore();
      govReportStub.restore();
    });

    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'beforeEach'.
    beforeEach(() => {
      work = JSON.parse(JSON.stringify(results.data.works[0]));
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it("should set title to work title if edition title not available", () => {
      const citationData = CitationFormatter.getCitationData(
        work,
        work.editions[0]
      );
      expect(citationData.title).to.equal(
        "The Blithedale romance, by Nathaniel Hawthorne."
      );
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it("should prefer title from edition", () => {
      work.editions[0].title = "The Blithedale Romance (from edition)";
      const citationData = CitationFormatter.getCitationData(
        work,
        work.editions[0]
      );
      expect(citationData.title).to.equal(
        "The Blithedale Romance (from edition)"
      );
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it("should accept subtitle from edition", () => {
      work.editions[0].sub_title = "edition subtitle";
      const citationData = CitationFormatter.getCitationData(
        work,
        work.editions[0]
      );
      expect(citationData.sub_title).to.equal("edition subtitle");
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it("should set arrays of agents types", () => {
      const citationData = CitationFormatter.getCitationData(
        work,
        work.editions[0]
      );
      expect(citationData.agents.authors.length).to.equal(2);
      expect(citationData.agents.authors).to.deep.equal(["agent1", "agent2"]);
      expect(citationData.agents.editors.length).to.equal(2);
      expect(citationData.agents.editors).to.deep.equal(["agent1", "agent2"]);
      expect(citationData.agents.illustrators.length).to.equal(2);
      expect(citationData.agents.illustrators).to.deep.equal([
        "agent1",
        "agent2",
      ]);
      expect(citationData.agents.translators.length).to.equal(2);
      expect(citationData.agents.translators).to.deep.equal([
        "agent1",
        "agent2",
      ]);
      expect(citationData.agents.publishers.length).to.equal(2);
      expect(citationData.agents.publishers).to.deep.equal([
        "agent1",
        "agent2",
      ]);
      expect(citationData.agents.contributors.length).to.equal(2);
      expect(citationData.agents.contributors).to.deep.equal([
        "agent1",
        "agent2",
      ]);
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it("should set publication year from edition", () => {
      const citationData = CitationFormatter.getCitationData(
        work,
        work.editions[0]
      );
      expect(citationData.publication_year).to.equal("1852");
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it("should set publication place from edition", () => {
      const citationData = CitationFormatter.getCitationData(
        work,
        work.editions[0]
      );
      expect(citationData.publication_place).to.equal("London");
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it("should set edition_statement from edition", () => {
      const citationData = CitationFormatter.getCitationData(
        work,
        work.editions[0]
      );
      expect(citationData.edition).to.equal("[Another ed.].");
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it("should set volume from edition", () => {
      work.editions[0].volume = "Test Volume";
      const citationData = CitationFormatter.getCitationData(
        work,
        work.editions[0]
      );
      expect(citationData.volume).to.equal("Test Volume");
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it("should set series from work", () => {
      const citationData = CitationFormatter.getCitationData(
        work,
        work.editions[0]
      );
      expect(citationData.series).to.equal("The modern library classics");
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it("should set a source link from the edition", () => {
      const citationData = CitationFormatter.getCitationData(
        work,
        work.editions[0]
      );
      expect(citationData.sourceLink).to.equal("test_link");
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it("should set government document status", () => {
      const citationData = CitationFormatter.getCitationData(
        work,
        work.editions[0]
      );
      expect(citationData.isGovernmentDoc).to.equal(false);
    });
  });

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe("getAgentsOfType()", () => {
    const testAgents = [
      { name: "test1", roles: ["author", "editor"] },
      { name: "test2", roles: ["editor"] },
      { name: "test3", roles: ["author"] },
      { name: "test4", roles: ["translator"] },
    ];

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it("should extract agents of type without exclude list", () => {
      const testArray = CitationFormatter.getAgentsOfType(testAgents, "author");
      expect(testArray.length).to.equal(2);
      expect(testArray).to.deep.equal(["test1", "test3"]);
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it("should extract agents matching role, but without matching exclude roles", () => {
      const testArray = CitationFormatter.getAgentsOfType(
        testAgents,
        "editor",
        ["author"]
      );
      expect(testArray.length).to.equal(1);
      expect(testArray).to.deep.equal(["test2"]);
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it("should return agents with roles only not matching the exclude list", () => {
      const testArray = CitationFormatter.getAgentsOfType(testAgents, null, [
        "author",
        "editor",
      ]);
      expect(testArray.length).to.equal(1);
      expect(testArray).to.deep.equal(["test4"]);
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it("should return an empty list if no agents are provided", () => {
      expect(CitationFormatter.getAgentsOfType(null, "test").length).to.equal(
        0
      );
    });
  });

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe("setLinkFields", () => {
    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it("should return a link and date from suplied items", () => {
      const testItems = [
        { links: [{ url: "url1", modified: "today" }] },
        { links: [{ url: "url2", modified: "yesterday" }] },
      ];
      const testLink = CitationFormatter.setLinkFields(testItems);
      expect(testLink.link).to.equal("url1");
      expect(testLink.link_date).to.equal("today");
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it("should return null for link attribute if no items are present", () => {
      const testLink = CitationFormatter.setLinkFields(null);
      expect(testLink.link).to.equal(null);
      expect(testLink.link_date).to.equal(null);
    });
  });

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe("isGovernmentReport()", () => {
    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it("should return true if government_report measurement is 1", () => {
      const testMeasures = [
        { quantity: "testing", value: 0 },
        { quantity: "government_document", value: 1 },
      ];
      expect(CitationFormatter.isGovernmentReport(testMeasures)).to.equal(true);
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it("should return false if government_report measurement is 0", () => {
      const testMeasures = [
        { quantity: "testing", value: 1 },
        { quantity: "government_document", value: 0 },
      ];
      expect(CitationFormatter.isGovernmentReport(testMeasures)).to.equal(
        false
      );
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it("should return false if no government_report measurement", () => {
      const testMeasures = [{ quantity: "testing", value: 0 }];
      expect(CitationFormatter.isGovernmentReport(testMeasures)).to.equal(
        false
      );
    });
  });
});
