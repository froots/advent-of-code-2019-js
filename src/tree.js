class Tree {
  constructor() {
    this.nodes = [];
  }

  addNode(id) {
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

  get count() {
    return this.nodes.length;
  }
}

class Node {
  constructor(id) {
    this.id = id;
  }
}

module.exports = Tree;
