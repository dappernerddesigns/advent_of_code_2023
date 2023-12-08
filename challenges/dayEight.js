const traverseDesert = (input) => {
  const steps = input.split("\n").filter((line) => line !== "");
  const directions = steps.shift().replace(/\s/g, "");

  const locationsObject = {};
  steps.forEach((step) => {
    const [location, leftLocation, rightLocation] = step
      .split(/[^A-Z]/)
      .filter((ele) => ele !== "");

    locationsObject[location] = { L: leftLocation, R: rightLocation };
  });

  let currLocation = "AAA";
  let stepCount = 0;
  while (currLocation !== "ZZZ") {
    for (let i = 0; i < directions.length; i++) {
      const dir = directions[i];

      if (currLocation !== "ZZZ") {
        const nextLocation = locationsObject[currLocation][dir];
        currLocation = nextLocation;
        stepCount++;
      } else {
        break;
      }
    }
  }

  console.log(currLocation, stepCount);
};

// part 2

const ghostDesert = (input) => {
  const steps = input.split("\n").filter((line) => line !== "");
  const directions = steps.shift().replace(/\s/g, "");

  const locationsObject = {};
  steps.forEach((step) => {
    const [location, leftLocation, rightLocation] = step
      .split(/[^A-Z|0-9]/)
      .filter((ele) => ele !== "");

    locationsObject[location] = { L: leftLocation, R: rightLocation };
  });

  const startingLocations = Object.keys(locationsObject).filter((key) =>
    key.endsWith("A")
  );

  const stepsToZ = startingLocations.map((location) => {
    let currLocation = location;
    let stepCount = 0;
    while (!currLocation.endsWith("Z")) {
      for (let i = 0; i < directions.length; i++) {
        const dir = directions[i];

        if (!currLocation.endsWith("Z")) {
          const nextLocation = locationsObject[currLocation][dir];
          currLocation = nextLocation;
          stepCount++;
        } else {
          break;
        }
      }
    }
    return stepCount;
  });
  function gcd(a, b) {
    // Calculate the greatest common divisor using Euclid's algorithm
    while (b !== 0) {
      const temp = b;
      b = a % b;
      a = temp;
    }
    return a;
  }

  function lcm(a, b) {
    // Calculate the least common multiple using the formula: LCM(a, b) = (a * b) / GCD(a, b)
    return (a * b) / gcd(a, b);
  }

  function calculateLCM(numbers) {
    let result = numbers[0];

    for (let i = 1; i < numbers.length; i++) {
      result = lcm(result, numbers[i]);
    }

    return result;
  }

  console.log(calculateLCM(stepsToZ));
};
const fs = require("fs");
const bigInput = fs.readFileSync("./inputs/dayEight.txt", "utf8");

ghostDesert(bigInput);
