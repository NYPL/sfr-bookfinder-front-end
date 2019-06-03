/* eslint-disable react/jsx-filename-extension */
/* eslint-env mocha */
import React from 'react';
import { expect } from 'chai';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Filters from '../../src/app/components/SearchResults/Filters';
import results from '../fixtures/results-list-full.json';

configure({ adapter: new Adapter() });

describe('Filters', () => {
  let component;

  describe('No results behavior.', () => {
    before(() => {
      const noResults = {};
      component = shallow(<Filters results={noResults} />);
    });

    it('should return null when results object given is empty.', () => {
      expect(component.find('div').exists()).to.equal(false);
    });
  });

  describe('Filters behavior.', () => {
    before(() => {
      component = shallow(<Filters results={results} />);
    });

    it('should display a list of fields (currently 1)', () => {
      expect(component.find('fieldset')).to.have.length(1);
    });
    it('should display a list of filters inside the field (maximum 10)', () => {
      expect(
        component
          .find('fieldset')
          .first()
          .find('div'),
      ).to.have.length(10);
    });
    it('should display the maximum count filter first', () => {
      expect(
        component
          .find('fieldset')
          .first()
          .find('div')
          .first()
          .text(),
      ).to.equal('English (2,148)');
    });
  });
});
