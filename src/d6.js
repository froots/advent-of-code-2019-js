const Tree = require('./tree.js');

function run(data) {
  let pairs = parse(data);
  console.log(part1(pairs));
}

function parse(data) {
  return data
    .split('\n')
    .filter(line => !!line)
    .map(line => line.trim().split(')'));
}

function part1(pairs) {
  let tree = new Tree();
  for ([left, right] of pairs) {
    let parent = tree.addNode(left);
    let child = tree.addNode(right);
    tree.createRelationship(parent, child);
  }
  return tree.totalAncestorCount;
}

module.exports = { run, parse };
