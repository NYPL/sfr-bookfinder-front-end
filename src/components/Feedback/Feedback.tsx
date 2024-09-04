import React, { useContext, useState } from "react";
import { submitFeedback } from "~/src/lib/api/FeedbackApi";
import { FeedbackBoxViewType } from "@nypl/design-system-react-components";
import { FeedbackContext } from "~/src/context/FeedbackContext";

const Feedback: React.FC<any> = ({ location }) => {
  const [view, setView] = useState<FeedbackBoxViewType>("form");
  const {
    FeedbackBox,
    isOpen,
    onOpen,
    onClose,
    isError,
    notificationText,
    setIsError,
    setNotificationText,
  } = useContext(FeedbackContext);

  const onCloseAndReset = () => {
    if (isError) setIsError(false);
    if (notificationText) setNotificationText(null);
    onClose();
    setView("form");
  };

  const handleFeedbackSubmit = (
    values: React.ComponentProps<typeof FeedbackBox>["onSubmit"]
  ) => {
    submitFeedback({
      feedback: values.comment,
      category: values.category,
      url: location,
    })
      .then((res) => {
        if (res.ok) setView("confirmation");
      })
      .catch((err) => {
        console.error(err);
        setView("error");
      });
    setView("confirmation");
  };

  const DEFAULT_DESCRIPTION_TEXT = "Please share your question or feedback.";
  const ERROR_DESCRIPTION_TEXT = "We are here to help!";

  return (
    <FeedbackBox
      showCategoryField={!isError}
      showEmailField={isError}
      isOpen={isOpen}
      onClose={onCloseAndReset}
      onOpen={onOpen}
      onSubmit={handleFeedbackSubmit}
      confirmationText="Thank you, your feedback has been submitted."
      descriptionText={
        isError ? ERROR_DESCRIPTION_TEXT : DEFAULT_DESCRIPTION_TEXT
      }
      notificationText={notificationText}
      id="feedbackBox-id"
      title="Help and Feedback"
      view={view}
    />
  );
};

export default Feedback;
