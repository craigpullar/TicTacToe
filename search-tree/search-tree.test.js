import {
  buildPossibleNodesForNode,
  buildTreeForGameState
} from "./search-tree";
import Node from "./node";
import Game from "../game";

describe("searchTree", () => {
  describe("buildPossibleNodesForNode", () => {
    describe("emptyGameState input", () => {
      it("should return a node with 9 possible nodes", () => {
        const emptyGameState = Game();
        const testNode = Node({ gameState: emptyGameState });
        const builtNode = buildPossibleNodesForNode({ node: testNode });
        expect(builtNode.getPossibleNodes()).toHaveLength(9);
      });

      it("should return 9 states where the user has made a different move", () => {
        const emptyGameState = Game();
        const testNode = Node({ gameState: emptyGameState });
        const builtNode = buildPossibleNodesForNode({ node: testNode });
        const possibleNodes = builtNode.getPossibleNodes();

        const indexesMovedInto = possibleNodes.map(node => {
          return node
            .getGameState()
            .getBoard()
            .findIndex(value => value === node.getGameState().getPlayers()[0]);
        });

        const uniqueIndexes = indexesMovedInto.reduce((accumulator, value) => {
          return accumulator.includes(value)
            ? accumulator
            : [...accumulator, value];
        }, []);

        expect(indexesMovedInto.length).toBe(uniqueIndexes.length);
      });

      it("should return 9 states if a move has already been made", () => {
        const gameState = Game();
        gameState.makeMove(1);
        const testNode = Node({ gameState });
        const builtNode = buildPossibleNodesForNode({ node: testNode });
        expect(builtNode.getPossibleNodes()).toHaveLength(8);
      });

      it("should return 8 states with different moves if a move has already been made", () => {
        const gameState = Game();
        gameState.makeMove(1);
        const testNode = Node({ gameState });
        const builtNode = buildPossibleNodesForNode({ node: testNode });
        const possibleNodes = builtNode.getPossibleNodes();

        const indexesMovedInto = possibleNodes.map(node => {
          return node
            .getGameState()
            .getBoard()
            .findIndex(value => value === node.getGameState().getPlayers()[1]);
        });

        const uniqueIndexes = indexesMovedInto.reduce((accumulator, value) => {
          return accumulator.includes(value)
            ? accumulator
            : [...accumulator, value];
        }, []);

        expect(indexesMovedInto.length).toBe(uniqueIndexes.length);
      });
    });
  });
});
