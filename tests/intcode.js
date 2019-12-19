const Intcode = require('../src/intcode.js');

const test = require('tape');

test('Intcode#new without program throws exception if run', t => {
  t.plan(1);
  const computer = new Intcode();
  t.throws(computer.run);
});

test('Intcode#load program', t => {
  t.plan(2);
  const program = [1, 2, 3, 2, 99];
  const computer = new Intcode();
  computer.load(program);
  t.equals(computer.instructionPointer, 0);
  t.deepEqual(computer.memory, program);
});

test('Intcode adder', t => {
  t.plan(1);
  const adder = [1, 2, 3, 2, 99];
  const computer = new Intcode();
  computer.load(adder);
  t.deepEqual(computer.run(), [1, 2, 5, 2, 99]);
});

test('Intcode multiplier', t => {
  t.plan(1);
  const multiplier = [2, 2, 4, 0, 99];
  const computer = new Intcode();
  computer.load(multiplier);
  t.deepEqual(computer.run(), [396, 2, 4, 0, 99]);
});

test('Intcode add and multiply', t => {
  t.plan(1);
  const program = [1, 9, 10, 3, 2, 3, 11, 0, 99, 30, 40, 50];
  const computer = new Intcode();
  computer.load(program);
  t.deepEqual(computer.run(), [3500, 9, 10, 70, 2, 3, 11, 0, 99, 30, 40, 50]);
});

test('Intcode input', t => {
  t.plan(1);
  const program = [3, 4, 99, 1, 1];
  const computer = new Intcode();
  computer.input = 80;
  computer.load(program);
  t.deepEqual(computer.run(), [3, 4, 99, 1, 80]);
});

test('Intcode output', t => {
  t.plan(2);
  const program = [4, 4, 99, 3, 5, 6];
  const computer = new Intcode();
  computer.load(program);
  t.deepEqual(computer.run(), [4, 4, 99, 3, 5, 6]);
  t.deepEqual(computer.output, [5]);
});

test('Intcode parameter modes', t => {
  t.plan(1);
  const program = [1101, 38, 22, 3, 99];
  const computer = new Intcode();
  computer.load(program);
  t.deepEqual(computer.run(), [1101, 38, 22, 60, 99]);
});

test('Intcode jumps position mode with input = 0', t => {
  t.plan(1);
  const program = [3, 12, 6, 12, 15, 1, 13, 14, 13, 4, 13, 99, -1, 0, 1, 9];
  const computer = new Intcode();
  computer.load(program);
  computer.input = 0;
  computer.run();
  t.equal(computer.output[0], 0);
});

test('Intcode jumps position mode with input = 1', t => {
  t.plan(1);
  const program = [3, 12, 6, 12, 15, 1, 13, 14, 13, 4, 13, 99, -1, 0, 1, 9];
  const computer = new Intcode();
  computer.load(program);
  computer.input = 1;
  computer.run();
  t.equal(computer.output[0], 1);
});

test('Intcode jumps immediate mode with input = 0', t => {
  t.plan(1);
  const program = [3, 3, 1105, -1, 9, 1101, 0, 0, 12, 4, 12, 99, 1];
  const computer = new Intcode();
  computer.load(program);
  computer.input = 0;
  computer.run();
  t.equal(computer.output[0], 0);
});

test('Intcode jumps immediate mode with input = 1', t => {
  t.plan(1);
  const program = [3, 3, 1105, -1, 9, 1101, 0, 0, 12, 4, 12, 99, 1];
  const computer = new Intcode();
  computer.load(program);
  computer.input = 1;
  computer.run();
  t.equal(computer.output[0], 1);
});

test('Intcode less than position mode', t => {
  t.plan(1);
  const program = [7, 9, 10, 11, 7, 10, 9, 12, 99, 4, 3, -1, -1];
  const computer = new Intcode();
  computer.load(program);
  t.deepEqual(computer.run(), [7, 9, 10, 11, 7, 10, 9, 12, 99, 4, 3, 0, 1]);
});

// test('Intcode long example when input < 8', t => {
//   t.plan(1);
//   const program = [
//     3,
//     21,
//     1008,
//     21,
//     8,
//     20,
//     1005,
//     20,
//     22,
//     107,
//     8,
//     21,
//     20,
//     1006,
//     20,
//     31,
//     1106,
//     0,
//     36,
//     98,
//     0,
//     0,
//     1002,
//     21,
//     125,
//     20,
//     4,
//     20,
//     1105,
//     1,
//     46,
//     104,
//     999,
//     1105,
//     1,
//     46,
//     1101,
//     1000,
//     1,
//     20,
//     4,
//     20,
//     1105,
//     1,
//     46,
//     98,
//     99
//   ];
//   const computer = new Intcode();
//   computer.load(program);
//   computer.input = 7;
//   computer.run();
//   t.equal(computer.output[0], 999);
// });
