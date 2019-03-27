import { getNextGameState, getPossibleNodeForIndex } from "./utils";
import Game from "../../game";

describe("Utility functions", () => {
  describe("getNextGameState", () => {
    it("should return a the same gameState passed but with a move made in the index given", () => {
      const startingBoard = [0, 0, 1, 0, 0, 0, 0, 0, 0];
      const testGame = Game(startingBoard);
      const receivedGameState = getNextGameState({
        gameState: testGame,
        index: 1
      });
      const receivedBoard = receivedGameState.getBoard();
      receivedBoard.forEach((value, index) => {
        if (index === 1 || index === 2) {
          expect(value).toBe(1);
        } else {
          expect(value).toBe(0);
        }
      });
    });
  });

  describe("getPossibleNodeForIndex", () => {
    it("should return a node with the action as the index passed", () => {
      const testGame = Game();
      const receivedNode = getPossibleNodeForIndex({
        gameState: testGame,
        shouldBuildPossibleNodes: () => false,
        index: 1,
        currentPlayer: 1,
        currentDepth: 1
      });

      expect(receivedNode.action).toBe(1);
    });
  });
});
