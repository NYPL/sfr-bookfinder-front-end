/* eslint-disable react/jsx-filename-extension */
/* eslint-env mocha */
import React from 'react';
import { expect } from 'chai';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { EditionDetailDefinitionList } from '../../src/app/components/Detail/EditionDetailDefinitionList';
import { editionDetailDefinitionLabels } from '../../src/app/constants/labels';
import edition from '../fixtures/edition-detail.json';

configure({ adapter: new Adapter() });

describe('Edition Detail Definition List', () => {
  let component;

  before(() => {
    component = mount(<EditionDetailDefinitionList edition={edition.data} />);
  });

  it('should display a definition list of detail elements', () => {
    expect(component.find('dl')).to.have.length(1);
    expect(component.find('dt')).to.have.length(7);
    expect(component.find('dd')).to.have.length(7);
    const terms = component.find('dt');
    expect(terms.at(0).text()).to.equal(editionDetailDefinitionLabels.publication_date);
    expect(terms.at(1).text()).to.equal(editionDetailDefinitionLabels.publication_place);
    expect(terms.at(2).text()).to.equal(editionDetailDefinitionLabels.agents);
  });

  it('should have a table of Items', () => {
    expect(component.find('dl')).to.have.length(1);
    expect(component.find('dl dt')).to.have.length(7);
    expect(component.find('dl dd')).to.have.length(7);
  });

  it('should have a list of Languages', () => {
    const languages = component.find('.definitions-languages');
    expect(languages.find('li')).to.have.length(2);
  });

  it('should have a list of publishers', () => {
    const languages = component.find('.definitions-publishers');
    expect(languages.find('li')).to.have.length(3);
  });
});
