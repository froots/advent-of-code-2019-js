const test = require('tape');
const Tree = require('../src/tree.js');

test('Tree: addNode', t => {
  t.plan(2);
  const tree = new Tree();
  const node = tree.addNode('COM');
  t.equal(tree.count, 1, 'Tree count is correct');
  t.equal(tree.getNode('COM'), node, 'Retrieved node is created node');
});
