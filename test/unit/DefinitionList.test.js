/* eslint-env mocha */
import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { DefinitionList, labels } from '../../src/app/components/WorkDetail/DefinitionList';
import EBookList from '../../src/app/components/List/EBookList';
import { detail } from '../fixtures/work-detail.json';

describe('DefinitionList', () => {
  let component;
  const detailArray = Object.keys(detail.work).map(key => (
    [key, detail.work[key]]
  ));

  before(() => {
    component = shallow(<DefinitionList data={detailArray} />);
  });

  it('should display a definition list of detail elements', () => {
    expect(component.find('dl')).to.have.length(1);
    expect(component.find('dt')).to.have.length(6);
    expect(component.find('dd')).to.have.length(6);
    const terms = component.find('dt');
    expect(terms.nodes[0].props.children).to.equal(labels.title);
    expect(terms.nodes[1].props.children).to.equal(labels.rights_stmt);
    expect(terms.nodes[2].props.children).to.equal(labels.language);
    expect(terms.nodes[3].props.children).to.equal(labels.instances);
    expect(terms.nodes[4].props.children).to.equal(labels.entities);
    expect(terms.nodes[5].props.children).to.equal(labels.subjects);
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

  describe('EBookList', () => {
    before(() => {
      const ebooks = detail.work.instances[0].items;
      component = shallow(<EBookList ebooks={ebooks} />);
    });
    it('should have a list of two links', () => {
      expect(component.find('ul')).to.have.length(1);
      expect(component.find('li')).to.have.length(2);
      expect(component.find('li a')).to.have.length(2);
    });
  });
});
