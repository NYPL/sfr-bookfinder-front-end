export default {
  appTitle: 'ResearchNow | NYPL',
  appName: 'ResearchNow',
  favIconPath: '//d2znry4lg8s0tq.cloudfront.net/images/favicon.ico',
  port: 3001,
  webpackDevServerPort: 3000,
  baseUrl: '',
  esUrl: {
    development: 'http://sfr-search-api-dev.us-east-1.elasticbeanstalk.com/api/v0.1/sfr',
    production: '',
    basePath: '/works',
    detailPath: '/work',
  },
  ereader: {
    development: 'http://epub-reader-env.dvgytju99m.us-east-1.elasticbeanstalk.com/reader',
    production: '',
  },
  api: {
    development: 'https://dev-platform.nypl.org/api/v0.1/research-now',
    production: '',
    searchPath: '/search-api',
    recordPath: '/work',
  },
};
