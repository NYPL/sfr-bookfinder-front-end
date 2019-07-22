/* eslint-disable react/jsx-filename-extension */
/* eslint-env mocha */
import React from 'react';
import { expect } from 'chai';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Select from 'react-select';
import AdvancedSearch from '../../src/app/components/AdvancedSearch/AdvancedSearch';
import TextInput from '../../src/app/components/Form/TextInput';
import Checkbox from '../../src/app/components/Form/Checkbox';
import configureStore from '../../src/app/stores/configureStore';
import initialState from '../../src/app/stores/InitialState';

configure({ adapter: new Adapter() });

describe('Search Container interactions', () => {
  let wrapper;

  before(() => {
    const store = configureStore(initialState);
    wrapper = mount(<AdvancedSearch store={store} />);
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
});
