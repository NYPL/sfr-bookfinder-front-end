/* eslint-disable react/jsx-filename-extension */
/* eslint-env mocha */
import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import Application from '../../src/app/components/Application/Application';


describe('Application', () => {
  let application;

  before(() => {
    application = shallow(<Application />).find('Application').dive();
  });

  it('is wrapped in a div.app-wrapper', () => {
    expect(application.find('.app-wrapper')).to.have.length(1);
  });
});
