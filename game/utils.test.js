import { areIndexesTakenForPlayer } from "./utils";
describe("util functions", () => {
  describe("areIndexesTakenForPlayer", () => {
    it("should return true if all indexes in array for a given board are the same value as the player value passed", () => {
      const indexes = [0, 1, 2];
      const testResult1 = areIndexesTakenForPlayer({
        indexArray: indexes,
        player: 1,
        board: [1, 1, 1]
      });
      const testResult2 = areIndexesTakenForPlayer({
        indexArray: indexes,
        player: 2,
        board: [2, 2, 2]
      });
      const testResult3 = areIndexesTakenForPlayer({
        indexArray: indexes,
        player: 3,
        board: [3, 3, 3]
      });

      expect(testResult1).toBe(true);
      expect(testResult2).toBe(true);
      expect(testResult3).toBe(true);
    });
  });
});
