/* eslint-disable react/jsx-filename-extension */
/* eslint-env mocha */
import React from 'react';
import { expect } from 'chai';
import { stub } from 'sinon';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import SearchNavigation, { submit } from '../../src/app/components/SearchResults/SearchNavigation';
import results from '../fixtures/results-list.json';
import { sortMap, numbersPerPage } from '../../src/app/constants/sorts';
import { mockRouterContext, mockRouter } from '../helpers/routing';

configure({ adapter: new Adapter() });

describe('Search Navigation', () => {
  describe('No results behavior.', () => {
    let query;
    let component;
    let push;
    let router;

    before(() => {
      push = stub();
      router = mockRouter(push);
      const context = mockRouterContext(push);

      query = { query: 'dsdasd', field: 'keyword' };
      component = mount(<SearchNavigation
        totalItems={0}
        searchQuery={query}
      />, { context });
    });

    it('Calls submit with query', () => {
      submit(query, router);
      expect(router.push.called).to.equal(true);
      expect(router.push.args[0]).to.eql(['/search?query=dsdasd&field=keyword']);
    });

    it('Should contain a SearchHeader Component', () => {
      expect(component.find('h2').exists()).to.equal(true);
      expect(component.find('h2').text()).to.equal('Viewing 0 items');
    });

    it('Should contain a dropdown with number of items per page', () => {
      expect(component.find('select#items-per-page-select').exists()).to.equal(true);
    });

    it('Should contain a dropdown with select options', () => {
      expect(component.find('select#sort-by-select').exists()).to.equal(true);
    });
  });

  describe('Search Navigation behavior', () => {
    const query = { query: 'Chicago', field: 'keyword' };
    const component = mount(<SearchNavigation
      metadata={results.data.totalWorks}
      searchQuery={query}
    />);

    it('should contain a select with list of numbers per page', () => {
      expect(component.find('#items-per-page-select').find('option')).to.have.length(4);
    });

    it('should contain a select with list of numbers per page equal to 10, 20, 50, 100', () => {
      expect(
        component.find('#items-per-page-select').find('option').map(opt => opt.props().value),
      ).to.eql(numbersPerPage);
    });

    it('should contain a select with list of sort options', () => {
      expect(component.find('#sort-by-select').find('option')).to.have.length(7);
    });

    it('should contain a select with sort selections', () => {
      expect(component.find('#sort-by-select').find('option')).to.have.length(Object.keys(sortMap).length);
    });

    it('should contain a select with sort selections equal to the sortMap', () => {
      expect(
        component.find('#sort-by-select').find('option').map(opt => opt.props().value),
      ).to.eql(Object.keys(sortMap));
    });
  });
});
