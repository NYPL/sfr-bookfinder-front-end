/* eslint-disable react/jsx-filename-extension */
/* eslint-env mocha */
import React from 'react';
import { stub } from 'sinon';
import { expect } from 'chai';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Select from 'react-select';
import { mockRouterContext } from '../helpers/routing';
import AdvancedSearch from '../../src/app/components/AdvancedSearch/AdvancedSearch';
import TextInput from '../../src/app/components/Form/TextInput';
import Checkbox from '../../src/app/components/Form/Checkbox';
import configureStore from '../../src/app/stores/configureStore';
import initialState from '../../src/app/stores/InitialState';

configure({ adapter: new Adapter() });

describe('Search Container interactions', () => {
  let wrapper;
  let context;
  let childContextTypes;
  let push;

  before(() => {
    const store = configureStore(initialState);
    push = stub();
    context = mockRouterContext(push);
    childContextTypes = mockRouterContext(push);

    wrapper = mount(<AdvancedSearch store={store} />, { context, childContextTypes });
  });

  after(() => {
    wrapper.unmount();
  });

  it('contains 4 advanced search inputs', () => {
    expect(
      wrapper
        .find('fieldset')
        .first()
        .find(TextInput),
    ).to.have.length(4);
  });

  it('contains Language Search', () => {
    expect(
      wrapper
        .find('fieldset')
        .at(1)
        .find(Select),
    ).to.have.length(1);
  });

  it('contains Publication Year Search', () => {
    expect(
      wrapper
        .find('fieldset')
        .at(2)
        .find(TextInput),
    ).to.have.length(2);
  });

  it('contains 3 format Searches', () => {
    expect(
      wrapper
        .find('fieldset')
        .at(3)
        .find(Checkbox),
    ).to.have.length(3);
  });

  it('displays error on missing search query', () => {
    wrapper.find('.usa-button').find({ value: 'Search' }).simulate('click');

    expect(wrapper.find('.usa-alert__text').exists()).to.equal(true);
  });

  it('no error on valid search query', () => {
    wrapper.find('.usa-input').find({ name: 'keyword' })
      .simulate('change', { target: { key: 'keyword', name: 'keyword', value: 'london' } });
    wrapper.find('.usa-button').find({ value: 'Search' }).simulate('click');
    expect(wrapper.find('.usa-alert__text').exists()).to.equal(false);
  });

  it('no error on start date with no end date', () => {
    wrapper.find('.usa-input').find({ name: 'keyword' })
      .simulate('change', { target: { key: 'keyword', name: 'keyword', value: 'london' } });
    wrapper.find('.usa-input').find({ name: 'filters.years.start' })
      .simulate('change', { target: { key: 'filters.years.start', name: 'filters.years.start', value: '1990' } });
    wrapper.find('.usa-input').find({ name: 'filters.years.end' })
      .simulate('change', { target: { key: 'filters.years.end', name: 'filters.years.end', value: '' } });
    wrapper.find('.usa-button').find({ value: 'Search' }).simulate('click');
    expect(wrapper.find('.usa-alert__text').exists()).to.equal(false);
  });

  it('no error on end date with no start date', () => {
    wrapper.find('.usa-input').find({ name: 'keyword' })
      .simulate('change', { target: { key: 'keyword', name: 'keyword', value: 'london' } });
    wrapper.find('.usa-input').find({ name: 'filters.years.start' })
      .simulate('change', { target: { key: 'filters.years.start', name: 'filters.years.start', value: '' } });
    wrapper.find('.usa-input').find({ name: 'filters.years.end' })
      .simulate('change', { target: { key: 'filters.years.end', name: 'filters.years.end', value: '1890' } });
    wrapper.find('.usa-button').find({ value: 'Search' }).simulate('click');
    expect(wrapper.find('.usa-alert__text').exists()).to.equal(false);
  });

  it('displays error on invalid date range', () => {
    wrapper.find('.usa-input').find({ name: 'keyword' })
      .simulate('change', { target: { key: 'keyword', name: 'keyword', value: 'london' } });
    wrapper.find('.usa-input').find({ name: 'filters.years.start' })
      .simulate('change', { target: { key: 'filters.years.start', name: 'filters.years.start', value: '1990' } });
    wrapper.find('.usa-input').find({ name: 'filters.years.end' })
      .simulate('change', { target: { key: 'filters.years.end', name: 'filters.years.end', value: '1890' } });
    wrapper.find('.usa-button').find({ value: 'Search' }).simulate('click');

    expect(wrapper.find('.usa-alert__text').exists()).to.equal(true);
  });
});
