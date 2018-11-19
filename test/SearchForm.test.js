/* eslint-env mocha */
import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import SearchForm from './../src/app/components/Search/SearchForm';

describe('SearchForm', () => {
  let component;

  before(() => {
    component = shallow(<SearchForm />);
  });

  it('has a form fieldset .nypl-omnisearch', () => {
    expect(component.find('.nypl-omnisearch')).to.have.length(1);
  });

  it('contains a select three options.', () => {
    const options = component.find('option');
    expect(options).to.have.length(3);
  });

  it('contains an option for keyword.', () => {
    const kwOpt = component.find('option');
    expect(kwOpt.nodes[0].props.value).to.equal('q');
  });

  it('contains an option for title.', () => {
    const titleOpt = component.find('option');
    expect(titleOpt.nodes[1].props.value).to.equal('filters[title]');
  });

  it('contains an option for author.', () => {
    const authorOpt = component.find('option');
    expect(authorOpt.nodes[2].props.value).to.equal('filters[author]');
  });

  it('contains a text field for keyword search with an initial value.', () => {
    const kwTextField = component.find('input');
    expect(kwTextField.nodes[0].props.type).to.equal('text');
    expect(kwTextField.nodes[0].props.placeholder).to.equal('Keyword, title, or author');
  });

  it('contains a submit input with an initial value.', () => {
    const authorOpt = component.find('input');
    expect(authorOpt.nodes[1].props.type).to.equal('submit');
    expect(authorOpt.nodes[1].props.value).to.equal('Search');
  });
});
