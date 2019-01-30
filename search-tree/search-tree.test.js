import { buildPossibleNodesForNode } from "./search-tree";
import Node from "./node";
import Game from "../Game";

describe("searchTree", () => {
  describe("buildPossibleNodesForNode", () => {
    describe("emptyGameState input", () => {
      it("should return a node with 9 possible nodes", () => {
        const emptyGameState = Game();
        const testNode = Node({ gameState: emptyGameState });
        const builtNode = buildPossibleNodesForNode({ node: testNode });
        expect(builtNode.getPossibleNodes()).toHaveLength(9);
      });
    });
  });
});
