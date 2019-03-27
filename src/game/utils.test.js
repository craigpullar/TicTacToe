import {
  areIndexesTakenForPlayer,
  isNumberOfMovesFair,
  isBoardPositionInRange,
  errorFactory,
  reduceBoardToMoves
} from "./utils";
import { ERRORS } from "../entities";

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

  describe("isNumberOfMovesFair", () => {
    it("should return true if a is within 1 move of b", () => {
      expect(isNumberOfMovesFair(0, 1)).toBe(true);
    });

    it("should return true if b is within 1 move of a", () => {
      expect(isNumberOfMovesFair(5, 4)).toBe(true);
    });

    it("should return false if a is 2 moves ahead", () => {
      expect(isNumberOfMovesFair(6, 4)).toBe(false);
    });

    it("should return false if b is 2 moves ahead", () => {
      expect(isNumberOfMovesFair(3, 5)).toBe(false);
    });
  });

  describe("isBoardPositionInRange", () => {
    it("should return true if boardPosition is between 0 and 9", () => {
      expect(isBoardPositionInRange(0)).toBe(true);
      expect(isBoardPositionInRange(1)).toBe(true);
      expect(isBoardPositionInRange(2)).toBe(true);
      expect(isBoardPositionInRange(3)).toBe(true);
      expect(isBoardPositionInRange(4)).toBe(true);
      expect(isBoardPositionInRange(5)).toBe(true);
      expect(isBoardPositionInRange(6)).toBe(true);
      expect(isBoardPositionInRange(7)).toBe(true);
      expect(isBoardPositionInRange(8)).toBe(true);
    });

    it("should return false if boardPosition is outside of range 0 and 9", () => {
      expect(isBoardPositionInRange(-1)).toBe(false);
      expect(isBoardPositionInRange(-18)).toBe(false);
      expect(isBoardPositionInRange(678)).toBe(false);
      expect(isBoardPositionInRange(9)).toBe(false);
      expect(isBoardPositionInRange(10)).toBe(false);
      expect(isBoardPositionInRange(29392374)).toBe(false);
      expect(isBoardPositionInRange("a")).toBe(false);
      expect(isBoardPositionInRange(-2)).toBe(false);
      expect(isBoardPositionInRange(NaN)).toBe(false);
    });
  });

  describe("errorFactory", () => {
    it("should throw error if error is in error map", () => {
      const test = () => {
        errorFactory("BOARD_POSITION_RANGE");
      };
      expect(test).toThrow(ERRORS.get("BOARD_POSITION_RANGE"));
    });

    it("should throw an invalid error thrown error if error is not in map", () => {
      const test = () => {
        errorFactory("YOYO");
      };
      expect(test).toThrow("Invalid error thrown");
    });
  });

  describe("reduceBoardToMoves", () => {
    it("should increment index 0 if boardPosition equals 1", () => {
      const initialMovesArray = [0, 0];
      const players = [1, 2];
      const receivedMovesArray = reduceBoardToMoves(players)(
        initialMovesArray,
        1
      );
      expect(receivedMovesArray).toEqual([1, 0]);
    });

    it("should increment index 1 if boardPosition equals 2", () => {
      const initialMovesArray = [0, 0];
      const players = [1, 2];
      const receivedMovesArray = reduceBoardToMoves(players)(
        initialMovesArray,
        2
      );
      expect(receivedMovesArray).toEqual([0, 1]);
    });
  });
});
