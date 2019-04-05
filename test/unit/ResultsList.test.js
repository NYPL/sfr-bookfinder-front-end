/* eslint-disable react/jsx-filename-extension */
/* eslint-env mocha */
import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';

configure({ adapter: new Adapter() });

import ResultsList from '../../src/app/components/SearchResults/ResultsList';
import results from '../fixtures/results-list.json';

describe('Results List', () => {
  let component;

  describe('No results behavior.', () => {
    before(() => {
      const noResults = {};
      component = shallow(<ResultsList results={noResults} />);
    });

    it('should return null when results object given is empty.', () => {
      expect(component.type()).to.equal(null);
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
