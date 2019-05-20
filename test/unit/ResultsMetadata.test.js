/* eslint-disable react/jsx-filename-extension */
/* eslint-env mocha */
import React from 'react';
import { expect } from 'chai';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ResultsMetadata from '../../src/app/components/SearchResults/ResultsMetadata';

configure({ adapter: new Adapter() });

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
      expect(component.find('div').text()).to.equal('Viewing 0 items');
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

    it('should have a message displaying all 5 results found.', () => {
      expect(component.find('div')).to.have.length(1);
      expect(component.find('div').text()).to.equal('Viewing 1 - 5 of 5 items');
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

    it('should have a message displaying 10 of 15 results found.', () => {
      expect(component.find('div')).to.have.length(1);
      expect(component.find('div').text()).to.equal('Viewing 1 - 10 of 15 items');
    });
  });
});
