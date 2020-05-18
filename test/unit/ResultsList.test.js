/* eslint-disable react/jsx-filename-extension */
/* eslint-env mocha */
import React from 'react';
import { expect } from 'chai';
import { shallow, mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ResultsList, { getEditionsLinkElement } from '../../src/app/components/SearchResults/ResultsList';
import results from '../fixtures/results-list.json';

configure({ adapter: new Adapter() });

describe('Results List', () => {
  let component;

  describe('No results behavior.', () => {
    before(() => {
      const noResults = [];
      component = shallow(<ResultsList
        results={noResults}
      />);
    });

    it('should return null when results object given is empty.', () => {
      expect(component.find('span').text()).to.equal('No results were found. Please try a different keyword or fewer filters.');
    });
  });

  describe('Results behavior.', () => {
    before(() => {
      component = mount(<ResultsList results={results.data.works} />);
    });

    // It shouldn't check DS behavior, only that something comes back.
    it('should return results', () => {
      expect(component.find('ul')).to.have.length(1);
    });
  });

  describe('Get Editions Link Element', () => {
    it('Returns Editions link with more than one edition', () => {
      const editionLinkTestResult = { edition_count: 2, uuid: 'unique-uuid' };
      const editionsLink = getEditionsLinkElement(editionLinkTestResult);
      expect(mount(<span>{editionsLink}</span>).find('a').text()).to.equal('View All 2 Editions');
    });
    it('Does not return link when there is one edition', () => {
      const editionLinkTestResult = { edition_count: 1, uuid: 'unique-uuid' };
      const editionsLink = getEditionsLinkElement(editionLinkTestResult);
      expect(mount(<span>{editionsLink}</span>).exists('a')).to.equal(false);
    });
    it('does not return editions link when there are no editions', () => {
      const editionLinkTestResult = { edition_count: 0, uuid: 'unique-uuid' };
      const editionsLink = getEditionsLinkElement(editionLinkTestResult);
      expect(mount(<span>{editionsLink}</span>).exists('a')).to.equal(false);
    });
    it('does not return editions link when there are edition count is undefined', () => {
      const editionLinkTestResult = { uuid: 'unique-uuid' };
      const editionsLink = getEditionsLinkElement(editionLinkTestResult);
      expect(mount(<span>{editionsLink}</span>).exists('a')).to.equal(false);
    });
  });

  describe('Format Results Data', () => {
    before(() => {
      component = shallow(<ResultsList results={results.data.works} />);
    });

    describe('Complete Results Data', () => {
      let resultsBlock;
      let resultsData;
      before(() => {
        resultsBlock = component.instance().formatAllResultsData(results.data.works, 'eReaderUrl', 'Referrer')[0];
        resultsData = resultsBlock.props.children[0].props;
      });
      it('result data has id', () => {
        expect(resultsData.id).to.equal('search-result-07737109-2d77-4fb3-b23e-7991339216fb');
      });
      it('result data has index', () => {
        expect(resultsData.resultIndex).to.equal(0);
      });
      it('result data has title element', () => {
        expect(mount(<span>{resultsData.headingContent}</span>).text()).to.equal('The Blithedale romance, by Nathaniel Hawthorne.');
      });
      it('result data has subtitle text', () => {
        expect(mount(resultsData.subtitleContent).text()).to.equal('subtitle subtitle subtitle subtitle subtitle');
      });
      it('result data has author element', () => {
        expect(mount(<span>{resultsData.authorLinkElement}</span>).text()).to.equal('Hawthorne, Nathaniel');
      });
      it('result data has year heading element', () => {
        expect(mount(<span>{resultsData.editionInfo.editionYearHeading}</span>).text()).to.equal('1852 Edition');
      });
      it('result data has edition info', () => {
        expect(resultsData.editionInfo.editionInfo.length).to.equal(3);
      });
      it('result data has coverUrl', () => {
        expect(resultsData.editionInfo.coverUrl).to.equal(
          'https://test-sfr-covers.s3.amazonaws.com/hathitrust/077371092d774fb3b23e7991339216fb_nyp.33433076087844.jpg',
        );
      });
      it('result data has readOnlineLink', () => {
        const linkComponent = mount(resultsData.editionInfo.readOnlineLink);
        expect(linkComponent.find('Link').prop('to').pathname).to.equal('/read-online');
        expect(linkComponent.find('Link').prop('to').search).to.equal('?url=https://archive.org/details/blithedaleromanc00hawtrich');
      });
      it('result data has download link', () => {
        expect(mount(<span>{resultsData.editionInfo.downloadLink}</span>)
          .find('a').prop('href')).to.equal('https://catalog.hathitrust.org/api/volumes/oclc/39113388.html');
      });
      it('result data has editions link', () => {
        expect(mount(<span>{resultsData.editionsLinkElement}</span>).text()).to.equal('View All 17 Editions');
      });
    });

    describe('Missing Results Data', () => {
      let resultsBlock;
      let resultsData;
      before(() => {
        resultsBlock = component.instance().formatAllResultsData([{}], 'eReaderUrl', 'Referrer')[0];
        resultsData = resultsBlock.props.children[0].props;
      });
      it('Empty result data has id', () => {
        expect(resultsData.id).to.equal('search-result-undefined');
      });
      it('Empty result data has index', () => {
        expect(resultsData.resultIndex).to.equal(0);
      });
      it('Empty result data has unknown title', () => {
        expect(mount(resultsData.headingContent).text()).to.equal('Title Unknown');
      });
      it('result data has no subtitle text', () => {
        expect(resultsData.subtitle).to.equal(undefined);
      });
      it('result data has no author element', () => {
        expect(mount(<span>{resultsData.authorElement}</span>).text()).to.equal('');
      });
      it('result data has unknown year heading eleemnt', () => {
        expect(mount(<span>{resultsData.editionInfo.editionYearHeading}</span>).text()).to.equal('Edition Year Unknown');
      });
      it('result data has default coverUrl', () => {
        expect(resultsData.editionInfo.coverUrl).to.equal('https://test-sfr-covers.s3.amazonaws.com/default/defaultCover.png');
      });
      it('result data has edition info', () => {
        expect(resultsData.editionInfo.editionInfo.length).to.equal(3);
      });
      it('result data has no readOnlineLink', () => {
        expect(resultsData.editionInfo.readOnlineLink).to.equal(undefined);
      });
      it('result data has no download link', () => {
        expect(mount(<span>{resultsData.editionInfo.downloadLink}</span>).text()).to.equal('');
      });
      it('result data has no editions link', () => {
        expect(mount(<span>{resultsData.editionsLinkElement}</span>).text()).to.equal('');
      });
    });
  });
});
