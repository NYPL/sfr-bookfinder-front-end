import { FacetItem } from "~/src/types/DataModel";
import {
  Accordion,
  Checkbox,
  CheckboxGroup,
  LayoutTypes,
} from "@nypl/design-system-react-components";
import React from "react";
import { Filter } from "~/src/types/SearchQuery";

// An Accordion of languages

const LanguageAccordion: React.FC<{
  languages: FacetItem[];
  showCount: boolean;
  selectedLanguages: Filter[];
  onLanguageChange: any;
}> = (props) => {
  const { languages, showCount, selectedLanguages, onLanguageChange } = props;

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
    <Accordion
      accordionData={[
        {
          label: "Filter Languages",
          panel: (
            <CheckboxGroup
              labelText="List of Languages"
              layout={LayoutTypes.Column}
              name="languages-list"
              showRequiredLabel={false}
              showLabel={false}
              id="languages-checkbox-group"
            >
              {languages.map((language) => {
                return (
                  <Checkbox
                    key={`check-${language.value}`}
                    name="Languages"
                    labelText={`${language.value} ${
                      showCount ? "(" + language.count + ")" : ""
                    }`}
                    isChecked={!!selectedLanguageFilter(language.value)}
                    onChange={(e) => toggleSelected(e, language.value)}
                    id={language.value + "-checkbox"}
                  />
                );
              })}
            </CheckboxGroup>
          ),
        },
      ]}
    />
  );
};

export default LanguageAccordion;
