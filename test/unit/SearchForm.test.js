/* eslint-env mocha */
import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import SearchForm from '../../src/app/components/SearchForm/SearchForm';

describe('SearchForm', () => {
  describe('Default rendering', () => {
    let component;

    before(() => {
      component = mount(<SearchForm />);
    });

    it('has a form fieldset .nypl-omnisearch', () => {
      expect(component.find('.nypl-omnisearch')).to.have.length(1);
    });

    it('contains a select with three options.', () => {
      const options = component.find('option');
      expect(options).to.have.length(4);
    });

    it('contains an option for keyword.', () => {
      const kwOpt = component.find('option');
      expect(kwOpt.nodes[0].value).to.equal('keyword');
    });

    it('contains an option for title.', () => {
      const titleOpt = component.find('option');
      expect(titleOpt.nodes[1].value).to.equal('title');
    });

    it('contains an option for author.', () => {
      const authorOpt = component.find('option');
      expect(authorOpt.nodes[2].value).to.equal('author');
    });

    it('contains an option for subject.', () => {
      const authorOpt = component.find('option');
      expect(authorOpt.nodes[3].value).to.equal('subject');
    });

    it('contains a text field for keyword search with an initial value.', () => {
      const kwTextField = component.find('input');
      expect(kwTextField.nodes[0].type).to.equal('text');
      expect(kwTextField.nodes[0].placeholder).to.equal('Keyword, title, author, or subject');
    });
  });

  describe('Changes from props', () => {
    let component;

    before(() => {
      component = mount(<SearchForm />);
    });

    it('should updated state values based on passed props for select', () => {
      component.find('select').node.value = 'author';
      component.find('select').simulate('change');
      expect(component.state('searchField')).to.equal('author');
    });

    it('should updated state values based on passed props for text input', () => {
      component.find('input').node.value = 'jefferson';
      component.find('input').simulate('change');
      expect(component.state('searchQuery')).to.equal('jefferson');
    });

    it('should update state when the enter key is pressed', () => {
      component.find('input').node.value = 'jefferson';
      component.find('input').simulate('change', { target: { value: 'jackson' } });

      expect(component.state('searchQuery')).to.equal('jackson');
    });

    it('should update state when the button is clicked', () => {
      component.find('input').node.value = 'jackson';
      component.find('input').at(0).simulate('change', { target: { value: 'johnson' } });

      expect(component.state('searchQuery')).to.equal('johnson');
    });
  });
});
