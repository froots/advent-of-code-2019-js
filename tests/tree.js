const test = require('tape');
const Tree = require('../src/tree.js');

test('Tree: addNode', t => {
  t.plan(2);
  const tree = new Tree();
  const node = tree.addNode('COM');
  t.equal(tree.count, 1, 'Tree count is correct');
  t.equal(tree.getNode('COM'), node, 'Retrieved node is created node');
});

test('Tree: addNode does not add duplicate', t => {
  t.plan(1);
  const tree = new Tree();
  const node1 = tree.addNode('COM');
  const node2 = tree.addNode('COM');
  t.equal(tree.count, 1, 'Tree count is still 1');
});

test('Tree: addChild', t => {
  t.plan(4);
  const tree = new Tree();
  const parent = tree.addNode('COM');
  const child = tree.addNode('B');
  tree.createRelationship(parent, child);
  t.equal(parent.children.length, 1);
  t.equal(parent.children[0], child);
  t.equal(child.parent, parent);
  t.equal(tree.count, 2);
});
