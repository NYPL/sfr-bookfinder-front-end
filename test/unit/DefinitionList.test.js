/* eslint-disable react/jsx-filename-extension */
/* eslint-env mocha */
import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';

configure({ adapter: new Adapter() });

import { DefinitionList, labels } from '../../src/app/components/WorkDetail/DefinitionList';
import AuthorsList from '../../src/app/components/List/AuthorsList';
import EBookList from '../../src/app/components/List/EBookList';
import detail from '../fixtures/work-detail.json';

describe('DefinitionList', () => {
  let component;

  before(() => {
    component = shallow(<DefinitionList work={detail} />);
  });

  it('should display a definition list of detail elements', () => {
    expect(component.find('table')).to.have.length(1);
    expect(component.find('tr')).to.have.length(6);
    expect(component.find('td')).to.have.length(12);
    const terms = component.find('td');
    expect(terms.nodes[0].props.children).to.equal(labels.agents);
    expect(terms.nodes[4].props.children).to.equal(labels.issued_display);
    expect(terms.nodes[6].props.children).to.equal(labels.language);
    expect(terms.nodes[8].props.children).to.equal(labels.measurements);
  });

  it('should have a table of Items', () => {
    expect(component.find('table')).to.have.length(1);
    expect(component.find('tbody')).to.have.length(1);
    expect(component.find('tbody tr')).to.have.length(6);
    expect(component.find('tbody tr td')).to.have.length(12);
  });

  it('should have a list of Subjects', () => {
    const subjects = component.find('ul');
    expect(subjects.nodes[2].props.children).to.have.length(138);
  });

  describe('AuthorsList', () => {
    before(() => {
      component = shallow(<AuthorsList agents={detail.agents} />);
    });

    it('should have a list of 5 Authors', () => {
      const authors = component.find('ul');
      expect(authors.nodes[0].props.children).to.have.length(5);
    });
  });

  describe('EBookList', () => {
    before(() => {
      const ebooks = detail.instances[8].items;
      component = shallow(<EBookList ebooks={ebooks} />);
    });
    it('should have a list of four links', () => {
      expect(component.find('ul')).to.have.length(1);
      expect(component.find('li')).to.have.length(4);
      expect(component.find('li a')).to.have.length(4);
    });
  });
});
