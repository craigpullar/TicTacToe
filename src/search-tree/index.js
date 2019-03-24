import * as R from "ramda";
import Node from "./node";

export const SearchTree = ({ gameState, searchDepth = 5 }) => {
  const shouldBuildPossibleNodes = currentDepth =>
    R.gt(R.subtract(searchDepth, currentDepth), 0);

  return Node({
    gameState,
    shouldBuildPossibleNodes,
    currentPlayer: R.call(gameState.getCurrentPlayer)
  });
};

export default SearchTree;
