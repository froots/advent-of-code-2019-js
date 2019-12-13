const readInput = require('./read-input.js');
const d6 = require('../src/d6.js');

module.exports = function() {
  readInput(6, data => d6.run(data));
};
