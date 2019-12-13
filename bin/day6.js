const fs = require('fs');
const d6 = require('../src/d6.js');

module.exports = function() {
  fs.readFile('./data/day6.txt', (err, data) => {
    if (err) {
      console.error("Couldn't read file", err);
    }
    d6.run(data.toString());
  });
};
