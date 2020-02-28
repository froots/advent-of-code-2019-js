const test = require('tape');
const IntcodeArray = require('../src/intcode-array.js');

test('IntcodeArray instantiates with no members', t => {
  t.plan(1);
  let arr = new IntcodeArray();
  t.equal(arr.size(), 0);
});

test('IntcodeArray #add with program and input', t => {
  t.plan(2);
  let program = [1, 2, 3, 4, 5];
  let arr = new IntcodeArray();
  arr.add(program, [1]);
  t.equal(arr.size(), 1);
  t.deepEqual(arr.get(0).computer.memory, program);
});

test('IntcodeArray #run with one computer', t => {
  t.plan(1);
  // Program that outputs 5 + input
  let program = [3, 9, 1, 9, 10, 11, 4, 11, 99, -1, 5, -1];
  let arr = new IntcodeArray();
  arr.add(program, [3]);
  arr.run();
  t.deepEqual(arr.get(0).computer.output, [8]);
});

test('IntcodeArray #run with closed ended sequence of two', t => {
  t.plan(2);
  // Program that outputs 5 + input
  let program = [3, 9, 1, 9, 10, 11, 4, 11, 99, -1, 5, -1];
  let arr = new IntcodeArray();
  arr.add(program, [3]);
  arr.add(program);
  arr.run();
  t.deepEqual(arr.get(0).computer.output, [8]);
  t.deepEqual(arr.get(1).computer.output, [13]);
});
