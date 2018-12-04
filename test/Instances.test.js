/* eslint-env mocha */
import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import Instances from '../src/app/components/Search/Instances';

describe('Instances', () => {
  let instances;
  let component;

  describe('Empty instance list given.', () => {
    before(() => {
      instances = {};
      component = shallow(<Instances instances={instances} />);
    });

    it('should return null if empty.', () => {
      expect(component.type()).to.equal(null);
    });
  });

  describe('Instance list', () => {
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
      component = shallow(<Instances instances={instances} />);
    });

    it('should return null if empty.', () => {
      expect(component.find('.nypl-instances-list')).to.have.length(1);
    });
  });
});
