const test = require('tape');
const permute = require('../src/permute.js');

test('Permute', t => {
  t.plan(1);
  const input = [1, 2, 3];
  const expected = [
    [1, 2, 3],
    [1, 3, 2],
    [2, 1, 3],
    [2, 3, 1],
    [3, 1, 2],
    [3, 2, 1]
  ];
  t.deepEqual(permute(input), expected);
});
