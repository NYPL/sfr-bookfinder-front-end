/* eslint-disable react/jsx-filename-extension */
/* eslint-env mocha */
import React from 'react';
import { expect } from 'chai';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import * as DS from '@nypl/design-system-react-components';
import { stub } from 'sinon';
import configureStore from '../../src/app/stores/configureStore';
import initialState from '../../src/app/stores/InitialState';
import detail from '../fixtures/edition-detail.json';
import { mockRouterContext, mockRouter } from '../helpers/routing';

import EditionDetail from '../../src/app/components/Detail/EditionDetail';

configure({ adapter: new Adapter() });
describe('Edition Detail Page Test', () => {
  configure({ adapter: new Adapter() });
  let component;
  const store = configureStore(initialState);
  let push;
  let router;

  describe('EditionDetail Rendering with empty work', () => {
    before(() => {
      push = stub();
      router = mockRouter(push);
      const context = mockRouterContext(push);

      component = shallow(
        <EditionDetail
          store={store}
        />, { context },
      ).dive().dive();
    });

    it('should redirect to landing page', () => {
      expect(component.exists()).to.equal(true);
      expect(router.push.called).to.equal(true);
    });
  });

  describe('EditionDetail Rendering with valid edition', () => {
    let container;
    before(() => {
      const props = { store };
      push = stub();
      router = mockRouter(push);
      const context = mockRouterContext(push);
      container = shallow(<EditionDetail
        {...props}
      />, { context }).dive().dive();
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
