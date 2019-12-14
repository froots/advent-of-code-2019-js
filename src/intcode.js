const OPS = {
  ADD: 1,
  PRODUCT: 2,
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
    debugger;
    for (let result of this) {
      this.history.push([...result]);
    }
    return this.program;
  }

  *[Symbol.iterator]() {
    let p1, p2, p3;

    let iterator = () => {
      switch (this.getMemOffset(0)) {
        case OPS.ADD:
          [p1, p2, p3] = this.getParams(3);
          this.setMem(p3, this.program[p1] + this.program[p2]);
          this.pointer += 4;
          return this.program;

        case OPS.PRODUCT:
          [p1, p2, p3] = this.getParams(3);
          this.setMem(p3, this.program[p1] * this.program[p2]);
          this.pointer += 4;
          return this.program;

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

  getMem(pointer) {
    const val = this.program && this.program[pointer];
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

  setMem(pointer, val) {
    let program = [...this.program];
    program[pointer] = val;
    this.program = program;
  }
}

module.exports = Intcode;
