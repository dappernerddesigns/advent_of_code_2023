const calibrator = (input) => {
  const lines = input.split("\n");
  let calibrationValueTotal = 0;

  lines.forEach((row) => {
    const numbers = row.replace(/\D/g, "");

    const firstLast = numbers[0] + numbers[numbers.length - 1];

    calibrationValueTotal += Number(firstLast);
  });
  return calibrationValueTotal;
};

// part 2

const reCalibrator = (input) => {
  const lines = input.split("\n");
  let calibrationValueTotal = 0;

  lines.forEach((row) => {
    row = overlapNums(row);
    row = validWordNums(row);
    const numbers = row.replace(/\D/g, "");
    const firstAndLast = `${numbers[0]}${numbers[numbers.length - 1]}`;

    calibrationValueTotal += Number(firstAndLast);
  });
  return calibrationValueTotal;
};

const validWordNums = (input) => {
  const validNum = /(one|two|three|four|five|six|seven|eight|nine)/g;
  const englishNums = {
    one: "1",
    two: "2",
    three: "3",
    four: "4",
    five: "5",
    six: "6",
    seven: "7",
    eight: "8",
    nine: "9",
  };

  const numberArr = input.match(validNum);
  // check input for english number and replace with digit
  if (numberArr !== null) {
    numberArr.forEach((num) => {
      input = input.replace(num, englishNums[num]);
    });
  }
  return input;
};

const overlapNums = (input) => {
  const overlaps =
    /(oneight|twone|threeight|fiveight|sevenine|eightwo|eighthree|nineight)/g;
  const matcherObject = {
    oneight: "oneeight",
    twone: "twoone",
    threeight: "threeeight",
    fiveight: "fiveeight",
    sevenine: "sevennine",
    eightwo: "eighttwo",
    eighthree: "eightthree",
    nineight: "nineeight",
  };

  // check for overlaps and replace with real text
  const validNums = input.match(overlaps);

  if (validNums !== null) {
    validNums.forEach((num) => {
      input = input.replace(num, matcherObject[num]);
    });
  }

  return input;
};

const fs = require("fs");

const input = fs.readFileSync("./inputs/dayOne.txt", "utf8");

console.log(reCalibrator(input));
