import * as R from "ramda";

const compareNodeUtilities = (currentNode, compareNode) =>
  R.lt(
    R.call(currentNode.getUtilityForPossibleNodes),
    R.call(compareNode.getUtilityForPossibleNodes)
  );

const getCompareNodeFromParams = R.nthArg(1);
const getCurrentNodeFromParams = R.nthArg(0);
export const compareAndRetrieveDesiredNode = R.ifElse(
  compareNodeUtilities,
  getCompareNodeFromParams,
  getCurrentNodeFromParams
);
