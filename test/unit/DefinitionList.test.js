/* eslint-disable react/jsx-filename-extension */
/* eslint-env mocha */
import React from 'react';
import { expect } from 'chai';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import { DefinitionList } from '../../src/app/components/WorkDetail/DefinitionList';
import { definitionLabels } from '../../src/app/constants/labels';
import AuthorsList from '../../src/app/components/List/AuthorsList';
import EBookList from '../../src/app/components/List/EBookList';
import detail from '../fixtures/work-detail.json';

configure({ adapter: new Adapter() });

describe('DefinitionList', () => {
  let component;

  before(() => {
    component = shallow(<DefinitionList work={detail} />);
  });

  it('should display a definition list of detail elements', () => {
    expect(component.find('table')).to.have.length(1);
    expect(component.find('tr')).to.have.length(7);
    expect(component.find('td')).to.have.length(14);
    const terms = component.find('td');
    expect(terms.getElements()[2].props.children).to.equal(definitionLabels.agents);
    expect(terms.getElements()[4].props.children).to.equal(definitionLabels.subjects);
    expect(terms.getElements()[6].props.children).to.equal(definitionLabels.issued_display);
    expect(terms.getElements()[8].props.children).to.equal(definitionLabels.language);
  });

  it('should have a table of Items', () => {
    expect(component.find('table')).to.have.length(1);
    expect(component.find('tbody')).to.have.length(1);
    expect(component.find('tbody tr')).to.have.length(7);
    expect(component.find('tbody tr td')).to.have.length(14);
  });

  it('should have a list of Subjects', () => {
    const subjects = component.find('ul');
    expect(subjects.getElements()[2].props.children).to.have.length(138);
  });

  describe('AuthorsList', () => {
    before(() => {
      component = shallow(<AuthorsList agents={detail.agents} />);
    });

    it('should have a list of 5 Authors', () => {
      const authors = component.find('ul');
      expect(authors.getElements()[0].props.children).to.have.length(5);
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
