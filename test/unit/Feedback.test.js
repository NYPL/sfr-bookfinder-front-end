/* eslint-disable react/jsx-filename-extension, no-unused-expressions */
/* eslint-env mocha */
import React from 'react';
import { expect } from 'chai';
import { stub, fake } from 'sinon';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Feedback from '../../src/app/components/Feedback/Feedback';

configure({ adapter: new Adapter() });

describe('Feedback', () => {
  let component;
  let mockProps;
  let submitStub;

  before(() => {
    mockProps = {
      props: {
        location: {
          path: '/testing',
          search: '?testQuery',
        },
      },
    };
    submitStub = stub(Feedback.prototype, 'sendFeedback');
    component = shallow(<Feedback location={mockProps} />);
  });

  after(() => {
    submitStub.restore();
  });

  describe('Feedback button', () => {
    it('should display the Feedback button initially', () => {
      expect(component.exists('.feedback-button')).to.equal(true);
    });
  });

  describe('Feedback Form', () => {
    it('should have 3 radio buttons', () => {
      expect(component.find('.sfr-feedback-radio')).to.have.length(3);
      component.find('#sfr-feedback-found-yes').simulate('change', {
        target: { name: 'feedback', value: 'yes' },
      });
      expect(component.state('success')).to.equal('yes');
    });

    it('should have a textarea input for comments', () => {
      expect(component.exists('#feedback-textarea-comment')).to.equal(true);
      component.find('#feedback-textarea-comment').simulate('change', {
        target: { name: 'sfr-general-feedback', value: 'Test Comment' },
      });
      expect(component.state('feedback')).to.equal('Test Comment');
    });

    it('Should have a Submit and cancel button', () => {
      expect(component.exists('.cancel-button')).to.equal(true);
      expect(component.exists('.sfr-submit-feedback-button')).to.equal(true);
    });
  });

  describe('Form Submission', () => {
    it('should invoke method when success and feedback set', () => {
      component.setState({ showForm: true, feedback: 'Testing', success: 'test' });
      component.find('form').simulate('submit', { preventDefault: fake() });
      expect(submitStub.callCount).to.equal(1);
      expect(component.state('showForm')).to.be.false;
    });
  });
});
