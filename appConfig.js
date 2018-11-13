export default {
  appTitle: 'ResearchNow | NYPL',
  appName: 'ResearchNow',
  favIconPath: '//cdn-www.nypl.org/images/favicon.ico',
  port: 3001,
  webpackDevServerPort: 3000,
  esUrl: {
    development: 'sfr-search-api-dev.us-east-1.elasticbeanstalk.com/api/v0.1/works',
  },
  s3Path: {
    development: 'https://s3.amazonaws.com/simplye-research-epubs',
  },
};
