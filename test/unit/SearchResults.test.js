/* eslint-env mocha */
import React from 'react';
import { expect } from 'mocha';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import { MockAdapter } from 'axios-mock-adapter';
import SearchForm from '../../src/app/components/Search/SearchForm';

describe('Search results', () => {
  let mock;
  let triggerSubmitSpy;
  let submitSearchSpy;

  beforeEach(() => {
    component = shallow(<SearchForm />);
    mock = new MockAdapter(axios);
    mock
      .onGet('/search?q=')
      .reply(200, { results: {} })
      .onAny()
      .reply(500);
    submitSearchSpy = sinon.spy(SearchForm.prototype, 'submitSearchRequest');
    triggerSubmitSpy = sinon.spy(SearchForm.prototype, 'handleSubmit');
  });

  afterEach(() => {
    mock.restore();
    submitSearchSpy.restore();
    triggerSubmitSpy.restore();
  });

  it('should update state when button is clicked', () => {
    expect(component.state('query')).to.equal('');

    component.find('input').at(0).simulate('change', { target: { value: 'madison' } });
    component.find('button').at(0).simulate('click');
    expect(component.state('query')).to.equal('madison');
    expect(submitSearchSpy.callCount).to.equal(1);
  });

  it('should update state when button is pressed', () => {
    expect(component.state('query')).to.equal('');

    component.find('input').at(0).simulate('change', { target: { value: 'adams' } });
    component.find('button').at(0).simulate('keyPress');
    expect(component.state('query')).to.equal('adams');
    expect(triggerSubmitSpy.callCount).to.equal(1);
  });
});
