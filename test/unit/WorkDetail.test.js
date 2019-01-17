/* eslint-env mocha */
import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import WorkDetail from '../../src/app/components/WorkDetail/WorkDetail';
import { detail } from '../fixtures/work-detail.json';

describe('WorkDetail', () => {
  let component;

  before(() => {
    component = shallow(<WorkDetail detail={detail} />);
  });

  it('should display a page header.', () => {
    expect(component.find('h2')).to.have.length(1);
    expect(component.find('h2').text()).to.equal('Work Detail');
  });

  it('should display a definition list of detail elements', () => {
    expect(component.find('dl')).to.have.length(1);
    expect(component.find('dt')).to.have.length(5);
    expect(component.find('dd')).to.have.length(5);
    const terms = component.find('dt');
    expect(terms.nodes[0].props.children).to.equal('Title');
    expect(terms.nodes[1].props.children).to.equal('Authors, Creators, et al');
    expect(terms.nodes[2].props.children).to.equal('Subjects');
    expect(terms.nodes[3].props.children).to.equal('Items');
    expect(terms.nodes[4].props.children).to.equal('Rights Statement');
  });

  it('should have a table of Items', () => {
    expect(component.find('table')).to.have.length(1);
    expect(component.find('thead')).to.have.length(1);
    expect(component.find('tbody')).to.have.length(1);
    expect(component.find('tbody tr')).to.have.length(1);
    expect(component.find('tbody tr td')).to.have.length(4);
  });

  it('should have a list of Subjects', () => {
    const subjects = component.find('ul');
    expect(subjects.nodes[1].props.children).to.have.length(9);
  });

  it('should have a list of Authors', () => {
    const authors = component.find('ul');
    expect(authors.nodes[0].props.children).to.have.length(2);
  });
});
