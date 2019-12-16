const readInput = require('./read-input.js');
const d5 = require('../src/d5.js');

module.exports = function() {
  readInput(5, data => d5.run(data));
};
