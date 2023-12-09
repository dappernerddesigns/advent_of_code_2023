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
      const recursiveResult = oasisTracker(differences);

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
      return row
        .split(/\s+/)
        .map((num) => Number(num))
        .reverse(); // omit this for part one
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
