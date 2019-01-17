/* eslint-env mocha */
import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import ResultsRow from '../../src/app/components/SearchResults/ResultsRow';
import { results } from '../fixtures/results-list.json';

describe('ResultsRow', () => {
  let component;

  describe('Rows with full item detail', () => {
    before(() => {
      component = shallow(<ResultsRow rows={results[0]['_source'].instances} />);
    });

    it('should return row or rows of items', () => {
      expect(component.find('.nypl-item-list')).to.have.length(1);
    });

    // Ebook item check
    it('should contain ebook links', () => {
      expect(component.find('.nypl-results-media').text()).to.equal('eBook: http://localhost/epubs/epubOne.epub');
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

    // Language check
    it('should contain a language', () => {
      expect(component.find('.nypl-results-info').text()).to.equal('enm');
    });
  });

  describe('Rows with partial item should render', () => {
    before(() => {
      component = shallow(<ResultsRow rows={results[1]['_source'].instances} />);
    });

    it('should return row or rows of items', () => {
      expect(component.find('.nypl-item-list')).to.have.length(1);
    });

    // Ebook item check
    it('should not contain ebook links when not provided', () => {
      expect(component.find('.nypl-results-media')).to.have.length(0);
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

    // Language check
    it('should contain a language', () => {
      expect(component.find('.nypl-results-info').text()).to.equal('enm');
    });
  });
});
