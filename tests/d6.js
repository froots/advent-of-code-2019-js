const test = require('tape');
const d6 = require('../src/d6.js');

test('Parses orbit pairs', t => {
  t.plan(1);
  let data = 'COM)A\nA)B\nA)C\nB)D\nD)E';
  let parsed = d6.parse(data);
  t.equal(parsed.length, 5);
});

test('Part 1', t => {
  t.plan(1);
  let tree = d6.createTreeFromData([
    ['COM', 'A'],
    ['A', 'B'],
    ['A', 'C'],
    ['B', 'D'],
    ['D', 'E']
  ]);
  let totalAncestors = d6.part1(tree);
  t.equal(totalAncestors, 12);
});

test('Part 2', t => {
  t.plan(1);
  let data = [
    ['COM', 'B'],
    ['B', 'C'],
    ['C', 'D'],
    ['D', 'E'],
    ['E', 'F'],
    ['B', 'G'],
    ['G', 'H'],
    ['D', 'I'],
    ['E', 'J'],
    ['J', 'K'],
    ['K', 'L'],
    ['K', 'YOU'],
    ['I', 'SAN']
  ];
  let tree = d6.createTreeFromData(data);
  t.equal(d6.part2(tree), 4);
});
