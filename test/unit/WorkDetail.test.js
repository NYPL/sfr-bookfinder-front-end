/* eslint-disable react/jsx-filename-extension */
/* eslint-env mocha */
import React from 'react';
import { expect } from 'chai';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureStore from '../../src/app/stores/configureStore';
import initialState from '../../src/app/stores/InitialState';
import detail from '../fixtures/work-detail.json';

import WorkDetail from '../../src/app/components/Detail/WorkDetail';

configure({ adapter: new Adapter() });
describe('Work Detail Page Test', () => {
  describe('WorkDetail Rendering with empty work', () => {
    let component;
    const store = configureStore(initialState);
    before(() => {
      component = shallow(
        <WorkDetail
          store={store}
        />,
      ).dive().dive();
    });

    it('should show breadcrumb', () => {
      expect(component.find('Breadcrumbs').exists()).to.equal(true);
    });

    it('should show ResultsHeader', () => {
      expect(component.find('SearchComponent').dive().find('ResultsHeader').exists()).to.equal(true);
    });
  });

  describe('WorkDetail Rendering with valid work', () => {
    const store = configureStore(initialState);
    let container;
    before(() => {
      const props = { store };
      container = shallow(<WorkDetail
        {...props}
      />).dive().dive();
      container.setProps({
        workResult: detail,
      });
    });

    it('should show breadcrumb', () => {
      expect(container.find('Breadcrumbs').exists()).to.equal(true);
    });

    it('should show ResultsHeader', () => {
      expect(container.find('SearchComponent').dive().find('ResultsHeader').exists()).to.equal(true);
    });

    it('should show WorkHeader', () => {
      expect(container.find('WorkHeader').exists()).to.equal(true);
    });

    it('should show a DefinitionList', () => {
      expect(container.find('DefinitionList').exists()).to.equal(true);
    });
    it('should show EditionsList', () => {
      expect(container.find('EditionsList').exists()).to.equal(true);
    });
  });
});
