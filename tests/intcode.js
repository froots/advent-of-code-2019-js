const Intcode = require('../src/intcode.js');

const test = require('tape');

test('Intcode#new without program throws exception if run', t => {
  t.plan(1);
  const computer = new Intcode();
  t.throws(computer.run);
});
