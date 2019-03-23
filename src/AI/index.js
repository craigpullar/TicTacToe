import R from "ramda";
import SearchTree from "../search-tree";
import { compareAndRetrieveDesiredNode } from "./utils";

export const AI = ({ gameState }) => {
  let _searchTree = SearchTree({ gameState, searchDepth: 5 });

  const getNextActionForPossibleNodes = possibleNodes => {
    const nextNode = R.reduce(
      compareAndRetrieveDesiredNode,
      R.head(possibleNodes),
      possibleNodes
    );
    return R.prop("action", nextNode);
  };

  return {
    getNextAction: R.partial(getNextActionForPossibleNodes, [
      R.call(_searchTree.getPossibleNodes)
    ])
  };
};

export default AI;
