/* eslint-disable react/jsx-filename-extension */
/* eslint-env mocha */
import React from 'react';
import { expect } from 'chai';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import * as DS from '@nypl/design-system-react-components';
import configureStore from '../../src/app/stores/configureStore';
import initialState from '../../src/app/stores/InitialState';
import detail from '../fixtures/edition-detail.json';

import EditionDetail from '../../src/app/components/Detail/EditionDetail';

configure({ adapter: new Adapter() });
describe('Edition Detail Page Test', () => {
  describe('EditionDetail Rendering with empty edition', () => {
    let component;
    const store = configureStore(initialState);
    before(() => {
      component = shallow(
        <EditionDetail
          store={store}
        />,
      ).dive().dive();
    });

    it('should mount', () => {
      expect(component.find('#mainContent').exists()).to.equal(true);
    });
  });

  describe('EditionDetail Rendering with valid edition', () => {
    const store = configureStore(initialState);
    let container;
    before(() => {
      const props = { store };
      container = shallow(<EditionDetail
        {...props}
      />).dive().dive();
      container.setProps({
        editionResult: detail,
      });
    });

    it('should show breadcrumb', () => {
      expect(container.find('Breadcrumbs').exists()).to.equal(true);
    });

    it('should show ResultsHeader', () => {
      expect(container.find('SearchComponent').dive().find('ResultsHeader').exists()).to.equal(true);
    });

    it('should show work header', () => {
      expect(container.find('#edition-title').exists()).to.equal(true);
    });

    it('should show a EditionDetailDefinitionList', () => {
      expect(container.find('EditionDetailDefinitionList').exists()).to.equal(true);
    });
    it('should show available items toggle checkbox', () => {
      expect(container.find(DS.Checkbox).exists()).to.equal(true);
    });
    it('should show InstancesList', () => {
      expect(container.find('InstancesList').exists()).to.equal(true);
    });
  });
});
