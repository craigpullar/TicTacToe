import R from "ramda";
import SearchTree from "../search-tree";
import { compareNodeTreeUtilities } from "./utils";

export const AI = ({ gameState }) => {
  let _searchTree = SearchTree({ gameState, searchDepth: 5 });

  const getNextActionForPossibleNodes = possibleNodes => {
    const nextNode = possibleNodes.reduce(
      compareNodeTreeUtilities,
      R.head(possibleNodes)
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
