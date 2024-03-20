import { http, HttpResponse } from "msw";

/** A collection of handlers to be used by default for all tests. */
const handlers = [
  http.get("https://drb-api-qa.nypl.org/work/001", () => {
    return HttpResponse.json({
      data: {
        alt_titles: [],
        authors: [
          {
            lcnaf: "n79073051",
            name: "Colander, David",
            primary: "true",
            viaf: "108898845",
          },
        ],
        contributors: [],
        date_created: "2024-02-01T17:13:42",
        date_modified: "2024-02-01T17:13:42",
        dates: null,
        edition_count: 1,
        editions: [
          {
            alt_titles: [],
            contributors: [],
            dates: [
              {
                date: "1992",
                type: "publication_date",
              },
            ],
            edition: null,
            edition_id: 6969309,
            edition_statement: null,
            extent: "x, 294 p. ;",
            inCollections: [],
            items: [
              {
                content_type: "ebook",
                contributors: [],
                drm: null,
                item_id: 10818981,
                links: [
                  {
                    flags: {
                      catalog: false,
                      download: true,
                      embed: false,
                      nypl_login: true,
                      reader: false,
                    },
                    link_id: 9350262,
                    mediaType: "application/pdf",
                    url: "drb-api-qa.nypl.org/fulfill/001",
                  },
                ],
                location: null,
                measurements: null,
                modified: null,
                rights: [],
                source: "UofM",
              },
            ],
            languages: [
              {
                iso_2: "en",
                iso_3: "eng",
                language: "English",
              },
            ],
            links: [],
            measurements: [],
            publication_date: 1992,
            publication_place: null,
            publishers: [
              {
                lcnaf: "",
                name: "University of Michigan,",
                viaf: "",
              },
            ],
            sub_title: null,
            summary: null,
            table_of_contents: null,
            title: "Educating economists",
            volume: null,
            work_authors: null,
            work_title: null,
            work_uuid: "001",
          },
        ],
        inCollections: [],
        languages: [
          {
            iso_2: "en",
            iso_3: "eng",
            language: "English",
          },
        ],
        measurements: [],
        medium: null,
        series: null,
        series_position: null,
        sub_title: null,
        subjects: [
          {
            authority: "gtt",
            controlNo: "",
            heading: "Wirtschaftswissenschaften",
          },
        ],
        title: "Educating economists",
        uuid: "001",
      },
      responseType: "singleWork",
      status: 200,
      timestamp: "Tue, 12 Mar 2024 20:49:44 GMT",
    });
  }),
];

export default handlers;
