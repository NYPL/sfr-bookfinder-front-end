import * as DS from "@nypl/design-system-react-components";
import React from "react";
import { Filter } from "~/src/types/SearchQuery";
import { formatTypes } from "~/src/constants/labels";

// A Checkbox List of formats
const BookFormatInput: React.FC<{
  selectedFormats: Filter[];
  onFormatChange: (e, format: string) => void;
}> = (props) => {
  const { selectedFormats, onFormatChange } = props;
  const getSelectedFormat = (format: string) => {
    return selectedFormats.find((selectedFormat) => {
      return selectedFormat.value === format;
    });
  };

  const toggleSelected = (e, format) => {
    console.log("checked", e.target.checked);

    props.onFormatChange(e, format);
  };

  return (
    <fieldset>
      <legend>Format</legend>

      {formatTypes.map((formatType: any) => (
        <DS.Checkbox
          className="usa-checkbox tablet:grid-col-12"
          checkboxId={`format-${formatType.value}`}
          checked={getSelectedFormat(formatType.value) !== undefined}
          onChange={(e) => toggleSelected(e, formatType.value)}
          labelOptions={{
            id: `format-${formatType.value}=label`,
            labelContent: <>{formatType.label}</>,
          }}
          name={`filter-format`}
          key={`facet-format-${formatType.value}`}
        />
      ))}
    </fieldset>
  );
};

export default BookFormatInput;
