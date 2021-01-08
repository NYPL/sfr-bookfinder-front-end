import { Language } from "~/src/types/DataModel";
import * as DS from "@nypl/design-system-react-components";
import React, { useState } from "react";
import { Filter } from "~/src/types/SearchQuery";

// An Accordion of languages

const LanguageAccordion: React.FC<{
  languages: string[];
  selectedLanguages: Filter[];
  onLanguageChange: any;
}> = (props) => {
  const { selectedLanguages, onLanguageChange } = props;

  const selectedLanguageFilter = (language: string) => {
    return selectedLanguages.find((langFilter) => {
      return langFilter.value === language;
    });
  };

  const toggleSelected = (
    e: React.ChangeEvent<HTMLInputElement>,
    language: string
  ) => {
    onLanguageChange(e, language);
  };

  return (
    <>
      <DS.Label htmlFor="lanaguage-select">Languages</DS.Label>
      <DS.Accordion inputId="language-select" accordionLabel="Click to Expand">
        <DS.List
          id="languages list"
          type={DS.ListTypes.Unordered}
          modifiers={["no-list-styling"]}
        >
          {props.languages.map((language) => {
            return (
              <li key={`check-${language}`}>
                <DS.Checkbox
                  name={language}
                  checkboxId={`checkbox-${language}`}
                  labelOptions={{
                    id: `checkbox-label-${language}`,
                    labelContent: <>{language}</>,
                  }}
                  checked={!!selectedLanguageFilter(language)}
                  onChange={(e) => toggleSelected(e, language)}
                />
              </li>
            );
          })}
        </DS.List>
      </DS.Accordion>
    </>
  );
};

export default LanguageAccordion;
