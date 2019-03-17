import R from "ramda";
import SearchTree from "../search-tree";

const compareNodeTreeUtilities = (currentNode, compareNode) => {
  return R.ifElse(
    R.always(
      R.lt(
        currentNode.getUtilityForPossibleNodes(),
        compareNode.getUtilityForPossibleNodes()
      )
    ),
    R.always(compareNode),
    R.always(currentNode)
  )();
};

export const AI = ({ gameState }) => {
  let _searchTree = SearchTree({ gameState, searchDepth: 2 });

  const getNextActionForPossibleNodes = possibleNodes =>
    R.prop(
      "action",
      possibleNodes.reduce(compareNodeTreeUtilities, R.head(possibleNodes))
    );

  return {
    getNextAction: R.partial(getNextActionForPossibleNodes, [
      _searchTree.getPossibleNodes()
    ])
  };
};

export default AI;
