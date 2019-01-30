import Node from "./node.js";
import Game from "../Game.js";

export const buildPossibleNodesForNode = ({ node }) => {
  const game = node.getGameState();
  const possibleNextNodes = [0, 1, 2, 3, 4, 5, 6, 7, 8].reduce(
    (accumulator, value, index) => {
      try {
        game.makeMove(value);
        return [...accumulator, Node({ gameState: { ...game } })];
      } catch (error) {
        return accumulator;
      }
    },
    []
  );
  return Node({
    gameState: node.getGameState(),
    possibleNodes: possibleNextNodes
  });
};

export const buildTreeForGameState = ({ gameState, levels }) => {
  const initialNode = Node({ gameState });
};
