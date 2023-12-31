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

  console.log(handGroups);
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
  const valueMap = {
    2: "A",
    J: "B",
    3: "C",
    4: "D",
    5: "E",
    6: "F",
    7: "G",
    8: "H",
    9: "I",
    T: "J",
    Q: "K",
    K: "L",
    A: "M",
  };

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

  if (cards.includes("J")) {
    const cardGroups = Object.entries(counter);
    let highCardCount = 0;
    let highestCard = "";

    cardGroups.forEach(([card, count]) => {
      if (count > highCardCount) {
        highCardCount = count;
        highestCard = card;
      }
    });
    const jokers = counter.J;
    counter[highestCard] += jokers;
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
const newPlayers = camelPoker(newPlayerData);
console.log(winnings(newPlayers));
