const boatRace = (input) => {
  const [timesRow, distancesRow] = input.split("\n");
  const times = parseInput(timesRow);
  const distances = parseInput(distancesRow);

  const winCounts = [];
  for (let i = 0; i < times.length; i++) {
    const time = times[i];
    const maxDistance = distances[i];
    const possibleWinTimes = [];
    let buttonPress = 0;
    let boatSpeed = 0;

    while (buttonPress <= time) {
      const timeLeft = time - buttonPress;
      const boatDistance = boatSpeed * timeLeft;
      if (boatDistance > maxDistance) possibleWinTimes.push(boatDistance);
      boatSpeed++;
      buttonPress++;
    }
    winCounts.push(possibleWinTimes.length);
  }
  let result = 1;
  for (let i = 0; i < winCounts.length; i++) {
    result = result * winCounts[i];
  }
  console.log(result);
  return result;
};

const parseInput = (row) => {
  const digit = /\d/;
  return row
    .split(" ")
    .filter((digits) => digit.test(digits))
    .map((num) => Number(num));
};
const testInput = `Time:      7  15   30
Distance:  9  40  200`;
const puzzleInput = `Time:        55     99     97     93
Distance:   401   1485   2274   1405`;
boatRace(puzzleInput);
