class Intcode {
  constructor() {
    this.program = null;
    this.pointer = null;
  }

  load(program) {
    this.program = program;
    this.pointer = 0;
  }

  run() {
    if (!this.program) {
      throw new Error('No program loaded');
    }
  }
}

module.exports = Intcode;
