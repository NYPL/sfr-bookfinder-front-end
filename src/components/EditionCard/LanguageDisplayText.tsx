import { Box } from "@nypl/design-system-react-components";
import React from "react";
import { WorkEdition } from "~/src/types/DataModel";
import EditionCardUtils from "~/src/util/EditionCardUtils";

const LanguageDisplayText: React.FC<{ previewEdition: WorkEdition }> = ({
  previewEdition,
}) => {
  const languageText = EditionCardUtils.getLanguageDisplayText(previewEdition);
  return <Box>{languageText}</Box>;
};

export default LanguageDisplayText;
