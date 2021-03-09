import { FacetItem } from "./DataModel";

export type ApiLanguageResponse = {
  status: string;
  data: {
    languages: ApiLanguage[];
  };
};

export type ApiLanguage = {
  language: string;
  count: number;
};

export function languagesToFacets(
  languageResponse: ApiLanguageResponse
): FacetItem[] {
  //TODO: throw error
  return languageResponse.data.languages.map((language) => {
    return {
      value: language.language,
      count: language.count,
    };
  });
}
