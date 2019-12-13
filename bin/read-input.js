const fs = require('fs');

module.exports = function(num, cb) {
  const filePath = `./data/day${num}.txt`;
  fs.readFile(filePath, (err, data) => {
    if (err) {
      console.error("Couldn't read file", err);
    }
    return cb(data.toString());
  });
};
