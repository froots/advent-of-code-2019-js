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
  t.equals(computer.pointer, 0);
  t.deepEqual(computer.program, program);
});

test('Intcode run simple adder', t => {
  t.plan(1);
  const adder = [1, 2, 3, 2, 99];
  const computer = new Intcode();
  computer.load(adder);
  t.deepEqual(computer.run(), [1, 2, 5, 2, 99]);
});
