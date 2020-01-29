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
//   describe('loadSearch', () => {
//     const props = {
//       location: { query: { queries: [{ query: 'cat', field: 'keyword' }] } },
//       dispatch: stub(),
//       searchQuery: {},
//     };
//     it('stuff', () => {
//       loadSearch(props);
//       console.log('aaaaa', props.dispatch.args);
//     });
//   });

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
  });
});
