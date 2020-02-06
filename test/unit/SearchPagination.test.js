/* eslint-disable react/jsx-filename-extension */
/* eslint-env mocha */
import React from 'react';
import { expect } from 'chai';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import SearchPagination from '../../src/app/components/SearchResults/SearchPagination';

configure({ adapter: new Adapter() });

describe('Search Pagination behavior', () => {
  describe('Get Page List', () => {
    it('returns list of pages', () => {});
  });

  describe('calling navigateToPage changes query and calls submit', () => {
  });

  describe('Changing select calls changes searchQuery', () => {});

  const query = { query: 'Chicago', field: 'keyword' };
  const component = mount(<SearchPagination
    totalItems={99}
    searchQuery={query}
  />);

  it('should pass 10 pages into dropdownOptions', () => {
    expect(component.children().prop('paginationDropdownOptions')).to.have.length(10);
  });
});
