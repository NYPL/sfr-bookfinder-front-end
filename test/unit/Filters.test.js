/* eslint-disable react/jsx-filename-extension */
/* eslint-env mocha */
import React from 'react';
import { stub } from 'sinon';
import { expect } from 'chai';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
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

describe.only('Filters', () => {
  let component;

  describe('No results behavior.', () => {
    before(() => {
      component = shallow(<Filters data={noResults} />);
    });

    it('should return only the filter for read now when results object given is empty.', () => {
      expect(component.find('fieldset')).to.have.length(1);
    });
  });
  describe('No results behavior with searchQuery.', () => {
    before(() => {
      const searchQuery = { filters: [{ field: 'language', value: 'English' }] };
      component = shallow(<Filters
        data={noResults}
        searchQuery={searchQuery}
      />);
    });

    it('should not return null when there is no hits and there is a searchQuery.', () => {
      expect(component.find('Heading').exists()).to.equal(true);
    });
  });

  describe('Filters behavior.', () => {
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
          .find('UnorderedList')
          .find('Checkbox'),
      ).to.have.length(7);
    });
    it('should display the maximum count of language filter first', () => {
      expect(
        component
          .find('UnorderedList')
          .find('Checkbox')
          .first()
          .props().labelOptions.labelContent.props.children,
      ).to.equal('English (2)');
    });

    it('should contain Years Filter (a DateRangeForm)', () => {
      expect(component.find('DateRangeForm')).to.have.length(1);
    });
    it('should have a Read Now filter', () => {
      expect(
        component
          .find('Checkbox')
          .props().id,
      ).to.equal('show_all');
    });
    // it('should have a Read Now filter checked by default', () => {
    //   expect(
    //     component
    //       .find('fieldset')
    //       .at(0)
    //       .find(Checkbox)
    //       .props().isSelected,
    //   ).to.equal(true);
    // });
  });

  describe('Filter Interactions', () => {
    let wrapper;
    let context;
    let childContextTypes;
    const push = stub();
    let start;
    let end;

    before(() => {
      context = mockRouterContext(push);
      childContextTypes = mockRouterContext(push);

      wrapper = shallow(<Filters
        data={results.data}
        searchQuery={defaultQuery}
        router={context.router}
      />, { context, childContextTypes });
      start = wrapper.find('FilterYears').dive().find({ name: 'filters.years.start' }).dive()
        .find('.usa-input');
      end = wrapper.find('FilterYears').dive().find({ name: 'filters.years.end' }).dive()
        .find('.usa-input');
    });

    it('no error on start date with no end date', () => {
      start.simulate('change', { target: { key: 'filters.years.start', name: 'filters.years.start', value: '1990' } });

      wrapper.find('form').simulate('submit', {
        preventDefault: () => { },
        stopPropagation: () => { },
      });
      expect(wrapper.find('.usa-alert__text').exists()).to.equal(false);
    });

    it('no error on end date with no start date', () => {
      end.simulate('change', { target: { key: 'filters.years.end', name: 'filters.years.end', value: '1990' } });

      wrapper.find('form').simulate('submit', {
        preventDefault: () => { },
        stopPropagation: () => { },
      });
      expect(wrapper.find('.usa-alert__text').exists()).to.equal(false);
    });

    it('displays error on invalid date range', () => {
      wrapper.instance().onChangeYears({ start: 1992, end: 1990 });

      wrapper.find('form').simulate('submit', {
        preventDefault: () => { },
        stopPropagation: () => { },
      });

      expect(wrapper.find('.usa-alert__text').exists()).to.equal(true);
    });
  });
});
