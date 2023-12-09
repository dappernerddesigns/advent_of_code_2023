const oasisTracker = require("../challenges/dayNine");

describe("Oasis tracker", () => {
  test("When given a row of zeros, recursive step stops", () => {
    expect(oasisTracker([0, 0, 0, 0])).toBe(0);
  });
  test("When given a row of all the same number, extrapolates the final number should also be the same", () => {
    expect(oasisTracker([3, 3, 3, 3])).toBe(3);
  });
  test.only("Correctly identifies the next value on a simple range", () => {
    expect(oasisTracker([0, 3, 6, 9, 12, 15])).toBe(18);
    expect(oasisTracker([1, 3, 6, 10, 15, 21])).toBe(28);
    expect(oasisTracker([10, 13, 16, 21, 30, 45])).toBe(68);
  });
});
