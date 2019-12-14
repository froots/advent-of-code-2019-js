const Intcode = require('./intcode.js');

function run(data) {
  let program = parse(data);
  console.log('Day 2:1: ', part1(program, 12, 2));
}

function parse(data) {
  return data
    .trim()
    .split(',')
    .map(Number);
}

function part1(program, p1, p2) {
  const computer = new Intcode();
  computer.load(program);
  if (p1) {
    computer.setMem(1, p1);
  }
  if (p2) {
    computer.setMem(2, p2);
  }
  computer.run();
  return computer.memory[0];
}

module.exports = { run, parse, part1 };
