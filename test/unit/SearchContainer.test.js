/* eslint-disable react/jsx-filename-extension */
/* eslint-env mocha */
import React from 'react';
import { expect } from 'chai';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import SearchContainer from '../../src/app/components/SearchContainer/SearchContainer';
import SearchForm from '../../src/app/components/SearchForm/SearchForm';
import SearchResults from '../../src/app/components/SearchResults/SearchResults';
import configureStore from '../../src/app/stores/configureStore';
import initialState from '../../src/app/stores/InitialState';

configure({ adapter: new Adapter() });

describe('Search Container interactions', () => {
  let wrapper;

  before(() => {
    const store = configureStore(initialState);
    wrapper = mount(<SearchContainer store={store} />);
  });

  it('contains an initialized <SearchForm /> component', () => {
    expect(wrapper.find(SearchForm)).to.have.length(1);
    expect(wrapper.find(SearchForm).prop('searchQuery').query).to.equal('');
    expect(wrapper.find(SearchForm).prop('searchQuery').field).to.equal('keyword');
  });
  it('contains a <SearchResults /> component', () => {
    expect(wrapper.find(SearchResults)).to.have.length(1);
  });
  it('contains an <h1> when Search is empty', () => {
    expect(wrapper.find('h1')).to.have.length(1);
    expect(wrapper.find('h1').text()).to.equal('ResearchNow');
  });
  it('contains a tagline element when search is empty', () => {
    expect(wrapper.find('#tagline')).to.have.length(1);
    expect(wrapper.find('#tagline').text()).to.equal(
      "Search the world's research collections and more for digital books you can use right now.",
    );
  });
});
