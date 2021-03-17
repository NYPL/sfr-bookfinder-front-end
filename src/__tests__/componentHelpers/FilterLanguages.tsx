import { fireEvent, within } from "@testing-library/react";
import { FacetItem } from "~/src/types/DataModel";
import { Filter } from "~/src/types/SearchQuery";

export const FilterLanguagesCommonTests = (
  screen,
  languages: FacetItem[],
  showCount: boolean,
  selectedLanguages?: Filter[]
) => {
  test("Language Filter appears", () => {
    const languages = screen.getByRole("group", { name: "Languages" });

    const accordionControl = within(languages).getByRole("checkbox", {
      name: "Filter Languages",
    });
    fireEvent.click(accordionControl);
    expect(accordionControl).toBeChecked();
  });

  test("Language Filters shows all available languages", () => {
    const languageGroup = screen.getByRole("group", { name: "Languages" });

    languages.forEach((lang) => {
      const isSelected =
        selectedLanguages &&
        selectedLanguages.find((filter) => {
          return filter.value === lang.value;
        });
      const labelText = showCount
        ? `${lang.value} (${lang.count})`
        : lang.value;
      if (isSelected) {
        expect(within(languageGroup).getByLabelText(labelText)).toBeChecked();
      } else {
        expect(
          within(languageGroup).getByLabelText(labelText)
        ).not.toBeChecked();
      }
    });
  });
};
