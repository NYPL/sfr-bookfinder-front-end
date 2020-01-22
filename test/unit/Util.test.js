/* eslint-disable no-unused-expressions */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable prefer-destructuring */
/* eslint-env mocha */
import React from 'react';
import { expect } from 'chai';
import { shallow, mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { formatUrl, joinArrayOfElements } from '../../src/app/util/Util';

configure({ adapter: new Adapter() });


describe('formatUrl', () => {
  it('prefixes a url with http', () => {
    expect(formatUrl('www.nypl.org')).to.equal('http://www.nypl.org');
  });
  it('changes https to http if passed', () => {
    expect(formatUrl('https://nypl.org')).to.equal('http://nypl.org');
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
