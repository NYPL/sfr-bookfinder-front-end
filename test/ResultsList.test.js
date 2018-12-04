/* eslint-env mocha */
import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import ResultsList from '../src/app/components/Search/ResultsList';

describe('Results List', () => {
  let results;
  let component;

  describe('No results behavior.', () => {
    before(() => {
      results = {};
      component = shallow(<ResultsList results={results} />);
    });

    it('should return null when results object given is empty.', () => {
      expect(component.type()).to.equal(null);
    });
  });

  describe('Results behavior.', () => {
    before(() => {
      results = [
        {
          _id: 0,
          _source: {
            title: 'Title One',
            entities: [
              {
                name: 'Gallahad',
              },
            ],
            instances: [
              {
                title: 'Title One',
                items: [{
                  url: 'http://localhost/epubs/epubOne.epub',
                }],
                pub_date: '511',
                pub_place: 'England',
                publisher: 'Merlin',
                language: 'enm',
              },
            ],
          },
        },
        {
          _id: 1,
          _source: {
            title: 'Title Two',
            entities: [
              {
                name: 'Ivanhoe',
              },
            ],
            instances: [
              {
                title: 'Title Two',
                items: [{
                  url: 'http://localhost/epubs/epubOne.epub',
                }],
                pub_date: '513',
                pub_place: 'England',
                publisher: 'Merlin',
                language: 'enm',
              },
            ],
          },
        },
      ];
      component = shallow(<ResultsList results={results} />);
    });

    it('should display a grouped list of works and their instances.', () => {
      expect(component.find('h2')).to.have.length(1);
      expect(component.find('h2').text()).to.equal('Works');
      expect(component.find('.nypl-results-list')).to.have.length(1);
      expect(component.find('li')).to.have.length(2);
    });
  });
});
