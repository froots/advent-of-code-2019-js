const OPERATION = {
  ADD: 1,
  PRODUCT: 2,
  INPUT: 3,
  OUTPUT: 4,
  HALT: 99
};

class Intcode {
  constructor() {
    this.memory = null;
    this.instructionPointer = null;
    this.history = [];
    this.final = [];
    this.input = null;
    this.output = [];
  }

  load(program) {
    this.memory = [...program];
    this.history = [];
    this.final = [];
    this.instructionPointer = 0;
    this.ouput = [];
  }

  run() {
    this.history = [...this];
    return this.memory;
  }

  *[Symbol.iterator]() {
    let p1, p2, p3;

    let iterator = () => {
      switch (this.readOffset(0)) {
        case OPERATION.ADD:
          [p1, p2, p3] = this.getParams(3);
          this.write(p3, this.read(p1) + this.read(p2));
          this.moveInstructionPointer(4);
          return this.memory;

        case OPERATION.PRODUCT:
          [p1, p2, p3] = this.getParams(3);
          this.write(p3, this.read(p1) * this.read(p2));
          this.moveInstructionPointer(4);
          return this.memory;

        case OPERATION.INPUT:
          if (this.input === null) {
            throw new Error(
              'Input instruction encountered but no input value provided.'
            );
          }
          [p1] = this.getParams(1);
          this.write(p1, this.input);
          this.moveInstructionPointer(2);
          return this.memory;

        case OPERATION.OUTPUT:
          [p1] = this.getParams(1);
          this.output = [...this.output, this.read(p1)];
          this.moveInstructionPointer(2);
          return this.memory;

        case OPERATION.HALT:
          this.final = [...this.memory];
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

  moveInstructionPointer(offset) {
    this.instructionPointer += offset;
  }

  read(address) {
    const val = this.memory && this.memory[address];
    if (val !== null) {
      return val;
    } else {
      throw new Error('Null pointer exception!');
    }
  }

  readOffset(offset) {
    return this.read(this.instructionPointer + offset);
  }

  getParams(count) {
    let params = [];
    for (let i = 0; i < count; i++) {
      params.push(this.readOffset(i + 1));
    }
    return params;
  }

  write(address, val) {
    let memory = [...this.memory];
    memory[address] = val;
    this.memory = memory;
  }
}

module.exports = Intcode;
