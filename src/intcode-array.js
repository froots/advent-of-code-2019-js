const Intcode = require('./intcode.js');

class IntcodeArray {
  constructor() {
    this.head = null;
  }

  add(program, input) {
    const newNode = new IntcodeNode(program, input);
    if (this.head === null) {
      this.head = newNode;
    } else {
      let current = this.head;
      while (current.next !== null) {
        current = current.next;
      }
      current.next = newNode;
    }
  }

  get(index) {
    if (!this.head) {
      return null;
    }

    let current = this.head;

    for (let i = 0; i < index; i++) {
      if (!current.next) {
        return null;
      }
      current = current.next;
    }

    return current;
  }

  size() {
    if (!this.head) {
      return 0;
    }

    let s = 1;
    let current = this.head;

    while (current.next !== null) {
      current = current.next;
      s += 1;
    }

    return s;
  }

  run() {
    this.head.computer.run();
  }
}

class IntcodeNode {
  constructor(program, input = []) {
    this.next = null;
    this.computer = new Intcode();
    this.computer.load(program);
    this.computer.input = input;
  }
}

module.exports = IntcodeArray;
