/* eslint-env mocha */
import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import ResultsRow from '../../src/app/components/SearchResults/ResultsRow';
import { results } from '../fixtures/results-list.json';
import EBookList from '../../src/app/components/List/EBookList';

describe('ResultsRow', () => {
  let component;

  describe('Rows with full item detail', () => {
    before(() => {
      component = shallow(<ResultsRow rows={results[0]['_source'].instances} />);
    });

    it('should return row or rows of items', () => {
      expect(component.find('.nypl-items-list')).to.have.length(1);
    });

    // Publication date check
    it('should contain a publication date', () => {
      expect(component.find('.nypl-results-date').text()).to.equal('511');
    });

    // Publication place check
    it('should contain a publication place', () => {
      expect(component.find('.nypl-results-place').text()).to.equal('England');
    });

    // Publisher check
    it('should contain a publisher', () => {
      expect(component.find('.nypl-results-publisher').text()).to.equal('Merlin');
    });
  });

  describe('Rows with partial item should render', () => {
    before(() => {
      component = shallow(<ResultsRow rows={results[1]['_source'].instances} />);
    });

    it('should return row or rows of items', () => {
      expect(component.find('.nypl-items-list')).to.have.length(1);
    });

    // Publication date check
    it('should contain a publication date', () => {
      expect(component.find('.nypl-results-date').text()).to.equal('513');
    });

    // Publication place check
    it('should contain a publication place', () => {
      expect(component.find('.nypl-results-place').text()).to.equal('England');
    });

    // Publisher check
    it('should contain markup only when not provided', () => {
      expect(component.find('.nypl-results-publisher').text()).to.equal('');
    });
  });

  describe('EBookList', () => {
    before(() => {
      const ebooks = results[0]['_source'].instances[0].items;
      component = shallow(<EBookList ebooks={ebooks} />);
    });
    it('should have a list with a single line item with a single anchor tag', () => {
      expect(component.find('.nypl-items-list')).to.have.length(1);
      expect(component.find('.nypl-items-list li')).to.have.length(1);
      expect(component.find('.nypl-items-list li a')).to.have.length(1);
    });
  });
});
