/* eslint-disable react/jsx-filename-extension */
/* eslint-env mocha */
import React from 'react';
import { expect } from 'chai';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import LandingPage from '../../src/app/components/LandingPage/LandingPage';
import SearchForm from '../../src/app/components/SearchForm/SearchForm';
import configureStore from '../../src/app/stores/configureStore';
import initialState from '../../src/app/stores/InitialState';

configure({ adapter: new Adapter() });

describe('Search Container interactions', () => {
  let wrapper;

  before(() => {
    const store = configureStore(initialState);
    wrapper = mount(<LandingPage store={store} />);
  });

  it('contains an initialized <SearchForm /> component', () => {
    expect(wrapper.find(SearchForm)).to.have.length(1);
    expect(wrapper.find(SearchForm).prop('searchQuery').queries[0].query).to.equal('');
    expect(wrapper.find(SearchForm).prop('searchQuery').queries[0].field).to.equal('');
  });
  it('contains an <h1> when Search is empty', () => {
    expect(wrapper.find('h1')).to.have.length(1);
    expect(wrapper.find('h1').text()).to.equal('ResearchNow');
  });
  it('contains a tagline element when search is empty', () => {
    expect(wrapper.find('h2#tagline')).to.have.length(1);
    expect(wrapper.find('h2#tagline').text()).to.equal(
      "Search the World's Research Collections",
    );
  });
});
