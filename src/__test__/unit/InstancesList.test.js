/* eslint-disable react/jsx-filename-extension */
/* eslint-env mocha */
import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import * as DS from '@nypl/design-system-react-components';
import InstancesList from '../../src/app/components/List/InstancesList';
import editionsResult from '../fixtures/edition-detail.json';

describe('Instances List', () => {
  let component;

  describe('No instance behavior.', () => {
    before(() => {
      component = mount(<InstancesList
        work={{ instances: [] }}
      />);
    });

    it('should return null when editions object given is empty.', () => {
      expect(component.find(DS.UnorderedList)).to.have.length(0);
    });
  });

  describe('Displays DS EditionsList if instances passed', () => {
    before(() => {
      component = mount(<InstancesList edition={editionsResult.data} />);
    });

    it('should return results', () => {
      expect(component.find(DS.UnorderedList)).to.have.length(1);
    });
  });
});
