const test = require('tape');
const d2 = require('../src/d2.js');

test('Day 2 part 1', t => {
  t.plan(3);
  t.equal(d2.part1([1, 0, 0, 0, 99]), 2);
  t.equal(d2.part1([1, 1, 1, 4, 99, 5, 6, 0, 99]), 30);
  t.equal(d2.part1([1, 9, 10, 3, 2, 3, 11, 0, 99, 30, 40, 50]), 3500);
});

test('Day 2 part 2', t => {
  t.plan(1);
  t.equal(d2.part2([1, 1, 1, 3, 2, 3, 11, 0, 99, 30, 40, 50], 3500), 910);
});
