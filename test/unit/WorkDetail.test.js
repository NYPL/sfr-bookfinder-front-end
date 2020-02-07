/* eslint-disable no-unused-expressions */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable prefer-destructuring */
/* eslint-env mocha */
import React from 'react';
import { expect } from 'chai';
import { stub } from 'sinon';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import initialState from '../../src/app/stores/InitialState';
import detail from '../fixtures/work-detail.json';

import WorkDetail from '../../src/app/components/WorkDetail/WorkDetail';

configure({ adapter: new Adapter() });
describe.only('Work Detail Page Test', () => {
  describe.only('WorkDetail Rendering with empty work', () => {
    let container;

    before(() => {
      const mockStore = configureStore([]);
      const store = mockStore(initialState);
      const component = mount(
        <WorkDetail store={store} />,
      );
      console.log('debug', component.debug);
    });

    it('should show breadcrumb', () => {
      expect(container.find('Breadcrumbs').exists()).to.equal(true);
    });

    it('should show searchHeader', () => {
      expect(container.find('SearchHeader').exists()).to.equal(true);
    });
  });

  describe('WorkDetail Rendering with valid work', () => {
    let container;

    before(() => {
      const mockStore = configureStore([]);
      const store = mockStore(initialState);
      const workResult = { data: { detail } };
      container = mount(<WorkDetail
        store={store}
        location={{ query: { workId: '12345' }, pathName: '/', search: '&search' }}
        workResult={workResult}
      />);
      console.log('debug', container.debug());
    });

    it('should show breadcrumb', () => {
      expect(container.find('Breadcrumbs').exists()).to.equal(true);
    });

    it('should show searchHeader', () => {
      expect(container.find('SearchHeader').exists()).to.equal(true);
    });
    it('should show WorkHeader', () => {
      expect(container.find('WorkHeader').exists()).to.equal(true);
    });
  });
});
