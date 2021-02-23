import React from "react";
import FocusTrap from "focus-trap-react";

// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module '~/config/appConfig' or its cor... Remove this comment to see the full error message
import appConfig from "~/config/appConfig";

const initialState = {
  comments: "",
  needsSpecific: null,
};

type OwnProps = {
  requestedWork?: {
    [key: string]: any;
  };
  requestedEdition?: {
    [key: string]: any;
  };
  closeForm?: (...args: any[]) => any;
};

type State = any;

type Props = OwnProps & typeof RequestDigital.defaultProps;

class RequestDigital extends React.Component<Props, State> {
  static defaultProps = {
    requestedWork: {},
    requestedEdition: {},
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    closeForm: () => {},
  };

  feedbackField: any;
  handleRadioChange: any;

  constructor(props: Props) {
    super(props);
    this.feedbackField = React.createRef();
    this.state = initialState;

    this.onSubmitForm = this.onSubmitForm.bind(this);
    this.handleFeedbackChange = this.handleFeedbackChange.bind(this);
    this.sendFeedback = this.sendFeedback.bind(this);
    this.handleRadioChange = this.handleCheckboxClick.bind(this);
  }

  onSubmitForm(e: any) {
    e.preventDefault();

    this.sendFeedback();
    // eslint-disable-next-line no-alert
    alert("Thank you, your request for digitization has been logged.");
  }

  sendFeedback() {
    fetch(appConfig.requestDigital.formUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.AIRTABLE_API_KEY}`,
        "Content-Type": "application/json",
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

  handleFeedbackChange(e: any) {
    this.setState({ comments: e.target.value });
  }

  handleCheckboxClick(e: any) {
    this.setState({ needsSpecific: e.target.checked.toString() });
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
        <div id="request-digitization" className="request-form-container">
          <form onSubmit={(e) => this.onSubmitForm(e)}>
            <span>
              You are requesting a{" "}
              <strong>{this.props.requestedEdition.publication_date}</strong>{" "}
              edition of <strong>{this.props.requestedWork.title}</strong>
            </span>

            <div>
              <label id="sfr-request-specific">
                {" "}
                Do you need this specific edition?{" "}
              </label>

              <div>
                <input
                  type="checkbox"
                  className="sfr-feedback-checkbox"
                  id="sfr-edition-specific-yes"
                  name="specificEdition"
                  onChange={(e) => this.handleCheckboxClick(e)}
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
              <label htmlFor="request-digital-textarea-comment">Comments</label>

              <br />

              <textarea
                id="request-digital-textarea-comment"
                className="feedback-input"
                name="sfr-request-digital-comments"
                // @ts-expect-error ts-migrate(2322) FIXME: Type 'string' is not assignable to type 'number | ... Remove this comment to see the full error message
                rows="5"
                aria-required="false"
                // @ts-expect-error ts-migrate(2322) FIXME: Type 'string' is not assignable to type 'number | ... Remove this comment to see the full error message
                tabIndex="0"
                ref={(textarea) => {
                  this.feedbackField = textarea;
                }}
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

            <button className="sfr-submit-feedback-button" type="submit">
              Submit
            </button>
          </form>
        </div>
      </FocusTrap>
    );
  }
}

export default RequestDigital;
