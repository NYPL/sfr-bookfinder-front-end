
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable prefer-destructuring */
/* eslint-env mocha */
import React from 'react';
import { expect } from 'chai';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import EditionCard from '../../src/app/components/Card/EditionCard';
import results from '../fixtures/results-list.json';
import EditionsList from '../../src/app/components/List/EditionsList';

configure({ adapter: new Adapter() });

describe('Edition Card', () => {
  let component;
  const work = results.data.works[0];

  describe('gets Preferred Agent', () => {
    before(() => {
      component = shallow(<EditionsList work={work} />);
    });
    it('should return agent with viaf and correct row', () => {

    });
    it('if no agent with viaf, should return first agent with corrent role', () => {

    });
  });

  describe('gets Edition Year', () => {
    before(() => { });
    it('should display the year', () => {
    });

    // Note: Currently links to a work
    it('should link to an edition', () => {
    });
  });

  describe('gets title with link', () => {
    before(() => { });
    it('should display the title');
    it('should link to work');
    it('should truncate the title if it is too long');
    it("should display 'title unknown' when no title is found");
  });

  describe('gets subtitle', () => {
    before(() => { });
    it('should display the subtitle title');
    it('should truncate the subtitle if it is too long');
    it('should return nothing if no subtitle is found');
  });

  describe('gets Author list', () => {
    before(() => { });
    it('should return a list of links');
  });

  describe('Get covers', () => {
    before(() => { });
    it('Should get covers', () => {

    });
  });

  describe('get publisher and display location', () => {
    before(() => { });
    it('Should return publisher and location');
    it('If no publisher, should only display location');
    it('if no location, should only get publisher');
    it('If neither, nothing');
  });
});
