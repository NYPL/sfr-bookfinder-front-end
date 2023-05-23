import React, { RefObject, useReducer } from "react";
import FocusTrap from "focus-trap-react";
import { feedbackFormReducer, initialFeedbackState } from "./FeedbackStore";
import { submitFeedback } from "~/src/lib/api/FeedbackApi";

const Feedback: React.FC<any> = ({ location }) => {
  const [state, dispatch] = useReducer(
    feedbackFormReducer,
    initialFeedbackState,
    () => initialFeedbackState
  );
  const { formHidden, showCommentErrorMessage, feedback, foundSuccess } = state;

  const feedbackField: RefObject<HTMLTextAreaElement> =
    React.createRef<HTMLTextAreaElement>();

  const closeForm = () => {
    dispatch({ type: "RESET" });
  };

  const setFormHidden = (value: boolean) => {
    return dispatch({ type: "HIDE", value: value });
  };

  const handleRadioChange = (e: any) => {
    dispatch({ type: "RADIO_CHANGE", value: e.target.value.toString() });
  };

  const handleFormSubmit = (e: any) => {
    e.preventDefault();
    if (!feedback) {
      feedbackField.current.focus();
      dispatch({ type: "FEEDBACK_EMPTY", value: true });
    } else {
      submitFeedback({
        feedback: feedback,
        success: foundSuccess,
        url: location,
      });
      setFormHidden(true);
      dispatch({ type: "RESET" });
      alert("Thank you, your feedback has been submitted.");
    }
  };

  return (
    <div className="feedback">
      <button
        type="button"
        className="feedback-button"
        onClick={() => {
          setFormHidden(!formHidden);
        }}
        aria-haspopup="true"
        aria-expanded={!formHidden}
        aria-controls="feedback-menu"
      >
        Feedback
      </button>
      <FocusTrap
        focusTrapOptions={{
          onDeactivate: () => {
            setFormHidden(true);
          },
          clickOutsideDeactivates: true,
          tabbableOptions: {
            displayCheck: "none",
          },
        }}
        active={!formHidden}
      >
        <div
          role="menu"
          className={`feedback-form-container${formHidden ? "" : " active"}`}
          id="feedback-menu"
        >
          <form onSubmit={(e) => handleFormSubmit(e)}>
            <div>
              <div id="sfr-feedback-success">
                Did you find what you were looking for?
              </div>
              <div>
                <input
                  type="radio"
                  className="sfr-feedback-radio"
                  checked={foundSuccess === "yes"}
                  id="sfr-feedback-found-yes"
                  name="feedback"
                  value="yes"
                  onChange={(e) => handleRadioChange(e)}
                />

                <label
                  htmlFor="sfr-feedback-found-yes"
                  className="sfr-radio-label"
                >
                  Yes
                </label>
              </div>

              <div>
                <input
                  type="radio"
                  checked={foundSuccess === "no"}
                  className="sfr-feedback-radio"
                  id="sfr-feedback-found-no"
                  name="feedback"
                  value="no"
                  onChange={(e) => handleRadioChange(e)}
                />

                <label
                  htmlFor="sfr-feedback-found-no"
                  className="sfr-radio-label"
                >
                  No
                </label>
              </div>

              <div>
                <input
                  type="radio"
                  checked={foundSuccess === "browse"}
                  className="sfr-feedback-radio"
                  id="sfr-feedback-found-browse"
                  name="feedback"
                  value="browse"
                  onChange={(e) => handleRadioChange(e)}
                />

                <label
                  htmlFor="sfr-feedback-found-browse"
                  className="sfr-radio-label"
                >
                  Just Browsing
                </label>
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
                rows={5}
                aria-required="true"
                tabIndex={0}
                ref={feedbackField}
                value={feedback}
                onChange={(e) => {
                  dispatch({ type: "FEEDBACK_CHANGE", value: e.target.value });
                }}
              />

              {showCommentErrorMessage && (
                <div id="textarea-status-note">Comment Required</div>
              )}
            </div>

            <button
              type="button"
              className={`cancel-button ${formHidden ? "hidden" : ""}`}
              onClick={() => closeForm()}
              aria-expanded={!formHidden}
              aria-controls="feedback-menu"
            >
              Cancel
            </button>

            <button className="sfr-submit-feedback-button" type="submit">
              Submit
            </button>
          </form>
        </div>
      </FocusTrap>
    </div>
  );
};

export default Feedback;
