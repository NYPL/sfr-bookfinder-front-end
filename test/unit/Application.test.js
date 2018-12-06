/* eslint-env mocha */
import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import Application from '../../src/app/components/Application/Application';
import appConfig from '../../appConfig';


describe('Application', () => {
  let component;

  before(() => {
    component = shallow(<Application />);
  });

  it('is wrapped in a div.app-wrapper', () => {
    expect(component.find('.app-wrapper')).to.have.length(1);
  });

  it('contains an h1.', () => {
    const title = component.find('h1');
    expect(title).to.have.length(1);
    expect(title.text()).to.equal(appConfig.appName);
  });
});
