const smallInput = `Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11`;

// part 1
const sanitiseNums = (nums) => {
  return nums.split(" ").filter((num) => {
    return num !== "";
  });
};

const findWinner = (card) => {
  const parts = card.split(": ");
  const nums = parts[1].split(" | ");
  const [myNums, winners] = nums;
  const myNumsClean = sanitiseNums(myNums);
  const winnersClean = sanitiseNums(winners);

  const winnerCount = myNumsClean.filter((num) =>
    winnersClean.includes(num)
  ).length;

  const score = winnerCount > 0 ? Math.pow(2, winnerCount - 1) : 0;

  return score;
};

const countWinners = (cards) => {
  const cardRows = cards.split("\n");
  let totalScore = 0;
  cardRows.forEach((row) => {
    totalScore += findWinner(row);
  });
  console.log(totalScore);
  return totalScore;
};

// part 2

const findWinCount = (card) => {
  const parts = card.split(": ");
  const nums = parts[1].split(" | ");
  const [myNums, winners] = nums;
  const myNumsClean = sanitiseNums(myNums);
  const winnersClean = sanitiseNums(winners);

  const winnerCount = myNumsClean.filter((num) =>
    winnersClean.includes(num)
  ).length;

  return winnerCount;
};

const countCards = (input) => {
  const cardsArr = input.split("\n");
  const cards = {};

  for (let i = 0; i < cardsArr.length; i++) {
    const card = cardsArr[i];
    const [gameNum, numbers] = card.split(": ");
    const winningArr = [];
    const winCount = findWinCount(card);
    const currCardNum = Number(gameNum.match(/\d+/)[0]);
    for (let j = 0; j < winCount; j++) {
      winningArr.push(`Card ${currCardNum + 1 + j}`);
    }
    cards[`Card ${currCardNum}`] = winningArr;
  }
  return cards;
};

const cardsWon = countCards(smallInput);

const countWinnings = (cardsWon) => {
  const wonCards = 0;

  for (const card in cardsWon) {
    const winnings = cardsWon[card];
  }
};
countWinnings(cardsWon);

const fs = require("fs");
const cards = fs.readFileSync("./inputs/dayFour.txt", "utf8");
