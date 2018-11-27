/* eslint-env mocha */
import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import SearchButton from './../src/app/components/Button/SearchButton';

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
