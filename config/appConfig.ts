export default {
  appTitle: "Digital Research Books Beta | NYPL",
  appName: "Digital Research Books Beta",
  favIconPath: "//d2znry4lg8s0tq.cloudfront.net/images/favicon.ico",
  port: 3001,
  webpackDevServerPort: 3000,
  baseUrl: "",
  api: {
    url: {
      local: "localhost:5000",
      development: "http://drb-api-qa.nypl.org",
      qa: "http://drb-api-qa.nypl.org",
      production: "http://drb-api-qa.nypl.org"
    },
    searchPath: "/search",
    recordPath: "/work",
    editionPath: "/edition",
    readPath: "/link",
    languagesPath: "/utils/languages",
  },
  booksCount: {
    apiUrl: "/utils/counts",
    experimentName: "BooksCount",
  },
  requestDigital: {
    formUrl: "https://api.airtable.com/v0/appFLZEc3LmVZCRxn/Requests",
    experimentName: "RequestDigital",
  },
  analytics: {
    local: "",
    development: "UA-1420324-149",
    production: "UA-1420324-149",
  },
  feedback: {
    formURL: "https://api.airtable.com/v0/appFLZEc3LmVZCRxn/Feedback",
  },
  displayCitations: {
    experimentName: "DisplayCitations",
  },
};
