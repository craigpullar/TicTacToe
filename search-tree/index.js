import R from "ramda";
import Node from "./node";

export const SearchTree = ({ gameState, searchDepth = 5 }) => {
  let _currentSearchTreeDepth = 0;
  const increaseCurrentSearchDepth = () => {
    _currentSearchTreeDepth = R.inc(_currentSearchTreeDepth);
    return _currentSearchTreeDepth;
  };
  const shouldBuildPossibleNodes = () =>
    R.gte(R.subtract(searchDepth, increaseCurrentSearchDepth()), 0);

  return Node({ gameState, shouldBuildPossibleNodes });
};

export default SearchTree;
