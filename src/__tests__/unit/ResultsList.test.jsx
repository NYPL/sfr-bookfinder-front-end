/* eslint-disable react/jsx-filename-extension */
/* eslint-env mocha */
import React from "react";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'chai' or its corresponding typ... Remove this comment to see the full error message
import { expect } from "chai";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'enzyme' or its corresponding t... Remove this comment to see the full error message
import { shallow, mount, configure } from "enzyme";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'enzyme-adapter-react-16' or it... Remove this comment to see the full error message
import Adapter from "enzyme-adapter-react-16";
import ResultsList, {
  getEditionsLinkElement,
  // @ts-expect-error ts-migrate(2307) FIXME: Cannot find module '../../src/app/components/Searc... Remove this comment to see the full error message
} from "../../src/app/components/SearchResults/ResultsList";
// @ts-expect-error ts-migrate(2732) FIXME: Cannot find module '../fixtures/results-list.json'... Remove this comment to see the full error message
import results from "../fixtures/results-list.json";
import FeatureFlags from "dgx-feature-flags";

configure({ adapter: new Adapter() });

// @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
describe("Results List", () => {
  let component: any;

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe("No results behavior.", () => {
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'before'.
    before(() => {
      const noResults: any = [];
      component = shallow(<ResultsList results={noResults} />);
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it("should return null when results object given is empty.", () => {
      expect(component.find("span").text()).to.equal(
        "No results were found. Please try a different keyword or fewer filters."
      );
    });
  });

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe("Results behavior.", () => {
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'before'.
    before(() => {
      component = mount(<ResultsList results={results.data.works} />);
    });

    // It shouldn't check DS behavior, only that something comes back.
    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it("should return results", () => {
      expect(component.find("ul")).to.have.length(1);
    });
  });

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe("Get Editions Link Element", () => {
    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it("Returns Editions link with more than one edition", () => {
      const editionLinkTestResult = { edition_count: 2, uuid: "unique-uuid" };
      const editionsLink = getEditionsLinkElement(editionLinkTestResult);
      expect(
        mount(<span>{editionsLink}</span>)
          .find("a")
          .text()
      ).to.equal("View All 2 Editions");
    });
    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it("Does not return link when there is one edition", () => {
      const editionLinkTestResult = { edition_count: 1, uuid: "unique-uuid" };
      const editionsLink = getEditionsLinkElement(editionLinkTestResult);
      expect(mount(<span>{editionsLink}</span>).exists("a")).to.equal(false);
    });
    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it("does not return editions link when there are no editions", () => {
      const editionLinkTestResult = { edition_count: 0, uuid: "unique-uuid" };
      const editionsLink = getEditionsLinkElement(editionLinkTestResult);
      expect(mount(<span>{editionsLink}</span>).exists("a")).to.equal(false);
    });
    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it("does not return editions link when there are edition count is undefined", () => {
      const editionLinkTestResult = { uuid: "unique-uuid" };
      const editionsLink = getEditionsLinkElement(editionLinkTestResult);
      expect(mount(<span>{editionsLink}</span>).exists("a")).to.equal(false);
    });
  });

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe("Format Results Data", () => {
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'before'.
    before(() => {
      component = shallow(<ResultsList results={results.data.works} />);
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
    describe("Complete Results Data", () => {
      let resultsBlock;
      let resultsData: any;
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'before'.
      before(() => {
        resultsBlock = component
          .instance()
          .formatAllResultsData(
            results.data.works,
            "eReaderUrl",
            "Referrer"
          )[0];
        resultsData = resultsBlock.props.children[0].props;
      });
      // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it("result data has id", () => {
        expect(resultsData.id).to.equal(
          "search-result-07737109-2d77-4fb3-b23e-7991339216fb"
        );
      });
      // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it("result data has index", () => {
        expect(resultsData.resultIndex).to.equal(0);
      });
      // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it("result data has title element", () => {
        expect(
          mount(<span>{resultsData.headingContent}</span>).text()
        ).to.equal("The Blithedale romance, by Nathaniel Hawthorne.");
      });
      // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it("result data has subtitle text", () => {
        expect(mount(resultsData.subtitleContent).text()).to.equal(
          "subtitle subtitle subtitle subtitle subtitle"
        );
      });
      // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it("result data has author element", () => {
        expect(
          mount(<span>{resultsData.authorLinkElement}</span>).text()
        ).to.equal("Hawthorne, Nathaniel");
      });
      // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it("result data has year heading element", () => {
        expect(
          mount(
            <span>{resultsData.editionInfo.editionYearHeading}</span>
          ).text()
        ).to.equal("1852 Edition");
      });
      // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it("result data has edition info", () => {
        expect(resultsData.editionInfo.editionInfo.length).to.equal(3);
      });
      // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it("result data has coverUrl", () => {
        expect(resultsData.editionInfo.coverUrl).to.equal(
          "https://test-sfr-covers.s3.amazonaws.com/hathitrust/077371092d774fb3b23e7991339216fb_nyp.33433076087844.jpg"
        );
      });
      // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it("result data has readOnlineLink", () => {
        const linkComponent = mount(resultsData.editionInfo.readOnlineLink);
        expect(linkComponent.find("Link").prop("to").pathname).to.equal(
          "/read-online"
        );
        expect(linkComponent.find("Link").prop("to").search).to.equal(
          "?url=https://archive.org/details/blithedaleromanc00hawtrich"
        );
      });
      // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it("result data has download link", () => {
        expect(
          mount(<span>{resultsData.editionInfo.downloadLink}</span>)
            .find("a")
            .prop("href")
        ).to.equal(
          "https://catalog.hathitrust.org/api/volumes/oclc/39113388.html"
        );
      });
      // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it("result data has editions link", () => {
        expect(
          mount(<span>{resultsData.editionsLinkElement}</span>).text()
        ).to.equal("View All 17 Editions");
      });
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
    describe("Missing Results Data", () => {
      let resultsBlock;
      let resultsData: any;
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'before'.
      before(() => {
        resultsBlock = component
          .instance()
          .formatAllResultsData([{}], "eReaderUrl", "Referrer")[0];
        resultsData = resultsBlock.props.children[0].props;
      });
      // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it("Empty result data has id", () => {
        expect(resultsData.id).to.equal("search-result-undefined");
      });
      // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it("Empty result data has index", () => {
        expect(resultsData.resultIndex).to.equal(0);
      });
      // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it("Empty result data has unknown title", () => {
        expect(mount(resultsData.headingContent).text()).to.equal(
          "Title Unknown"
        );
      });
      // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it("result data has no subtitle text", () => {
        expect(resultsData.subtitle).to.equal(undefined);
      });
      // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it("result data has no author element", () => {
        expect(mount(<span>{resultsData.authorElement}</span>).text()).to.equal(
          ""
        );
      });
      // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it("result data has unknown year heading eleemnt", () => {
        expect(
          mount(
            <span>{resultsData.editionInfo.editionYearHeading}</span>
          ).text()
        ).to.equal("Edition Year Unknown");
      });
      // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it("result data has default coverUrl", () => {
        expect(resultsData.editionInfo.coverUrl).to.equal(
          "https://test-sfr-covers.s3.amazonaws.com/default/defaultCover.png"
        );
      });
      // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it("result data has edition info", () => {
        expect(resultsData.editionInfo.editionInfo.length).to.equal(3);
      });
      // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it("result data has no readOnlineLink", () => {
        expect(resultsData.editionInfo.readOnlineLink).to.equal(undefined);
      });
      // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it("result data has no download link", () => {
        expect(
          mount(<span>{resultsData.editionInfo.downloadLink}</span>).text()
        ).to.equal("");
      });
      // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it("result data has no editions link", () => {
        expect(
          mount(<span>{resultsData.editionsLinkElement}</span>).text()
        ).to.equal("");
      });
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
    describe("Complete Citation", () => {
      let resultsBlock;
      let citationData: any;
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'before'.
      before(() => {
        FeatureFlags.actions.activateFeature("DisplayCitations");
        resultsBlock = component
          .instance()
          .formatAllResultsData(
            results.data.works,
            "eReaderUrl",
            "Referrer"
          )[0];
        citationData = resultsBlock.props.children[1].props;
      });

      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'after'.
      after(() => {
        FeatureFlags.actions.deactivateFeature("DisplayCitations");
      });

      // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it("should contain a title", () => {
        expect(citationData.title).to.equal(
          "The Blithedale romance, by Nathaniel Hawthorne."
        );
      });

      // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it("should have a isGovernmentDoc flag", () => {
        expect(citationData.isGovernmentDoc).to.equal(false);
      });

      // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it("should return an agents object", () => {
        expect(citationData.agents.authors.length).to.equal(1);
        expect(citationData.agents.authors[0]).to.equal("Hawthorne, Nathaniel");
        expect(citationData.agents.editors.length).to.equal(1);
        expect(citationData.agents.editors[0]).to.equal("Dugdale, John");
        expect(citationData.agents.illustrators.length).to.equal(0);
        expect(citationData.agents.translators.length).to.equal(0);
        expect(citationData.agents.publishers.length).to.equal(6);
      });

      // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it("subtitle should be empty", () => {
        expect(citationData.subTitle).to.equal("");
      });

      // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it("should have a publication year", () => {
        expect(citationData.publicationYear).to.equal("1852");
      });

      // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it("should have an edition statement", () => {
        expect(citationData.edition).to.equal("[Another ed.].");
      });

      // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it("volume should be null", () => {
        expect(citationData.volume).to.equal(null);
      });

      // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it("should have a source link", () => {
        expect(citationData.sourceLink).to.equal(
          "archive.org/details/blithedaleromanc00hawtrich"
        );
      });
    });
  });
});
