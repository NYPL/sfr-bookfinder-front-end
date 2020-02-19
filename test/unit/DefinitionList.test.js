/* eslint-disable react/jsx-filename-extension */
/* eslint-env mocha */
import React from 'react';
import { expect } from 'chai';
import { shallow, mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { DefinitionList } from '../../src/app/components/WorkDetail/DefinitionList';
import { detailDefinitionLabels } from '../../src/app/constants/labels';
import work from '../fixtures/work-detail.json';

configure({ adapter: new Adapter() });


describe.only('DefinitionList', () => {
  let component;

  before(() => {
    component = mount(<DefinitionList work={work.data} />);
    console.log("debug", component.debug());
  });

  it('should display a definition list of detail elements', () => {
    expect(component.find('table')).to.have.length(1);
    expect(component.find('tr')).to.have.length(5);
    expect(component.find('td')).to.have.length(5);
    const terms = component.find('th');
    expect(terms.at(1).text()).to.equal(detailDefinitionLabels.agents);
    expect(terms.at(2).text()).to.equal(detailDefinitionLabels.subjects);
    expect(terms.at(3).text()).to.equal(detailDefinitionLabels.date_created);
    expect(terms.at(4).text()).to.equal(detailDefinitionLabels.language);
  });

  it('should have a table of Items', () => {
    expect(component.find('table')).to.have.length(1);
    expect(component.find('tbody')).to.have.length(1);
    expect(component.find('tbody tr')).to.have.length(5);
    expect(component.find('tbody tr td')).to.have.length(5);
  });

  it('should have a list of Subjects', () => {
    const subjects = component.find('.definitions-subjects');
    expect(subjects.find('Link')).to.have.length(8);
  });

  it('the list of subjects should be ordered alphabetically', () => {
    const subjects = component.find('.definitions-subjects');
    expect(
      subjects
        .find('Link')
        .first()
        .getElements()[0].props.children,
    ).to.equal('Aufsatzsammlung.');
  });

  it('should have a list of Authors', () => {
    const authors = component.find('.definitions-authors');
    expect(authors.find('Link')).to.have.length(2);
    expect(authors.find('Link').first().getElements()[0].props.children).to.equal('Hawthorne, Nathaniel, author ');
  });

  it('should have a list of Languages', () => {
    const languages = component.find('.definitions-languages');
    expect(languages.find('li')).to.have.length(5);
  });
});
