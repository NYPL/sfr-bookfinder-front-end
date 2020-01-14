/* eslint-disable react/jsx-filename-extension */
/* eslint-env mocha */
import React from 'react';
import { expect } from 'chai';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import SearchNavigation from '../../src/app/components/SearchResults/SearchNavigation';
import results from '../fixtures/results-list.json';
import { sortMap, numbersPerPage } from '../../src/app/constants/sorts';

configure({ adapter: new Adapter() });

describe('Search Navigation', () => {
  describe('No results behavior.', () => {
    const noResults = {};
    const query = { query: 'dsdasd', field: 'keyword' };
    const component = mount(<SearchNavigation
      metadata={noResults}
      searchQuery={query}
    />);

    it('should contain a SearchHeader Component', () => {
      expect(component.find('SearchHeader').exists()).to.equal(true);
    });
    it('should not contain links to First, Previous, Next, Last Page', () => {
      expect(component.find('a')).to.have.length(0);
    });
  });

  describe('Search Header behavior', () => {
    const query = { query: 'Chicago', field: 'keyword' };
    const component = mount(<SearchNavigation
      metadata={results.hits}
      searchQuery={query}
    />);
    it('should contain a SearchHeader Component', () => {
      expect(component.find('SearchHeader').exists()).to.equal(true);
    });
    it('should not contain a SearchFooter Component', () => {
      expect(component.find('SearchFooter').exists()).to.equal(false);
    });
    it('should contain link to First Page', () => {
      expect(
        component
          .find('a')
          .first()
          .text(),
      ).to.equal('First');
    });
    it('should contain link to Previous Page', () => {
      expect(
        component
          .find('a')
          .at(1)
          .text(),
      ).to.equal('Previous');
    });
    it('should contain link to Next Page', () => {
      expect(
        component
          .find('a')
          .at(2)
          .text(),
      ).to.equal('Next');
    });
    it('should contain link to Last Page', () => {
      expect(
        component
          .find('a')
          .at(3)
          .text(),
      ).to.equal('Last');
    });
    it('should contain a select with list of numbers per page', () => {
      expect(component.find('#items-by-page').find('option')).to.have.length(4);
    });

    it('should contain a select with list of numbers per page equal to 10, 20, 50, 100', () => {
      expect(
        component
          .find('Select')
          .first()
          .props().options,
      ).to.eql(numbersPerPage); // eql used for arrays equality
    });
    it('should contain a select with list of pages', () => {
      expect(component.find('#page-select-header').find('option')).to.have.length(219);
    });
    it('should contain a select with sort selections', () => {
      expect(component.find('#sort-by').find('option')).to.have.length(Object.keys(sortMap).length);
    });
    it('should contain a select with sort selections equal to the sortMap', () => {
      expect(
        component
          .find('Select')
          .at(1)
          .props().options,
      ).to.eql(Object.keys(sortMap).map(sortOption => ({ value: sortOption, label: sortOption }))); // eql used for arrays equality
    });
  });

  describe('Search Footer behavior', () => {
    const query = { query: 'Chicago', field: 'keyword' };
    const component = mount(<SearchNavigation
      metadata={results.hits}
      searchQuery={query}
      isFooter
    />);

    it('should contain a SearchFooter Component', () => {
      expect(component.find('SearchFooter').exists()).to.equal(true);
    });

    it('should not contain a SearchHeader Component', () => {
      expect(component.find('SearchHeader').exists()).to.equal(false);
    });

    it('should contain link to First Page', () => {
      expect(
        component
          .find('a')
          .first()
          .text(),
      ).to.equal('First');
    });
    it('should contain link to Previous Page', () => {
      expect(
        component
          .find('a')
          .at(1)
          .text(),
      ).to.equal('Previous');
    });
    it('should contain link to Next Page', () => {
      expect(
        component
          .find('a')
          .at(2)
          .text(),
      ).to.equal('Next');
    });
    it('should contain link to Last Page', () => {
      expect(
        component
          .find('a')
          .at(3)
          .text(),
      ).to.equal('Last');
    });
    it('should not contain a select with list of numbers per page', () => {
      expect(component.find('#items-by-page')).to.have.length(0);
    });
    it('should contain a select with list of pages', () => {
      expect(component.find('#page-select-footer').find('option')).to.have.length(219);
    });
    it('should not contain a select with sort selections', () => {
      expect(component.find('#sort-by')).to.have.length(0);
    });
  });
});
