import Node from "./node";
import Game from "../Game";

describe("Node module", () => {
  describe("Initialisation", () => {
    it("should return me an object, if given a validGameState object", () => {
      const testNode = Node({ gameState: Game() });
      const typeOfTestNode = typeof testNode;
      expect(typeOfTestNode).toBe("object");
    });

    it("should be able to retrieve the possibleNode we passed into the function as parameters", () => {
      const testChildNode = Node({ gameState: Game() });
      const testNode = Node({
        gameState: Game(),
        possibleNodes: [testChildNode]
      });
      expect(testNode.getPossibleNodes()[0]).toMatchObject(testChildNode);
    });
  });

  describe("getGameState", () => {
    it("should return a gameStateObject", () => {
      const testNode = Node({ gameState: Game() });
      const receivedGameState = testNode.getGameState();
      expect(receivedGameState.getCurrentPlayer()).not.toBe(undefined);
    });
  });
});
