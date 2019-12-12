const test = require('tape');
const d6 = require('../src/d6.js');

test('Parses orbit pairs', t => {
  t.plan(1);
  let data = 'COM)A\nA)B\nA)C\nB)D\nD)E';
  let parsed = d6.parse(data);
  t.equal(parsed.length, 5);
});
