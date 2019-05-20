/* eslint-disable react/jsx-filename-extension */
/* eslint-env mocha */
import React from 'react';
import { expect } from 'chai';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import SearchButton from '../../src/app/components/Button/SearchButton';

configure({ adapter: new Adapter() });

describe('SearchButton', () => {
  let component;

  before(() => {
    component = shallow(<SearchButton />);
  });

  it('should have a button element', () => {
    expect(component.find('button')).to.have.length(1);
  });

  it('should have a "Search" value', () => {
    expect(component.find('button').prop('type')).to.equal('submit');
  });
});
