/* eslint-disable no-unused-expressions */
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

configure({ adapter: new Adapter() });

describe('Edition Card', () => {
  let component;
  const work = results.data.works[0];

  const viafAuthors = [
    {
      name: 'author1',
      sort_name: 'author 1',
      viaf: '57970242',
      lcnaf: 'n82142775',
      birth_date_display: '1804',
      death_date_display: '1864',
      roles: [
        'author',
      ],
    },
    {
      name: 'author2',
      sort_name: 'author 2',
      viaf: '57970242',
      lcnaf: 'n82142775',
      roles: [
        'editor',
        'author',
      ],
    },
  ];

  const agentsNoViaf = [
    {
      name: 'author1',
      sort_name: 'author 1',
      viaf: null,
      lcnaf: null,
      birth_date_display: '1804',
      death_date_display: '1864',
      roles: [
        'author',
      ],
    },
    {
      name: 'author2',
      sort_name: 'author 2',
      viaf: null,
      lcnaf: null,
      roles: [
        'editor',
        'author',
      ],
    },
  ];
  const mixedAuthors = [
    {
      name: 'author1',
      sort_name: 'author 1',
      viaf: null,
      lcnaf: null,
      birth_date_display: '1804',
      death_date_display: '1864',
      roles: [
        'author',
      ],
    },
    {
      name: 'author2',
      sort_name: 'author 2',
      viaf: '57970242',
      lcnaf: 'n82142775',
      roles: [
        'editor',
        'author',
      ],
    },
  ];

  describe('gets Preferred Agent', () => {
    it('should return list of agents with viaf and correct row', () => {
      const agents = EditionCard.getPreferredAgent(viafAuthors, 'author');
      expect(agents.length).to.equal(2);
      expect(agents[0].name).to.equal('author1');
    });
    it('if no agent with viaf, should return first agent with correct role', () => {
      const agents = EditionCard.getPreferredAgent(agentsNoViaf, 'author');
      expect(agents.length).to.equal(1);
      expect(agents[0].name).to.equal('author1');
    });
    it('prefer agents with viaf', () => {
      const agents = EditionCard.getPreferredAgent(mixedAuthors, 'author');
      expect(agents.length).to.equal(1);
      expect(agents[0].name).to.equal('author2');
    });
    it('should return undefined if no suitable agents', () => {
      expect(EditionCard.getPreferredAgent(viafAuthors, 'baker')).to.be.undefined;
    });
  });

  describe('gets Edition Year', () => {
    it('If UUID is passed, it should display the year as a link', () => {
      component = shallow(EditionCard.editionYearElem(work.editions[0], work.uuid));
      expect(component.find('a').text()).to.equal('1852 Edition');
    });

    it('if UUID is not passed, should display the year in plain text', () => {
      component = shallow(EditionCard.editionYearElem(work.editions[0]));
      expect(component.find('span').text()).to.equal('1852 Edition');
    });
  });

  describe('displays title with link', () => {
    it('should display the title in a Link', () => {
      component = shallow(EditionCard.generateTitleLinkElem('Test Title', work.uuid));
      expect(component.find('a').text()).to.equal('Test Title');
    });
    it('should truncate the title if it is too long', () => {
      const tooLongTitle = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent consequat velit diam.';
      const truncatedTitle = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent consequat veli...';
      component = shallow(EditionCard.generateTitleLinkElem(tooLongTitle, work.uuid));
      expect(component.find('a').text()).to.equal(truncatedTitle);
    });
    it("should display 'title unknown' when not passed a title", () => {
      component = shallow(EditionCard.generateTitleLinkElem(undefined, work.uuid));
      expect(component.find('a').text()).to.equal('Title Unknown');
    });
  });

  describe('getSubtitleText', () => {
    it('returns subtitle', () => {
      expect(EditionCard.getSubtitleText('Subtitle')).to.equal('Subtitle');
    });
    it('should truncate the subtitle if it is too long', () => {
      const tooLongTitle = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent consequat velit diam.';
      const truncatedTitle = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent consequat veli...';
      expect(EditionCard.getSubtitleText(tooLongTitle)).to.equal(truncatedTitle);
    });
    it('should return nothing if no subtitle is found', () => {
      expect(EditionCard.getSubtitleText(undefined)).to.equal(undefined);
    });
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

  describe('get languages', () => {});

  describe('get license');

  describe('get download url');

  describe('get read online url');
});
