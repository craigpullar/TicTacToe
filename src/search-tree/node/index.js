import R from "ramda";
import ENTITIES from "../../Entities";
import { buildPossibleNodesForGameState } from "./utils";

const Node = ({
  gameState,
  shouldBuildPossibleNodes = R.always(false),
  action,
  currentPlayer = gameState.getCurrentPlayer(),
  currentDepth = 0,
  possibleNodes = R.ifElse(
    R.partial(shouldBuildPossibleNodes, [currentDepth]),
    R.partial(buildPossibleNodesForGameState, [
      {
        gameState,
        shouldBuildPossibleNodes,
        currentPlayer,
        currentDepth
      }
    ]),
    R.always([])
  )()
}) => {
  const _gameState = gameState;
  const _possibleNodes = possibleNodes;
  if (!shouldBuildPossibleNodes) {
    throw new Error("no shouldBuildPossibleNodes");
  }

  const getUtility = R.ifElse(
    R.partial(R.equals, [_gameState.evalState(), ENTITIES.STATES.get("WIN")]),
    R.always(currentPlayer !== _gameState.getCurrentPlayer() ? 1 : -1),
    R.always(0)
  );

  const getUtilityForPossibleNodes = () => {
    const getUtilityArray = R.map(
      R.partial(R.prop, ["getUtilityForPossibleNodes"]),
      possibleNodes
    );
    const utilityArray = R.map(R.call, getUtilityArray);
    return R.reduce(R.add, getUtility(), utilityArray);
  };

  return {
    getGameState: R.always({ ..._gameState }),
    getPossibleNodes: R.always(_possibleNodes),
    getUtility,
    getUtilityForPossibleNodes,
    action
  };
};

export default Node;
