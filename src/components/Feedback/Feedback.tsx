import React from 'react';
import FocusTrap from 'focus-trap-react';

// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module '~/config/appConfig' or its cor... Remove this comment to see the full error message
import appConfig from '~/config/appConfig';

const initialState = {
  showForm: false,
  feedback: '',
  success: null,
  commentStatus: false,
};

type OwnProps = {
    location?: {
        [key: string]: any;
    };
};

type State = any;

type Props = OwnProps & typeof Feedback.defaultProps;

class Feedback extends React.Component<Props, State> {
  static defaultProps = {
      location: {},
  };

  feedbackField: any;

  constructor(props: Props) {
    super(props);

    this.state = initialState;

    this.feedbackField = React.createRef();

    this.onSubmitForm = this.onSubmitForm.bind(this);
    this.openForm = this.openForm.bind(this);
    this.closeForm = this.closeForm.bind(this);
    this.deactivateForm = this.deactivateForm.bind(this);
    this.handleFeedbackChange = this.handleFeedbackChange.bind(this);
    this.sendFeedback = this.sendFeedback.bind(this);
    this.handleRadioChange = this.handleRadioChange.bind(this);
  }

  onSubmitForm(e: any) {
    e.preventDefault();
    if (!this.state.feedback) {
      this.feedbackField.focus();
      this.setState({ commentStatus: true });
    } else {
      this.setState({
        showForm: false,
      // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'void' is not assignable to param... Remove this comment to see the full error message
      }, this.sendFeedback());
      // eslint-disable-next-line no-alert
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
    this.closeForm();
  }

  openForm() {
    this.setState({ showForm: true });
  }

  closeForm() {
    this.setState(initialState);
  }

  deactivateForm() {
    this.setState({ showForm: false });
  }

  handleFeedbackChange(e: any) {
    this.setState({ feedback: e.target.value });
  }

  handleRadioChange(e: any) {
    this.setState({ success: e.target.value });
  }

  render() {
    const showForm = this.state.showForm;

    return (
      // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <div className="feedback">
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <button
          type="button"
          className="feedback-button"
          onClick={() => this.openForm()}
          aria-haspopup="true"
          aria-expanded={showForm}
          aria-controls="feedback-menu"
        >
          Feedback
        </button>
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <FocusTrap
          focusTrapOptions={{
            onDeactivate: this.deactivateForm,
            clickOutsideDeactivates: true,
          }}
          active={showForm}
        >
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <div
            role="menu"
            className={`feedback-form-container${showForm ? ' active' : ''}`}
            id="feedback-menu"
          >
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <form onSubmit={e => this.onSubmitForm(e)}>
              {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              <div>
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <label id="sfr-feedback-success">Did you find what you were looking for?</label>
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <div>
                  {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                  <input
                    type="radio"
                    className="sfr-feedback-radio"
                    checked={this.state.success === 'yes'}
                    id="sfr-feedback-found-yes"
                    name="feedback"
                    value="yes"
                    onChange={e => this.handleRadioChange(e)}
                  />
                  {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                  <label
                    htmlFor="sfr-feedback-found-yes"
                    className="sfr-radio-label"
                  >
                    Yes
                  </label>
                </div>

                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <div>
                  {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                  <input
                    type="radio"
                    checked={this.state.success === 'no'}
                    className="sfr-feedback-radio"
                    id="sfr-feedback-found-no"
                    name="feedback"
                    value="no"
                    onChange={e => this.handleRadioChange(e)}
                  />
                  {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                  <label
                    htmlFor="sfr-feedback-found-no"
                    className="sfr-radio-label"
                  >
                    No
                  </label>
                </div>

                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <div>
                  {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                  <input
                    type="radio"
                    checked={this.state.success === 'browse'}
                    className="sfr-feedback-radio"
                    id="sfr-feedback-found-browse"
                    name="feedback"
                    value="browse"
                    onChange={e => this.handleRadioChange(e)}
                  />
                  {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                  <label
                    htmlFor="sfr-feedback-found-browse"
                    className="sfr-radio-label"
                  >
                    Just Browsing

                  </label>
                </div>
              </div>
              {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              <div>
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <label htmlFor="feedback-textarea-comment">
                  Comments (Required)
                </label>
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <textarea
                  id="feedback-textarea-comment"
                  className="feedback-input"
                  name="sfr-general-feedback"
                  // @ts-expect-error ts-migrate(2322) FIXME: Type 'string' is not assignable to type 'number | ... Remove this comment to see the full error message
                  rows="5"
                  aria-required="true"
                  // @ts-expect-error ts-migrate(2322) FIXME: Type 'string' is not assignable to type 'number | ... Remove this comment to see the full error message
                  tabIndex="0"
                  ref={(textarea) => { this.feedbackField = textarea; }}
                  value={this.state.feedback}
                  onChange={this.handleFeedbackChange}
                />
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                {this.state.commentStatus && <div id="textarea-status-note">Comment Required</div>}
              </div>

              {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              <button
                type="button"
                className={`cancel-button ${!showForm ? 'hidden' : ''}`}
                onClick={this.closeForm}
                aria-expanded={!showForm}
                aria-controls="feedback-menu"
              >
                Cancel
              </button>

              {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              <button
                className="sfr-submit-feedback-button"
                type="submit"
              >
                Submit
              </button>

            </form>
          </div>
        </FocusTrap>
      </div>
    );
  }
}

export default Feedback;
