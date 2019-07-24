/* eslint-disable react/jsx-filename-extension */
/* eslint-env mocha */
import React from 'react';
import { expect } from 'chai';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import AdvancedSearchResults from '../../src/app/components/SearchResults/AdvancedSearchResults';

configure({ adapter: new Adapter() });

describe('Advanced Search Results', () => {
  let component;
  const searchQuery = { queries: [{ query: 'london', field: 'keyword' }] };
  before(() => {
    component = shallow(<AdvancedSearchResults searchQuery={searchQuery} />);
  });

  it('contains as many buttons as queries', () => {
    expect(component.find('button')).to.have.length(1);
  });
});
