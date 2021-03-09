/** Redux store, actions and reducers for Feedback.ts */

// State
interface FeedbackState {
  //Is Form Showing
  formHidden: boolean;
  //Is "Empty comment" status showing
  showCommentErrorMessage: boolean;
  feedback: string;
  foundSuccess: "yes" | "no" | "browse" | null;
}

export const initialFeedbackState: FeedbackState = {
  formHidden: true,
  showCommentErrorMessage: false,
  feedback: "",
  foundSuccess: null,
};

// Action
const RESET = "RESET";
const HIDE = "HIDE";
const RADIO_CHANGE = "RADIO_CHANGE";
const FEEDBACK_CHANGE = "FEEDBACK_CHANGE";
const FEEDBACK_EMPTY = "FEEDBACK_EMPTY";

interface Reset {
  type: typeof RESET;
}

interface FeedbackFormToggle {
  type: typeof HIDE;
  value: boolean;
}

interface FeedbackRadioChange {
  type: typeof RADIO_CHANGE;
  value: "yes" | "no" | "browse" | null;
}

interface FeedbackTextChange {
  type: typeof FEEDBACK_CHANGE;
  value: string;
}

interface FeedbackEmpty {
  type: typeof FEEDBACK_EMPTY;
  value: boolean;
}

export type FeedbackFormActionTypes =
  | Reset
  | FeedbackFormToggle
  | FeedbackRadioChange
  | FeedbackTextChange
  | FeedbackEmpty;

//Reducers
export function feedbackFormReducer(
  state: FeedbackState,
  action: FeedbackFormActionTypes
): FeedbackState {
  switch (action.type) {
    case RESET:
      console.log("reset hit");
      return initialFeedbackState;
    case HIDE:
      return {
        ...state,
        formHidden: action.value,
      };
    case RADIO_CHANGE:
      return {
        ...state,
        foundSuccess: action.value,
      };
    case FEEDBACK_CHANGE:
      return {
        ...state,
        feedback: action.value,
      };
    case FEEDBACK_EMPTY:
      return {
        ...state,
        showCommentErrorMessage: action.value,
      };
    default:
      return state;
  }
}
