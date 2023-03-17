import React from "react";
import { Box } from "@nypl/design-system-react-components";

const LanguageDisplayText: React.FC<{
  language: string;
}> = ({ language }) => {
  return (
    <Box as="p">
      {language ? `Languages: ${language}` : "Languages: Undetermined"}
    </Box>
  );
};

export default LanguageDisplayText;
