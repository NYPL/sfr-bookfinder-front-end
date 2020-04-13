/* eslint-disable react/jsx-filename-extension */
/* eslint-env mocha */
import React from 'react';
import { expect } from 'chai';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import * as DS from '@nypl/design-system-react-components';
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
    expect(wrapper.find('Breadcrumbs').exists()).to.equal(true);
  });

  it('contains an initialized <LandingPromo /> component', () => {
    expect(wrapper.find('LandingPromo').exists()).to.equal(true);
  });
  // it('contains a DS HeaderImgRight component', () => {
  //   expect(wrapper.find(DS.HeaderImgRight)).to.have.length(1);
  // });
  it('contains a DS UnorderedList component', () => {
    expect(wrapper.find(DS.UnorderedList)).to.have.length(1);
  });
  it('contains a list of subjects', () => {
    const browseList = wrapper.find({ 'aria-labelledby': 'subject-browse-list' });
    expect(browseList).to.have.length(1);
    expect(browseList.find('li')).to.have.length(5);
  });
});
