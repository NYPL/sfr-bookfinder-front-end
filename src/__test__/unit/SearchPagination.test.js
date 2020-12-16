/* eslint-disable react/jsx-filename-extension */
/* eslint-env mocha */
import React from 'react';
import { expect } from 'chai';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import SearchPagination from '../../src/app/components/SearchResults/SearchPagination';

configure({ adapter: new Adapter() });

describe('Search Pagination behavior', () => {
  let component;
  before(() => {
    const query = { query: 'Chicago', field: 'keyword' };
    component = mount(<SearchPagination
      totalItems={99}
      searchQuery={query}
    />);
  });

  it('should pass 10 pages into dropdownOptions', () => {
    expect(component.children().prop('paginationDropdownOptions')).to.have.length(10);
  });
});
