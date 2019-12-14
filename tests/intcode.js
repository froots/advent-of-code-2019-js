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
