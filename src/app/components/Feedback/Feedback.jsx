import React from 'react';
import PropTypes from 'prop-types';
import FocusTrap from 'focus-trap-react';

import appConfig from '../../../../appConfig';


class Feedback extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showForm: false,
      feedback: '',
      success: null,
      commentStatus: '',
    };

    this.feedbackField = React.createRef();

    this.onSubmitForm = this.onSubmitForm.bind(this);
    this.openForm = this.openForm.bind(this);
    this.closeForm = this.closeForm.bind(this);
    this.deactivateForm = this.deactivateForm.bind(this);
    this.handleFeedbackChange = this.handleFeedbackChange.bind(this);
    this.sendFeedback = this.sendFeedback.bind(this);
    this.handleRadioChange = this.handleRadioChange.bind(this);
  }

  onSubmitForm(e) {
    console.log(e);
    e.preventDefault();
    if (!this.state.feedback) {
      this.feedbackField.focus();
      this.setState({ commentStatus: 'Comment Required' });
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
          Success: this.state.success,
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

  handleRadioChange(e) {
    this.setState({ success: e.target.value });
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
            <form onSubmit={e => this.onSubmitForm(e)}>
              <div>
                <label id="sfr-feedback-success">Did you find what you were looking for?</label>
                <div>
                  <input 
                    type="radio"
                    className="sfr-feedback-radio"
                    id="sfr-feedback-found-yes"
                    name="feedback"
                    value="yes"
                    onChange={this.handleRadioChange}
                  />
                  <label htmlFor="sfr-feedback-found-yes" className="sfr-radio-label">Yes</label>
                </div>

                <div>
                  <input
                    type="radio"
                    className="sfr-feedback-radio"
                    id="sfr-feedback-found-no"
                    name="feedback"
                    value="no"
                    onChange={this.handleRadioChange}
                  />
                  <label htmlFor="sfr-feedback-found-no" className="sfr-radio-label">No</label>
                </div>

                <div>
                  <input
                    type="radio"
                    className="sfr-feedback-radio"
                    id="sfr-feedback-found-browse"
                    name="feedback"
                    value="browse"
                    onChange={this.handleRadioChange}
                  />
                  <label htmlFor="sfr-feedback-found-browse" className="sfr-radio-label">Just Browsing</label>
                </div>
              </div>
              <div>
                <label htmlFor="feedback-textarea-comment">
                  Comments (Required)
                </label>
                <textarea
                  id="feedback-textarea-comment"
                  className="feedback-input"
                  name="sfr-general-feedback"
                  rows="5"
                  aria-required="true"
                  tabIndex="0"
                  ref={(textarea) => this.feedbackField = textarea}
                  value={this.state.feedback}
                  onChange={this.handleFeedbackChange}
                />
                <div id="textarea-status-note">{this.state.commentStatus}</div>
              </div>

              <button
                className={`cancel-button ${!showForm ? 'hidden' : ''}`}
                onClick={e => this.closeForm(e)}
                aria-expanded={!showForm}
                aria-controls="feedback-menu"
              >
                Cancel
              </button>

              <button
                className="sfr-submit-feedback-button"
                type="submit"
              >
                Submit
              </button>

              <div className="privacy-policy-link">
                <a href="https://www.nypl.org/help/about-nypl/legal-notices/privacy-policy">Privacy Policy</a>
              </div>
            </form>
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