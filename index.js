require('rootpath')();
require('@babel/register');

require.extensions['.svg'] = () => {};

module.exports = require('./server');
