import * as R from "ramda";

export const compareNodeTreeUtilities = (currentNode, compareNode) => {
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
