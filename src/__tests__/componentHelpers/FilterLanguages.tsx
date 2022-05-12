import { fireEvent, within } from "@testing-library/react";
import { FacetItem } from "~/src/types/DataModel";
import { ApiLanguage } from "~/src/types/LanguagesQuery";
import { Filter } from "~/src/types/SearchQuery";

export const FilterLanguagesCommonTests = (
  screen,
  languages: FacetItem[],
  showCount: boolean,
  selectedLanguages?: Filter[]
) => {
  test("Language Filter appears", () => {
    fireEvent.click(screen.getByRole("button", { name: "Filter Languages" }));
    const languages = screen.getByRole("group", { name: "List of Languages" });

    expect(languages).toBeInTheDocument();
  });

  test("Language Filters shows all available languages", () => {
    fireEvent.click(screen.getByRole("button", { name: "Filter Languages" }));
    const languageGroup = screen.getByRole("group", {
      name: "List of Languages",
    });
    // expect(languageGroup).toBeVisible();

    languages.forEach((lang: ApiLanguage) => {
      const isSelected =
        selectedLanguages &&
        selectedLanguages.find((filter) => {
          return filter.value === lang.language;
        });
      const labelText = showCount
        ? `${lang.language} (${lang.count})`
        : lang.language;
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
