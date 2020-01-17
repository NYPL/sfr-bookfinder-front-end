/* eslint-disable react/jsx-filename-extension */
/* eslint-env mocha */
import React from 'react';
import { expect } from 'chai';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import LandingPage from '../../src/app/components/LandingPage/LandingPage';
import configureStore from '../../src/app/stores/configureStore';
import initialState from '../../src/app/stores/InitialState';

configure({ adapter: new Adapter() });

describe('Landing Page interactions', () => {
  let wrapper;

  before(() => {
    const store = configureStore(initialState);
    wrapper = shallow(<LandingPage store={store} />).dive().find('LandingPage');
  });

  it('contains an initialized <SearchForm /> component', () => {
    expect(wrapper).to.have.length(1);
    expect(wrapper.prop('searchQuery').queries[0].query).to.equal('');
    expect(wrapper.prop('searchQuery').queries[0].field).to.equal('');
  });
  // it('contains an <h1> when Search is empty', () => {
  //   expect(wrapper.find('LandingPage').dive().find('#ResearchNow-Main-Header')).to.have.length(1);
  //   expect(wrapper.find('LandingPage').dive().find('#ResearchNow-Main-Header').text()).to.equal('ResearchNow');
  // });
  it('contains a SearchForm element', () => {
    expect(wrapper.dive().find('SearchForm')).to.have.length(1);
  });
  // it('contains a list of subjects', () => {
  //   expect();
  // });
});
