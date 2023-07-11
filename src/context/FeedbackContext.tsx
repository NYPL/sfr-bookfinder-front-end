import React, { createContext } from "react";
import { useFeedbackBox } from "@nypl/design-system-react-components";

/**
 * Wrapper context component that controls state for the Feedback component
 */
export const FeedbackContext = createContext(null);
export const FeedbackProvider = ({ children }) => {
  const { FeedbackBox, isOpen, onOpen, onClose } = useFeedbackBox();

  return (
    <FeedbackContext.Provider
      value={{
        onOpen: onOpen,
        FeedbackBox,
        isOpen,
        onClose,
      }}
    >
      {children}
    </FeedbackContext.Provider>
  );
};
