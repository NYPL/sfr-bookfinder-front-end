require('rootpath')();
require('@babel/register');

// TODO: This disables the icons until we can do the work to enable them
require.extensions['.svg'] = () => {};

module.exports = require('./server');
