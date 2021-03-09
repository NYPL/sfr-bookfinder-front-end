import * as DS from "@nypl/design-system-react-components";
import React from "react";
import { Filter } from "~/src/types/SearchQuery";
import { formatTypes } from "~/src/constants/labels";

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
      {formatTypes.map((formatType: any) => (
        <DS.Checkbox
          checkboxId={`format-${formatType.value}`}
          name={`filter-format-${formatType.value}`}
          checked={isSelected(selectedFormats, formatType.value)}
          onChange={(e) => toggleSelected(e, formatType.value)}
          labelOptions={{
            id: `format-${formatType.value}=label`,
            labelContent: <>{formatType.label}</>,
          }}
          key={`facet-format-${formatType.value}`}
        />
      ))}
    </fieldset>
  );
};

export default FilterBookFormat;
