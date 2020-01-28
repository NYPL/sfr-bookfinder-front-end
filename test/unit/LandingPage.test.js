/* eslint-disable react/jsx-filename-extension */
/* eslint-env mocha */
import React from 'react';
import { expect } from 'chai';
import { shallow, mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import LandingPage from '../../src/app/components/LandingPage/LandingPage';
import configureStore from '../../src/app/stores/configureStore';
import initialState from '../../src/app/stores/InitialState';

configure({ adapter: new Adapter() });

describe('Landing Page render', () => {
  let wrapper;

  before(() => {
    const store = configureStore(initialState);
    wrapper = mount(<LandingPage store={store} />);
  });
  it('contains a <Breadcrumbs /> component', () => {
    expect(wrapper.find("Breadcrumbs").exists()).to.equal(true);
  })

  it('contains an initialized <SearchForm /> component', () => {
    expect(wrapper.find("SearchForm").exists()).to.equal(true);
  });
  it('contains an <h1> when Search is empty', () => {
    expect(wrapper.find('h1')).to.have.length(1);
  });
  it('contains a list of subjects', () => {
    let browseList = wrapper.find({"aria-labelledby": "subject-browse-list"});
    expect(browseList).to.have.length(1);
    expect(browseList.find('li')).to.have.length(5);
  });
});
