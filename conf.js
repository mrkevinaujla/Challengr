/*

  conf.js
  Protractor configuration file

*/

exports.config = {
  framework: 'jasmine2',
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['test/client/test.js']
};