export default {
  appTitle: 'Digital Research Books Beta | NYPL',
  appName: 'Digital Research Books Beta',
  favIconPath: '//d2znry4lg8s0tq.cloudfront.net/images/favicon.ico',
  port: 3001,
  webpackDevServerPort: 3000,
  baseUrl: '',
  ereader: {
    development: 'http://localhost:4444',
    production: 'https://researchnow-reader.nypl.org',
  },
  api: {
    development: 'https://dev-platform.nypl.org/api/v0.1/research-now/v3',
    production: 'https://dev-platform.nypl.org/api/v0.1/research-now/v3',
    searchPath: '/search-api',
    recordPath: '/work',
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
    development: 'UA-1420324-149',
    production: 'UA-1420324-149',
  },
  feedback: {
    formURL: 'https://api.airtable.com/v0/appFLZEc3LmVZCRxn/Feedback',
  },
};
