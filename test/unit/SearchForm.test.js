/* eslint-env mocha */
import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';

configure({ adapter: new Adapter() });

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
      expect(kwOpt.getElements()[0].props.value).to.equal('keyword');
    });

    it('contains an option for title.', () => {
      const titleOpt = component.find('option');
      expect(titleOpt.getElements()[1].props.value).to.equal('title');
    });

    it('contains an option for author.', () => {
      const authorOpt = component.find('option');
      expect(authorOpt.getElements()[2].props.value).to.equal('author');
    });

    it('contains an option for subject.', () => {
      const authorOpt = component.find('option');
      expect(authorOpt.getElements()[3].props.value).to.equal('subject');
    });

    it('contains a text field for keyword search with an initial value.', () => {
      const kwTextField = component.find('input');
      expect(kwTextField.getElements()[0].props.type).to.equal('text');
      expect(kwTextField.getElements()[0].props.placeholder).to.equal('Keyword, title, author, or subject');
    });
  });

  describe('Changes from props', () => {
    let component;

    before(() => {
      component = mount(<SearchForm />);
    });

    it('should updated state values based on passed props for select', () => {
      component.find('select').simulate('change', { target: { value: 'author' }});
      expect(component.state('searchField')).to.equal('author');
    });

    it('should updated state values based on passed props for text input', () => {
      component.find('input').simulate('change', { target: { value: 'jefferson' }});
      expect(component.state('searchQuery')).to.equal('jefferson');
    });

    it('should update state when the enter key is pressed', () => {
      component.find('input').props.value = 'jefferson';
      component.find('input').simulate('change', { target: { value: 'jackson' } });

      expect(component.state('searchQuery')).to.equal('jackson');
    });

    it('should update state when the button is clicked', () => {
      component.find('input').props.value = 'jackson';
      component.find('input').at(0).simulate('change', { target: { value: 'johnson' } });

      expect(component.state('searchQuery')).to.equal('johnson');
    });
  });
});
