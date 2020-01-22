/* eslint-disable react/jsx-filename-extension */
/* eslint-env mocha */
import React from 'react';
import { expect } from 'chai';
import { shallow, mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ResultsList, { getEditionsLinkElement, formatAllResultsData } from '../../src/app/components/SearchResults/ResultsList';
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
      component = shallow(<ResultsList results={results.data.works} />);
    });

    // It shouldn't check DS behavior, only that something comes back.
    it('should return results', () => {
      expect(component.dive().find('ul')).to.have.length(1);
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
    describe('Complete Results Data', () => {
      before(() => {
        // const resultsData = formatAllResultsData(results.data.works, 'origin', 'eReaderUrl', 'Referrer');
      });
      it('result data has id', () => {
        // expect(resultsData.id).to.equal();
      });
      it('result data has index', () => { });
      it('result data has title element', () => { });
      it('result data has subtitle text', () => { });
      it('result data has author element', () => { });
      it('result data has year heading eleemnt', () => { });
      it('result data has publisher and location', () => { });
      it('result data has coverUrl', () => { });
      it('result data has language', () => { });
      it('result data has license', () => { });
      it('result data has readOnlineLink', () => { });
      it('result data has download link', () => { });
      it('result data has editions link', () => { });
    });
    describe('Missing Results Data', () => {
      before(() => {
        const resultsData = formatAllResultsData(results.data.works, 'origin', 'eReaderUrl', 'Referrer');
      });
      it('result data has id', () => { });
      it('result data has index', () => { });
      it('result data has title element', () => { });
      it('result data has subtitle text', () => { });
      it('result data has author element', () => { });
      it('result data has year heading eleemnt', () => { });
      it('result data has publisher and location', () => { });
      it('result data has coverUrl', () => { });
      it('result data has language', () => { });
      it('result data has license', () => { });
      it('result data has readOnlineLink', () => { });
      it('result data has download link', () => { });
      it('result data has editions link', () => { });
    });
  });
});
