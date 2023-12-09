const oasisTrackerNext = (oasis) => {
  const extrapolatedNums = [];

  if (oasis.every((num) => num === 0)) {
    extrapolatedNums.push(0);
  } else {
    const differences = [];

    for (let i = 0; i < oasis.length; i++) {
      if (oasis[i + 1] !== undefined) {
        differences.push(oasis[i + 1] - oasis[i]);
      }
    }

    const lastNum = differences[differences.length - 1];
    extrapolatedNums.push(lastNum);

    if (differences.some((num) => num !== 0)) {
      // Recursively call oasisTracker with the differences array
      const recursiveResult = oasisTracker(differences);

      // Add the result of the recursive call to extrapolatedNums
      extrapolatedNums.push(recursiveResult);
    }
  }
  const nextNum = extrapolatedNums.reduce((total, num) => total + num, 0);

  return nextNum;
};

const oasisTracker = (oasis) => {
  const extrapolatedNums = [];

  if (oasis.every((num) => num === 0)) {
    extrapolatedNums.push(0);
  } else {
    const differences = [];

    for (let i = 0; i < oasis.length; i++) {
      if (oasis[i + 1] !== undefined) {
        differences.push(oasis[i + 1] - oasis[i]);
      }
    }

    const lastNum = differences[differences.length - 1];
    extrapolatedNums.push(lastNum);

    if (differences.some((num) => num !== 0)) {
      // Recursively call oasisTracker with the differences array
      const recursiveResult = oasisTracker(differences);

      // Add the result of the recursive call to extrapolatedNums
      extrapolatedNums.push(recursiveResult);
    }
  }
  const nextNum = extrapolatedNums.reduce((total, num) => total + num, 0);

  return nextNum;
};

const trackAllOasis = (input) => {
  const rows = input
    .trim()
    .split("\n")
    .map((row) => {
      return row.split(/\s+/).map((num) => Number(num));
    });

  const assumedNums = rows.map((row) => {
    const finalNum = row[row.length - 1];
    const difference = oasisTracker(row);
    return finalNum + difference;
  });

  const sum = assumedNums.reduce((total, num) => total + num, 0);

  return sum;
};

const fs = require("fs");
const input = fs.readFileSync("./inputs/dayNine.txt", "utf8");
console.log(trackAllOasis(input));
module.exports = oasisTracker;
