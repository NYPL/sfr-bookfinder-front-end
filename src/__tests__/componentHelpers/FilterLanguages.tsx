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
  // test("Language Filter appears", () => {
  //   const languages = screen.getByRole("group", { name: "Languages" });

  //   const accordionControl = within(languages).getByRole("checkbox", {
  //     name: "Filter Languages",
  //   });
  //   fireEvent.click(accordionControl);
  //   expect(accordionControl).not.toBeChecked();
  // });

  test("Language Filters shows all available languages", () => {
    fireEvent.click(
      screen.getAllByRole("button", { name: "Filter Languages" })[0]
    );
    const languageGroup = screen.getByRole("group", {
      name: "List of Languages",
    });
    expect(languageGroup).toBeVisible();

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
