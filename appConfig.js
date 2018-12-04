export default {
  appTitle: 'ResearchNow | NYPL',
  appName: 'ResearchNow',
  favIconPath: '//d2znry4lg8s0tq.cloudfront.net/images/favicon.ico',
  port: 3001,
  webpackDevServerPort: 3000,
  baseUrl: '',
  esUrl: {
    development: 'http://sfr-search-api-dev.us-east-1.elasticbeanstalk.com/api/v0.1/sfr/works',
  },
  s3Path: {
    development: 's3.amazonaws.com/simplye-research-epubs',
  },
  api: {
    development: 'https://dev-platform.nypl.org/api/v0.1/research-now/search-api',
  },
};
