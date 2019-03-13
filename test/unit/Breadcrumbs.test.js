/* eslint-env mocha */
import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import Breadcrumbs from '../../src/app/components/Breadcrumbs/Breadcrumbs';

describe('Breadcrumbs', () => {
  describe('On render all crumbs', () => {
    let component;
    const query = 'q=journey';
    const workUrl = 'workId=some-uuid-value';
    const type = 'details';

    before(() => {
      component = shallow(<Breadcrumbs query={query} type={type} workUrl={workUrl} />);
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
    const query = '';
    const type = 'home';

    before(() => {
      component = shallow(<Breadcrumbs query={query} type={type} />);
    });

    it('should display no breadcrumb nav element', () => {
      expect(component).to.be.unrendered;
    });
  });

  describe('On the results page', () => {
    let component;
    const query = 'q=journey&field=keyword';
    const type = 'results';

    before(() => {
      component = shallow(<Breadcrumbs query={query} type={type} />);
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
    const query = 'journey';
    const workUrl = 'workId=some-uuid-value';
    const type = 'details';

    before(() => {
      component = shallow(<Breadcrumbs query={query} type={type} workUrl={workUrl} />);
    });

    it('should display a link back to the results page and home page', () => {
      const detailLinks = component.find('Link');
      expect(detailLinks.length).to.equal(2);
      expect(detailLinks.at(0).children().text()).to.equal('ResearchNow');
      expect(detailLinks.at(0).prop('to')).to.equal('/');
      expect(detailLinks.at(1).children().text()).to.equal('Search Results');
      expect(detailLinks.at(1).prop('to')).to.equal('/search?q=journey');
    });

    it('should display a crumb for the details page without being a link', () => {
      expect(component.find('li').at(2).text()).to.equal('Work Detail');
    });
  });
});
