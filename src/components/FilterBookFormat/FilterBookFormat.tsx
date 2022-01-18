import {
  Checkbox,
  CheckboxGroup,
  CheckboxGroupLayoutTypes,
} from "@nypl/design-system-react-components";
import React from "react";
import { Filter } from "~/src/types/SearchQuery";
import { FormatTypes } from "~/src/constants/labels";

// A Checkbox List of formats
const FilterBookFormat: React.FC<{
  selectedFormats: Filter[];
  onFormatChange: (e, format: string) => void;
}> = (props) => {
  const { selectedFormats, onFormatChange } = props;

  const isSelected = (formats: Filter[], format: string) => {
    const selected = formats.find((selectedFormat) => {
      return selectedFormat.value === format;
    });
    return !!selected;
  };

  const toggleSelected = (e, format) => {
    onFormatChange(e, format);
  };

  return (
    <CheckboxGroup
      layout={CheckboxGroupLayoutTypes.Column}
      name="formats-list"
      labelText="Format"
      optReqFlag={false}
      showHelperInvalidText
      showLabel
    >
      <>
        {FormatTypes.map((formatType: { value: string; label: string }) => (
          <Checkbox
            key={"checkbox-" + formatType.label}
            labelText={formatType.label}
            onChange={(e) => toggleSelected(e, formatType.value)}
            isChecked={isSelected(selectedFormats, formatType.value)}
          />
        ))}
      </>
    </CheckboxGroup>
  );
};

export default FilterBookFormat;
