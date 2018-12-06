/* eslint-env mocha */
import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import ResultsRow from '../../src/app/components/Search/ResultsRow';

describe('ResultsRow', () => {
  let instances;
  let component;

  describe('Rows', () => {
    before(() => {
      instances = [
        {
          items: [],
          pub_date: '',
          pub_place: '',
          publisher: '',
          language: '',
        },
      ];
      component = shallow(<ResultsRow rows={instances} />);
    });

    it('should return null if empty.', () => {
      expect(component.find('.nypl-rows-list')).to.have.length(1);
    });
  });
});
