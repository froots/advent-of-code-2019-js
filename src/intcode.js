const OPERATION = {
  ADD: 1,
  PRODUCT: 2,
  INPUT: 3,
  OUTPUT: 4,
  JUMP_IF_TRUE: 5,
  JUMP_IF_FALSE: 6,
  LESS_THAN: 7,
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
    this.output = [];
  }

  run() {
    this.history = [...this];
    return this.memory;
  }

  parseInstruction() {
    let instruction = this.readOffset(0);
    const m3 = Boolean(Math.floor(instruction / 10000));
    instruction = instruction % 10000;
    const m2 = Boolean(Math.floor(instruction / 1000));
    instruction = instruction % 1000;
    const m1 = Boolean(Math.floor(instruction / 100));
    const opcode = instruction % 100;
    return [opcode, m1, m2, m3];
  }

  *[Symbol.iterator]() {
    let p1, p2, p3, res;

    let iterator = () => {
      let [opcode, m1, m2, m3] = this.parseInstruction();
      switch (opcode) {
        case OPERATION.ADD:
          [p1, p2, p3] = this.getParams([m1, m2, true]);
          res = p1 + p2;
          this.write(p3, res);
          this.moveInstructionPointer(4);
          return this.memory;

        case OPERATION.PRODUCT:
          [p1, p2, p3] = this.getParams([m1, m2, true]);
          res = p1 * p2;
          this.write(p3, res);
          this.moveInstructionPointer(4);
          return this.memory;

        case OPERATION.INPUT:
          if (this.input === null) {
            throw new Error(
              'Input instruction encountered but no input value provided.'
            );
          }
          [p1] = this.getParams([true]);
          this.write(p1, this.input);
          this.moveInstructionPointer(2);
          return this.memory;

        case OPERATION.OUTPUT:
          this.output = [...this.output, ...this.getParams([m1])];
          this.moveInstructionPointer(2);
          return this.memory;

        case OPERATION.JUMP_IF_TRUE:
          [p1, p2] = this.getParams([m1, m2]);
          if (p1 > 0) {
            this.instructionPointer = p2;
          } else {
            this.moveInstructionPointer(3);
          }
          return this.memory;

        case OPERATION.JUMP_IF_FALSE:
          [p1, p2] = this.getParams([m1, m2]);
          if (p1 > 0) {
            this.moveInstructionPointer(3);
          } else {
            this.instructionPointer = p2;
          }
          return this.memory;

        case OPERATION.LESS_THAN:
          [p1, p2, p3] = this.getParams([m1, m2, true]);
          this.write(p3, p1 < p2 ? 1 : 0);
          this.moveInstructionPointer(4);
          return this.memory;

        case OPERATION.HALT:
          this.final = [...this.memory];
          return false;

        default:
          throw new Error(
            'Unknown operation: ' + opcode + ', ' + m1 + ', ' + m2 + ', ' + m3
          );
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

  getParams(modes) {
    return modes.map((mode, i) => {
      let val = this.readOffset(i + 1);
      return mode ? val : this.read(val);
    });
  }

  write(address, val) {
    let memory = [...this.memory];
    memory[address] = val;
    this.memory = memory;
  }
}

module.exports = Intcode;
