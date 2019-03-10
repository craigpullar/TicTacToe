import Node from "./node";
import Game from "../game";
import { PLAYERS } from "../Entities";

const gamePlayers = [PLAYERS.get("BLUE"), PLAYERS.get("RED")];

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

  describe("utility function", () => {
    it("should return 1 if the current state is a win state", () => {
      const myGame = Game(undefined, gamePlayers);
      myGame.makeMove(0, gamePlayers[0]);
      myGame.makeMove(3, gamePlayers[1]);
      myGame.makeMove(1, gamePlayers[0]);
      myGame.makeMove(4, gamePlayers[1]);
      myGame.makeMove(2, gamePlayers[0]);
      const myNode = Node({ gameState: myGame });
      expect(myNode.utility).toBe(1);
    });

    it("should return 0 if the current state is not a win state", () => {
      const myGame = Game(undefined, gamePlayers);
      console.log(myGame.evalState());
      const myNode = Node({ gameState: myGame });
      expect(myNode.utility).toBe(0);
    });
  });
});
