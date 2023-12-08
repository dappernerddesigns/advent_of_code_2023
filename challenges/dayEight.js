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
const fs = require("fs");
const bigInput = fs.readFileSync("./inputs/dayEight.txt", "utf8");
traverseDesert(bigInput);
