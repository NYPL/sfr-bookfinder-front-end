export default {
  appTitle: "Digital Research Books Beta | NYPL",
  appName: "Digital Research Books Beta",
  favIconPath: "//d2znry4lg8s0tq.cloudfront.net/images/favicon.ico",
  port: 3001,
  webpackDevServerPort: 3000,
  baseUrl: "",
  ereader: {
    local: "http://localhost:4444",
    development: "https://researchnow-reader.nypl.org",
    production: "https://digital-research-books-reader.nypl.org",
  },
  api: {
    local:
      "http://sfr-p-ecsal-ixtqofr3u1cq-1271021548.us-east-1.elb.amazonaws.com3",
    development:
      "http://sfr-p-ecsal-ixtqofr3u1cq-1271021548.us-east-1.elb.amazonaws.com",
    production:
      "http://sfr-p-ecsal-ixtqofr3u1cq-1271021548.us-east-1.elb.amazonaws.com",
    searchPath: {
      local: "/search",
      development: "/search",
      production: "/search",
    },
    recordPath: "/work",
    editionPath: "/edition",
    languagesPath: "/utils/languages",
  },
  booksCount: {
    apiUrl: "/utils/totals",
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
