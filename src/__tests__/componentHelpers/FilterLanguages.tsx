import { fireEvent, within } from "@testing-library/react";
import { FacetItem } from "~/src/types/DataModel";
import { Filter } from "~/src/types/SearchQuery";

export const FilterLanguagesCommonTests = (
  screen,
  languages: FacetItem[],
  showCount: boolean,
  useMobile: boolean,
  selectedLanguages?: Filter[]
) => {
  test("Language Filter appears", () => {
    const languages = screen.getByRole("group", { name: "Languages" });

    const accordionControl = within(languages).getByRole("checkbox", {
      name: "Filter Languages",
    });
    fireEvent.click(accordionControl);
    expect(accordionControl).not.toBeChecked();
  });

  test("Language Filters shows all available languages", () => {
    const languageGroup = screen.getByRole("group", { name: "Languages" });
    expect(languageGroup).toBeVisible();

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
        expect(
          within(languageGroup).getByRole("checkbox", {
            name: labelText,
            checked: true,
          })
        ).toBeInTheDocument();
      } else {
        expect(
          within(languageGroup).queryByRole("checkbox", {
            name: labelText,
            checked: true,
          })
        ).not.toBeInTheDocument();
      }
    });
  });
};
