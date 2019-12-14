const OPS = {
  ADD: 1,
  PRODUCT: 2,
  HALT: 99
};

class Intcode {
  constructor() {
    this.memory = null;
    this.pointer = null;
    this.history = [];
  }

  load(program) {
    this.memory = [...program];
    this.pointer = 0;
  }

  run() {
    for (let result of this) {
      this.history.push([...result]);
    }
    return this.memory;
  }

  *[Symbol.iterator]() {
    let p1, p2, p3;

    let iterator = () => {
      switch (this.getMemOffset(0)) {
        case OPS.ADD:
          [p1, p2, p3] = this.getParams(3);
          this.setMem(p3, this.getMem(p1) + this.getMem(p2));
          this.pointer += 4;
          return this.memory;

        case OPS.PRODUCT:
          [p1, p2, p3] = this.getParams(3);
          this.setMem(p3, this.getMem(p1) * this.getMem(p2));
          this.pointer += 4;
          return this.memory;

        case OPS.HALT:
          return false;

        default:
          throw new Error('Unknown operation!');
      }
    };

    let result = iterator();

    while (result) {
      yield result;
      result = iterator();
    }
  }

  getMem(address) {
    const val = this.memory && this.memory[address];
    if (val !== null) {
      return val;
    } else {
      throw new Error('Null pointer exception!');
    }
  }

  getMemOffset(pointerOffset) {
    return this.getMem(this.pointer + pointerOffset);
  }

  getParams(count) {
    let params = [];
    for (let i = 0; i < count; i++) {
      params.push(this.getMemOffset(i + 1));
    }
    return params;
  }

  setMem(address, val) {
    let memory = [...this.memory];
    memory[address] = val;
    this.memory = memory;
  }
}

module.exports = Intcode;
