/* eslint-disable react/jsx-filename-extension */
/* eslint-env mocha */
import React from 'react';
import { expect } from 'chai';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import FilterYears from '../../src/app/components/SearchResults/FilterYears';
import TextInput from '../../src/app/components/Form/TextInput';

configure({ adapter: new Adapter() });

describe('FilterYears', () => {
  let component;

  describe('No results behavior.', () => {
    before(() => {
      component = shallow(<FilterYears />);
    });

    it('should show the form .', () => {
      expect(component.find(TextInput)).to.have.length(2);
    });
  });
  describe('Prepopulated years.', () => {
    const searchQuery = {
      query: '"Periodicals."',
      field: 'subject',
      showQuery: '',
      showField: '',
      per_page: '10',
      page: '0',
      total: '0',
      filters: [{ field: 'years', value: { start: 1926, end: 2017 } }],
      sort: [],
    };
    before(() => {
      component = shallow(<FilterYears searchQuery={searchQuery} />);
    });

    it('should show the form .', () => {
      expect(component.find(TextInput)).to.have.length(2);
    });
    it('should prepopulate the form .', () => {
      expect(
        component
          .find(TextInput)
          .first()
          .prop('value'),
      ).to.equal(1926);
    });
  });
});
