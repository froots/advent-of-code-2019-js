const readInput = require('./read-input.js');
const d7 = require('../src/d7.js');

module.exports = function() {
  readInput(7, data => d7.run(data));
};
