/* eslint-disable react/jsx-filename-extension */
/* eslint-env mocha */
import React from 'react';
import { stub } from 'sinon';

import { expect } from 'chai';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureStore from '../../src/app/stores/configureStore';
import initialState from '../../src/app/stores/InitialState';
import SearchResultsPage, { loadSearch } from '../../src/app/components/SearchResults/SearchResultsPage';

configure({ adapter: new Adapter() });
describe('Search Results Page', () => {
  describe('loadSearch', () => {
    const props = {
      location: {
        query: {
          filters: '[]',
          page: '0',
          per_page: '10',
          queries: '[{"query":"cat","field":"keyword"}]',
          showField: '',
          showQuery: '',
          sort: '[]',
          total: '0',
        },
      },
      dispatch: stub(),
      searchQuery: {},

    };
    it('Load search with query sets query and calls search with correct parameters ', () => {
      loadSearch(props);
    });

    it('Load search with no query resets search', () => {

    });
  });

  describe('search info heading', () => {

  });

  describe('Search Results Page render', () => {
    let wrapper;

    before(() => {
      const store = configureStore(initialState);
      wrapper = mount(<SearchResultsPage store={store} />);
    });
    it('contains a <Breadcrumbs /> component', () => {
      expect(wrapper.find('Breadcrumbs').exists()).to.equal(true);
    });

    it('contains an initialized <SearchHeader /> component', () => {
      expect(wrapper.find('SearchHeader').exists()).to.equal(true);
    });

    it('contains an <h1>', () => {
      expect(wrapper.find('h1')).to.have.length(1);
    });
    it('contains a <SearchResults /> component', () => {
      expect(wrapper.find('SearchHeader').exists()).to.equal(true);
    });
  });
});
