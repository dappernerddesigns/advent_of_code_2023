// part one
const GREEN_CUBES = 13;
const RED_CUBES = 12;
const BLUE_CUBES = 14;

const viableGame = (input) => {
  const rolls = input.split(";");

  const results = [];
  rolls.forEach((roll) => {
    const diceRolls = {
      blue: 0,
      red: 0,
      green: 0,
    };
    const turn = roll.split(", ");

    for (let i = 0; i < turn.length; i++) {
      const cleanTurn = turn[i].trim();
      const [count, colour] = cleanTurn.split(" ");
      diceRolls[colour] = Number(count);
    }

    if (
      diceRolls.blue <= BLUE_CUBES &&
      diceRolls.red <= RED_CUBES &&
      diceRolls.green <= GREEN_CUBES
    ) {
      results.push(true);
    } else {
      results.push(false);
    }
  });

  return results.every(Boolean);
};

const gameTally = (input) => {
  const gameRows = input.split("\n");
  const games = gameRows.map((row) => {
    return row.split(": ")[1];
  });
  let validTally = 0;
  games.forEach((game, index) => {
    const gameID = index + 1;
    viableGame(game) ? (validTally += gameID) : (validTally += 0);
  });
  return validTally;
};

// part two
const gameTallyPowers = (input) => {
  const gameRows = input.split("\n");
  const games = gameRows.map((row) => {
    return row.split(": ")[1];
  });

  let powers = 0;

  games.forEach((game) => {
    const diceRolls = {
      blue: 0,
      red: 0,
      green: 0,
    };
    const turn = game.split("; ");
    const turnRolls = turn.map((roll) => {
      return roll.split(", ");
    });

    turnRolls.forEach((turn) => {
      for (let i = 0; i < turn.length; i++) {
        const cleanTurn = turn[i];

        const [count, colour] = cleanTurn.split(" ");
        if (diceRolls[colour] < count) {
          diceRolls[colour] = Number(count);
        }
      }
    });
    const gamePower = diceRolls.blue * diceRolls.red * diceRolls.green;

    powers += gamePower;
  });
  return powers;
};

const fs = require("fs");

const gameInput = fs.readFileSync("./inputs/dayTwo.txt", "utf8");
console.log(gameTallyPowers(gameInput));
