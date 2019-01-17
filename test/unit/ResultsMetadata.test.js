/* eslint-env mocha */
import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import ResultsMetadata from '../../src/app/components/SearchResults/ResultsMetadata';

describe('Results Metadata', () => {
  let component;
  let metadata;

  describe('No results message delivery', () => {
    before(() => {
      metadata = {
        total: 0,
      };
      component = shallow(<ResultsMetadata metadata={metadata} />);
    });

    it('should have a message stating no results found.', () => {
      expect(component.find('div')).to.have.length(1);
      expect(component.find('div').text()).to.equal('Your search yielded no results. Please try again.');
    });
  });

  describe('Found < page size of results', () => {
    before(() => {
      metadata = {
        total: 5,
        max_score: 1.332332,
      };
      component = shallow(<ResultsMetadata metadata={metadata} />);
    });

    it('should have a message stating no results found.', () => {
      expect(component.find('div')).to.have.length(1);
      expect(component.find('div').text()).to.equal('Displaying 1 - 5 of 5 ; Relevancy score: 1.332332');
    });
  });

  describe('Found > page size of results', () => {
    before(() => {
      metadata = {
        total: 15,
        max_score: 1.332332,
      };
      component = shallow(<ResultsMetadata metadata={metadata} />);
    });

    it('should have a message stating no results found.', () => {
      expect(component.find('div')).to.have.length(1);
      expect(component.find('div').text()).to.equal('Displaying 1 - 10 of 15 ; Relevancy score: 1.332332');
    });
  });
});
