import React, { createContext, useState } from "react";

import { useFeedbackBox } from "@nypl/design-system-react-components";
import { ChakraComponent } from "@chakra-ui/react";

type FeedbackContextType = {
  onOpen: () => void;
  FeedbackBox: ChakraComponent<any>;
  onClose: () => void;
  isOpen?: boolean;
  isError?: boolean;
  setIsError: (value: boolean) => void;
  notificationText: string;
  setNotificationText: (value: string) => void;
};

export const FeedbackContext = createContext<FeedbackContextType | null>(null);

export const FeedbackProvider: React.FC<{
  children?: React.ReactNode;
}> = ({ children }) => {
  const { FeedbackBox, isOpen, onOpen, onClose } = useFeedbackBox();
  const [isError, setIsError] = useState(false);
  const [notificationText, setNotificationText] = useState(null);

  return (
    <FeedbackContext.Provider
      value={{
        onOpen,
        FeedbackBox,
        isOpen,
        onClose,
        isError,
        setIsError,
        notificationText,
        setNotificationText,
      }}
    >
      {children}
    </FeedbackContext.Provider>
  );
};
