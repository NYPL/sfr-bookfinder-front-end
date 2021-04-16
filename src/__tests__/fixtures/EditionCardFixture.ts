export const fullEdition: WorkEdition = {
  edition_id: 12345,
  publication_place: "Chargoggagoggmanchauggagoggchaubunagungamaugg",
  publication_date: "1990",
  links: [
    {
      link_id: 32,
      url: "test-cover",
      mediaType: "image/jpeg",
    },
    {
      link_id: 33,
      url: "test-cover-2",
      mediaType: "image/jpeg",
    },
  ],
  publishers: [{ name: "publisher_1", roles: ["publisher"] }],
  languages: [
    { language: "english" },
    { language: "french" },
    { language: "russian" },
    { language: "unknown" },
    { language: "spanish" },
    { language: "german" },
    { language: "arabic" },
    { language: "hindi" },
    { language: "japanese" },
    { language: "vietnamese" },
    { language: "latin" },
    { language: "romanian" },
  ],
  items: [
    {
      links: [
        {
          url: "test-link-url",
          link_id: 12,
          mediaType: "application/epub+xml",
        },
        {
          url: "test-link-url-2",
          link_id: 23,
          mediaType: "application/epub+zip",
        },
      ],
      rights: [
        {
          license: "license content",
          rightsStatement: "test rights statement",
        },
      ],
    },
  ],
};
