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
import detail from '../fixtures/work-detail.json';
import { mockRouterContext, mockRouter } from '../helpers/routing';

import WorkDetail from '../../src/app/components/Detail/WorkDetail';

configure({ adapter: new Adapter() });
describe('Work Detail Page Test', () => {
  let component;
  const store = configureStore(initialState);
  let push;
  let router;

  describe('WorkDetail Rendering with empty work', () => {
    before(() => {
      push = stub();
      router = mockRouter(push);
      const context = mockRouterContext(push);

      component = shallow(
        <WorkDetail
          store={store}
        />, { context },
      ).dive().dive();
    });

    it('should redirect to landing page', () => {
      expect(component.exists()).to.equal(true);
      expect(router.push.called).to.equal(true);
    });
  });

  describe('WorkDetail Rendering with valid work', () => {
    let container;
    before(() => {
      push = stub();
      router = mockRouter(push);
      const context = mockRouterContext(push);

      const props = { store };
      container = shallow(<WorkDetail
        {...props}
      />, { context }).dive().dive();
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

    it('should show work header', () => {
      expect(container.find('#work-title').exists()).to.equal(true);
    });

    it('should show a WorkDetailDefinitionList', () => {
      expect(container.find('WorkDetailDefinitionList').exists()).to.equal(true);
    });
    it('should show available items toggle checkbox', () => {
      expect(container.find(DS.Checkbox).exists()).to.equal(true);
    });
    it('should show EditionsList', () => {
      expect(container.find('EditionsList').exists()).to.equal(true);
    });
  });
});
