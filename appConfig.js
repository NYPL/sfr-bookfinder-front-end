export default {
  appTitle: 'Digital Research Books Beta | NYPL',
  appName: 'Digital Research Books Beta',
  favIconPath: '//d2znry4lg8s0tq.cloudfront.net/images/favicon.ico',
  port: 3001,
  webpackDevServerPort: 3000,
  baseUrl: '',
  ereader: {
    local: 'http://localhost:4444',
    development: 'https://researchnow-reader.nypl.org',
    production: 'https://digital-research-books-reader.nypl.org',
  },
  api: {
    local: 'https://dev-platform.nypl.org/api/v0.1/research-now/v3',
    development: 'https://dev-platform.nypl.org/api/v0.1/research-now/v3',
    production: 'https://digital-research-books-api.nypl.org/v3/sfr',
    searchPath: {
      local: '/search-api',
      development: '/search-api',
      production: '/search',
    },
    recordPath: '/work',
    editionPath: '/edition',
    languagesPath: '/utils/languages',
  },
  booksCount: {
    apiUrl: '/utils/totals',
    experimentName: 'BooksCount',
  },
  requestDigital: {
    formUrl: 'https://api.airtable.com/v0/appFLZEc3LmVZCRxn/Requests',
    experimentName: 'RequestDigital',
  },
  analytics: {
    local: '',
    development: 'UA-1420324-149',
    production: 'UA-1420324-149',
  },
  feedback: {
    formURL: 'https://api.airtable.com/v0/appFLZEc3LmVZCRxn/Feedback',
  },
};
