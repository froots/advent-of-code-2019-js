class Tree {
  constructor() {
    this.nodes = [];
  }

  addNode(id) {
    if (this.getNode(id) !== null) {
      return false;
    }
    let node = new Node(id);
    this.nodes = [...this.nodes, node];
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
}

class Node {
  constructor(id) {
    this.id = id;
    this.children = [];
    this.parent = null;
  }
}

module.exports = Tree;
