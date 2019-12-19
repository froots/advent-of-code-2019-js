const test = require('tape');
const d7 = require('../src/d7.js');

test('Day 7 example 1', t => {
  t.plan(1);
  const program = [
    3,
    15,
    3,
    16,
    1002,
    16,
    10,
    16,
    1,
    16,
    15,
    15,
    4,
    15,
    99,
    0,
    0
  ];
  t.equal(d7.part1(program), 43210);
});

test('Day 7 example 2', t => {
  t.plan(1);
  const program = [
    3,
    23,
    3,
    24,
    1002,
    24,
    10,
    24,
    1002,
    23,
    -1,
    23,
    101,
    5,
    23,
    23,
    1,
    24,
    23,
    23,
    4,
    23,
    99,
    0,
    0
  ];
  t.equal(d7.part1(program), 54321);
});

test('Day 7 example 3', t => {
  t.plan(1);
  const program = [
    3,
    31,
    3,
    32,
    1002,
    32,
    10,
    32,
    1001,
    31,
    -2,
    31,
    1007,
    31,
    0,
    33,
    1002,
    33,
    7,
    33,
    1,
    33,
    31,
    31,
    1,
    32,
    31,
    31,
    4,
    31,
    99,
    0,
    0,
    0
  ];
  t.equal(d7.part1(program), 65210);
});
