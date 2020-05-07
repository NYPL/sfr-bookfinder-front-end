/* eslint-disable react/jsx-filename-extension */
/* eslint-env mocha */
import React from 'react';
import { expect } from 'chai';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { WorkDetailDefinitionList } from '../../src/app/components/Detail/WorkDetailDefinitionList';
import { workDetailDefinitionLabels } from '../../src/app/constants/labels';
import work from '../fixtures/work-detail.json';

configure({ adapter: new Adapter() });

describe('Work Detail Definition List', () => {
  let component;

  before(() => {
    component = mount(<WorkDetailDefinitionList work={work.data} />);
  });

  it('should display a definition list of detail elements', () => {
    expect(component.find('dl')).to.have.length(1);
    expect(component.find('dt')).to.have.length(4);
    expect(component.find('dd')).to.have.length(4);
    const terms = component.find('dt');
    expect(terms.at(0).text()).to.equal(workDetailDefinitionLabels.series);
    expect(terms.at(1).text()).to.equal(workDetailDefinitionLabels.agents);
    expect(terms.at(2).text()).to.equal(workDetailDefinitionLabels.subjects);
    expect(terms.at(3).text()).to.equal(workDetailDefinitionLabels.language);
  });

  it('should have a table of Items', () => {
    expect(component.find('dl')).to.have.length(1);
    expect(component.find('dl dt')).to.have.length(4);
    expect(component.find('dl dd')).to.have.length(4);
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
        .text(),
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