const camelPoker = (hands) => {
  const handsArr = hands.split("\n");
  const sortedHandsArr = handSort(handsArr);
  const handsWithBids = sortedHandsArr.map((hands) => {
    const [hand, bid] = hands.split(" ");
    return [hand, Number(bid), cardCounter(hand)];
  });

  const rankings = [];
  const handGroups = {
    fiveOfAKind: [],
    fourOfAKind: [],
    fullHouse: [],
    threeOfAKind: [],
    twoPair: [],
    onePair: [],
    highCard: [],
  };
  handsWithBids.forEach(([hand, bid, count]) => {
    handGroups[count].push([hand, bid]);
  });

  for (const hand in handGroups) {
    while (handGroups[hand].length > 0) {
      const playedHand = handGroups[hand].pop();
      rankings.unshift(playedHand);
    }
  }

  return rankings;
};
const winnings = (rankings) => {
  let totalWinnings = 0;

  for (let i = 0; i < rankings.length; i++) {
    const rank = i + 1;
    const [_, bid] = rankings[i];
    const win = rank * bid;
    totalWinnings += win;
  }
  return totalWinnings;
};

const handSort = (hands) => {
  const valueMap = { T: "A", J: "B", Q: "C", K: "D", A: "E" };

  function customSort(a, b) {
    const getValue = (char) => valueMap[char] || char;

    for (let i = 0; i < Math.min(a.length, b.length); i++) {
      const aValue = getValue(a[i]);
      const bValue = getValue(b[i]);

      if (aValue !== bValue) {
        return aValue.localeCompare(bValue);
      }
    }

    return a.length - b.length;
  }

  const sortedArray = hands.sort(customSort);

  return sortedArray;
};

const cardCounter = (cards) => {
  const counter = {};
  for (let i = 0; i < cards.length; i++) {
    const card = cards[i];
    if (counter[card]) {
      counter[card]++;
    } else {
      counter[card] = 1;
    }
  }
  const counts = Object.values(counter);

  if (counts.includes(5)) {
    return "fiveOfAKind";
  } else if (counts.includes(4)) {
    return "fourOfAKind";
  } else if (counts.includes(3) && counts.includes(2)) {
    return "fullHouse";
  } else if (counts.includes(3) && !counts.includes(2)) {
    return "threeOfAKind";
  } else if (counts.filter((count) => count === 2).length === 2) {
    return "twoPair";
  } else if (counts.filter((count) => count === 2).length === 1) {
    return "onePair";
  } else {
    return "highCard";
  }
};

const fs = require("fs");
const newPlayerData = fs.readFileSync("./inputs/daySeven.txt", "utf8");
const newPlayers = camelPoker(`32T3K 765
T55J5 684
KK677 28
KTJJT 220
QQQJA 483`);
console.log(winnings(newPlayers));
