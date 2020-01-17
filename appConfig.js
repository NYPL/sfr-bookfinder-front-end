export default {
  appTitle: 'ResearchNow | NYPL',
  appName: 'ResearchNow',
  favIconPath: '//d2znry4lg8s0tq.cloudfront.net/images/favicon.ico',
  port: 3001,
  webpackDevServerPort: 3000,
  baseUrl: '',
  ereader: {
    development: 'http://researchnow-webpub-dev.us-east-1.elasticbeanstalk.com:4444',
    production: 'http://researchnow-webpub-dev.us-east-1.elasticbeanstalk.com:4444',
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
  analytics: {
    development: 'UA-1420324-149',
    production: 'UA-1420324-149',
  },
};
