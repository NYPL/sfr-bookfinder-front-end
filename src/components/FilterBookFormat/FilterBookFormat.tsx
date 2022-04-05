import { Checkbox } from "@nypl/design-system-react-components";
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
    <fieldset>
      <legend>Format</legend>
      {FormatTypes.map((formatType: any) => (
        <Checkbox
          key={"checkbox-" + formatType.label}
          labelText={formatType.label}
          onChange={(e) => toggleSelected(e, formatType.value)}
          isChecked={isSelected(selectedFormats, formatType.value)}
        />
      ))}
    </fieldset>
  );
};

export default FilterBookFormat;
