const Intcode = require('./intcode.js');

function run(data) {
  let program = parse(data);
  console.log('Day 5:1: ', part1(program, 1).reverse()[0]);
  console.log('Day 5:2: ', part2(program, 5).reverse()[0]);
}

function parse(data) {
  return data
    .trim()
    .split(',')
    .map(Number);
}

function part1(program, input) {
  const computer = new Intcode();
  computer.load(program);
  computer.input = [input];
  computer.run();
  return computer.output;
}

function part2(program, input) {
  const computer = new Intcode();
  computer.load(program);
  computer.input = [input];
  computer.run();
  return computer.output;
}

module.exports = { run, part1, part2 };
