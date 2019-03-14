/* eslint-env mocha */
import React from 'react';
import { expect } from 'chai';
import { mount, shallow } from 'enzyme';

import SearchContainer from '../../src/app/components/SearchContainer/SearchContainer';
import SearchForm from '../../src/app/components/SearchForm/SearchForm';
import SearchResults from '../../src/app/components/SearchResults/SearchResults';
import configureStore from '../../src/app/stores/configureStore';
import initialState from '../../src/app/stores/InitialState';
import { searchResults } from '../../src/app/actions/SearchActions';
import results from '../fixtures/results-list-full.json';

describe('Search Container interactions', () => {
  let wrapper;

  before(() => {
    const store = configureStore(initialState);
    store.dispatch(searchResults(results));
    wrapper = mount(<SearchContainer store={store}/>);
  });

  it('contains an initialized <SearchForm /> component', () => {
    expect(wrapper.find(SearchForm)).to.have.length(1);
    expect(wrapper.find(SearchForm).prop('searchQuery')).to.equal('');
    expect(wrapper.find(SearchForm).prop('searchField')).to.equal('keyword');
  });
  it('contains a <SearchResults /> component', () => {
    expect(wrapper.find(SearchResults)).to.have.length(1);
  });
  it('contains an <h1>', () => {
    expect(wrapper.find('h1')).to.have.length(1);
    expect(wrapper.find('h1').text()).to.equal('ResearchNow');
  });
  it('contains a tagline element', () => {
    expect(wrapper.find('#tagline')).to.have.length(1);
    expect(wrapper.find('#tagline').text()).to.equal('Search the world\'s research collections and more for digital books you can use right now.');
  });
});
