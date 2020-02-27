/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
import React from 'react';
import PropTypes from 'prop-types';
import FocusTrap from 'focus-trap-react';

import appConfig from '../../../../appConfig';

const initialState = {
  comments: '',
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
          Comments: this.state.comments,
          Specific: this.state.needsSpecific,
          WorkUUID: this.props.requestedWork.uuid,
          EditionID: this.props.requestedEdition.id.toString(),
        },
      }),
    });
    this.props.closeForm();
  }

  handleFeedbackChange(e) {
    this.setState({ comments: e.target.value });
  }

  handleRadioChange(e) {
    this.setState({ needsSpecific: e.target.value });
  }

  render() {
    return (
      <FocusTrap
        focusTrapOptions={{
          onDeactivate: this.props.closeForm,
          clickOutsideDeactivates: true,
        }}
        active
      >
        <div
          id="request-digitization"
          className="request-form-container"
        >
          <form onSubmit={e => this.onSubmitForm(e)}>
            <span>
    You are requesting a
              {' '}
              <strong>
                {this.props.requestedEdition.publication_date}
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
                  id="sfr-edition-specific-yes"
                  name="specificEdition"
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
            </div>
            <div>
              <label htmlFor="request-digital-textarea-comment">
                    Comments
              </label>
              <br />
              <textarea
                id="request-digital-textarea-comment"
                className="feedback-input"
                name="sfr-request-digital-comments"
                rows="5"
                aria-required="false"
                tabIndex="0"
                ref={(textarea) => { this.feedbackField = textarea; }}
                value={this.state.comments}
                onChange={this.handleFeedbackChange}
              />
            </div>

            <button
              type="button"
              className="cancel-button"
              onClick={this.props.closeForm}
              aria-controls="request-digitization"
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
  requestedEdition: PropTypes.objectOf(PropTypes.any),
  closeForm: PropTypes.func,
};

RequestDigital.defaultProps = {
  requestedWork: {},
  requestedEdition: {},
  closeForm: () => { },
};

export default RequestDigital;
