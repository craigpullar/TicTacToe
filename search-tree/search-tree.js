import { flatten } from "ramda";
import Node from "./node.js";
import Game from "../game";

export const buildPossibleNodesForNode = ({ node }) => {
  const possibleNextNodes = [0, 1, 2, 3, 4, 5, 6, 7, 8].reduce(
    (accumulator, value) => {
      try {
        const game = node.getGameState();
        const newGame = Game(game.getBoard(), game.getPlayers());
        newGame.makeMove(value);
        return [...accumulator, Node({ gameState: { ...newGame } })];
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

export const getNextMoveForGameState = ({ gameState }) => {};
