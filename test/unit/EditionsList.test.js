/* eslint-disable react/jsx-filename-extension */
/* eslint-env mocha */
import React from 'react';
import { expect } from 'chai';
import { shallow, mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import * as DS from '@nypl/design-system-react-components';
import results from '../fixtures/results-list.json';
import EditionsList from '../../src/app/components/List/EditionsList';
import workResult from '../fixtures/work-detail.json';

describe('Editions List', () => {
  let component;

  describe('No editions behavior.', () => {
    before(() => {
      component = mount(<EditionsList
        work={{ instances: [] }}
      />);
    });

    it('should return null when editions object given is empty.', () => {
      expect(component.find(DS.UnorderedList)).to.have.length(0);
    });
  });

  describe('Displays DS EditionsList if editions passed', () => {
    before(() => {
      component = mount(<EditionsList work={workResult.data} />);
    });

    it('should return results', () => {
      expect(component.find(DS.UnorderedList)).to.have.length(1);
    });
  });
});
