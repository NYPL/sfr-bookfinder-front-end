/* eslint-disable no-unused-expressions */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable prefer-destructuring */
/* eslint-env mocha */
import React from 'react';
import { expect } from 'chai';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureStore from '../../src/app/stores/configureStore';
import initialState from '../../src/app/stores/InitialState';

import WorkDetail from '../../src/app/components/WorkDetail/WorkDetail';

configure({ adapter: new Adapter() });
describe('Work Detail Page Test', () => {
  describe('WorkDetail Rendering with empty work', () => {
    let container;

    before(() => {
      const store = configureStore(initialState);
      container = mount(<WorkDetail
        store={store}
        location={{ query: { workId: 'invalid' } }}
      />);
    });

    it('should show breadcrumb', () => {
      expect(container.find('Breadcrumbs').exists()).to.equal(true);
    });

    it('should show ResultsHeader', () => {
      expect(container.find('ResultsHeader').exists()).to.equal(true);
    });
  });
});
