export type ApiLanguageResponse = {
  status?: string;
  data?: ApiLanguage[];
};

export type ApiLanguage = {
  language: string;
  count: number;
};
