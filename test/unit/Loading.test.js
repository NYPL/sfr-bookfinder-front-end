/* eslint-disable react/jsx-filename-extension */
/* eslint-env mocha */
import React from 'react';
import { expect } from 'chai';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Loading from '../../src/app/components/Application/Loading';
import configureStore from '../../src/app/stores/configureStore';
import initialState from '../../src/app/stores/InitialState';

configure({ adapter: new Adapter() });

describe('Loading', () => {
  let wrapper;

  before(() => {
    const store = configureStore(initialState);
    wrapper = mount(<Loading store={store} />);
  });

  it('should have a aria-live element', () => {
    expect(wrapper.find('.loading')).to.have.length(1);
    expect(wrapper.find('.loading').prop('aria-live')).to.equal('assertive');
  });
});
