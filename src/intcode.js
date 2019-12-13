const OPS = {
  ADD: 1,
  HALT: 99
};

class Intcode {
  constructor() {
    this.program = null;
    this.pointer = null;
    this.history = [];
  }

  load(program) {
    this.program = [...program];
    this.pointer = 0;
  }

  run() {
    for (let result of this) {
      this.history.push([...result]);
    }
    return this.program;
  }

  *[Symbol.iterator]() {
    switch (this.getMemOffset(0)) {
      case OPS.ADD:
        let p1 = this.getMemOffset(1);
        let p2 = this.getMemOffset(2);
        let p3 = this.getMemOffset(3);
        this.setMem(p3, p1 + p2);
        this.pointer += 4;
        yield this.program;
      case OPS.HALT:
        return false;
      default:
        throw new Error('Unknown operation!');
    }
  }

  getMem(pointer) {
    const val = this.program && this.program[pointer];
    if (val) {
      return val;
    } else {
      throw new Error('Null pointer exception!');
    }
  }

  getMemOffset(pointerOffset) {
    return this.getMem(this.pointer + pointerOffset);
  }

  setMem(pointer, val) {
    let program = [...this.program];
    program[pointer] = val;
    this.program = program;
  }
}

module.exports = Intcode;
