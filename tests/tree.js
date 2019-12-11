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
  t.plan(2);
  const tree = new Tree();
  const node1 = tree.addNode('COM');
  const node2 = tree.addNode('COM');
  t.equal(tree.count, 1, 'Tree count is still 1');
  t.equal(node1, node2, 'addNode gets existing nodes');
});

test('Tree: createRelationship', t => {
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

test('Tree: count ancestors', t => {
  t.plan(1);
  const tree = new Tree();
  const COM = tree.addNode('COM');
  const A = tree.addNode('A');
  const B = tree.addNode('B');
  const C = tree.addNode('C');
  const D = tree.addNode('D');
  const E = tree.addNode('E');
  tree.createRelationship(COM, A); // A => COM = 1
  tree.createRelationship(COM, B); // B => COM = 1
  tree.createRelationship(B, C); // C => B => COM = 2
  tree.createRelationship(A, D); // D => A => COM = 2
  tree.createRelationship(A, E); // E => A => COM = 2
  t.equal(tree.totalAncestorCount, 8);
});
