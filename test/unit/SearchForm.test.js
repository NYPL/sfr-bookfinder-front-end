/* eslint-disable react/jsx-filename-extension */
/* eslint-env mocha */
import React from 'react';
import { expect } from 'chai';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import SearchForm from '../../src/app/components/SearchForm/SearchForm';

configure({ adapter: new Adapter() });

describe('SearchForm', () => {
  describe('Default rendering', () => {
    let component;

    before(() => {
      component = mount(<SearchForm />);
    });

    it('has a form fieldset .search-bar', () => {
      expect(component.find('.search-bar')).to.have.length(1);
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

    it('should not contain placeholder prop in text input.', () => {
      const kwTextField = component.find('input');
      expect(kwTextField.getElements()[0].props.type).to.equal('text');
      expect(kwTextField.getElements()[0].props.placeholder).to.equal(undefined);
    });

    it('should contain a aria label for the select input.', () => {
      const selectLabel = component.find('select');
      expect(selectLabel.getElements()[0].props['aria-label']).to.equal('Search by');
    });

    // TODO: This kind of check doesn't need to be in RN.
    // it('should contain a aria label for the text input.', () => {
    //   const textInputLabel = component.find('input');
    //   expect(textInputLabel.getElements()[0].props['aria-label']).to.equal('Search for keyword, author, title, or subject');
    // });
  });

  describe('Changes from props', () => {
    let component;

    before(() => {
      component = mount(<SearchForm />);
    });

    it('should updated state values based on passed props for select', () => {
      component.find('select').simulate('change', { target: { value: 'author' } });
      expect(component.state('searchQuery').queries[0].field).to.equal('author');
    });

    it('should updated state values based on passed props for text input', () => {
      component.find('input').simulate('change', { target: { value: 'jefferson' } });
      expect(component.state('searchQuery').queries[0].query).to.equal('jefferson');
    });

    it('should update state when the enter key is pressed', () => {
      component.find('input').props.value = 'jefferson';
      component.find('input').simulate('change', { target: { value: 'jackson' } });

      expect(component.state('searchQuery').queries[0].query).to.equal('jackson');
    });

    it('should update state when the button is clicked', () => {
      component.find('input').props.value = 'jackson';
      component
        .find('input')
        .at(0)
        .simulate('change', { target: { value: 'johnson' } });

      expect(component.state('searchQuery').queries[0].query).to.equal('johnson');
    });
  });
});
