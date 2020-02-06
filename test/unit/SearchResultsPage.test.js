/* eslint-disable react/jsx-filename-extension */
/* eslint-env mocha */
import React from 'react';
import sinonChai from 'sinon-chai';
import { stub } from 'sinon';

import chai, { expect } from 'chai';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureStore from '../../src/app/stores/configureStore';
import initialState from '../../src/app/stores/InitialState';
import SearchResultsPage, { loadSearch } from '../../src/app/components/SearchResults/SearchResultsPage';
import { Actions } from '../../src/app/actions/SearchActions';

chai.use(sinonChai);

configure({ adapter: new Adapter() });
describe('Search Results Page', () => {
  describe('loadSearch', () => {
    let props;
    const searchQuery = {
      filters: [],
      page: '0',
      per_page: '10',
      queries: [{ field: 'keyword', query: 'cat' }],
      showField: '',
      showQuery: '',
      sort: [],
      total: '0',
    };

    beforeEach(() => {
      props = {
        location: {
          query: {
            filters: '[]',
            page: '0',
            per_page: '10',
            queries: '[{ "field": "keyword", "query": "cat" }]',
            showField: '',
            showQuery: '',
            sort: '[]',
            total: '0',
          },
        },
        dispatch: stub(),
        searchQuery: {},
      };
    });

    it('Load search with query sets query and calls search with correct parameters ', () => {
      loadSearch(props);
      expect(props.dispatch.callCount).to.equal(2);
      expect(props.dispatch.getCall(0).args[0]).to.eql({
        type: Actions.SET_QUERY,
        searchQuery,
      });
    });

    it('Load search with no query resets search', () => {
      props.location.query = null;
      loadSearch(props);
      expect(props.dispatch).to.have.been.calledWith({ type: Actions.RESET_SEARCH, reset: true });
    });

    it('Does not call anything if searchQuery is the same as query in location', () => {
      props.searchQuery = searchQuery;
      loadSearch(props);
      expect(props.dispatch).to.have.callCount(0);
    });
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
