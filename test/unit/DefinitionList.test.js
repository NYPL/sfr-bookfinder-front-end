/* eslint-disable react/jsx-filename-extension */
/* eslint-env mocha */
import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';

configure({ adapter: new Adapter() });

import { DefinitionList, labels } from '../../src/app/components/WorkDetail/DefinitionList';
import EBookList from '../../src/app/components/List/EBookList';
import detail from '../fixtures/work-detail.json';

describe('DefinitionList', () => {
  let component;
  const detailArray = Object.keys(detail).map(key => [key, detail[key]]);

  before(() => {
    component = shallow(<DefinitionList data={detailArray} />);
  });

  it('should display a definition list of detail elements', () => {
    expect(component.find('dl')).to.have.length(1);
    expect(component.find('dt')).to.have.length(5);
    expect(component.find('dd')).to.have.length(5);
    const terms = component.find('dt');
    expect(terms.getElements()[0].props.children).to.equal(labels.title);
    expect(terms.getElements()[1].props.children).to.equal(labels.language);
    expect(terms.getElements()[2].props.children).to.equal(labels.agents);
    expect(terms.getElements()[3].props.children).to.equal(labels.subjects);
    expect(terms.getElements()[4].props.children).to.equal(labels.instances);
  });

  it('should have a table of Items', () => {
    expect(component.find('table')).to.have.length(1);
    expect(component.find('thead')).to.have.length(1);
    expect(component.find('tbody')).to.have.length(1);
    expect(component.find('tbody tr')).to.have.length(182);
    expect(component.find('tbody tr td')).to.have.length(728);
  });

  it('should have a list of Subjects', () => {
    const subjects = component.find('ul');
    expect(subjects.getElements()[2].props.children).to.have.length(92);
  });

  it('should have a list of Authors', () => {
    const authors = component.find('ul');
    expect(authors.getElements()[1].props.children).to.have.length(5);
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
