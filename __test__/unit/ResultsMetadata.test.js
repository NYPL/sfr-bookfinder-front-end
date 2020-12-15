/* eslint-disable react/jsx-filename-extension */
/* eslint-env mocha */
import React from 'react';
import { expect } from 'chai';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ResultsMetadata from '../../src/app/components/SearchResults/ResultsMetadata';

configure({ adapter: new Adapter() });

describe('Results Metadata', () => {
  let component;
  let searchQuery;

  describe('No results message delivery', () => {
    before(() => {
      component = shallow(<ResultsMetadata totalItems={0} />);
    });

    it('should have a message stating no results found.', () => {
      expect(component.find('span')).to.have.length(1);
      expect(component.find('span').text()).to.equal('Viewing 0 items');
    });
  });

  describe('Found < page size of results', () => {
    before(() => {
      searchQuery = {
        filters: [],
        page: '0',
        per_page: '10',
        queries: [{
          query: 'cat',
          field: 'keyword',
        }],
        showField: '',
        showQuery: '',
        sort: [],
        total: '0',
      };
      component = shallow(<ResultsMetadata
        totalItems={5}
        searchQuery={searchQuery}
      />);
    });

    it('should have a message displaying all 5 results found.', () => {
      expect(component.find('span')).to.have.length(1);
      expect(component.find('span').text()).to.equal('Viewing 1 - 5 of 5 items');
    });
  });

  describe('Found > page size of results', () => {
    before(() => {
      searchQuery = {
        filters: [],
        page: '0',
        per_page: '10',
        queries: [{
          query: 'cat',
          field: 'keyword',
        }],
        showField: '',
        showQuery: '',
        sort: [],
        total: '0',
      };
      component = shallow(<ResultsMetadata totalItems={15} />);
    });

    it('should have a message displaying 10 of 15 results found.', () => {
      expect(component.find('span')).to.have.length(1);
      expect(component.find('span').text()).to.equal('Viewing 1 - 10 of 15 items');
    });
  });
});
