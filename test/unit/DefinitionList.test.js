/* eslint-disable react/jsx-filename-extension */
/* eslint-env mocha */
import React from 'react';
import { expect } from 'chai';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { DefinitionList } from '../../src/app/components/WorkDetail/DefinitionList';
import { detailDefinitionLabels } from '../../src/app/constants/labels';
import detail from '../fixtures/work-detail.json';

configure({ adapter: new Adapter() });


describe('DefinitionList', () => {
  let component;

  before(() => {
    component = shallow(<DefinitionList work={detail} />);
    console.log('component debug', component.debug());
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
    expect(subjects.find('Link')).to.have.length(78);
  });

  it('the list of subjects should be ordered alphabetically', () => {
    const subjects = component.find('.definitions-subjects');
    expect(
      subjects
        .find('Link')
        .first()
        .getElements()[0].props.children,
    ).to.equal('Advertisements -- 19th century. -- United States');
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
