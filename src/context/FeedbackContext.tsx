import React, { createContext } from "react";

import { useFeedbackBox } from "@nypl/design-system-react-components";
import { ChakraComponent } from "@chakra-ui/react";

type FeedbackContextType = {
  onOpen: () => void;
  FeedbackBox: ChakraComponent<any>;
  onClose: () => void;
  isOpen?: boolean;
};

export const FeedbackContext = createContext<FeedbackContextType | null>(null);

export const FeedbackProvider: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  const { FeedbackBox, isOpen, onOpen, onClose } = useFeedbackBox();

  return (
    <FeedbackContext.Provider
      value={{
        onOpen,
        FeedbackBox,
        isOpen,
        onClose,
      }}
    >
      {children}
    </FeedbackContext.Provider>
  );
};
