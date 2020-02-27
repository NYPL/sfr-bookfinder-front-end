/* eslint-disable react/jsx-filename-extension, no-unused-expressions */
/* eslint-env mocha */
import React from 'react';
import { expect } from 'chai';
import { stub, fake } from 'sinon';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import RequestDigital from '../../src/app/components/Feedback/RequestDigital';
import work from '../fixtures/work-detail.json';

configure({ adapter: new Adapter() });

describe('RequestDigital', () => {
  let component;
  let mockProps;
  let submitStub;

  before(() => {
    mockProps = {
      requestedWork: work,
      requestedEdition: work.editions[1],
      closeForm: stub(),
    };
    submitStub = stub(RequestDigital.prototype, 'sendFeedback');
    component = shallow(<RequestDigital {...mockProps} />);
  });

  after(() => {
    submitStub.restore();
  });

  describe('RequestDigital Form', () => {
    it('should have 1 checkbox', () => {
      expect(component.find('.sfr-feedback-checkbox')).to.have.length(1);
      component.find('#sfr-edition-specific-yes').simulate('change', {
        target: { name: 'specificEdition', checked: true },
      });
      expect(component.state('needsSpecific')).to.equal('true');
    });

    it('should have a textarea input for comments', () => {
      expect(component.exists('#request-digital-textarea-comment')).to.equal(true);
      component.find('#request-digital-textarea-comment').simulate('change', {
        target: { name: 'sfr-request-digital-comments', value: 'Test Comment' },
      });
      expect(component.state('comments')).to.equal('Test Comment');
    });

    it('Should have a Submit and cancel button', () => {
      expect(component.exists('.cancel-button')).to.equal(true);
      expect(component.exists('.sfr-submit-feedback-button')).to.equal(true);
    });
  });

  describe('Form Submission', () => {
    it('should invoke method when success and feedback set', () => {
      component.setState({ comments: 'Testing', needsSpecific: true });
      component.find('form').simulate('submit', { preventDefault: fake() });
      expect(submitStub.callCount).to.equal(1);
    });
  });

  describe('Form Close', () => {
    it('should reset state when form is closed', () => {
      component.find('.cancel-button').simulate('click', { preventDefault: fake() });
      expect(mockProps.closeForm.callCount).to.equal(1);
    });
  });
});
