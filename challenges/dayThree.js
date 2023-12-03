const findParts = (input) => {
  const { finds, dupes } = parseInput(input);

  const parts = [];
  const digit = /\d/;

  finds.forEach((symbol) => {
    const { symbolIndex, row } = symbol;

    const topLeft = dupes[row - 1][symbolIndex - 1];
    const topMid = dupes[row - 1][symbolIndex];
    const topRight = dupes[row - 1][symbolIndex + 1];
    const currLeft = dupes[row][symbolIndex - 1];
    const currRight = dupes[row][symbolIndex + 1];
    const bottomLeft = dupes[row + 1][symbolIndex - 1];
    const bottomMid = dupes[row + 1][symbolIndex];
    const bottomRight = dupes[row + 1][symbolIndex + 1];
    const window = new Set([
      topLeft,
      topMid,
      topRight,
      currLeft,
      currRight,
      bottomLeft,
      bottomMid,
      bottomRight,
    ]);

    window.forEach((part) => {
      if (part !== ".") {
        parts.push(Number(part));
      }
    });
  });
  let sum = 0;
  parts.forEach((part) => {
    sum += part;
  });
  return sum;
};

const parseInput = (input) => {
  // find all symbol index and row
  const finds = findSymbols(input);
  // make each index with a digit the full number
  const dupes = dupeNumbers(input);
  return { finds, dupes };
};

const findSymbols = (input) => {
  const rows = input.split("\n");

  // find index and row of all symbols in input
  const finds = [];
  rows.forEach((row, index) => {
    const findSymbol = [...row.matchAll(/[^\d|.]/g)];
    if (findSymbol.length !== 0) {
      findSymbol.forEach((find) => {
        const foundSymbols = {};
        foundSymbols.symbolIndex = find.index;
        foundSymbols.row = index;
        finds.push(foundSymbols);
      });
    }
  });
  return finds;
};

const dupeNumbers = (input) => {
  const rows = input.split("\n");

  const lines = rows.map((row, index) => {
    const rowArr = row.split("");
    let numString = "";
    let tempIndexes = [];
    const swaps = [];
    const digitRegex = /\d/;
    for (let i = 0; i < rowArr.length; i++) {
      const char = rowArr[i];
      if (digitRegex.test(char)) {
        numString += char;
        tempIndexes.push(i);
      } else {
        if (numString.length > 0) {
          swaps.push([numString, tempIndexes]);
          numString = "";
          tempIndexes = [];
        }
      }
    }
    if (swaps.length > 0) {
      swaps.forEach((swap) => {
        const [string, locations] = swap;
        locations.forEach((location) => {
          rowArr[location] = string;
        });
      });
    }
    return rowArr;
  });
  return lines;
};

const fs = require("fs");
const input = fs.readFileSync("./inputs/dayThree.txt", "utf8");

console.log(
  findParts(`467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..`)
);
// console.log(findParts(input));
