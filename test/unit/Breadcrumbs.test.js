/* eslint-env mocha */
import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import Breadcrumbs from '../../src/app/components/Breadcrumbs/Breadcrumbs';

describe('Breadcrumbs', () => {
  describe('On render all crumbs', () => {
    let component;
    const links = [{
      href: '/search?q=journey&field=keyword',
      text: 'Search Results',
    },
    {
      href: '/work?workId=foobar',
      text: 'Work Details',
    }];
    const pageType = 'details';

    before(() => {
      component = shallow(<Breadcrumbs links={links} pageType={pageType} />);
    });

    it('should render a nav and ol element', () => {
      expect(component.find('nav').length).to.equal(1);
      expect(component.find('ol').length).to.equal(1);
    });

    it('should have three list items and two links', () => {
      expect(component.find('li').length).to.equal(3);
      expect(component.find('Link').length).to.equal(2);
    });
  });

  describe('On the home page', () => {
    let component;
    const links = [{ href: '', text: '' }];
    const pageType = 'home';

    before(() => {
      component = shallow(<Breadcrumbs links={links} pageType={pageType} />);
    });

    it('should display no breadcrumb nav element', () => {
      expect(component).to.be.unrendered;
    });
  });

  describe('On the results page', () => {
    let component;
    const links = [{
      href: '/search?q=journey&field=keyword',
      text: 'Search Results',
    }];
    const pageType = 'results';

    before(() => {
      component = shallow(<Breadcrumbs links={links} pageType={pageType} />);
    });

    it('should display a link back to the home page', () => {
      const resultsLinks = component.find('Link');
      expect(resultsLinks.length).to.equal(1);
      expect(resultsLinks.at(0).children().text()).to.equal('ResearchNow');
    });

    it('should display a crumb for the results page without being a link', () => {
      expect(component.find('li').at(1).text()).to.equal('Search Results');
    });
  });

  describe('On the details page', () => {
    let component;
    const links = [{
      href: '/search?q=journey&field=title',
      text: 'Search Results',
    },
    {
      href: '/work?workId=foobar',
      text: 'Work Details',
    }];
    const pageType = 'details';

    before(() => {
      component = shallow(<Breadcrumbs links={links} pageType={pageType} />);
    });

    it('should display a link back to the results page and home page', () => {
      const detailLinks = component.find('Link');
      expect(detailLinks.length).to.equal(2);
      expect(detailLinks.at(0).children().text()).to.equal('ResearchNow');
      expect(detailLinks.at(0).prop('to')).to.equal('/');
      expect(detailLinks.at(1).children().text()).to.equal('Search Results');
      expect(detailLinks.at(1).prop('to')).to.equal('/search?q=journey&field=title');
    });

    it('should display a crumb for the details page without being a link', () => {
      expect(component.find('li').at(2).text()).to.equal('Work Details');
    });
  });
});
