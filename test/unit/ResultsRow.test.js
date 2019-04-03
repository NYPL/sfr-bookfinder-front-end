/* eslint-disable no-underscore-dangle */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable prefer-destructuring */
/* eslint-env mocha */
import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';

configure({ adapter: new Adapter() });

import ResultsRow from '../../src/app/components/SearchResults/ResultsRow';
import results from '../fixtures/results-list.json';
import EBookList from '../../src/app/components/List/EBookList';


describe('ResultsRow', () => {
  let component;
  const instances = results.hits.hits[0]._source.instances;

  describe('Rows with full item detail', () => {
    before(() => {
      component = shallow(<ResultsRow rows={instances} />);
    });

    it('should return row or rows of items', () => {
      expect(component.find('.nypl-items-list')).to.have.length(1);
    });

    // Publication date check
    it('should contain a publication date', () => {
      expect(component.find('.nypl-results-date').first().text()).to.equal('1922.');
    });

    // Publication place check
    it('should contain a publication place', () => {
      expect(component.find('.nypl-results-place').first().text()).to.equal('Chicago :');
    });

    // Publisher check
    it('should contain a publisher', () => {
      expect(component.find('.nypl-results-publisher').first().text()).to.equal('The Drake Hotel Company');
    });
  });

  describe('Rows with partial item should render', () => {
    before(() => {
      component = shallow(<ResultsRow rows={instances} />);
    });

    it('should return row or rows of items', () => {
      expect(component.find('.nypl-items-list')).to.have.length(1);
    });

    // Publication date check
    it('should contain a publication date', () => {
      expect(component.find('.nypl-results-date').first().text()).to.equal('1922.');
    });

    // Publication place check
    it('should contain a publication place', () => {
      expect(component.find('.nypl-results-place').first().text()).to.equal('Chicago :');
    });

    // Publisher check
    it('should contain markup only when not provided', () => {
      expect(component.find('.nypl-results-publisher').first().text()).to.equal('The Drake Hotel Company');
    });
  });

  describe('EBookList', () => {
    before(() => {
      const ebooks = instances[0].items;
      component = shallow(<EBookList ebooks={ebooks} />);
    });
    it('should have a list two anchor tags', () => {
      expect(component.find('.nypl-items-list')).to.have.length(1);
      expect(component.find('.nypl-items-list li')).to.have.length(2);
      expect(component.find('.nypl-items-list li a')).to.have.length(2);
    });
  });
});
