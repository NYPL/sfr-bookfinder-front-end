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
