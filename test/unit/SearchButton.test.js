/* eslint-env mocha */
import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';

configure({ adapter: new Adapter() });

import SearchButton from '../../src/app/components/Button/SearchButton';

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
