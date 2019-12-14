const Intcode = require('./intcode.js');

function run(data) {
  let program = parse(data);
  console.log('Day 2:1: ', part1(program, 12, 2));
  console.log('Day 2:2: ', part2(program, 19690720));
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
    computer.write(1, p1);
  }
  if (p2) {
    computer.write(2, p2);
  }
  computer.run();
  return computer.memory[0];
}

function part2(program, target) {
  const computer = new Intcode();
  let result;
  let len = Math.min(program.length, 100);
  loop_outer: for (let i = 0; i < len; i++) {
    for (let j = 0; j < len; j++) {
      computer.load(program);
      computer.write(1, i);
      computer.write(2, j);
      try {
        computer.run();
      } catch (e) {
        continue;
      }
      if (computer.final && computer.final[0] === target) {
        result = 100 * i + j;
        break loop_outer;
      }
    }
  }
  return result;
}

module.exports = { run, parse, part1, part2 };
