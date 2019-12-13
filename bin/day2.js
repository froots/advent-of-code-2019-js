const readInput = require('./read-input.js');
const d2 = require('../src/d2.js');

module.exports = function() {
  readInput(2, data => d2.run(data));
};
