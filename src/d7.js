const Intcode = require('./intcode.js');

function run(data) {
  let program = parse(data);
  console.log('Day 7:1: ', part1(program));
}

function parse(data) {
  return data
    .trim()
    .split(',')
    .map(Number);
}

function part1(program, input) {
  return 1;
}

module.exports = { run, part1 };
