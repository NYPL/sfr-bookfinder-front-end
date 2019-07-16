/* eslint-disable react/jsx-filename-extension */
/* eslint-env mocha */
import React from 'react';
import { expect } from 'chai';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Filters from '../../src/app/components/SearchResults/Filters';
import results from '../fixtures/results-list-full.json';

configure({ adapter: new Adapter() });

const noResults = {
  took: 93,
  timed_out: false,
  _shards: {
    total: 5,
    successful: 5,
    skipped: 0,
    failed: 0,
  },
  hits: {
    total: 0,
    max_score: null,
    hits: [],
  },
  facets: {
    language: [],
  },
};

describe('Filters', () => {
  let component;

  describe('No results behavior.', () => {
    before(() => {
      component = shallow(<Filters data={noResults} />);
    });

    it('should return null when results object given is empty.', () => {
      expect(component.find('div').exists()).to.equal(false);
    });
  });
  describe('No results behavior with searchQuery.', () => {
    before(() => {
      const searchQuery = { filters: [{ field: 'language', value: 'English' }] };
      component = shallow(<Filters
        data={noResults}
        searchQuery={searchQuery}
      />);
    });

    it('should not return null when there is no hits and there is a searchQuery.', () => {
      expect(component.find('div').exists()).to.equal(true);
    });
  });

  describe('Filters behavior.', () => {
    before(() => {
      component = shallow(<Filters data={results} />);
    });

    it('should display a list of fields (currently 2)', () => {
      expect(component.find('fieldset')).to.have.length(2);
    });
    it('should display a list of filters inside the field (maximum 10)', () => {
      expect(
        component
          .find('fieldset')
          .first()
          .find('div'),
      ).to.have.length(10);
    });
    it('should display the maximum count filter first', () => {
      expect(
        component
          .find('fieldset')
          .first()
          .find('div')
          .first()
          .text(),
      ).to.equal('English (2,148)');
    });
    it('should contain Years Filter', () => {
      expect(component.find('FilterYears')).to.have.length(1);
    });
  });
});
