const seedLocator = (input) => {
  const seedMap = parseInput(input);
  const seeds = seedMap.seeds;
  delete seedMap.seeds;
  const locations = [];

  seeds.forEach((seed) => {
    const mapped = {};
    let currValue = seed;
    for (const map in seedMap) {
      const maps = seedMap[map];
      const [currKey, _, nextKey] = map.split("-");
      let currValueChange = false;
      for (let i = 0; i < maps.length; i++) {
        const { destinationStart, sourceStart, range } = maps[i];
        const inRange =
          currValue >= sourceStart && currValue <= sourceStart + range;

        if (inRange) {
          const difference = currValue - sourceStart;

          mapped[nextKey] = destinationStart + difference;
          currValueChange = true;
          break;
        }
      }
      currValueChange
        ? (currValue = mapped[nextKey])
        : (mapped[nextKey] = currValue);
    }
    locations.push(mapped.location);
  });
  console.log(Math.min(...locations));
  return Math.min(...locations);
};

const parseInput = (input) => {
  const parsedOutput = {};
  const blocks = input.split("\n\n");
  // find seeds
  const [_, seeds] = blocks.shift().split(": ");
  parsedOutput.seeds = seeds.split(" ").map((seed) => Number(seed));
  const objectBuilder = (str) => {
    return str
      .split("\n")
      .filter((row) => row !== "")
      .map((row) => {
        const nums = row.split(" ");
        return {
          destinationStart: Number(nums[0]),
          sourceStart: Number(nums[1]),
          range: Number(nums[2]),
        };
      });
  };
  // make maps
  blocks.forEach((block) => {
    const [key, map] = block.split(" map:");
    const mapArr = objectBuilder(map);
    parsedOutput[key] = mapArr;
  });

  return parsedOutput;
};

const fs = require("fs");
const bigInput = fs.readFileSync("./inputs/dayFive.txt", "utf8");

seedLocator(bigInput);
module.exports = { seedLocator };
