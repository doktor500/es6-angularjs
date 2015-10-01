require('babel/register');

var paths = require('./paths').paths;

exports.config = {
  framework: 'jasmine2',
  capabilities: { 'browserName': 'chrome' },
  baseUrl: 'http://localhost:3000',
  specs: [paths.spec.e2e + '/**/*.js'],
  jasmineNodeOpts: { showColors: true, defaultTimeoutInterval: 30000 }
};
