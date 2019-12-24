const IntcodeArray = require('./intcode-array.js');
const permute = require('./permute.js');

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

function part1(program, input = 0) {
  let phaseSequences = permute([0, 1, 2, 3, 4]);

  let results = phaseSequences.map(sequence => {
    let amps = new IntcodeArray();
    sequence.forEach(phaseSetting => amps.add(program, [phaseSetting]));
    amps.run();

    return amps.get(0).lastOutput();
  });

  return Math.max(...results);
}

module.exports = { run, part1, permute };
