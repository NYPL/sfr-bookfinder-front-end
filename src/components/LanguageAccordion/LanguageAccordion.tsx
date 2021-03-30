import { FacetItem } from "~/src/types/DataModel";
import * as DS from "@nypl/design-system-react-components";
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
    <fieldset className="language-accordion">
      <legend>
        <DS.Label htmlFor="lanaguage-select">Languages</DS.Label>
      </legend>
      <DS.Accordion
        inputId="language-select"
        accordionLabel="Filter Languages"
        defaultOpen={true}
        modifiers={["fixed-height"]}
      >
        <div style={{ height: "300px" }}>
          <DS.List
            id="languages-list"
            className="languages-list"
            type={DS.ListTypes.Unordered}
            modifiers={["no-list-styling"]}
          >
            {languages.map((language) => {
              return (
                <li key={`check-${language.value}`}>
                  <DS.Checkbox
                    name={language.value}
                    checkboxId={`checkbox-${language.value}`}
                    labelOptions={{
                      id: `checkbox-label-${language.value}`,
                      labelContent: (
                        <>
                          {language.value}{" "}
                          {showCount ? `(${language.count})` : ""}
                        </>
                      ),
                    }}
                    checked={!!selectedLanguageFilter(language.value)}
                    onChange={(e) => toggleSelected(e, language.value)}
                    attributes={{
                      "aria-labelledby": `checkbox-label-${language.value}`,
                    }}
                  />
                </li>
              );
            })}
          </DS.List>
        </div>
      </DS.Accordion>
    </fieldset>
  );
};

export default LanguageAccordion;
