import React from 'react';
import PropTypes from 'prop-types';
import FocusTrap from 'focus-trap-react';

import appConfig from '../../../../appConfig';


class Feedback extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showForm: false,
      feedback: null,
      email: null,
    };

    this.feedbackField = React.createRef();

    this.onSubmitForm = this.onSubmitForm.bind(this);
    this.openForm = this.openForm.bind(this);
    this.closeForm = this.closeForm.bind(this);
    this.deactivateForm = this.deactivateForm.bind(this);
    this.handleFeedbackChange = this.handleFeedbackChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.sendFeedback = this.sendFeedback.bind(this);
  }

  onSubmitForm(e) {
    e.preventDefault();
    if (!this.state.feedback) {
      this.feedbackField.focus();
    } else {
      this.setState({
        showForm: false,
      }, this.sendFeedback());
      alert('Thank you, your feedback has been submitted.');
    }
  }

  sendFeedback() {
    fetch(appConfig.feedback.formURL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.AIRTABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fields: {
          Email: this.state.email,
          Feedback: this.state.feedback,
          URL: `${this.props.location.pathname}${this.props.location.search}`,
        },
      }),
    });
  }

  openForm() {
    this.setState({ showForm: true });
  }

  closeForm(e) {
    e.preventDefault();
    this.deactivateForm();
  }

  deactivateForm() {
    this.setState({ showForm: false });
  }

  handleFeedbackChange(e) {
    this.setState({ feedback: e.target.value });
  }

  handleEmailChange(e) {
    this.setState({ email: e.target.value });
  }

  render() {
    const showForm = this.state.showForm;

    return (
      <div className="feedback">
        <button
          className="feedback-button"
          onClick={() => this.openForm()}
          aria-haspopup="true"
          aria-expanded={showForm}
          aria-controls="feedback-menu"
        >
          Feedback
        </button>
        <FocusTrap
          focusTrapOptions={{
            onDeactivate: this.deactivateForm,
            clickOutsideDeactivates: true,
          }}
          active={showForm}
        >
          <div
            role="menu"
            className={`feedback-form-container${showForm ? ' active' : ''}`}
            id="feedback-menu"
          >
            <form
              action=""
              target="hidden_feedback_iframe"
              method="POST"
              onSubmit={e => this.onSubmitForm(e)}
            >
              <div>
                <label htmlFor="feedback-textarea-comment">
                  Please provide your feedback about this page in the field below.
                  <span className="nypl-required-field">&nbsp;Required</span>
                </label>
                <textarea
                  id="feedback-textarea-comment"
                  name="sfr-general-feedback"
                  rows="5"
                  aria-required="true"
                  tabIndex="0"
                  ref={this.feedbackField}
                  value={this.state.feedback}
                  onChange={this.handleFeedbackChange}
                />
              </div>
              <div>
                <label htmlFor="feedback-input-email">Email Address</label>
                <input
                  id="feedback-input-email"
                  name="sfr-feedback-email"
                  type="email"
                  value={this.state.email}
                  onChange={this.handleEmailChange}
                />
              </div>

              <button
                className={`cancel-button ${!showForm ? 'hidden' : ''}`}
                onClick={e => this.closeForm(e)}
                aria-expanded={!showForm}
                aria-controls="feedback-menu"
              >
                Cancel
              </button>

              <button type="submit" className="large">Submit</button>
            </form>
            <iframe name="hidden_feedback_iframe" title="NYPL Discovery Feedback Form" />
          </div>
        </FocusTrap>
      </div>
    );
  }
}

Feedback.propTypes = {
  location: PropTypes.object,
};

export default Feedback;