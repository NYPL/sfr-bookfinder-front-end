import React, { useState } from "react";
import { submitFeedback } from "~/src/lib/api/FeedbackApi";
import { useFeedbackBox } from "@nypl/design-system-react-components";

const Feedback: React.FC<any> = ({ location }) => {
  const [view, setView] = useState<"form" | "confirmation" | "error">("form");
  const { FeedbackBox, isOpen, onOpen, onClose } = useFeedbackBox();

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

  return (
    <FeedbackBox
      showCategoryField
      isOpen={isOpen}
      onClose={onClose}
      onOpen={onOpen}
      onSubmit={handleFeedbackSubmit}
      confirmationText="Thank you, your feedback has been submitted."
      descriptionText="Please share your question or feedback."
      id="feedbackBox-id"
      title="Help and Feedback"
      view={view}
    />
  );
};

export default Feedback;
