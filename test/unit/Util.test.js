/* eslint-disable no-unused-expressions */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable prefer-destructuring */
/* eslint-env mocha */
import React from 'react';
import { expect } from 'chai';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { formatUrl, joinArrayOfElements, getNumberOfPages } from '../../src/app/util/Util';

configure({ adapter: new Adapter() });

describe('formatUrl', () => {
  it('prefixes a url with https in all environments', () => {
    expect(formatUrl('www.nypl.org')).to.equal('https://www.nypl.org');
  });
  it('passes through http', () => {
    expect(formatUrl('http://nypl.org', 'production')).to.equal('http://nypl.org');
  });
  it('passes through https', () => {
    expect(formatUrl('https://nypl.org', 'production')).to.equal('https://nypl.org');
  });
});

describe('JoinArrayOfElements', () => {
  it('Joins an array of elements', () => {
    const element = React.createElement('div', [], 'content');
    const joined = joinArrayOfElements([element, element, element], <span className="joiner" />);
    const wrapper = shallow(<span>{joined}</span>);
    expect(wrapper.find('div').length).to.equal(3);
    expect(wrapper.find('.joiner').length).to.equal(2);
  });
  it('Joins an array of elements and ignores invalid entries', () => {
    const element = React.createElement('div', [], 'content');
    const joined = joinArrayOfElements([element, null, element], <span className="joiner" />);
    const wrapper = shallow(<span>{joined}</span>);
    expect(wrapper.find('div').length).to.equal(2);
    expect(wrapper.find('.joiner').length).to.equal(1);
  });
  it('joins elements with nothing when joiner is not passed', () => {
    const element = React.createElement('div', [], 'content');
    const joined = joinArrayOfElements([element, element, element], null);
    const wrapper = shallow(<span>{joined}</span>);
    expect(wrapper.find('div').length).to.equal(3);
  });
  it('returns empty element when empty array is passed', () => {
    const joined = joinArrayOfElements([]);
    const wrapper = shallow(<span>{joined}</span>);
    expect(wrapper.find('span').length).to.equal(1);
  });
  it('returns empty element when no array is passed', () => {
    const joined = joinArrayOfElements(null);
    const wrapper = shallow(<span>{joined}</span>);
    expect(wrapper.find('span').length).to.equal(1);
  });
});

describe('getNumberOfPages', () => {
  it('Returns correct number of pages', () => {
    expect(getNumberOfPages(100, 10)).to.equal(10);
  });

  it('Returns 1 page when perPage is greater than number of items', () => {
    expect(getNumberOfPages(10, 100)).to.equal(1);
  });

  it('Returns 1 pages when there are no items', () => {
    expect(getNumberOfPages(0, 10)).to.equal(1);
  });
});
