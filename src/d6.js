const Tree = require('./tree.js');

function run(data) {
  let pairs = parse(data);
  let tree = createTreeFromData(pairs);
  console.log('Day 6:1: ', part1(tree));
  console.log('Day 6:2: ', part2(tree));
}

function parse(data) {
  return data
    .split('\n')
    .filter(line => !!line)
    .map(line => line.trim().split(')'));
}

function createTreeFromData(pairs) {
  let tree = new Tree();
  for ([left, right] of pairs) {
    let parent = tree.addNode(left);
    let child = tree.addNode(right);
    tree.createRelationship(parent, child);
  }
  return tree;
}

function part1(tree) {
  return tree.totalAncestorCount;
}

function part2(tree) {
  let you = tree.getNode('YOU');
  let santa = tree.getNode('SAN');
  let commonNode = tree.commonNode(you, santa);
  if (commonNode.length === 0) {
    return 'No common ancestor';
  }
  return (
    tree.jumpsBetween(you, commonNode) + tree.jumpsBetween(santa, commonNode)
  );
}

module.exports = { run, parse, createTreeFromData, part1, part2 };
