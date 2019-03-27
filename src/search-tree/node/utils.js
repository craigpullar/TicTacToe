import R from "ramda";
import Game from "../../game";
import Node from "./index";

export const getNextGameState = ({ gameState, index }) => {
  const newGame = Game(
    gameState.getBoard(),
    gameState.getPlayers(),
    gameState.getCurrentPlayer()
  );
  newGame.makeMove(index);
  return { ...newGame };
};

export const getPossibleNodeForIndex = ({
  gameState,
  shouldBuildPossibleNodes,
  currentPlayer,
  currentDepth,
  index
}) =>
  Node({
    gameState: getNextGameState({ gameState, index }),
    shouldBuildPossibleNodes,
    action: index,
    currentPlayer,
    currentDepth: R.inc(currentDepth)
  });

export const buildPossibleNodesForGameState = ({
  gameState,
  shouldBuildPossibleNodes,
  currentPlayer,
  currentDepth
}) => {
  const reduceIndexToPossibleNode = (possibleNodes, _, index) =>
    R.append(
      getPossibleNodeForIndex({
        gameState,
        shouldBuildPossibleNodes,
        currentDepth,
        currentPlayer,
        index
      }),
      possibleNodes
    );
  const getPossibleNodesCatcher = R.nthArg(1);
  const reduceWithIndex = R.addIndex(R.reduce);
  return reduceWithIndex(
    R.tryCatch(reduceIndexToPossibleNode, getPossibleNodesCatcher),
    [],
    [...new Array(9)]
  );
};

export const maxWeight = 100;
