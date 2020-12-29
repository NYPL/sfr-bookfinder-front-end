import React, { RefObject, useReducer } from "react";
import FocusTrap from "focus-trap-react";
import { feedbackFormReducer, initialFeedbackState } from "./FeedbackStore";
import appConfig from "~/config/appConfig";
import { useRouter } from "next/router";

const Feedback: React.FC<any> = () => {
  const [state, dispatch] = useReducer(
    feedbackFormReducer,
    initialFeedbackState,
    () => initialFeedbackState
  );
  const router = useRouter();
  const { formHidden, showCommentErrorMessage, feedback, foundSuccess } = state;

  const feedbackField: RefObject<HTMLTextAreaElement> = React.createRef<HTMLTextAreaElement>();

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
      console.log("router pathname", router);
      fetch(appConfig.feedback.formURL, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.AIRTABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fields: {
            Feedback: feedback,
            Success: foundSuccess,
            URL: router.pathname,
          },
        }),
      });
      setFormHidden(true);
      dispatch({ type: "RESET" });
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
        Feedback {formHidden}
      </button>
      <FocusTrap
        focusTrapOptions={{
          onDeactivate: () => {
            setFormHidden(true);
          },
          clickOutsideDeactivates: true,
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
        {/* <div
          // role="menu"
          className={`feedback-form-container active"}`}
          id="feedback-menu"
        >

        </div> */}
      </FocusTrap>
    </div>
  );
};

export default Feedback;
