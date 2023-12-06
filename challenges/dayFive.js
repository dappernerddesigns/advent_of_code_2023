//part 1
const seedLocator = (input) => {
  const seedMap = parseInput(input);
  const seeds = seedMap.seeds;
  delete seedMap.seeds;
  let location = Infinity;

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
    if (mapped.location < location) {
      location = mapped.location;
    }
  });
  console.log(location);
  return location;
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

//part 2
const seedLocatorPartTwo = (input) => {
  const seedMap = parseInput(input);
  const seeds = seedMap.seeds;
  delete seedMap.seeds;
  let minLocation = Infinity;
  // reverse it? go from location to seed and check the range. Start with location zero, has a humitidy of what? So on and so forth
};

const miniInput = `seeds: 79 14 55 13

seed-to-soil map:
50 98 2
52 50 48

soil-to-fertilizer map:
0 15 37
37 52 2
39 0 15

fertilizer-to-water map:
49 53 8
0 11 42
42 0 7
57 7 4

water-to-light map:
88 18 7
18 25 70

light-to-temperature map:
45 77 23
81 45 19
68 64 13

temperature-to-humidity map:
0 69 1
1 0 69

humidity-to-location map:
60 56 37
56 93 4`;

const fs = require("fs");
const bigInput = fs.readFileSync("./inputs/dayFive.txt", "utf8");
seedLocatorPartTwo(bigInput);
module.exports = { seedLocator };
