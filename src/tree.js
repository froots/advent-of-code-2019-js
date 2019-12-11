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
}

module.exports = Tree;
