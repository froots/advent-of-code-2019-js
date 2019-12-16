const day2 = require('./day2.js');
const day5 = require('./day5.js');
const day6 = require('./day6.js');

const [_, __, day] = process.argv;

const days = new Map();

days.set(2, day2);
days.set(5, day5);
days.set(6, day6);

if (day) {
  run(Number(day));
} else {
  runAll();
}

function run(day) {
  if (!days.has(day)) {
    console.error("Day doesn't exist");
  } else {
    days.get(day)();
  }
}

function runAll() {
  for (fn of days.values()) {
    fn();
  }
}
