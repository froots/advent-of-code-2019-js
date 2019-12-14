const Intcode = require('./intcode.js');

function run(data) {
  let program = parse(data);
  console.log('Day 2:1: ', part1(program));
}

function parse(data) {
  return data
    .trim()
    .split(',')
    .map(Number);
}

function part1(program) {
  const computer = new Intcode();
  computer.load(program);
  computer.setMem(1, 12);
  computer.setMem(2, 2);
  return computer.run()[0];
}

module.exports = { run, parse, part1 };
