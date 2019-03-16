import SearchTree from "./index";
import Game from "../game";
describe("searchTree", () => {
  it("should return a node", () => {
    const myGame = Game();
    const mySearchTree = SearchTree({ gameState: myGame });

    expect(mySearchTree.getGameState()).toEqual(myGame);
  });

  it("should return a tree 3 nodes deep if given a searchDepth of 3", () => {
    const myGame = Game();
    const mySearchTree = SearchTree({ gameState: myGame, searchDepth: 3 });
    let exampleNextNode = mySearchTree.getPossibleNodes()[0];
    exampleNextNode = exampleNextNode.getPossibleNodes()[0];
    exampleNextNode = exampleNextNode.getPossibleNodes()[0];

    expect(exampleNextNode.getPossibleNodes()).toEqual([]);
  });

  it("should return a tree 5 nodes deep if not given a searchDepth", () => {
    const myGame = Game();
    const mySearchTree = SearchTree({ gameState: myGame });
    let exampleNextNode = mySearchTree.getPossibleNodes()[0];
    exampleNextNode = exampleNextNode.getPossibleNodes()[0];
    exampleNextNode = exampleNextNode.getPossibleNodes()[0];
    exampleNextNode = exampleNextNode.getPossibleNodes()[0];
    exampleNextNode = exampleNextNode.getPossibleNodes()[0];

    expect(exampleNextNode.getPossibleNodes()).toEqual([]);
  });
});
