/* eslint-disable react/jsx-filename-extension */
/* eslint-env mocha */
import React from 'react';
import sinonChai from 'sinon-chai';
import { stub } from 'sinon';
import chai, { expect } from 'chai';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import * as DS from '@nypl/design-system-react-components';
import configureStore from '../../src/app/stores/configureStore';
import initialState from '../../src/app/stores/InitialState';
import SearchResultsPage, { loadSearch, isValidSearchQuery } from '../../src/app/components/SearchResults/SearchResultsPage';
import { Actions } from '../../src/app/actions/SearchActions';
import { mockRouterContext } from '../helpers/routing';

chai.use(sinonChai);

configure({ adapter: new Adapter() });

describe('Search Results Page', () => {
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

  describe('isValidSearchQuery', () => {
    it('returns true if searchQuery has queries', () => {
      expect(isValidSearchQuery(searchQuery)).to.equal(true);
    });
    it('returns false if it has other fields but no queries', () => {
      expect(isValidSearchQuery({
        filters: '[]',
        page: '0',
        per_page: '10',
        queries: '',
        showField: '',
        showQuery: '',
        sort: '[]',
        total: '0',
      })).to.equal(false);
    });
    it('returns false if passed empty', () => {
      expect(isValidSearchQuery({})).to.equal(false);
    });
    it('returns false if passed null', () => {
      expect(isValidSearchQuery(null)).to.equal(false);
    });
  });

  describe('loadSearch', () => {
    let props;
    let push;
    let context;

    beforeEach(() => {
      push = stub();
      context = mockRouterContext(push);

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
      loadSearch(props, context);
      expect(props.dispatch.callCount).to.equal(2);
      expect(props.dispatch.getCall(0).args[0]).to.eql({
        type: Actions.SET_QUERY,
        searchQuery,
      });
    });

    it('Load search with no query resets search', () => {
      props.location.query = null;
      loadSearch(props, context);
      expect(props.dispatch).to.have.been.calledWith({ type: Actions.RESET_SEARCH, reset: true });
      expect(context.router.push).to.have.been.calledWith('/');
    });

    it('Does not call anything if searchQuery is the same as query in location', () => {
      props.searchQuery = searchQuery;
      loadSearch(props, context);
      expect(props.dispatch).to.have.callCount(0);
    });
  });

  describe('Search Results Page render', () => {
    let wrapper;

    before(() => {
      const push = stub();
      const context = mockRouterContext(push);
      const childContextTypes = mockRouterContext(push);

      const store = configureStore(initialState);
      wrapper = mount(<SearchResultsPage store={store} />, { context, childContextTypes });
    });
    it('contains a <Breadcrumbs /> component', () => {
      expect(wrapper.find('Breadcrumbs').exists()).to.equal(true);
    });
    it('contains a <ResultsHeader /> component', () => {
      expect(wrapper.find('ResultsHeader').exists()).to.equal(true);
    });
    it('contains an <h1>', () => {
      expect(wrapper.find('h1')).to.have.length(1);
    });
    it('contains a <SearchResults /> component', () => {
      expect(wrapper.find('SearchResults').exists()).to.equal(true);
    });
  });
});
