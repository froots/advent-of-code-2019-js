function run(data) {
  let program = parse(data);
  console.log(program);
  console.log('Day 2:1: ', part1(program));
}

function parse(data) {
  return data
    .trim()
    .split(',')
    .map(Number);
}

function part1(program) {
  const computer = new Intcode(program);
  return 1;
}

module.exports = { run, parse, part1 };
