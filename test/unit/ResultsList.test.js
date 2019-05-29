/* eslint-disable react/jsx-filename-extension */
/* eslint-env mocha */
import React from 'react';
import { expect } from 'chai';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ResultsList from '../../src/app/components/SearchResults/ResultsList';
import results from '../fixtures/results-list.json';

configure({ adapter: new Adapter() });

describe('Results List', () => {
  let component;

  describe('No results behavior.', () => {
    before(() => {
      const noResults = [];
      component = shallow(<ResultsList results={noResults} />);
    });

    it('should return null when results object given is empty.', () => {
      expect(component.find('span').text()).to.equal('No results were found. Please try a different keyword or fewer filters.');
    });
  });

  describe('Results behavior.', () => {
    before(() => {
      component = shallow(<ResultsList results={results.hits.hits} />);
    });

    it('should display a grouped list of works and their instances.', () => {
      expect(component.find('.nypl-results-list')).to.have.length(1);
    });
  });
});
