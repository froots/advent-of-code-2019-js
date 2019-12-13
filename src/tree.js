class Tree {
  constructor() {
    this.nodes = [];
  }

  addNode(id) {
    let node = this.getNode(id);

    if (node === null) {
      node = new Node(id);
      this.nodes = [...this.nodes, node];
    }

    return node;
  }

  getNode(id) {
    let nodes = this.nodes.filter(node => node.id === id);
    if (nodes.length > 0) {
      return nodes[0];
    } else {
      return null;
    }
  }

  createRelationship(parent, child) {
    parent.children.push(child);
    child.parent = parent;
  }

  commonNode(node1, node2) {
    const commonNodes = union(
      [node1, ...node1.ancestors()],
      [node2, ...node2.ancestors()]
    );
    if (commonNodes.length === 0) {
      return null;
    } else {
      return commonNodes[0];
    }
  }

  jumpsBetween(lower, higher) {
    let jumps = 0;
    let current = lower;
    while (current.parent !== higher) {
      current = current.parent;
      jumps += 1;
    }
    return jumps;
  }

  get count() {
    return this.nodes.length;
  }

  get totalAncestorCount() {
    return this.nodes.reduce((sum, node) => node.ancestorCount + sum, 0);
  }
}

class Node {
  constructor(id) {
    this.id = id;
    this.children = [];
    this.parent = null;
  }

  get ancestorCount() {
    if (!this.parent) {
      return 0;
    }
    return 1 + this.parent.ancestorCount;
  }

  ancestors() {
    if (!this.parent) {
      return [];
    }
    return [this.parent, ...this.parent.ancestors()];
  }
}

function union(collection1, collection2) {
  let result = [];
  for (i1 of collection1) {
    for (i2 of collection2) {
      if (i1 === i2) {
        result.push(i1);
      }
    }
  }
  return result;
}

module.exports = Tree;
