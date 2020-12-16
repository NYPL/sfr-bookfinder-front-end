/* eslint-disable react/jsx-filename-extension */
/* eslint-env mocha */
import React from 'react';
import { stub } from 'sinon';
import { expect } from 'chai';
import { shallow, mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import * as DS from '@nypl/design-system-react-components';
import { mockRouterContext } from '../helpers/routing';
import Filters from '../../src/app/components/SearchResults/Filters';
import results from '../fixtures/results-list.json';
import defaultQuery from '../fixtures/search-query.json';

configure({ adapter: new Adapter() });

const noResults = {
  took: 93,
  timed_out: false,
  _shards: {
    total: 5,
    successful: 5,
    skipped: 0,
    failed: 0,
  },
  hits: {
    total: 0,
    max_score: null,
    hits: [],
  },
  facets: {
    language: [],
  },
};

describe('Filters', () => {
  let component;

  describe('No results behavior.', () => {
    before(() => {
      component = shallow(<Filters data={noResults} />);
    });

    it('should show all filters even if results are empty', () => {
      expect(component.find('fieldset')).to.have.length(4);
    });
  });
  describe('No results behavior with searchQuery.', () => {
    before(() => {
      const searchQuery = { filters: [{ field: 'language', value: 'English' }] };
      const push = stub();
      const changeSort = stub();
      const changePerPage = stub();
      const toggleMenu = stub();
      const context = mockRouterContext(push);
      component = shallow(<Filters
        toggleMenu={toggleMenu}
        data={noResults}
        router={context.router}
        searchQuery={searchQuery}
        onChangeSort={changeSort}
        onChangePerPage={changePerPage}
      />);
    });

    it('should not return null when there is no hits and there is a searchQuery.', () => {
      expect(component.find(DS.Heading).exists()).to.equal(true);
    });
  });

  describe('Filters Desktop Rendering.', () => {
    before(() => {
      const searchQuery = defaultQuery;
      component = shallow(<Filters
        data={results.data}
        searchQuery={searchQuery}
      />);
    });

    it('should display a list of fields (currently 4)', () => {
      expect(component.find('fieldset')).to.have.length(4);
    });

    it('should display a list of filters inside the language field', () => {
      expect(
        component
          .find(DS.UnorderedList)
          .find(DS.Checkbox),
      ).to.have.length(7);
    });

    it('should display the maximum count of language filter first', () => {
      expect(
        component
          .find(DS.UnorderedList)
          .find(DS.Checkbox)
          .first()
          .props().labelOptions.labelContent.props.children,
      ).to.equal('English (2)');
    });

    it('should contain Years Filter (a DateRangeForm)', () => {
      expect(component.find(DS.DateRangeForm)).to.have.length(1);
    });

    it('should have a Read Now filter', () => {
      expect(
        component
          .find(DS.Checkbox)
          .find('[name="show_all"]'),
      ).to.have.lengthOf(1);
    });

    it('should have a Read Now filter checked by default', () => {
      expect(
        component
          .find('fieldset')
          .at(0)
          .find(DS.Checkbox)
          .props().isSelected,
      ).to.equal(true);
    });
  });

  describe('Filter Mobile Rendering', () => {
    before(() => {
      const searchQuery = defaultQuery;
      component = shallow(<Filters
        data={results.data}
        searchQuery={searchQuery}
        isMobile
      />);
    });

    it('should display sort dropdowns', () => {
      expect(component.find('.search-dropdowns__mobile').find(DS.Dropdown)).to.have.length(2);
    });

    it('should display a list of fields (currently 4)', () => {
      expect(component.find('fieldset')).to.have.length(4);
    });

    it('should display a list of filters inside the language field', () => {
      expect(
        component
          .find(DS.UnorderedList)
          .find(DS.Checkbox),
      ).to.have.length(7);
    });
    it('should display the maximum count of language filter first', () => {
      expect(
        component
          .find(DS.UnorderedList)
          .find(DS.Checkbox)
          .first()
          .props().labelOptions.labelContent.props.children,
      ).to.equal('English (2)');
    });

    it('should contain Years Filter (a DateRangeForm)', () => {
      expect(component.find(DS.DateRangeForm)).to.have.length(1);
    });

    it('should have a Read Now filter', () => {
      expect(
        component
          .find(DS.Checkbox)
          .find('[name="show_all"]'),
      ).to.have.lengthOf(1);
    });
    it('should have a Read Now filter checked by default', () => {
      expect(
        component
          .find('fieldset')
          .at(0)
          .find(DS.Checkbox)
          .props().isSelected,
      ).to.equal(true);
    });
  });

  describe('Filter Year Interactions', () => {
    let wrapper;
    let context;
    let childContextTypes;
    const push = stub();
    let start;
    let end;
    let submitButton;

    beforeEach(() => {
      context = mockRouterContext(push);
      childContextTypes = mockRouterContext(push);

      wrapper = mount(<Filters
        data={results.data}
        searchQuery={defaultQuery}
        router={context.router}
      />, { context, childContextTypes });
      start = wrapper.find(DS.DateRangeForm).find('#input-fromInput');
      end = wrapper.find(DS.DateRangeForm).find('#input-toInput');

      submitButton = wrapper.find(DS.DateRangeForm).find('[type="submit"]');
    });

    it('no error on start date with no end date', () => {
      start.simulate('change', { target: { key: 'filters.years.start', name: 'filters.years.start', value: '1990' } });

      submitButton.simulate('click');

      expect(wrapper.find('#date-range-error').exists()).to.equal(false);
    });

    it('no error on end date with no start date', () => {
      end.simulate('change', { target: { key: 'filters.years.end', name: 'filters.years.end', value: '1990' } });

      submitButton.simulate('click');

      expect(wrapper.find('#date-range-error').exists()).to.equal(false);
    });

    it('displays error on invalid date range', () => {
      start.simulate('change', { target: { key: 'filters.years.start', name: 'filters.years.start', value: '1992' } });
      end.simulate('change', { target: { key: 'filters.years.end', name: 'filters.years.end', value: '1990' } });

      submitButton.simulate('click', { target: {} });
      expect(wrapper.find('#date-range-error').exists()).to.equal(true);
    });
  });

  describe('Filter Year Mobile Interactions', () => {
    let wrapper;
    let context;
    let childContextTypes;
    const push = stub();
    const toggle = stub();
    let start;
    let end;
    let submitButton;

    beforeEach(() => {
      context = mockRouterContext(push);
      childContextTypes = mockRouterContext(push);

      wrapper = mount(<Filters
        data={results.data}
        toggleMenu={toggle}
        isMobile
        searchQuery={defaultQuery}
        router={context.router}
      />, { context, childContextTypes });

      start = wrapper.find(DS.DateRangeForm).find('#input-fromInput');
      end = wrapper.find(DS.DateRangeForm).find('#input-toInput');

      submitButton = wrapper.find('#btn-closeButton');
    });

    it('no error on start date with no end date', () => {
      start.simulate('change', { target: { key: 'filters.years.start', name: 'filters.years.start', value: '1990' } });

      submitButton.simulate('click');

      expect(wrapper.find('#date-range-error').exists()).to.equal(false);
    });

    it('no error on end date with no start date', () => {
      end.simulate('change', { target: { key: 'filters.years.end', name: 'filters.years.end', value: '1990' } });

      submitButton.simulate('click');

      expect(wrapper.find('#date-range-error').exists()).to.equal(false);
    });

    it('No error on empty search', () => {
      submitButton.simulate('click');
      expect(wrapper.find('#date-range-error').exists()).to.equal(false);
    });

    it('displays error on invalid date range', () => {
      start.simulate('change', { target: { key: 'filters.years.start', name: 'filters.years.start', value: '1992' } });
      end.simulate('change', { target: { key: 'filters.years.end', name: 'filters.years.end', value: '1990' } });

      submitButton.simulate('click', { target: {} });
      expect(wrapper.find('#date-range-error').exists()).to.equal(true);
    });
  });
});
