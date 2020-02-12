/* eslint-disable react/jsx-filename-extension */
/* eslint-env mocha */
import React from 'react';
import { expect, spy } from 'chai';
import { stub } from 'sinon';
import { shallow, mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureStore from '../../src/app/stores/configureStore';
import initialState from '../../src/app/stores/InitialState';
import detail from '../fixtures/work-detail.json';
import { mockRouterContext } from '../helpers/routing';


import WorkDetail from '../../src/app/components/WorkDetail/WorkDetail';

configure({ adapter: new Adapter() });
describe.only('Work Detail Page Test', () => {
  describe('WorkDetail Rendering with empty work', () => {
    let component;
    const store = configureStore(initialState);
    before(() => {
      component = mount(
        <WorkDetail
          store={store}
        />,
      );
    });

    it('should show breadcrumb', () => {
      expect(component.find('Breadcrumbs').exists()).to.equal(true);
    });

    it('should show searchHeader', () => {
      expect(component.find('SearchHeader').exists()).to.equal(true);
    });
  });

  describe('WorkDetail Rendering with valid work', () => {
    const store = configureStore(initialState);
    let container;
    before(() => {
      store.dispatch = stub().callsFake(() => { console.log('dispatch called'); }).resolves('blahaaaaaa');
      const props = { store, workResult: ['hello'] };
      container = mount(<WorkDetail
        {...props}
      />);
      container.setProps({
        workResult: ['hello'],

      }, () => { console.log('new props set'); });
    });

    it('should show breadcrumb', () => {
      console.log('setting props');
      container.update();
      console.log('done setting props');
      // console.log('debug', container.debug());


      expect(store.dispatch.calledOnce).to.equal(true);
      // expect(loadWorkStub.calledOnce).to.equal(true);
      // expect(container.find('Breadcrumbs').exists()).to.equal(true);
    });

    it('should show searchHeader', () => {
      expect(container.find('SearchHeader').exists()).to.equal(true);
    });
    it('should show WorkHeader', () => {
      expect(container.find('WorkHeader').exists()).to.equal(true);
    });
  });
});
