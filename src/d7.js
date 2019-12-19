const Intcode = require('./intcode.js');
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
    let amps = sequence.map(phaseSetting => {
      let amp = new Intcode();
      amp.load(program);
      amp.input = [phaseSetting];
      return amp;
    });

    let nextInput = input;

    amps.forEach(amp => {
      amp.input.push(nextInput);
      amp.run();
      if (!amp.output.length) {
        throw new Error('Amp did not create an output');
      }
      nextInput = amp.output.reverse()[0];
    });

    return nextInput;
  });

  return Math.max(...results);
}

module.exports = { run, part1, permute };
