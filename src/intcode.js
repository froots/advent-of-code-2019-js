class Intcode {
  constructor(program) {
    this.program = program;
  }

  run() {
    if (!this.program) {
      throw new Error('No program loaded');
    }
  }
}

module.exports = Intcode;
