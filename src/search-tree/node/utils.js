import R from "ramda";
import Game from "../../game";
import Node from "./index";

export const buildPossibleNodesForGameState = ({
  gameState,
  shouldBuildPossibleNodes,
  currentPlayer,
  currentDepth
}) => {
  const possibleNextNodes = [...new Array(9)].reduce(
    (possibleNodes, _, index) => {
      try {
        const newGame = Game(gameState.getBoard(), gameState.getPlayers());
        newGame.makeMove(index);
        return [
          ...possibleNodes,
          Node({
            gameState: { ...newGame },
            shouldBuildPossibleNodes,
            action: index,
            currentPlayer,
            currentDepth: R.inc(currentDepth)
          })
        ];
      } catch (error) {
        return possibleNodes;
      }
    },
    []
  );
  return possibleNextNodes;
};
