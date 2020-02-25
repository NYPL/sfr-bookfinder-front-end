/* eslint-disable react/jsx-filename-extension */
/* eslint-env mocha */
import React from 'react';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import Breadcrumbs, { getBreadcrumbLinks, getCrumbTrail } from '../../src/app/components/Breadcrumbs/Breadcrumbs';

import { initialSearchQuery } from '../../src/app/stores/InitialState';

describe('Breadcrumb', () => {
  const workDetail = { uuid: '12345', title: 'random title' };
  const homeLocation = { pathname: '/' };
  const otherLocation = { pathName: '/other-location' };

  describe('getBreadcrumbLinks', () => {
    it('Gets a Home link when passed nothing', () => {
      expect(getBreadcrumbLinks(undefined, undefined)).to.eql([]);
    });

    it("doesn't return a link when passed an empty search", () => {
      expect(getBreadcrumbLinks(undefined)).to.eql([]);
    });

    it("doesn't return a link when passed a search with no query", () => {
      expect(getBreadcrumbLinks(initialSearchQuery, undefined)).to.eql([]);
    });

    it('gets a work detail link when passed a work detail', () => {
      expect(getBreadcrumbLinks(workDetail)).to.eql(
        [
          {
            href: '/work?workId=12345',
            text: 'random title',
          },
        ],
      );
    });

    it("doesn't get a work detail link when passed an empty work", () => {
      expect(getBreadcrumbLinks({}, {})).to.eql([]);
    });
  });

  describe('getCrumbTrail', () => {
    const validLinks = [{ href: '/link-param', text: 'link 1' }, { href: '/link2-param', text: 'link 2' }];

    it('returns home when no location is passed', () => {
      const crumbs = getCrumbTrail(undefined, validLinks, {});
      expect(crumbs.length).to.equal(1);
      const homeLink = shallow(crumbs[0]);
      expect(homeLink.find('a').text()).to.equal('ResearchNow');
    });
    it('returns home when home location is passed', () => {
      const crumbs = getCrumbTrail(homeLocation, validLinks, {});
      expect(crumbs.length).to.equal(1);
      const homeLink = shallow(crumbs[0]);
      expect(homeLink.find('a').text()).to.equal('ResearchNow');
    });
    it('returns home when no links are passed', () => {
      const crumbs = getCrumbTrail('not-home', [], {});
      expect(crumbs.length).to.equal(1);
      const homeLink = shallow(crumbs[0]);
      expect(homeLink.find('a').text()).to.equal('ResearchNow');
    });
    it('returns an array of Link elements for every link passed', () => {
      const crumbs = getCrumbTrail(otherLocation, validLinks, {});
      expect(crumbs.length).to.equal(3);
      const homeLink = shallow(crumbs[0]);
      expect(homeLink.find('a').text()).to.equal('ResearchNow');
      const firstLink = shallow(crumbs[1]);
      expect(firstLink.find('a').text()).to.equal('link 1');
      const secondLink = shallow(crumbs[2]);
      expect(secondLink.find('a').text()).to.equal('link 2');
    });
  });

  describe('Breadcrumbs render', () => {
    it('returns a list with one item when passed no props', () => {
      const wrapper = mount(<Breadcrumbs />);
      expect(wrapper.find('li')).to.have.lengthOf(1);
    });
    it('returns a list with two items when passed a work detail', () => {
      const wrapper = mount(<Breadcrumbs
        location={otherLocation}
        workDetail={workDetail}
      />);
      expect(wrapper.find('li')).to.have.lengthOf(2);
    });
  });
});
