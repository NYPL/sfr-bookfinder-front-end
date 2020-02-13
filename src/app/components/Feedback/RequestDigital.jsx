/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
import React from 'react';
import PropTypes from 'prop-types';
import FocusTrap from 'focus-trap-react';

import appConfig from '../../../../appConfig';

const initialState = {
  feedback: '',
  needsSpecific: null,
};

class RequestDigital extends React.Component {
  constructor(props) {
    super(props);
    this.feedbackField = React.createRef();
    this.state = initialState;

    this.onSubmitForm = this.onSubmitForm.bind(this);
    this.handleFeedbackChange = this.handleFeedbackChange.bind(this);
    this.sendFeedback = this.sendFeedback.bind(this);
    this.handleRadioChange = this.handleRadioChange.bind(this);
  }

  onSubmitForm(e) {
    e.preventDefault();

    this.sendFeedback();
    // eslint-disable-next-line no-alert
    alert('Thank you, your request for digitization has been logged.');
  }

  sendFeedback() {
    fetch(appConfig.requestDigital.formUrl, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.AIRTABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fields: {
          Comments: this.state.feedback,
          Specific: this.state.needsSpecific,
          WorkUUID: this.props.requestedWork.uuid,
          EditionID: this.props.requestedWork.editions[0].id.toString(),
        },
      }),
    });
    this.props.closeForm();
  }

  handleFeedbackChange(e) {
    this.setState({ feedback: e.target.value });
  }

  handleRadioChange(e) {
    this.setState({ needsSpecific: e.target.value });
  }

  render() {
    return (
      <FocusTrap
        focusTrapOptions={{
          onDeactivate: this.deactivateForm,
          clickOutsideDeactivates: true,
        }}
        active
      >

        <div className="request-form-container">
          <form onSubmit={e => this.onSubmitForm(e)}>
            <span>
    You are requesting
              {' '}
              <strong>
                {this.props.requestedWork.editions[0].publication_date}
              </strong>
              {' '}
            edition of
              {' '}
              <strong>{this.props.requestedWork.title}</strong>
            </span>
            <div>
              <label id="sfr-request-specific"> Do you need this specific edition? </label>
              <div>
                <input
                  type="radio"
                  className="sfr-feedback-radio"
                  checked={this.state.needsSpecific === 'yes'}
                  id="sfr-feedback-found-yes"
                  name="feedback"
                  value="yes"
                  onChange={e => this.handleRadioChange(e)}
                />
                <label
                  htmlFor="sfr-feedback-found-yes"
                  className="sfr-radio-label"
                >
                    I want only this edition
                </label>
              </div>

              <div>
                <input
                  type="radio"
                  checked={this.state.needsSpecific === 'no'}
                  className="sfr-feedback-radio"
                  id="sfr-feedback-found-no"
                  name="feedback"
                  value="no"
                  onChange={e => this.handleRadioChange(e)}
                />
                <label
                  htmlFor="sfr-feedback-found-no"
                  className="sfr-radio-label"
                >
                    I want any edition
                </label>
              </div>
            </div>
            <div>
              <label htmlFor="feedback-textarea-comment">
                    Comments
              </label>
              <br />
              <textarea
                id="feedback-textarea-comment"
                className="feedback-input"
                name="sfr-general-feedback"
                rows="5"
                aria-required="false"
                tabIndex="0"
                ref={(textarea) => { this.feedbackField = textarea; }}
                value={this.state.feedback}
                onChange={this.handleFeedbackChange}
              />
            </div>

            <button
              type="button"
              className="cancel-button"
              onClick={this.props.closeForm}
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
          </form>
        </div>
      </FocusTrap>
    );
  }
}

RequestDigital.propTypes = {
  requestedWork: PropTypes.objectOf(PropTypes.any),
  closeForm: PropTypes.func,
};

RequestDigital.defaultProps = {
  requestedWork: {},
  closeForm: () => { },
};

export default RequestDigital;
