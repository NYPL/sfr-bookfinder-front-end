/* eslint-disable react/jsx-filename-extension */
/* eslint-env mocha */
import React from 'react';
import { expect } from 'chai';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { DefinitionList } from '../../src/app/components/WorkDetail/DefinitionList';
import { detailDefinitionLabels } from '../../src/app/constants/labels';
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
    expect(component.find('td')).to.have.length(7);
    const terms = component.find('th');
    expect(terms.at(1).text()).to.equal(detailDefinitionLabels.agents);
    expect(terms.at(2).text()).to.equal(detailDefinitionLabels.subjects);
    expect(terms.at(3).text()).to.equal(detailDefinitionLabels.issued_display);
    expect(terms.at(4).text()).to.equal(detailDefinitionLabels.language);
  });

  it('should have a table of Items', () => {
    expect(component.find('table')).to.have.length(1);
    expect(component.find('tbody')).to.have.length(1);
    expect(component.find('tbody tr')).to.have.length(7);
    expect(component.find('tbody tr td')).to.have.length(7);
  });

  it('should have a list of Subjects', () => {
    const subjects = component.find('.definitions-subjects');
    expect(subjects.find('Link')).to.have.length(92);
  });

  it('the list of subjects should be ordered alphabetically', () => {
    const subjects = component.find('.definitions-subjects');
    expect(
      subjects
        .find('Link')
        .first()
        .getElements()[0].props.children,
    ).to.equal('Avalokiteśvara, (Buddhist deity)');
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
    it('should have a list of links', () => {
      expect(component.find('ul')).to.have.length(3);
      expect(component.find('li')).to.have.length(2);
    });
  });
});
