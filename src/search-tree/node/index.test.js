import Node from "./index";
import Game from "../../game";
import { PLAYERS } from "../../entities";

const gamePlayers = [PLAYERS.get("BLUE"), PLAYERS.get("RED")];

const mockBuildPossibleNodesCreator = () => {
  let finishedSearching = false;

  return () => {
    if (!finishedSearching) {
      finishedSearching = true;
      return true;
    }
    return false;
  };
};

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

    it("should return the action passed to the node", () => {
      const testChildNode = Node({ gameState: Game() });
      const testAction = 1;
      const testNode = Node({
        gameState: Game(),
        possibleNodes: [testChildNode],
        action: testAction
      });
      expect(testNode.action).toBe(testAction);
    });
  });

  describe("getGameState", () => {
    it("should return a gameStateObject", () => {
      const testNode = Node({ gameState: Game() });
      const receivedGameState = testNode.getGameState();
      expect(receivedGameState.getCurrentPlayer()).not.toBe(undefined);
    });
  });

  describe("utility value", () => {
    it("should return 9 if the current state is a win state for the player", () => {
      const myGame = Game();
      myGame.makeMove(0);
      myGame.makeMove(3);
      myGame.makeMove(1);
      myGame.makeMove(4);
      myGame.makeMove(2);
      const myNode = Node({
        gameState: myGame,
        currentPlayer: myGame.getOtherPlayer()
      });
      expect(myNode.getUtility()).toBe(100);
    });

    it("should return -100 if current state is win state for other player", () => {
      const myGame = Game(undefined, gamePlayers);
      myGame.makeMove(0);
      myGame.makeMove(3);
      myGame.makeMove(1);
      myGame.makeMove(4);
      myGame.makeMove(2);
      const myNode = Node({ gameState: myGame, currentPlayer: gamePlayers[1] });
      expect(myNode.getUtility()).toBe(-100);
    });

    it("should return 0 if the current state is not a win state", () => {
      const myGame = Game(undefined, gamePlayers);
      const myNode = Node({ gameState: myGame });
      expect(myNode.getUtility()).toBe(0);
    });
  });

  describe("buildPossibleNodesForNode", () => {
    describe("emptyGameState input", () => {
      it("should return a node with 9 possible nodes", () => {
        const emptyGameState = Game();
        const testNode = Node({
          gameState: emptyGameState,
          shouldBuildPossibleNodes: mockBuildPossibleNodesCreator()
        });
        expect(testNode.getPossibleNodes()).toHaveLength(9);
      });

      it("should return the corresponding action", () => {
        const emptyGameState = Game();
        const testNode = Node({
          gameState: emptyGameState,
          shouldBuildPossibleNodes: mockBuildPossibleNodesCreator()
        });
        expect(testNode.getPossibleNodes()[3].action).toBe(3);
      });

      it("should return 9 states where the user has made a different move", () => {
        const emptyGameState = Game();

        const testNode = Node({
          gameState: emptyGameState,
          shouldBuildPossibleNodes: mockBuildPossibleNodesCreator()
        });
        const possibleNodes = testNode.getPossibleNodes();

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
        const testNode = Node({
          gameState,
          shouldBuildPossibleNodes: mockBuildPossibleNodesCreator()
        });
        expect(testNode.getPossibleNodes()).toHaveLength(8);
      });

      it("should return 8 states with different moves if a move has already been made", () => {
        const gameState = Game();
        gameState.makeMove(1);
        const testNode = Node({
          gameState,
          shouldBuildPossibleNodes: mockBuildPossibleNodesCreator()
        });
        const possibleNodes = testNode.getPossibleNodes();

        const indexesMovedInto = possibleNodes.map(node => {
          return node
            .getGameState()
            .getBoard()
            .findIndex(
              value => value === testNode.getGameState().getPlayers()[1]
            );
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

  describe("getUtilityOfPossibleNodes", () => {
    it("should return the sum of utilities of possibleNodes for empty state", () => {
      const testGame = Game();
      const testNode = Node({
        gameState: testGame,
        shouldBuildPossibleNodes: mockBuildPossibleNodesCreator()
      });

      const expectedValue = testNode
        .getPossibleNodes()
        .reduce((sum, node) => (sum += node.getUtility()), 0);

      expect(testNode.getUtilityForPossibleNodes()).toBe(expectedValue);
    });

    it("should return the sum of utilities of possibleNodes for node with possibleNodes with win state", () => {
      const testGame = Game();
      testGame.makeMove(1);
      testGame.makeMove(2);
      testGame.makeMove(3);
      testGame.makeMove(4);
      testGame.makeMove(5);

      const testNode = Node({
        gameState: testGame,
        shouldBuildPossibleNodes: mockBuildPossibleNodesCreator()
      });

      const expectedValue = testNode
        .getPossibleNodes()
        .reduce((sum, node) => (sum += node.getUtility()), 0);

      expect(testNode.getUtilityForPossibleNodes()).toBe(expectedValue);
    });

    it("should return 13  if win state available in possibleNodes", () => {
      const myGame = Game();
      myGame.makeMove(3);
      myGame.makeMove(7);
      myGame.makeMove(5);
      myGame.makeMove(2);

      const testNode = Node({
        gameState: myGame,
        shouldBuildPossibleNodes: mockBuildPossibleNodesCreator()
      });

      expect(testNode.getUtilityForPossibleNodes()).toBe(13);
    });
  });
});
